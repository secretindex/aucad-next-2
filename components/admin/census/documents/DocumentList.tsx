import axios from "axios"
import { useEffect, useState } from "react"

import type { Documento } from "@/utils/censo/models"

const DocumentList = ({ censo_id }: { censo_id: string }) => {
  const [documents, setDocuments] = useState<Documento[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    axios.get("/api/documents").then((res) => {
      console.log(res.data.response)
      setDocuments(res.data.response)
    })
  }, [])

  const handleAddToCensus = async (index: number) => {
    const response = await axios.patch("/api/census/documents/ativos?id=" + censo_id, documents[index])

    console.log(response.data)
  }

  return (
    <div className="absolute left-[105%] border-[1px] border-[#dedede60] top-0 z-10 px-[4px] py-[7px] bg-white rounuded-md shadow-sm flex flex-col items-center justify-center gap-2">
      <div>
        <h4 className="font-bold text-sm">Documentos</h4>
      </div>
      <ul>
        {documents &&
          documents.map((doc, index) => (
            <li key={index}>
              <button
                onClick={() => handleAddToCensus(index)}
                className="px-4 py-[2px] flex gap-[8px] text-sm border-[1px] rounded-[0.2rem] bg-transparent transition-all ease-in-out hover:bg-gray-100"
              >
                {doc.nome}
              </button>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default DocumentList
