"use client"

import avatarChange from "@/app/profile/actions"
import LoadingSpin from "@/components/LoadingSpin"
import { FileAddOutlined } from "@ant-design/icons"
import axios from "axios"
import Image from "next/image"
import { BaseSyntheticEvent, useEffect, useState } from "react"

type ImageForUpload = {
  file: File
  filePath: string
  userId: string
}

type ReducedUser = {
  id: string
  avatar_url: string
  username: string
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
  const [censoName, setCensoName] = useState<string>("")
  const [imageUrl, setImageUrl] = useState<string>("")

  const [availableUsers, setAvailableUsers] = useState<
    Array<ReducedUser> | undefined
  >(undefined)

  const getCensoInfo = () => {
    axios
      .get(`/api/census?id=${params.censo_id}`)
      .then((res) => {
        console.log("This is censo ", res.data.census.name)
        setCensoName(res.data.census.name)
      })
      .catch((e) => console.error(e))
  }

  const uploadImage = async (filePath: string, file: File, id: string) => {
    const { publicUrl, profileError } = await avatarChange(
      filePath,
      file,
      id
    )

    console.log("this is after url ", publicUrl, profileError)

    if (profileError) throw new Error(profileError)

    setImageUrl(publicUrl)
  }

  const handleImageInput = async (e: BaseSyntheticEvent) => {
    const file = e.target.files[0]

    console.log("Before setting file image ", file)

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

      console.log("after setting file image ", file)

      setFileImage({ file, filePath, userId: params.id })
    }
  }

  const handleCensusAllowedUsers = async () => {
    const censusUser = await axios.get("/api/users/other-users")

    console.log(censusUser.data)

    // TODO: Salvar as alterações dos usuários permitidos para o censo
    // TODO: Redirecionar para a página de administração do censo
    // router.push(`/profile/admin/${params.id}/control-panel/editar-censo/${params.censo_id}`)
  }

  useEffect(() => {
    getCensoInfo()
    handleCensusAllowedUsers()
  }, [])

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault()
    setIsLoading(true)

    console.log("before upload image ", fileImage)

    uploadImage(fileImage!.filePath, fileImage!.file, fileImage!.userId)

    const update = axios.patch(`/api/census?id=${params.censo_id}`, { logotipo: imageUrl, name: censoName })

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
              value={censoName}
              onChange={(e) => setCensoName(e.target.value)}
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
