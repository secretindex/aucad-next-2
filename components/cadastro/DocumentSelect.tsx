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

  const handleChange = (value: string) => {
    console.log(value)
    setDocumentResponse({ index: index, value: value })

    console.log(documentResponse)

    setResponses((prev) => {
      return prev.map(doc => doc.index === index ? {...doc, value: value} : doc)
    })
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <Select
        style={{ width: 250 }}
        placeholder="Selecione uma opção"
        onChange={handleChange}
        defaultValue={document.valores[1]}
        options={document.valores.map((value: string, index: number) => ({
          label: value,
          value: document.respostas[index],
        }))}
      ></Select>
    </div>
  )
}

export default DocumentSelect
