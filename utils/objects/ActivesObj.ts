import { ActivesDocs } from "@/utils/docsInterface"

// I'll try to remove the obj keys "required" and "present" later
const activesDocument: ActivesDocs = {
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
    optionList: [
      {
        label: "sim",
        value: "id/s",
        children: [
          {
            label: "valido",
            value: "id/v",
          },
          {
            label: "+ 10",
            value: "id/10",
          },
        ],
      },
      {
        label: "não",
        value: "id/n",
      },
    ],
  },
  residencia: {
    name: "C. Residencia",
    required: true,
    present: false,
    options: undefined,
    optionList: [
      {
        label: "sim",
        value: "cr/s",
        children: [
          {
            label: "valido",
            value: "cr/v",
          },
          {
            label: "+60",
            value: "cr/60",
          },
          {
            label: "terceiros",
            value: "cr/t",
            children: [
              {
                label: "D. Res",
                value: "dr/u",
                children: [
                  {
                    value: "dr/s",
                    label: "sim",
                  },
                  {
                    value: "dr/n",
                    label: "nao",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: "não",
        value: "cr/n",
      },
    ],
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
            value: "cns/u",
            children: [
              {
                label: "sim",
                value: "cns/s",
              },
              {
                label: "não",
                value: "cns/n",
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
            label: "C. Casamento",
            value: "cerc/u",
            children: [
              {
                label: "sim",
                value: "cerc/s",
              },
              {
                label: "não",
                value: "cerc/n",
              },
            ],
          },
          {
            label: "C. Casamento Avb",
            value: "cav/u",
            children: [
              {
                label: "sim",
                value: "cav/s",
              },
              {
                label: "não",
                value: "cav/n",
              },
            ],
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
          {
            label: "não declarado",
            value: "un/nd",
          },
        ],
      },
      {
        label: "não declarado",
        value: "estc/nd",
      },
    ],
  },
  pis: {
    name: "PIS/PASEP ou NIT",
    required: true,
    present: false,
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
    name: "D. Estado Civil",
    required: true,
    present: false,
  },
  depId: {
    name: "Dependentes",
    required: false,
    present: false,
    options: undefined,
    optionList: [
      {
        label: "sim",
        value: "dep/s",
        children: [
          {
            label: "identidade",
            value: "dep/id",
            children: [
              {
                label: "valida",
                value: "dep/id/v",
                children: [
                  {
                    label: "Dep. Eco",
                    value: "deco/u",
                    children: [
                      {
                        label: "Decl. D. Eco",
                        value: "deco/u3",
                        children: [
                          {
                            label: "sim",
                            value: "deco/s",
                          },
                          {
                            label: "não",
                            value: "deco/n",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: "Curatela/Guarda",
                    value: "cg/u",
                    children: [
                      {
                        label: "Termo de Guarda/Curatela",
                        value: "tgc/u",
                        children: [
                          {
                            label: "sim",
                            value: "tgc/s",
                          },
                          {
                            label: "não",
                            value: "tgc/n",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: "Filho + 21",
                    value: "dp/21",
                  },
                  {
                    label: "Ok",
                    value: "dp/s",
                  },
                ],
              },
              {
                label: "não",
                value: "dep/id/n",
              },
              {
                label: "+ 10",
                value: "dep/id/10",
              },
            ],
          },
          {
            label: "C. Nascimento",
            value: "cnd/u",
            children: [
              {
                label: "sim",
                value: "cnd/s",
              },
              {
                label: "não",
                value: "cnd/n",
              },
            ],
          },
        ],
      },
      {
        label: "não",
        value: "dep/n",
      },
    ],
  },
}

export default activesDocument
