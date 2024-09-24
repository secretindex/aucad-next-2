import { ReloadOutlined } from "@ant-design/icons"

import DocumentOptions from "./SubComponents/DocumentOptions"

import React, { useContext, useEffect, useState } from "react"
import { FloatButton, Typography, Row, Col, Space, Layout } from "antd"
import TextModal from "./TextModal"

import { ActivesDocs, InactivesInt, PensionerDocs } from "@/utils/docsInterface"
import {
  documentsContext,
  SecondCheckboxContext,
} from "@/contexts/SecondCheckboxContext"
import { InactivesContext, inactivesDefault } from "@/contexts/InactivesContext"
import {
  PensionerContext,
  pensionerContextDocs,
} from "@/contexts/PensionerContext"
import { TextFieldContext } from "@/contexts/TextfieldContext"

import { useRouter } from "next/router"

import { Category } from "./SubComponents/types/essentialTypes"

interface RegisterPageProps {
  category: Category
  title: "Ativos" | "Inativos" | "Pensionistas"
  documents: ActivesDocs | PensionerDocs | InactivesInt | undefined
}

const { Content } = Layout

const RegisterPage: React.FC<RegisterPageProps> = ({
  category,
  title,
  documents,
}) => {
  const globalDocs = useContext(SecondCheckboxContext)
  const pensionerDocs = useContext(PensionerContext)
  const inactiveDocs = useContext(InactivesContext)

  const { pathname } = useRouter()

  const textField = useContext(TextFieldContext)
  const [optionsWidth, setOptionsWidth] = useState<boolean>(false)

  const statusReset = () => {
    textField?.setText("")

    if (category === "active") {
      globalDocs?.setDocs(() => documentsContext)
    }
    if (category === "pensioner") {
      pensionerDocs?.setDocs(pensionerContextDocs)
    }
    if (category === "inactive") {
      inactiveDocs?.setDocs(inactivesDefault)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 800) {
        setOptionsWidth(true)
      } else {
        setOptionsWidth(false)
      }
    })

    return () => {
      statusReset()
    }
  }, [pathname])

  const restartAction = () => {
    statusReset()

    window.location.reload()
  }

  return (
    <Content className="flex flex-col gap-2 p-10 justify-center items-center max-h-full">
      <Row className="p-2 h-60 justify-center">
        <Col span={optionsWidth ? 30 : 18}>
          <Space direction="vertical" size="middle" className="flex w-full">
            <Content className="w-full flex justify-center">
              <Typography.Title className="title-bg uppercase" level={4}>
                {title}
              </Typography.Title>
            </Content>
            <Row key={pathname} gutter={[16, 8]}>
              {documents &&
                Object.keys(documents as {}).map((doc: string) => {
                  return (
                    <DocumentOptions
                      key={doc}
                      name={documents[doc as keyof typeof documents]["name"]}
                      keyName={doc}
                      category={category}
                      optionList={
                        documents[doc as keyof typeof documents]["optionList"]
                      }
                    />
                  )
                })}
            </Row>
            <Content className="w-full flex justify-center">
              <TextModal category={category} />
            </Content>
          </Space>
        </Col>
      </Row>
      <FloatButton
        icon={<ReloadOutlined />}
        style={{ border: "1px solid #adadad" }}
        onClick={() => restartAction()}
      />
    </Content>
  )
}

export default RegisterPage
