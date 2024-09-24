import { createContext, Dispatch, SetStateAction, useState } from "react"

interface PasteTextInt {
  addText: string
  setAddText: Dispatch<SetStateAction<string>>
}

export const PasteTextContext = createContext<PasteTextInt | undefined>(undefined)

interface PasteTextProps {
  children: React.ReactNode
}

const PasteTextContextProvider: React.FC<PasteTextProps> = ({ children }) => {
  const [addText, setAddText] = useState<string>("")

  return <PasteTextContext.Provider value={{ addText, setAddText }}>{children}</PasteTextContext.Provider>
}

export default PasteTextContextProvider
