"use client"

import { useState, Dispatch, FC, SetStateAction } from "react"
import { Select } from "antd"

export interface DocumentValue {
  index: number
  value: string
}

interface DocumentSelectProps {
  document: any
  setResponses: Dispatch<SetStateAction<Array<DocumentValue>>>
  index: number
}

const DocumentSelect: FC<DocumentSelectProps> = ({
  document,
  setResponses,
  index
}) => {
  const [documentResponse, setDocumentResponse] = useState<DocumentValue>({ index: index, value: "" })
  const [inputValue, setInputValue] = useState<string>(document.respostas[1])

  const handleChange = (value: string) => {
    console.log("this is value ", value)
    setDocumentResponse({ index: index, value: value })

    console.log(documentResponse)

    setInputValue(value)

    setResponses((prev) => {
      return prev.map(doc => doc.index === index ? {...doc, value: value} : doc)
    })
  }

  return (
    <Select
      style={{ width: 250 }}
      placeholder="Selecione uma opção"
      onChange={handleChange}
      value={inputValue}
      options={document.valores.map((value: string, index: number) => ({
        label: value,
        value: document.respostas[index],
      }))}
    ></Select>
  )
}

export default DocumentSelect
