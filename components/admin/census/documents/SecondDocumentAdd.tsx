import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import {
  NewDocument,
  SecondDocument,
} from "@/app/profile/admin/[id]/control-panel/editar-censo/[censo_id]/documentos/ativos/page"
import OptionsForm from "./options/OptionsForm"


interface AddNewDocumentProps {
  setModalVisible: Dispatch<SetStateAction<boolean>>
  setNewDocumentList: Dispatch<SetStateAction<NewDocument[]>>
}

type DocumentOptions = { option: string; reject: string }

const SecondDocumentAdd: FC<AddNewDocumentProps> = ({
  setModalVisible,
  setNewDocumentList,
}) => {
  const [options, setOptions] = useState<Array<DocumentOptions>>([])
  const handleCloseModal = () => {
    setModalVisible(false)
  }

  useEffect(() => {
    console.log(options)
  }, [options])

  // TODO: Opções children podem ser separadas por > antes da vírgula no campo valores (apenas hipótese)
  // TODO: respostas children podem ser separadas por > e, as que não tiverem valor nenhum, poddem conter o caractere * ou qualquer outro (antes da vírgula) (apenas hipótese 2)

  const handleSubmit = (formData: FormData) => {
    handleCloseModal()
    setNewDocumentList((prev) => [
      ...prev,
      {
        nome: formData.get("nome")!.toString(),
        valores: formData.get("valores")!.toString().split("\n"),
        respostas: formData.get("respostas")!.toString().split("\n"),
      },
    ])

    console.log("submitted")
  }

  return (
    <div className="absolute w-screen h-screen bg-[#1010104c] flex flex-col justify-center items-center">
      <div className="relative rounded-md border-[#40404070] border-[1px] p-4 shadow-md bg-white">
        <div className="absolute top-3 right-3">
          <button
            onClick={handleCloseModal}
            className="px-2 py-[4px] flex justify-center gap-[8px] text-sm border-[1px] rounded-[0.2rem] bg-transparent transition-all ease-in-out hover:bg-gray-100"
          >
            X
          </button>
        </div>
        <div>
          <div className="py-2 flex items-center justify-center">
            <h3 className="font-bold text-2xl">Adicionar novo documento</h3>
          </div>
          <div className="flex flex-col gap-4">
            { options && options.map(opt => (
              <>
              
              </>
            )) }
          </div>
          <OptionsForm setOptions={setOptions} />
          <div>
            <button className="border-[1px] border-[#0004] rounded-md p-2 w-full font-bold hover:bg-gray-50">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecondDocumentAdd
