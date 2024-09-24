import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react"

import { InactivesDocuments } from "../utils/endTextObject"

export const inactivesDefault: InactivesDocuments = {
  foto: false,
  id: "id/n",
  residencia: "cr/n",
  estadoCivil: "cns/n",
  pis: false,
  contracheque: false,
  veracidade: false,
  comprovanteEstado: false,
  depId: "dep/n",
}

export interface InactivesContextType {
  docs: InactivesDocuments
  setDocs: Dispatch<SetStateAction<InactivesDocuments>>
}

const InactivesContext = createContext<InactivesContextType | undefined>(
  undefined
)

interface ContextProps {
  children: ReactNode
}

const InactivesContextProvider: React.FC<ContextProps> = ({ children }) => {
  const [docs, setDocs] = useState<InactivesDocuments>(inactivesDefault)

  return (
    <InactivesContext.Provider value={{ docs, setDocs }}>
      {children}
    </InactivesContext.Provider>
  )
}

export { InactivesContextProvider, InactivesContext }
