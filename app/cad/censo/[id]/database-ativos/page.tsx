"use client"

import axios from "axios"
import { useEffect, useState } from "react"

import { Space } from "antd"
import DocumentSelect, { DocumentValue } from "@/components/cadastro/DocumentSelect"

const DatabaseAtivos = ({ params }: { params: { id: string } }) => {
  const [documents, setDocuments] = useState<Array<any>>([])
  const [responses, setResponses] = useState<Array<DocumentValue>>([])

  const getDocuments = () => {
    axios.get("/api/census/documents/ativos?id=" + params.id).then((res) => {
      console.log(res.data)
      setDocuments(res.data.data)
    })
  }

  useEffect(() => {
    getDocuments()
  }, [])

  useEffect(() => {
    console.log("response ", responses)
  }, [responses])

  return (
    <section className="h-full flex flex-col justify-center items-center w-full">
      <div className="flex justify-center items-center my-4">
        <h1 className="text-2xl font-bold">Documentos</h1>
      </div>
      <div className="w-3/4 mx-auto flex flex-col justify-center items-center">
        <ul className="flex gap-2 items-center justify-center">
          <Space wrap>
            {documents &&
              documents.map((document, index) => (
                <li className="flex flex-col gap-2 w-full" key={document.id}>
                  <div>
                    <label>{document.nome}</label>
                  </div>
                  <DocumentSelect
                    document={document}
                    setResponses={setResponses}
                    index={index}
                  />
                </li>
              ))}
          </Space>
        </ul>
      </div>
      <div className="flex justify-center items-center mt-4">
        <button className="px-4 py-[0.3rem] text-white outline-none rounded-md bg-[#26a69a] transition-all ease-in-out hover:bg-[#2fbaac]">
          Analisar
        </button>
      </div>
    </section>
  )
}

export default DatabaseAtivos
