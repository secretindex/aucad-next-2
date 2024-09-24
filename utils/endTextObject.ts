// Type for valid and types for missing docs
type IDValid = "id/v"
type IDInvalid = "id/10" | "id/n"

// Residence
type ResidenceValid = "cr/v" | "dr/s"
type ResidenceInvalid = "cr/60" | "dr/n" | "cr/n"

// Civil State
type CivilStatusInvalid = "cns/n" | "cerc/n" | "cav/n" | "un/n" | "dsvu/n"
type CivilStatusValid = "cns/s" | "cerc/s" | "cav/s" | "un/s" | "dsvu/s" | "cns/nr"

// Dependent
type DependentTypeInvalid = "deco/n" | "dp/n" | "tgc/n" | "dp/21" | "dep/id/n" | "dep/id/10" | "cnd/n"
type DependentTypeValid = "deco/s" | "dp/s" | "tgc/s" | "cnd/s" | "dep/n"

type PisPensionerInvalid = "pis/18/n"
type PisPensionerValid = "pis/18/s" | "pis/nr"

type IrpfValid = "dirpf/s" | "disirpf/s"
type IrpfInvalid = "dirpf/n" | "dirpf/ca"

// Declaração de inacumulabilidade de pensão
type DipsValid = "dips/s" | "dips/u" | "dips/nr"
type DipsInvalid = "dips/n"

interface ActivesDocuments {
  foto: boolean
  id: IDInvalid | IDValid
  residencia: ResidenceInvalid | ResidenceValid
  estadoCivil: CivilStatusInvalid | CivilStatusValid
  contracheque: boolean
  pis: boolean
  posse: boolean
  veracidade: boolean
  comprovanteEstado: boolean
  depId: DependentTypeInvalid | DependentTypeValid
}

export interface InactivesDocuments {
  foto: boolean
  id: IDInvalid | IDValid
  residencia: ResidenceInvalid | ResidenceValid
  estadoCivil: CivilStatusInvalid | CivilStatusValid
  contracheque: boolean
  pis: boolean
  veracidade: boolean
  comprovanteEstado: boolean
  depId: DependentTypeInvalid | DependentTypeValid
}

export interface PensionerDocuments {
  foto: boolean
  id: IDInvalid | IDValid
  residencia: ResidenceInvalid | ResidenceValid
  pis: PisPensionerInvalid | PisPensionerValid
  estadoCivil: CivilStatusInvalid | CivilStatusValid
  inacPen: DipsValid | DipsInvalid
  decIRPF: IrpfInvalid | IrpfValid
}

export default ActivesDocuments