"use client"

import { ChangeEvent, useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import axios from "axios"
import { useRouter } from "next/navigation"

type UF = {
  id: number
  uf: string
}

export default function CriarCenso({ params }: { params: { id: string } }) {
  console.log(params.id)
  const router = useRouter()

  const [ufs, setUfs] = useState<UF>({ id: 0, uf: "" })
  const [estados, setEstados] = useState<any[]>([])
  const [municipios, setMunicipios] = useState<any[]>([])
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  useEffect(() => {
    axios
      .get(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
      )
      .then((response) => {
        setEstados(response.data)
        console.log(response.data)
      })
  }, [])

  useEffect(() => {
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufs.id}/distritos`
      )
      .then((response) => {
        setIsDisabled(false)
        setMunicipios(response.data)
        console.log(response.data)
      })
  }, [ufs])

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = e.target.selectedIndex
    const selectedOption = e.target.options[selectedIndex]
    setUfs({
      id: Number(selectedOption.getAttribute("data-id")),
      uf: e.target.value,
    })
  }

  const handleFormSubmit = (formData: FormData) => {
    const fullCensus = {
      id: uuidv4() as string,
      name: formData.get("nome"),
      estado: formData.get("estado"),
      municipio: formData.get("municipio"),
    }

    console.log("censo da amprev")

    axios
      .post("/api/census", fullCensus)
      .then((res) => {
        console.log(res.data)

        router.push(`/profile/admin/${params.id}/control-panel/editar-censo/${res.data.id}`)
      })
      .catch((e) => console.error(e))
  }

  return (
    <section className="h-full w-full flex flex-col items-center justify-center">
      <div className="xl:w-2/6 sm:4/6 flex flex-col gap-4 border-[1px]  border-[#dbdbdb70] rounded-lg px-6 py-10 shadow-lg">
        <div className="text-center w-full">
          <h1 className="text-3xl">Criar novo censo</h1>
          <span className="text-sm text-gray-500">
            A configuração completa vem depois!
          </span>
        </div>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="block text-gray-700" htmlFor="nome">
              Nome
            </label>
            <input
              type="text"
              name="nome"
              id="nome"
              placeholder="Nome do censo"
              autoComplete="false"
              className="border-[1px] border-[#bebebe70] focus:border-[#20202060] outline-none px-4 py-[0.3rem] rounded-md"
            />
          </div>
          <div className="flex gap-1">
            <div className="flex flex-col gap-1 w-full">
              <label className="block text-gray-700" htmlFor="estado">
                Estado
              </label>
              <select
                name="estado"
                className="w-full px-4 outline-none border-[1px] bg-transparent border-[#bdbdbd60] rounded-md py-[0.3rem]"
                id="estado"
                onChange={handleChange}
              >
                <option value="">Selecione...</option>

                {estados.map((state) => {
                  return (
                    <option
                      key={state.id}
                      value={state.sigla}
                      data-id={state.id}
                    >
                      {state.nome}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="block text-gray-700" htmlFor="estado">
                Municipio
              </label>
              <select
                name="municipio"
                id="municipio"
                className="w-full px-4 outline-none bg-transparent border-[1px] border-[#bdbdbd60] rounded-md py-[0.3rem]"
                disabled={isDisabled ? true : false}
              >
                <option value="WS">Estado inteiro</option>
                {municipios &&
                  municipios.map((mun) => (
                    <option key={mun.id} value={mun.nome}>
                      {mun.nome}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="w-full">
            <button
              formAction={handleFormSubmit}
              className="w-full bg-[#26a69a] outline-none py-[0.3rem] transition-all ease-in-out hover:bg-[#2fbaac] text-white rounded-md "
            >
              Criar censo
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
