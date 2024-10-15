"use client"

import { ReloadOutlined } from "@ant-design/icons"

import DocumentOptions from "./SubComponents/DocumentOptions"

import React, { useEffect, useState } from "react"
import { FloatButton, Typography, Row, Col, Space, Layout } from "antd"
import TextModal from "./TextModal"

import { ActivesDocs, InactivesInt, PensionerDocs } from "@/utils/docsInterface"
import { usePathname } from "next/navigation"

import useAppReset from "@/utils/useAppReset"

import { Category } from "./SubComponents/types/essentialTypes"
import RegisterCounter from "./RegisterCounter"

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
  const [optionsWidth, setOptionsWidth] = useState<boolean>(false)

  const reset = useAppReset(category)

  const pathname = usePathname()

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 800) {
        setOptionsWidth(true)
      } else {
        setOptionsWidth(false)
      }
    })

    return () => {
      reset()
    }
  }, [pathname])

  const restartAction = () => {
    reset()

    window.location.reload()
  }

  return (
    <Content className="flex flex-col p-10 justify-center items-center">
      <Row className="p-2 h-32 justify-center">
        <Col span={optionsWidth ? 30 : 18}>
          <Space direction="vertical" size="small" className="flex w-full">
            <Content className="w-full flex justify-center">
              <Typography.Title className="title-bg uppercase" level={4}>
                {title}
              </Typography.Title>
            </Content>
            <Row key={pathname} gutter={[16, -64]}>
              {documents &&
                Object.keys(documents as object).map((doc: string) => {
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
      <RegisterCounter />
    </Content>
  )
}

export default RegisterPage
