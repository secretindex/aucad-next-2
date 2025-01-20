"use client"

import axios from "axios"
import { useEffect, useState } from "react"

import { Space, Form, Flex, Button, Select } from "antd"

const DatabaseAtivos = ({ params }: { params: { id: string } }) => {
  const [documents, setDocuments] = useState<Array<any>>([])

  const getDocuments = () => {
    axios.get("/api/census/documents/ativos?id=" + params.id).then((res) => {
      console.log("res data", res.data)
      setDocuments(res.data.data)
    })
  }

  const handleMessage = (e: any) => {
    console.log(e)
  }

  useEffect(() => {
    getDocuments()
  }, [])

  return (
    <section className="h-full flex flex-col justify-center items-center w-full">
      <div className="flex justify-center items-center my-4">
        <h1 className="text-2xl font-bold">Documentos</h1>
      </div>
      <div className="w-3/4 mx-auto flex flex-col justify-center items-center">
        <Space wrap>
          <Form onFinish={handleMessage}>
            <Flex gap={15} wrap>
              {documents &&
                documents.map((document, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <div>
                      <label>{document.nome}</label>
                    </div>
                    <Form.Item name={document.nome} initialValue={document.respostas[1]}>
                      <Select
                        style={{ width: 250 }}
                        placeholder="Selecione uma opção"
                        defaultValue={document.respostas[1]}
                        options={document.valores.map((value: string, index: number) => ({
                          label: value,
                          value: document.respostas[index],
                        }))}
                      ></Select>
                    </Form.Item>
                  </div>
                ))
              }
            </Flex>
            <div className="flex justify-center items-center">
              <Form.Item label={null}>
                <Button type="primary" htmlType="submit" className="px-4 py-[0.3rem] text-white outline-none rounded-md bg-[#26a69a] transition-all ease-in-out hover:bg-[#2fbaac]">
                  Analisar
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Space>
      </div>
    </section>
  )
}

export default DatabaseAtivos
