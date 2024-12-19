"use client"

import avatarChange from "@/app/profile/actions"
import UserSelect from "@/components/admin/census/UserListSelect"
import LoadingSpin from "@/components/LoadingSpin"
import { FileAddOutlined } from "@ant-design/icons"

import { BaseSyntheticEvent, useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image"

type ImageForUpload = {
  file: File
  filePath: string
  userId: string
}

export type ReducedUser = {
  id: string
  avatar_url: string
  username: string
}

type FullUser = {
  id: string
  admin: boolean
  avatar_url: string
  first_name: string
  last_name: string
  updated_at: string
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
  const [censusUsers, setCensusUsers] = useState<ReducedUser[]>([])

  const [usersAssociated, setUsersAssociated] = useState<Array<FullUser>>([])

  const [availableUsers, setAvailableUsers] = useState<
    Array<ReducedUser> | undefined
  >(undefined)

  const getCensoInfo = () => {
    axios
      .get(`/api/census?id=${params.censo_id}`)
      .then((res) => {
        setCensoName(res.data.census.name)
        setPreviewImage(res.data.census.logotipo)
      })
      .catch((e) => console.error(e))
  }

  const uploadImage = async (filePath: string, file: File, id: string) => {
    const { publicUrl, profileError } = await avatarChange(filePath, file, id)

    if (profileError) throw new Error(profileError)

    setImageUrl(publicUrl)
  }

  const handleImageInput = async (e: BaseSyntheticEvent) => {
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

  const getUsersAssociatedWithCensus = () => axios.get("/api/users/get-users-available?cen_id=" + params.censo_id)
  const handleCensusAllowedUsers = () => axios.get("/api/users/other-users?id=" + params.id)

  useEffect(() => {
    if (usersAssociated) {
      handleCensusAllowedUsers().then((res: any) => {
        const dbAvailableUsers: ReducedUser[] = res!.data.users

        console.log(dbAvailableUsers[0].username, usersAssociated)

        const filteredUsers = [...dbAvailableUsers.filter((user1: ReducedUser) => !usersAssociated?.some((user2: FullUser) => user2.username === user1.username))]

        console.log("this is filtered users -> ", filteredUsers)

        setAvailableUsers(filteredUsers)
      })
    }
  }, [usersAssociated])

  useEffect(() => {
    getCensoInfo()

    getUsersAssociatedWithCensus().then((res) => {
      console.log(res.data)

      if (res.data.message) {
        console.log(res.data.message)
        const preUsers = [...res.data.message]
        const users: Array<FullUser> = []

        for (let i = 0; i < preUsers.length; i++) {
          users.push(preUsers[i].profiles)
        }

        console.log(users)
        setUsersAssociated(prev => prev = [...users])

        console.log(usersAssociated)
      }})
  }, [])

  useEffect(() => {
    console.log(censusUsers)
  }, [censusUsers])

  const createUserAndCensusObject = (userId: ReducedUser, censusId: string) => {
    return { profile_id: userId as unknown as string, census_id: censusId }
  }

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const usersAndCensusList = []

    console.log("this is census users ", censusUsers)

    if (fileImage) {
      uploadImage(fileImage!.filePath, fileImage!.file, fileImage!.userId)
    }

    if (censusUsers) {
      for (let i = 0; i < censusUsers.length; i++) {
        usersAndCensusList.push(
          createUserAndCensusObject(censusUsers[i], params.censo_id)
        )
      }

      console.log("users and census -> ", usersAndCensusList)

      axios.post(`/api/census/insert-users`, usersAndCensusList).then((res) => {
        console.log(res)
      })
    }

    axios
      .patch(`/api/census?id=${params.censo_id}`, {
        logotipo: imageUrl,
        name: censoName,
      })
      .then((res) => {
        console.log("server patch response ", res)
        setIsLoading(false)
      })
      .catch((e) => {
        setIsLoading(false)
        console.error(e)
      })
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
        <form className="flex flex-col gap-2 justify-between w-full">
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
            <label htmlFor="users" className="text-sm text-[#0e0e0e]">
              Usuários
            </label>
              <div className="flex flex-row gap-1 mb-[4px]">
            { usersAssociated && usersAssociated.map((user => {
              return (
                <div className="group transition-all ease-in-out relative">
                  <div className="absolute invisible group-hover:visible top-0 right-0 rounded-full bg-red-400 hover:bg-red-600 font-bold text-white text-[9px] fllex items-center text-center justify-center text-center w-[14px] h-[14px] cursor-pointer"><span>X</span></div>
                  <div className="absolute invisible text-nowrap group-hover:visible top-[130%] z-40 left-0 rounded-md px-2 py-[2px] text-white border-[1px] bg-[#141414ac] shadow-md border-[#cecece50] w-fit">{user.username}</div>
                    { user.avatar_url ? (<Image key={user.id} src={user.avatar_url} alt="user image" width={35} height={35} style={{ borderRadius: "100%", display: "block", width: "35px", height: "35px", objectFit: "cover" }} />) : (<div className="rounded-full block w-[35px] h-full object-cover flex flex-col bg-sky-400 text-[13px] text-white font-bold items-center justify-center">{user.username.charAt(0)}</div>) }
                </div>
              )
            })) }
              </div>
            <UserSelect
              users={availableUsers}
              setCensusUsers={setCensusUsers}
            />
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
