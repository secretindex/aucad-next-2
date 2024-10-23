"use client"

import EditProfile from "@/components/profile/EditProfile"
import InfoProfile from "@/components/profile/InfoProfile"
import { createClient } from "@/lib/supabase/ssr/ssrClient"
import { BaseSyntheticEvent, useEffect, useState } from "react"

import Image from "next/image"

import avatarChange from "./actions"
import axios from "axios"

const ProfilePage = () => {
  const [disabled, setDisabled] = useState<boolean>(true)
  const [user, setUser] = useState<any>(null)
  const [avatarUrl, setAvatarUrl] = useState<string>("")

  const supabase = createClient()

  const handleAvatarChange = async (e: BaseSyntheticEvent) => {
    const file = e.target.files[0]

    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `avatar/${fileName}`

    const { publicUrl, profileError } = await avatarChange(
      filePath,
      file,
      user.id
    )

    if (profileError) throw new Error(profileError)

    setAvatarUrl(publicUrl)
  }

  // const removeImage = async () => {
  //   const splitUrl = avatarUrl.split("/")
  //   const filename = splitUrl[splitUrl.length - 1]

  //   const { error } = await supabase.storage
  //     .from("avatars")
  //     .remove([`/avatar/${filename}`])
  // }

  const getUser = async () => {
    const authUser = await axios.get(`/api/users`)

    if (authUser.data.status === "ok") {
      const userDB = await axios.get(`/api/users?id=${authUser.data.data.user.id}`)

      if (userDB.data.data.status === "error") {
        console.log(userDB.data.data)
        console.error("User not found in database")
        return
      } else {
        setUser(userDB.data.data)
        setAvatarUrl(userDB.data.data.avatar_url || "")
      }
    } else {
      console.error("Error fetching user: ", authUser.data.data)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const handleSubmit = async (formData: FormData) => {
    console.log("edited")

    const updateUser = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
    }

    console.log(updateUser)

    if (user) {
      const { error } = await supabase
        .from("profiles")
        .update({
          username: `${updateUser.first_name} ${updateUser.last_name}`,
          first_name: updateUser.first_name,
          last_name: updateUser.last_name,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user?.id)

      if (error) console.error("Erro ao atualizar dados do perfil:", error)
    }

    window.location.reload()
  }

  return (
    <section className="h-full flex flex-col justify-center items-center">
      <form className="w-1/2 h-1/2 flex flex-col gap-8 justify-center">
        <div className="mx-auto">
          <Image
            src={avatarUrl}
            className="block mx-auto mb-2 w-[100px] h-[100px] object-cover rounded-full"
            width={100}
            loading="lazy"
            height={100}
            alt="profile image"
          />
          <div className={`mx-auto w-fit ${disabled ? "hidden" : ""}`}>
            <label
              htmlFor="profile_image"
              className=" text-xs text-center cursor-pointer text-[#26a69a] hover:text-[#3fc5b8] hover:underline"
            >
              Trocar foto
            </label>
            <input
              accept="image/*"
              className="hidden"
              type="file"
              name="profile_image"
              id="profile_image"
              onChange={handleAvatarChange}
            />
          </div>
          <div className="text-center">
            Bem vindo(a),
            <h1 className="inline">{user && ` ${user.username}`}</h1>
          </div>
        </div>
        {disabled ? (
          <InfoProfile user={user} />
        ) : (
          <EditProfile nome={user.first_name} sobrenome={user.last_name} />
        )}
        <div className="w-full flex gap-2 justify-end">
          <button
            onClick={(e) => {
              e.preventDefault()
              setDisabled((prev) => !prev)
            }}
            className="border-[1px] border-[#aeaeae40] px-4 py-[0.3rem] rounded-md transition-all ease-in-out hover:bg-slate-100"
          >
            Editar
          </button>
          {!disabled && (
            <button
              formAction={handleSubmit}
              className="px-4 py-[0.3rem] text-white outline-none rounded-md bg-[#26a69a] transition-all ease-in-out hover:bg-[#2fbaac]"
            >
              Salvar
            </button>
          )}
        </div>
      </form>
    </section>
  )
}

export default ProfilePage
