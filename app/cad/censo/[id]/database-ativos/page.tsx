"use client"

import axios from "axios"
import { useEffect, useState } from "react"

import { Select, Space } from "antd"

const DatabaseAtivos = ({ params }: { params: { id: string } }) => {
  const [documents, setDocuments] = useState<Array<any>>([])
  const [responses, setResponses] = useState<Array<string>>()

  const getDocuments = () => {
    axios.get("/api/census/documents/ativos?id=" + params.id).then((res) => {
      console.log(res.data)
      setDocuments(res.data.data)
    })

  }

  const handleChange = (value: any) => {
    console.log(`selected ${value}`)
  }

  useEffect(() => {
    getDocuments()
  }, [])

  return (
    <section className="h-full w-full">
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-bold">Documentos</h1>
      </div>
      <div className="w-3/4 mx-auto flex flex-col justify-center items-center">
        <ul className="flex gap-2 items-center justify-center">
          <Space wrap>
            {documents &&
              documents.map((document) => (
                <li className="flex flex-col gap-2 w-full" key={document.id}>
                  <div>
                    <h3>{document.nome}</h3>
                  </div>
                  <Select
                    style={{ width: 250 }}
                    placeholder="Selecione uma opção"
                    onChange={handleChange}
                    options={document.valores.map((value: string,index: number) => ({
                      label: value,
                      value: document.respostas[index],
                    }))}
                  ></Select>
                </li>
              ))}
          </Space>
        </ul>
      </div>
      <div>
        <button className="btn btn-primary">Analisar</button>
      </div>
    </section>
  )
}

export default DatabaseAtivos
