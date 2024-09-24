export type InvalidDocuments = {
  "cr/60": string
  "cr/n": string
  "dr/n": string
  "id/10": string
  "id/n": string
  "cns/n": string
  "estc/nd": string
  "cerc/n": string
  "cav/n": string
  "un/n": string
  "un/nd": string
  "dsvu/n": string
  "deco/n": string 
  "tgc/n": string
  "dp/21": string
  "dep/id/n": string
  "dep/id/10": string
  "cnd/n": string,
}

const invalidStandard: InvalidDocuments = {
  "cr/60": `Comprovante de residência emitido nos últimos 60 dias;\nObs: Comprovante enviado foi emitido em MES. Favor, enviar um comprovante dentro do prazo acima`,
  "cr/n": "Comprovante de residência emitido nos últimos 60 dias + Declaração de Residência (anexo II no link abaixo) caso o comprovante esteja no nome de terceiros",
  "dr/n": `Declaração de Residência (anexo II no link abaixo)\nObs: Comprovante enviado está em nome de terceiros. Favor, assinar e enviar a declaração acima`,
  "id/10": `Documento de identidade;\nObs: Documento de identidade enviado foi emitido em ANO, ultrapassando o limite de 10 anos desde a data de emissão. Caso não haja outro documento para substituir (CNH, Conselho de Classe ou Passaporte), entre em contato com nosso suporte informando seu caso`,
  "id/n": "Documento de Identidade emitido nos últimos 10 anos (RG ou CNH ou Conselho de Classe ou Passaporte ou Carteira de Identidade Militar)",
  "cns/n": "Certidão de Nascimento",
  "estc/nd": `Certidão de acordo com o estado civil:
Casada, Divorciada ou Viúva - Certidão de Casamento (com averbação nos dois últimos casos);
União Estável - Declaração de União Estável + Certidão conforme o estado civil anterior;
Solteira - Certidão de nascimento`,
  "cerc/n": "Certidão de Casamento",
  "cav/n": "Certidão de casamento averbada",
  "un/n": "Declaração de união estável + Certidão de Nascimento",
  "un/nd": "Declaração de união estável + Certidão de acordo com estado civil anterior à união estável (caso fora casado/divorciado/separado, enviar certidão de casamento; caso fora solteiro, enviar certidão de nascimento)",
  "dsvu/n": "Declaração de união estável + Certidão de Casamento averbada",
  "deco/n": "Enviar declaração de dependência econômica (Anexo V no link abaixo) do dependente DEP",
  "tgc/n": "Enviar termo de guarda do dependente DEP",
  "dp/21": "Em caso de dependente filho(a) com mais de 21 anos, é necessário que se envie laudo/atestado médico caso declarado inválido. Caso não, remover como dependente previdenciário",
  "dep/id/n": "Enviar documento de identidade dos dependentes DEPS",
  "dep/id/10": "Documento de identidade do dependente DEP foi emitido em ANO, ultrapassando o limite de 10 anos desde a data de emissão.\nCaso não haja nenhum outro documento de identidade para substituir (CNH, Conselho de Classe ou Passaporte), por favor, entre em contato com nossa central de suporte informando seu caso",
  "cnd/n": "Enviar certidão de nascimento do dependente DEP",
}

export type InactiveStandard = {
  foto: string
  pis: string
  contracheque: string
  veracidade: string
  comprovanteEstado: string
}


export type ActivesStandardType = {
  foto: string
  pis: string
  posse: string
  contracheque: string
  veracidade: string
  comprovanteEstado: string
  uniao: string
}

const activesStandard: ActivesStandardType = {
  foto: "Foto do rosto de frente segurando documento de identidade ao lado",
  pis: "PIS/PASEP ou NIT",
  posse: "Termo de Posse",
  contracheque: "Contracheque do mês anterior",
  veracidade: "Termo de veracidade (Anexo VII no link abaixo)",
  comprovanteEstado: "Declaração de estado civil (Anexo III no link abaixo)",
  uniao:
    "Certidão de União Estável + Comprovante de estado civil anterior a união (caso fora solteiro, enviar certidão de nascimento. Caso fora casado/divorciado, enviar certidão de casamento com averbação",
}

export { invalidStandard, activesStandard }
