import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react"

interface TextFieldContentType {
  text: string
  setText: Dispatch<SetStateAction<string>>
}

interface TextFieldProps {
  children: ReactNode
}

export const TextFieldContext = createContext<TextFieldContentType | undefined>(undefined)

const TextFieldContextProvider : React.FC<TextFieldProps> = ({ children }) => {
  const [text, setText] = useState<string>("")

  return (
    <TextFieldContext.Provider value={{ text, setText }}>
      {children}
    </TextFieldContext.Provider>
  )
}

export default TextFieldContextProvider
