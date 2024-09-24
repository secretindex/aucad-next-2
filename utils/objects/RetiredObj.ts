// a.k.a. inativo
const retiredDocuments = {
  foto: {
    name: "Foto + ID",
    required: true,
    present: false,
  },
  id: {
    name: "Identidade",
    required: true,
    present: false,
    options: undefined,
    optionList: ["valido", "+10"],
  },
  residencia: {
    name: "C. Residencia",
    required: true,
    present: false,
    options: undefined,
    optionList: ["valido", "+60", "terceiros"],
  },
  estadoCivil: {
    name: "Estado civil",
    required: true,
    present: false,
    options: undefined,
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
    required: true,
    present: false,
  },
  posse: {
    name: "Termo de Posse",
    required: true,
    present: false,
  },
  veracidade: {
    name: "Termo de Veracidade",
    required: true,
    present: false,
  },
  comprovanteEstado: {
    name: "C. Estado Civil",
    required: true,
    present: false,
  },
  depId: {
    name: "Identidade Dependente",
    required: false,
    present: false,
    options: undefined,
    optionList: ["semdep", "dep"],
  },
  declaracaoRes: {
    name: "Dec. Residência",
    required: false,
    present: false,
    options: undefined,
    optionList: ["Não requerido", "Requerido"],
  },
}

export default retiredDocuments
