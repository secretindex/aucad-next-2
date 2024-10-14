"use client"

import { BaseSyntheticEvent } from "react"

export default function CriarCenso() {
  // TODO: Depois que selecionar o estado, fazer aparecer outro select com os municipios

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault()
  }

  return (
    <section className="h-full w-full flex flex-col items-center justify-center">
      <div className="w-2/6 flex flex-col gap-4 border-[1px]  border-[#dbdbdb70] rounded-lg p-4 shadow-lg">
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
          <div className="flex flex-col gap-1">
            <label className="block text-gray-700" htmlFor="estado">
              Estado
            </label>
            <select
              name="estado"
              className="w-full px-4 outline-none border-[1px] border-[#bdbdbd60] rounded-md py-[0.3rem]"
              id="estado"
            >
              <option value="">Selecione...</option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </select>
          </div>
          <div className="w-full">
            <button
              onSubmit={handleSubmit}
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
