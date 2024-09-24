import { FC, useContext } from "react"
import { PasteTextContext } from "@/contexts/PasteTextContext"

interface TextBoxProps {
  title: string
  text: string
}

const TextBox: FC<TextBoxProps> = ({ title, text }) => {
  const addText = useContext(PasteTextContext)

  const handleClick = () => {
    addText?.setAddText(text)
  }

  return (
    <div onClick={handleClick} className="w-full h-2/6 border-gray-200 p-3 cursor-pointer hover:bg-[#cecece20] transition-all ease-in-out click-text">
      <h5 style={{ fontWeight: "normal" }}>{title}</h5>
      <p className="overflow-hidden hidden">{text}</p>
    </div>
  )
}

export default TextBox
