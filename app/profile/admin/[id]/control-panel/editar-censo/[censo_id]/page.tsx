"use client"

import LoadingSpin from "@/components/LoadingSpin"
import { FileAddOutlined } from "@ant-design/icons"
import axios from "axios"
import Image from "next/image"
import { BaseSyntheticEvent, useState } from "react"

type ImageForUpload = {
  file: any
  filePath: string
  userId: string
}

const EditarCenso = ({
  params,
}: {
  params: { id: string; censo_id: string }
}) => {
  const [previewImage, setPreviewImage] = useState<any>(undefined)
  const [fileImage, setFileImage] = useState<ImageForUpload | undefined>(
    undefined
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getCensoInfo = () => {
    // TODO: Buscar informações do censo pelo censo_id
  }

  const handleImageInput = (e: BaseSyntheticEvent) => {
    const file = e.target.files[0]

    if (file) {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)

      fileReader.onloadend = () => {
        setPreviewImage(fileReader.result as string)
        console.log(fileReader.result)
      }

      const fileExt = file.name.split(".").pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `censo/${fileName}`

      setFileImage({ file, filePath, userId: params.id })
    }
  }

  const uploadImage = async () => {
    if (fileImage) {
      const response = await axios.patch(`/api/census`, fileImage)

      if (response) {
        setIsLoading(false)
        console.log(response.data.response)
      }
    }
  }

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault()
    setIsLoading(true)

    uploadImage()
    // TODO: Salvar as alterações no censo
    // TODO: Redirecionar para a página de administração do censo
    // router.push(`/profile/admin/${params.id}/control-panel/editar-censo/${params.censo_id}`)
  }

  return (
    <section className="flex flex-col justify-center items-center h-full w-full">
      <div className="flex gap-4 p-8 border-[1px] border-[#5554] rounded-lg shadow-md xl:w-2/5 w-fit">
        <div className="flex gap-4">
          <div className="rounded-lg p-2 border-[1px] h-[200px] w-[200px] max-w-[200px] max-h-[200px] border-dotted cursor-pointer border-gray-400">
            <label
              htmlFor="image"
              className="w-full h-full flex flex-col items-center justify-center"
            >
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageInput}
                id="image"
                className="hidden w-full h-full"
              />
              {!previewImage ? (
                <FileAddOutlined
                  style={{
                    fontSize: "2rem",
                    color: "#777",
                  }}
                />
              ) : (
                <Image
                  key={previewImage}
                  className="w-full h-full max-w-[200px] max-h-[200px] object-cover"
                  src={previewImage ? previewImage : ""}
                  alt="foto do censo"
                  width={70}
                  height={70}
                />
              )}
            </label>
          </div>
        </div>
        <form className="flex flex-col justify-between w-full">
          <div>
            <h1 className="text-xl">Editar Censo</h1>
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm">
              Nome
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nome do censo"
              className="border-[1px] border-[#bebebe70] focus:border-[#5553] outline-none px-4 py-[0.3rem] rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="users" className="text-sm">
              Usuários
            </label>
            <select
              name="users"
              id="users"
              className="w-full px-4 outline-none border-[1px] bg-transparent border-[#bdbdbd60] rounded-md py-[0.3rem]"
            >
              <option value="">Selecionar um usuário</option>
              {/* TODO: Buscar usuários para preencher o select */}
            </select>
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="flex items-center justify-center gap-4 w-full bg-[#26a69a] outline-none py-[0.3rem] transition-all ease-in-out hover:bg-[#2fbaac] text-white rounded-md"
            >
              {isLoading && <LoadingSpin />}
              Salvar
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default EditarCenso
