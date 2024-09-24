import text from "./text"
import FinalTextDocuments, { InactivesDocuments } from "./endTextObject"
import { PensionerDocuments } from "./endTextObject"
import { RequiredDocs } from "./docsInterface"

import {
  InactiveStandard,
  InvalidDocuments,
  invalidStandard,
  ActivesStandardType,
  activesStandard,
} from "./documents and models/pendingDocuments"

import {
  invalidPensioner,
  InvalidPensioner,
  standardPensioner,
  PensionerCheck,
} from "./documents and models/pensionerDocuments"

import { inactivesStandard } from "./documents and models/inactivesDocuments"

type FieldsType = RequiredDocs | FinalTextDocuments | PensionerDocuments | PensionerCheck | InactivesDocuments

class RejectText {
  private upper: string = text.upperText
  private midText: string = ""
  private bottom: string = text.bottomText
  private textFields: Array<string>
  fields: FieldsType

  constructor(fields: FieldsType) {
    this.fields = fields
    this.textFields = []
  }

  returnText(): string {
    for (let i = 0; i < this.textFields.length; i++) {
      if (typeof this.textFields[i] === "string" && this.textFields[i].length === 0) continue
      if (typeof this.textFields[i] === "undefined") continue

      if (this.textFields[i]) this.midText += `- ${this.textFields[i]};\n`
    }

    if (this.midText) {
      return this.upper + "\n" + this.midText + this.bottom
    } else {
      return "Cadastro completo 👍"
    }
  }

  returnActivesRejectText(): string {
    for (const i in this.fields) {
      if (typeof (this.fields as RequiredDocs)[i as keyof RequiredDocs] !== "string") {
        this.textFields.push(
          (this.fields as RequiredDocs)[i as keyof RequiredDocs] === true
            ? ""
            : activesStandard[i as keyof ActivesStandardType]
        )
      } else {
        this.textFields.push(
          invalidStandard[(this.fields as FinalTextDocuments)[i as keyof FinalTextDocuments] as keyof InvalidDocuments]
        )
      }
    }

    return this.returnText()
  }

  returnInactiveText(): string {
    for (const i in this.fields) {
      if (typeof (this.fields as InactivesDocuments)[i as keyof InactivesDocuments] !== "string") {
        this.textFields.push(
          (this.fields as InactivesDocuments)[i as keyof InactivesDocuments] === true
            ? ""
            : inactivesStandard[i as keyof InactiveStandard]
        )
      } else {
        this.textFields.push(
          invalidStandard[(this.fields as InactivesDocuments)[i as keyof InactivesDocuments] as keyof InvalidDocuments]
        )
      }
    }

    return this.returnText()
  }

  returnPensionerText(): string {
    for (const i in this.fields) {
      if (typeof (this.fields as PensionerDocuments)[i as keyof PensionerDocuments] !== "string") {
        this.textFields.push(
          (this.fields as PensionerCheck)[i as keyof PensionerCheck] === true
            ? ""
            : standardPensioner[i as keyof PensionerCheck]
        )
      } else {
        this.textFields.push(
          invalidPensioner[(this.fields as PensionerDocuments)[i as keyof PensionerDocuments] as keyof InvalidPensioner]
        )
      }
    }

    return this.returnText()
  }
}

export default RejectText
