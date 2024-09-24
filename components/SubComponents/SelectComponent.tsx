import { FC, useContext, useState } from "react"
import { Select } from "antd"
import NestedSelect, { OptionInt } from "./NestedSelect"
import { DocumentosOptionsProps } from "./types/essentialTypes"

import { InactivesContext, InactivesContextType } from "@/contexts/InactivesContext"
import { SecondCheckboxContentType, SecondCheckboxContext } from "@/contexts/SecondCheckboxContext"
import { PensionerContentType, PensionerContext } from "@/contexts/PensionerContext"

import FinalTextDocuments, { InactivesDocuments, PensionerDocuments } from "@/utils/endTextObject"

type DocsType = SecondCheckboxContentType | PensionerContentType | InactivesContextType

const { Option } = Select

const SelectComponent: FC<DocumentosOptionsProps> = ({
  keyName,
  optionList,
  category,
}) => {
  const globalDocs = useContext(SecondCheckboxContext)
  const pensionerDocs = useContext(PensionerContext)
  const inactiveDocs = useContext(InactivesContext)
  const [field, setField] = useState<string>("")

  const setKeyValues = (docs: DocsType, value: string) => {
    return {
      ...docs.docs,
      [keyName]: value == "sim" ? true : false
    }
  }

  const handleChange = (value: string) => {
    setField(value)

    console.log(keyName + " " + value)

    if (category === "active") {
      globalDocs?.setDocs((setKeyValues(globalDocs, value) as FinalTextDocuments))
    }
    if (category === "pensioner") {
      pensionerDocs?.setDocs(setKeyValues(pensionerDocs, value) as PensionerDocuments)
    }
    if (category === "inactive") {
      inactiveDocs?.setDocs(setKeyValues(inactiveDocs, value) as InactivesDocuments)
    }
  }

  // Default
  if (!optionList) {
    return (
      <Select value={field} onChange={handleChange}>
        <Option key="sim" value="sim">
          Sim
        </Option>
        <Option key="nao" value="nao">
          Não
        </Option>
      </Select>
    )
  }
  // if (optionList.every((e) => typeof e !== "object")) {
  //   console.log(optionList)
  //   return (
  //     <Select value={field} onChange={handleChange}>
  //       {optionList.map((opt) => (
  //         <Option key={opt as string} value={opt}>
  //           {opt as string}
  //         </Option>
  //       ))}
  //     </Select>
  //   )
  // } 
  else if (optionList.every((e: any) => typeof e === "object")) {
    return (
      <NestedSelect
        optionList={optionList as OptionInt[]}
        keyName={keyName}
        category={category}
      />
    )
  }
}

export default SelectComponent
