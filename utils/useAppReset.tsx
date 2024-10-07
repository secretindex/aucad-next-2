import { useContext } from "react"

import {
  SecondCheckboxContext,
  documentsContext,
} from "../contexts/SecondCheckboxContext"
import {
  InactivesContext,
  inactivesDefault,
} from "../contexts/Inactivescontext"
import {
  PensionerContext,
  pensionerContextDocs,
} from "../contexts/PensionerContext"
import { Category } from "../components/SubComponents/types/essentialTypes"
import { TextFieldContext } from "../contexts/TextfieldContext"

const useAppReset = (category: Category) => {
  const globalDocs = useContext(SecondCheckboxContext)
  const pensionerDocs = useContext(PensionerContext)
  const inactiveDocs = useContext(InactivesContext)
  const textField = useContext(TextFieldContext)

  const statusReset = () => {
    textField?.setText("")

    if (category === "active") {
      globalDocs?.setDocs(() => documentsContext)
    }
    if (category === "pensioner") {
      pensionerDocs?.setDocs(pensionerContextDocs)
    }
    if (category === "inactive") {
      inactiveDocs?.setDocs(inactivesDefault)
    }
  }

  return statusReset
}

export default useAppReset
