import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react"

import FinalTextDocuments from "../utils/endTextObject"

export const documentsContext: FinalTextDocuments = {
  foto: false,
  id: "id/n",
  residencia:"cr/n",
  estadoCivil: "cns/n",
  pis: false,
  contracheque: false,
  posse: false,
  veracidade: false,
  comprovanteEstado: false,
  depId: 'dep/n'
}

export interface SecondCheckboxContentType {
  docs: FinalTextDocuments
  setDocs: Dispatch<SetStateAction<FinalTextDocuments>>
}

const SecondCheckboxContext = createContext<
  SecondCheckboxContentType | undefined
>(undefined)

interface ContextProps {
  children: ReactNode
}

const SecondCheckboxContextProvider: React.FC<ContextProps> = ({
  children,
}) => {
  const [docs, setDocs] = useState<FinalTextDocuments>(documentsContext)

  return (
    <SecondCheckboxContext.Provider value={{ docs, setDocs }}>
      {children}
    </SecondCheckboxContext.Provider>
  )
}

export { SecondCheckboxContextProvider, SecondCheckboxContext }
