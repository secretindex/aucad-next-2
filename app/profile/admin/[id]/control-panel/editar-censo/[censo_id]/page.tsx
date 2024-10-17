"use client"
import Image from "next/image"
import { BaseSyntheticEvent, useState } from "react";

const EditarCenso = ({
  params,
}: {
  params: { id: string; censo_id: string }
}) => {
  console.log(params.id, params.censo_id)
  const [censoImage, setCensoImage] = useState<any>(undefined)

  const handleImageInput = (e: BaseSyntheticEvent) => {
    const file = e.target.files[0]
    
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `censo/${fileName}`
  }

  return (
    <section className="flex flex-col justify-center items-center h-full w-full">
      <div>
        <h1>Editar Censo</h1>
        <div className="rounded-lg p-2 border-[1px] border-dotted cursor-pointer border-gray-400">
          <label htmlFor="image" className="block w-full h-full">
            <input type="file" name="image" onChange={handleImageInput} id="image" className="hidden w-full h-full" />
            <Image
              className="w-full h-full object-cover"
              src={""}
              alt="foto do censo"
              width={50}
              height={50}
            />
          </label>
        </div>
        <form className="">
          <div>
            <label htmlFor="users">Usuários</label>
            <select name="users" id="users">
              <option value="">Selecionar um usuário</option>
              {/* TODO: Buscar usuários para preencher o select */}
            </select>
          </div>
        </form>
      </div>
    </section>
  )
}

export default EditarCenso
