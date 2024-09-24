// Not for checkboxes anymore
export interface RequiredDocs {
  foto: boolean
  id: boolean
  pis: boolean
  residencia: boolean
  uniao: boolean
  casamento: boolean
  nascimento: boolean
  contracheque: boolean
  posse: boolean
  veracidade: boolean
  estadoc: boolean
  depid: boolean
  decres: boolean
}

export interface ComplexDocsEssentials {
  foto: {
    required: boolean
    present: boolean
  }
  id: {
    required: boolean
    present: boolean
    options: "valido" | "+10" | undefined
  }
  residencia: {
    required: boolean
    present: boolean
    options: "valido" | "+60" | "terceiros" | undefined
  }
  estadoCivil: {
    required: boolean
    present: boolean
    options: "solteiro" | "casado" | "uniao" | undefined
  }
  contracheque: {
    required: boolean
    present: boolean
  }
  posse: {
    required: boolean
    present: boolean
  }
  veracidade: {
    required: boolean
    present: boolean
  }
  comprovanteEstado: {
    required: boolean
    present: boolean
  }
  depId: {
    required: boolean
    present: boolean
    options: "nodep" | "dep" | undefined
  }
  declaracaoRes: {
    required: boolean
    present: boolean
    options: "Não requerido" | "Requerido" | undefined
  }
}

interface Option {
  label: string
  value: number | string | undefined
}

interface NestedOption extends Option {
  children?: NestedOption[]
}

export interface PensionerDocs {
  foto: {
    name: string
    present: boolean
    optionList?: NestedOption[]
  }
  id: {
    name: string
    required: boolean
    present: boolean
    optionList?: NestedOption[]
  }
  residencia: {
    name: string
    required: boolean
    present: boolean
    options: "valido" | "+60" | "terceiros" | undefined
    optionList: NestedOption[]
  }
  pis: {
    name: string
    required: boolean
    present: boolean
    optionList: NestedOption[]
  }
  estadoCivil: {
    name: string
    required: boolean
    present: boolean
    optionList: NestedOption[]
  }
  inacPen: {
    name: string
    required: boolean
    present: boolean
    optionList?: NestedOption[]
  }
  decIRPF: {
    name: string
    required: boolean
    present: boolean
    optionList?: NestedOption[]
  }
}

export interface InactivesInt {
  foto: {
    name: string
    required: boolean
    present: boolean
    optionList?: NestedOption[]
  }
  id: {
    name: string
    required: boolean
    present: boolean
    options: "valido" | "+10" | undefined
    optionList: NestedOption[]
  }
  residencia: {
    name: string
    required: boolean
    present: boolean
    options: "valido" | "+60" | "terceiros" | undefined
    optionList: NestedOption[]
  }
  estadoCivil: {
    name: string
    required: boolean
    present: boolean
    options: "solteiro" | "casado" | "uniao" | undefined
    optionList: NestedOption[]
  }
  pis: {
    name: string
    required: boolean
    present: boolean
    optionList?: NestedOption[]
  }
  contracheque: {
    name: string
    required: boolean
    present: boolean
    optionList?: NestedOption[]
  }
  veracidade: {
    name: string
    required: boolean
    present: boolean
    optionList?: NestedOption[]
  }
  comprovanteEstado: {
    name: string
    required: boolean
    present: boolean
    optionList?: NestedOption[]
  }
  depId: {
    name: string
    required: boolean
    present: boolean
    options: "nodep" | "dep" | undefined
    optionList: NestedOption[]
  }
}

export interface ActivesDocs {
  foto: {
    name: string
    required: boolean
    present: boolean
    optionList?: NestedOption[]
  }
  id: {
    name: string
    required: boolean
    present: boolean
    options: "valido" | "+10" | undefined
    optionList: NestedOption[]
  }
  residencia: {
    name: string
    required: boolean
    present: boolean
    options: "valido" | "+60" | "terceiros" | undefined
    optionList: NestedOption[]
  }
  estadoCivil: {
    name: string
    required: boolean
    present: boolean
    options: "solteiro" | "casado" | "uniao" | undefined
    optionList: NestedOption[]
  }
  pis: {
    name: string
    required: boolean
    present: boolean
    optionList?: NestedOption[]
  }
  contracheque: {
    name: string
    required: boolean
    present: boolean
    optionList?: NestedOption[]
  }
  posse: {
    name: string
    required: boolean
    present: boolean
    optionList?: NestedOption[]
  }
  veracidade: {
    name: string
    required: boolean
    present: boolean
    optionList?: NestedOption[]
  }
  comprovanteEstado: {
    name: string
    required: boolean
    present: boolean
    optionList?: NestedOption[]
  }
  depId: {
    name: string
    required: boolean
    present: boolean
    options: "nodep" | "dep" | undefined
    optionList: NestedOption[]
  }
}

// export interface DocsText {
//   foto: string
//   id: string
//   pis: string
//   residencia: string
//   uniao: string
//   casamento: string
//   nascimento: string
//   contracheque: string
//   posse: string
//   veracidade: string
//   estadoc: string
//   depid: string
//   decres: string
// }
