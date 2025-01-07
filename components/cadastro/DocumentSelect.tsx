"use client"

// Objective: This file is responsible for the document selection component. It is used in the census page to select documents and their values.

import { useState, useEffect, Dispatch, FC, SetStateAction } from "react"
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

    setResponses((prev: Array<DocumentValue>) => {
      // const index = document.valores.indexOf(value)

      if (prev.includes(documentResponse)) {
        // verificar objeto pela key
        return prev.filter((item) => item.index !== index)
      } else {
        return [...prev, documentResponse]
      }
    })
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <Select
        style={{ width: 250 }}
        placeholder="Selecione uma opção"
        onChange={handleChange}
        options={document.valores.map((value: string, index: number) => ({
          label: value,
          value: document.respostas[index],
        }))}
      ></Select>
    </div>
  )
}

export default DocumentSelect
