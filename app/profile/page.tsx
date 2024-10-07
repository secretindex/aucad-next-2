"use client"

import { createClient } from "@/lib/supabase/ssr/ssrClient"
import { User, UserMetadata } from "@supabase/supabase-js"
import Image from "next/image"
import { useEffect, useState } from "react"

const ProfilePage = () => {
  const [disabled, setDisabled] = useState<boolean>(true)
  const [metadata, setMetadata] = useState<UserMetadata | undefined>(undefined)
  const [user, setUser] = useState<User | undefined>(undefined)
  const [editUser, setEditUser] = useState({
    name: "",
    lastName: "",
  })

  const supabase = createClient()

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser()
    if (!error) {
      setUser(data.user)
      setMetadata(data.user?.user_metadata)
    }
  }

  useEffect(() => {
    getUser()
  })

  const handleChange = (e, field: "name" | "firstName") => {
    // setEditUser(prev => { prev..., field: e.target.value })
  }

  const handleSubmit = async (formData: FormData) => {
    console.log("edited")
    const updateUser = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        fisrt_name: updateUser.first_name,
        last_name: updateUser.last_name,
      })
      .eq("id", user?.id)

    if (error) {
      console.error("Erro ao atualizar imagem do perfil:", error)
    }
  }

  return (
    <section className="h-full flex flex-col justify-center items-center">
      <div className="w-1/2 h-1/2 flex flex-col gap-8 justify-center">
        <div className="mx-auto">
          <Image
            src={
              metadata && metadata!.avatar_url
                ? metadata!.avatar_url
                : "https://i.pinimg.com/236x/1a/84/02/1a8402aa701a7a262958c9b8fb4735e9.jpg"
            }
            className="block mx-auto mb-2 rounded-full"
            width={100}
            height={100}
            alt="profile image"
          />
          <h1 className="text-center">
            Welcome,{" "}
            {metadata && `${metadata!.first_name} ${metadata!.last_name}`}
          </h1>
        </div>
        <div className="flex flex-row justify-evenly gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label className="block">First Name</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              disabled={disabled}
              onChange={handleChange}
              className="border-[1px] border-[#bebebe30] outline-none px-4 py-[0.3rem] rounded-md"
              value={disabled ? (metadata && metadata!.last_name) : editUser.name}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="block">Last Name</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              disabled={disabled}
              className="border-[1px] border-[#bebebe30] outline-none px-4 py-[0.3rem] rounded-md"
              value={disabled ? (metadata && metadata!.last_name) : editUser.lastName}
            />
          </div>
        </div>
        <div className="w-full flex gap-2 justify-end">
          <button
            onClick={() => setDisabled((prev) => !prev)}
            className="border-[1px] border-[#aeaeae40] px-4 py-[0.3rem] rounded-md transition-all ease-in-out hover:bg-slate-100"
          >
            Edit
          </button>
          {!disabled && (
            <button
              formAction={handleSubmit}
              className="px-4 py-[0.3rem] text-white outline-none rounded-md bg-[#26a69a] transition-all ease-in-out hover:bg-[#2fbaac]"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
