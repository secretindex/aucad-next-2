import { PensionerDocs } from "@/utils/docsInterface"

const pensionerObj: PensionerDocs = {
  foto: {
    name: "Foto + ID",
    present: false,
  },
  id: {
    name: "Identidade",
    required: true,
    present: false,
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
    optionList: [
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
        ],
      },
      {
        label: "não requerido",
        value: "cns/nr"
      }
    ],
  },
  pis: {
    name: "PIS/PASEP ou NIT",
    required: true,
    present: false,
    optionList: [
      {
        label: "+18",
        value: "pis/18/u",
        children: [
          {
            label: "sim",
            value: "pis/18/s",
          },
          {
            label: "não",
            value: "pis/18/n",
          },
        ],
      },
      {
        label: "nao necessario",
        value: "pis/nr",
      },
    ],
  },
  inacPen: {
    name: "Inacum. de Pensão",
    required: true,
    present: false,
  },
  decIRPF: {
    name: "Dec. IRPF",
    required: true,
    present: false,
    optionList: [
      {
        label: "sim",
        value: "irpf/s",
        children: [
          {
            label: "Ano/Exercício atual",
            value: "dirpf/u",
            children: [
              {
                label: "sim",
                value: "dirpf/s"
              },
              {
                label: "não",
                value: "dirpf/ca"
              }
            ]
          },
          {
            label: "isento",
            value: "disirpf/s",
          }
        ],
      },
      {
        label: "não",
        value: "dirpf/n"
      }
    ],
  },
}

export default pensionerObj
