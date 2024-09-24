export type InvalidPensioner = {
  "cr/60": string
  "cr/n": string
  "dr/n": string
  "id/10": string
  "pis/18/n": string
  "dips/n": string
  "id/n": string
  "cerc/n": string
  "cav/n": string
  "un/n": string
  "dsvu/n": string
  "dirpf/ca": string
  "dirpf/n": string
}

const invalidPensioner: InvalidPensioner = {
  "cr/60": `Comprovante de residência emitido nos últimos 60 dias;\nObs: Comprovante enviado foi emitido em MES. Favor, enviar um comprovante dentro prazo acima`,
  "cr/n": "Comprovante de residência emitido nos últimos 60 dias + Declaração de Residência (anexo II no link abaixo) caso o comprovante esteja no nome de terceiros",
  "dr/n": `Declaração de Residência (anexo II no link abaixo)\nObs: Comprovante enviado está em nome de terceiros. Favor, assinar e enviar a declaração acima`,
  "id/10": `Documento de identidade;\nObs: Documento de identidade enviado foi emitido em ANO, ultrapassando o limite de 10 anos desde a data de emissão. Caso não haja outro documento para substituir (CNH, Conselho de Classe ou Passaporte), entre em contato com nosso suporte informando seu caso`,
  "pis/18/n": "Enviar comprovante de cadastro no PIS/PASEP ou NIT",
  "dips/n": "Enviar declaração de Inacumulabilidade de Pensão (Anexo VIII no link abaixo)",
  "id/n": "Documento de Identidade emitido nos últimos 10 anos (RG ou CNH ou Conselho de Classe ou Passaporte ou Carteira de Identidade Militar)",
  "cerc/n": "Certidão de Casamento",
  "cav/n": "Certidão de casamento averbada",
  "un/n": "Declaração de união estável + Certidão de Nascimento",
  "dsvu/n": "Declaração de união estável + Certidão de Casamento averbada",
  "dirpf/n": "Enviar declaração de imposto de renda (Ano/Exercício 2023 ou 2024) ou, caso seja isento, enviar declaração de isenção de imposto de renda",
  "dirpf/ca": "Declaração de imposto de renda é de Ano/Exercício anterior à 2023. Favor, enviar declaração de IRPF atualizado"
}

export type PensionerCheck = {
  foto: boolean
  inacPen: boolean
}

export type StandardPensioner = {
  foto: string
  inacPen: string
}

const standardPensioner: StandardPensioner = {
  foto: "Foto do rosto de frente segurando documento de identidade ao lado",
  inacPen: "Enviar declaração de Inacumulabilidade de Pensão (Anexo VIII no link abaixo)"
}

export {invalidPensioner, standardPensioner}

