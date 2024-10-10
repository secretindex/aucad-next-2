import { createContext, Dispatch, SetStateAction, useState, FC } from "react"

interface PopupInt {
  message: string
  setMessage: Dispatch<SetStateAction<string>>
}

export const PopupContext = createContext<PopupInt | undefined>(undefined)

interface PopupProps {
  children: React.ReactNode
}

const PopupContextProvider: FC<PopupProps> = ({ children }) => {
  const [message, setMessage] = useState<string>("")

  return (
    <PopupContext.Provider value={{ message, setMessage }}>
      {children}
    </PopupContext.Provider>
  )
}

export default PopupContextProvider
