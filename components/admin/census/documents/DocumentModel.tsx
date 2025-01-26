// TODO: interface of name, value and response props to be implemented

import { NewDocument } from "@/app/profile/admin/[id]/control-panel/editar-censo/[censo_id]/documentos/ativos/page"
import { DeleteOutlined } from "@ant-design/icons"
import { Dispatch, FC, SetStateAction } from "react"

interface DocumentModelProps {
  nome: string
  valores: string[]
  respostas: string[]
  index: number
  setNewDocumentList: Dispatch<SetStateAction<NewDocument[]>>
  newDocumentList: NewDocument[]
}

const DocumentModel: FC<DocumentModelProps> = ({ nome, valores, respostas, index, setNewDocumentList, newDocumentList }) => {

  const handleDeleteFromArray = () => {
    // Verificar se new document list contem o documento que eu vou apagar. Se tiver, eu vou apagar da lista. Se não, vou desassociar do censo na base de dados
    setNewDocumentList(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="px-8 h-12 flex gap-4 border-b-[1px] border-gray-200 items-center justify-between">
      <div className="border-r-[1px] flex items-center h-full border-gray-200 font-bold w-full">
        {nome}
      </div>
      <div className="border-r-[1px] text-sm flex items-center h-full overflow-auto border-gray-200 w-full">
        {valores.join(", ")}
      </div>
      <div className="border-r-[1px] text-sm flex items-center h-full overflow-auto border-gray-200 w-full">
        { respostas.join(", ") }
      </div>
      <div>
        <button onClick={handleDeleteFromArray} className="px-2 py-[0.3rem] hover:bg-gray-100 text-sm transition-all ease-in-out rounded-lg border-[1px] border-[#bdbdbd50] ">
          <DeleteOutlined />
        </button>
      </div>
    </div>
  )
}

export default DocumentModel
