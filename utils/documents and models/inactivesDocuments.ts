export type InactiveStandard = {
  foto: string
  pis: string
  contracheque: string
  veracidade: string
  comprovanteEstado: string
}

const inactivesStandard: InactiveStandard = {
  foto: "Foto do rosto de frente segurando documento de identidade ao lado",
  pis: "PIS/PASEP ou NIT",
  contracheque: "Contracheque do mês anterior",
  veracidade: "Termo de veracidade (Anexo VII no link abaixo)",
  comprovanteEstado: "Declaração de estado civil (Anexo III no link abaixo)",
}

export { inactivesStandard }
