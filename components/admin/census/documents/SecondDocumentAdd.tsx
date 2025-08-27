import {
  BaseSyntheticEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import {
  NewDocument,
  SecondDocument,
} from "@/app/profile/admin/[id]/control-panel/editar-censo/[censo_id]/documentos/ativos/page"
import { Input } from "antd"
import axios from "axios"

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
  const [documentName, setDocumentName] = useState<string>("")
  // const []
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const handleCloseModal = () => {
    setModalVisible(false)
  }

  useEffect(() => {
    console.log(options)
  }, [options])


  const handleNextStep = async () => {
    if (documentName.length < 1) return

    const res = await axios.post("/api/documents", { name: documentName })

    setStep(2)

    console.log(res.data)
  }

  const handleDocumentConfiguration = async () => {
    const res = await axios.get(`/api/documents/${documentName}`)

    console.log(res.data);
  }

  return (
    <div className="absolute w-screen h-screen bg-[#1010104c] flex flex-col justify-center items-center">
      <div className="relative rounded-md border-[#40404070] border-[1px] w-2/5 p-4 shadow-md bg-white">
        <div className="absolute top-3 right-3">
          <button
            onClick={handleCloseModal}
            className="px-2 py-[4px] flex justify-center gap-[8px] text-sm border-[1px] rounded-[0.2rem] bg-transparent transition-all ease-in-out hover:bg-gray-100"
          >
            X
          </button>
        </div>
        <div className="py-2 flex items-center justify-center">
          <h3 className="font-bold text-xl">Adicionar novo documento</h3>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            {options &&
              options.map((opt, i) => (
                <div key={i} className="flex justify-between">
                  <span className="font-bold">{opt.option}</span>
                  <span>{opt.reject}</span>
                </div>
              ))}
          </div>
          {/*  <CensusDocumentOptions></CensusDocumentOptions> */}
          {step === 1 && (
            <div>
              <label htmlFor="name" className="text-sm text-gray-600">
                Digite o nome do documento
              </label>
              <Input
                onChange={(e: BaseSyntheticEvent) =>
                  setDocumentName(e.target.value as string)
                }
                type="text"
                name="document_name"
                id="document-name"
              />
            </div>
          )}
          {step === 2 && (<div>

          </div>)}
          <div>
            <button
              onClick={handleNextStep}
              className="border-[1px] border-[#0004] rounded-md p-2 w-full font-bold hover:bg-gray-50"
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecondDocumentAdd
