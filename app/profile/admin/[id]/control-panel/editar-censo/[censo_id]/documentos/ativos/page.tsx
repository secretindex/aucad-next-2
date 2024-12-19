"use client"

import { FC, useEffect, useState } from "react"
import { FileAddOutlined, FileOutlined, SyncOutlined } from "@ant-design/icons"
import DocumentModel from "@/components/admin/census/documents/DocumentModel"
import AddNewDocument from "@/components/admin/census/documents/AddNewDocument"
import axios from "axios"
import DocumentList from "@/components/admin/census/documents/DocumentList"

export type NewDocument = {
  nome: string
  valores: string[]
  respostas: string[]
}

const ActivesDocumentSettings = ({
  params,
}: {
  params: { id: string; censo_id: string }
}) => {
  const [newDocumentList, setNewDocumentList] = useState<Array<NewDocument>>([])
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [documentListVisible, setDocumentListVisible] = useState<boolean>(false)

  const { censo_id } = params

  // Later: fetch existing documents and display it for later editing

  useEffect(() => {
    console.log(newDocumentList)
  }, [newDocumentList])

  const handleSubmitDocuments = () => {
    axios.post("/api/documents", newDocumentList)
    console.log("Submitted")
  }

  const handleAddDocuments = () => {
    setModalVisible(true)
    console.log("adding documents to census")
  }

  const handleShowDocuments = () => {
    setDocumentListVisible((prev) => !prev)
  }

  return (
    <>
      <section className="flex h-full w-full flex-col items-center justify-center">
        <div className="h-32 flex w-4/6 flex-col items-center justify-center text-center">
          <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Ativos</h1>
          <span className="text-red-500 text-xs">
            Adicione apenas os documentos obrigatórios
          </span>
        </div>
        <div className="flex flex-col border-[1px] border-[#adadad60] rounded-md shadow-md w-4/6 h-3/5">
          <div className="flex flex-row gap-2 justify-between items-center px-8 py-[4px] border-[1px] border-gray-200">
            <h2 className="font-bold">Painel de Documentos</h2>
            <div>
              <button
                onClick={handleAddDocuments}
                className="px-4 py-[2px] flex gap-[8px] text-sm border-[1px] rounded-[0.2rem] bg-transparent transition-all ease-in-out hover:bg-gray-100"
              >
                <FileAddOutlined /> Adicionar documento
              </button>
            </div>
            <div className="relative">
              <button
                onClick={handleShowDocuments}
                className="px-4 py-[2px] flex gap-[8px] text-sm border-[1px] rounded-[0.2rem] bg-transparent transition-all ease-in-out hover:bg-gray-100"
              >
                <FileOutlined /> Lista
              </button>
              {documentListVisible && <DocumentList censo_id={censo_id}/>}
            </div>
            <button
              onClick={handleSubmitDocuments}
              className="px-4 py-[2px] flex gap-[8px] text-white text-sm rounded-[0.2rem] bg-[#26a69a] transition-all ease-in-out hover:bg-[#6ecdc5]"
            >
              <SyncOutlined /> Atualizar
            </button>
          </div>
          <div className="flex flex-col gap-0">
            <ul>
              {newDocumentList.length > 0 &&
                newDocumentList.map((doc, index) => (
                  <li key={index}>
                    <DocumentModel
                      nome={doc.nome}
                      valores={doc.valores}
                      respostas={doc.respostas}
                      index={index}
                      setNewDocumentList={setNewDocumentList}
                    />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>
      {modalVisible && (
        <AddNewDocument
          setModalVisible={setModalVisible}
          setNewDocumentList={setNewDocumentList}
        />
      )}
    </>
  )
}

export default ActivesDocumentSettings