"use client"

import {
  useContext,
  useEffect,
  useState,
  useRef,
  BaseSyntheticEvent,
  MouseEventHandler,
} from "react"

import { Button, Modal, message, Input } from "antd"
import { CopyOutlined } from "@ant-design/icons"
import { TextFieldContext } from "@/contexts/TextfieldContext"
import { SecondCheckboxContext } from "@/contexts/SecondCheckboxContext"
import { PensionerContext } from "@/contexts/PensionerContext"
import { Category } from "./SubComponents/types/essentialTypes"

import AditionalRejectText from "./SubComponents/AditionalRejectText"
import EndText from "../utils/endTextGen"

import { TextAreaRef } from "antd/es/input/TextArea"
import { PasteTextContext } from "@/contexts/PasteTextContext"
import { InactivesContext } from "@/contexts/Inactivescontext"
import ActivesDocuments from "@/utils/endTextObject"
import ConfirmPopup from "./ConfirmPopup"

interface MouseCoords {
  x: number
  y: number
}

const { TextArea } = Input

interface TextModalProps {
  category: Category
}

const TextModal: React.FC<TextModalProps> = ({ category }) => {
  const textField = useContext(TextFieldContext)
  const globalDocs = useContext(SecondCheckboxContext)
  const penDocs = useContext(PensionerContext)
  const pasteText = useContext(PasteTextContext)
  const inacDocs = useContext(InactivesContext)

  const [_messageApi, contextHolder] = message.useMessage()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false)

  const textRef = useRef<TextAreaRef | null>(null)

  const [showReject, setShowReject] = useState<boolean>()
  const [mouseCoords, setMouseCoords] = useState<MouseCoords>({ x: 0, y: 0 })

  let textarea: HTMLTextAreaElement | undefined = undefined

  const handleContextMenu: MouseEventHandler<HTMLTextAreaElement> = (
    e: React.MouseEvent
  ) => {
    e.preventDefault()
    textarea = textRef.current?.resizableTextArea!.textArea

    const rect = textarea!.getBoundingClientRect()

    setMouseCoords({
      x: e.clientX - rect!.left + 20,
      y: e.clientY - rect!.top + 50,
    })

    setShowReject(true)
  }

  const handlePasteText = () => {
    textarea = textRef.current?.resizableTextArea!.textArea

    if (textarea && textField!.text) {
      const start = textarea!.selectionStart
      const end = textarea!.selectionEnd

      const before = textField!.text.substring(0, start)
      const after = textField!.text.substring(end)

      const newText = before + "\n" + pasteText!.addText + "\n" + after

      console.log(newText)

      textField?.setText(newText)
    }
  }

  const handleClick = (e: any) => {
    const closestDiv = (e.target as HTMLElement).closest("div")

    if (closestDiv && closestDiv.classList.contains("click-text")) {
      console.log(closestDiv.classList.contains("click-text"))
      handlePasteText()
    }

    setShowReject(false)
  }

  const text = textField?.text

  useEffect(() => {
    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [pasteText?.addText])

  const generateText = () => {
    if (category === "active") {
      const finalText = new EndText(globalDocs!.docs as ActivesDocuments)
      const rejectText = finalText.returnActivesRejectText()

      textField?.setText(rejectText.trim())
    }
    if (category === "inactive") {
      const inactiveText = new EndText(inacDocs!.docs)
      const inacRejectText = inactiveText.returnInactiveText()

      textField?.setText(inacRejectText.trim())
    }

    if (category === "pensioner") {
      const pensionerText = new EndText(penDocs!.docs)
      const penRejectText = pensionerText.returnPensionerText()

      textField?.setText(penRejectText.trim())
    }
  }

  const popupHandler = (state: boolean) => {
    setIsPopupOpen(state)
  }

  const showModal = () => {
    setIsModalOpen(true)
    generateText()
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleTextFieldChange = (e: BaseSyntheticEvent) => {
    textField?.setText(e.target.value)
  }

  const handleCopy = () => {
    popupHandler(true)

    navigator.clipboard
      .writeText(text as string)
      .then(() => {
        message.success("Text copied to clipboard!")
      })
      .catch(() => {
        message.error("Failed to copy text.")
      })
  }

  return (
    <>
      {contextHolder}
      <Button type="primary" className="w-2/6" onClick={showModal}>
        Analisar
      </Button>
      <Modal
        title="Mensagem de Recusa"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
        className="relative"
      >
        <div className="relative">
          <TextArea
            aria-multiline
            spellCheck="false"
            onContextMenu={handleContextMenu}
            onClick={handleClick}
            value={text}
            ref={textRef}
            onChange={handleTextFieldChange}
            style={{ height: "400px", resize: "none" }}
          ></TextArea>
        </div>
        {showReject ? <AditionalRejectText mouseCoords={mouseCoords} /> : <></>}
        <div className="absolute right-9 bottom-20">
          <div>
            <Button icon={<CopyOutlined />} onClick={handleCopy}></Button>
            <ConfirmPopup
              title="Texto copiado"
              category={category}
              message="Deseja finalizar o cadastro?"
              close={popupHandler}
              closeModal={handleCancel}
              isVisible={isPopupOpen}
            />
          </div>
        </div>
        <label className="block text-gray-600 mt-3">
          Botão direito: mensagens adicionais
        </label>
      </Modal>
    </>
  )
}

export default TextModal
