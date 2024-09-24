import React, { Dispatch, SetStateAction, useState, createContext, ReactNode } from "react"
import { RequiredDocs } from "../utils/docsInterface"

interface CheckboxContextType {
  docs: RequiredDocs
  setDocs: Dispatch<SetStateAction<RequiredDocs>>
}

export const CheckboxContext = createContext<CheckboxContextType | undefined>(
  undefined
)

interface ProviderProps {
  children: ReactNode
}

const CheckboxContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [docs, setDocs] = useState<RequiredDocs>({
    foto: false,
    id: false,
    pis: false,
    residencia: false,
    uniao: false,
    casamento: false,
    nascimento: false,
    contracheque: false,
    posse: false,
    veracidade: false,
    estadoc: false,
    depid: false,
    decres: false,
  })

  return (
    <CheckboxContext.Provider value={{ docs, setDocs }}>
      {children}
    </CheckboxContext.Provider>
  )
}

export default CheckboxContextProvider
