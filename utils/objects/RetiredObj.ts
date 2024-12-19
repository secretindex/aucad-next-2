// a.k.a. inativo
const retiredDocuments = {
  foto: {
    name: "Foto + ID",
  },
  id: {
    name: "Identidade",
    optionList: ["valido", "+10"],
  },
  residencia: {
    name: "C. Residencia",
    optionList: ["valido", "+60", "terceiros"],
  },
  estadoCivil: {
    name: "Estado civil",
    optionList: [
      {
        label: "solteiro",
        value: "s/u",
        children: [
          {
            label: "C. Nascimento",
            value: "cn/u",
            children: [
              {
                label: "sim",
                value: "s/s",
              },
              {
                label: "não",
                value: "s/n",
              },
            ],
          },
        ],
      },
      {
        label: "casado",
        value: "c/u",
        children: [
          {
            label: "sim",
            value: "c/s",
          },
          {
            label: "não",
            value: "c/n",
          },
        ],
      },
      {
        label: "uniao",
        value: "u/u",
        children: [
          {
            label: "C. Nascimento",
            value: "nascimento",
            children: [
              {
                label: "sim",
                value: "un/s",
              },
              {
                label: "não",
                value: "un/n",
              },
            ],
          },
          {
            label: "Div/Sep/Vi",
            value: "dsv",
            children: [
              {
                label: "sim",
                value: "dsvu/s",
              },
              {
                label: "não",
                value: "dsvu/n",
              },
            ],
          },
        ],
      },
    ],
  },
  contracheque: {
    name: "Contracheque",
  },
  posse: {
    name: "Termo de Posse",
  },
  veracidade: {
    name: "Termo de Veracidade",
  },
  comprovanteEstado: {
    name: "C. Estado Civil",
  },
  depId: {
    name: "Identidade Dependente",
    optionList: ["semdep", "dep"],
  },
  declaracaoRes: {
    name: "Dec. Residência",
    optionList: ["Não requerido", "Requerido"],
  },
}

export default retiredDocuments
