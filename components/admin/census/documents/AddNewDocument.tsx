import { Dispatch, FC, SetStateAction } from "react"
import { NewDocument } from "@/app/profile/admin/[id]/control-panel/editar-censo/[censo_id]/documentos/ativos/page"

interface AddNewDocumentProps {
  setModalVisible: Dispatch<SetStateAction<boolean>>
  setNewDocumentList: Dispatch<SetStateAction<NewDocument[]>>
}

const AddNewDocument: FC<AddNewDocumentProps> = ({
  setModalVisible,
  setNewDocumentList,
}) => {
  const handleCloseModal = () => {
    setModalVisible(false)
  }

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
        <div className="py-2 flex items-center justify-center">
          <h3 className="font-bold text-2xl">Adicionar novo documento</h3>
        </div>
        <form action="" className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="nome">Nome</label>
            <input
              className="border-[1px] border-[#bebebe30] focus:border-[#20202060] outline-none px-4 py-[0.3rem] rounded-md"
              autoComplete="off"
              type="text"
              name="nome"
              id="nome"
            />
          </div>
          <div className="flex flex-row flex-nowrap justify-center gap-4">
            <div className="flex flex-col gap-1 w-full">
              <div className="flex flex-col gap-[1px]">
                <label htmlFor="valores">Valores</label>
                <span className="text-xs text-gray-500">
                  Digite um valor por linha
                </span>
              </div>
              <textarea
                name="valores"
                id="valores"
                autoComplete="off"
                rows={6}
                className="border-[1px] border-[#bebebe30] focus:border-[#20202060] outline-none px-4 py-[0.3rem] rounded-md"
              ></textarea>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="flex flex-col gap-[1px]">
                <label htmlFor="respostas">Respostas</label>
                <span className="text-xs text-gray-500">
                  Digite uma resposta por linha
                </span>
              </div>
              <textarea
                name="respostas"
                id="respostas"
                autoComplete="off"
                rows={6}
                className="border-[1px] border-[#bebebe30] focus:border-[#20202060] outline-none px-4 py-[0.3rem] rounded-md"
              ></textarea>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-bold">Instruções</h4>
            <span className="text-xs text-gray-500">
              Os campos "valores" e "respostas" precisam estar em ordem
              paralela.
              <br />
              Ex: O valor "id + 10 anos" estando na terceira opção no campo
              'valores' precisa que sua resposta esteja como terceira opção no
              campo "respostas".
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <button
              formAction={handleSubmit}
              className="px-4 py-[6px] flex justify-center gap-[8px] text-sm border-[1px] rounded-[0.2rem] bg-transparent transition-all ease-in-out hover:bg-gray-100"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddNewDocument
