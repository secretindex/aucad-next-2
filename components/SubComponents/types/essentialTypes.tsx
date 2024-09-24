import { OptionInt } from "../NestedSelect"

export type Category = "active" | "inactive" | "pensioner"

type OptList = Array<string | OptionInt | undefined>

export interface DocumentosOptionsProps {
  name: string
  keyName: string
  optionList?: OptList
  category: Category
}