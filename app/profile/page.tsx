"use client"

import EditProfile from "@/components/profile/EditProfile"
import InfoProfile from "@/components/profile/InfoProfile"
import { createClient } from "@/lib/supabase/ssr/ssrClient"
import { UserMetadata } from "@supabase/supabase-js"
import Image from "next/image"
import { BaseSyntheticEvent, useEffect, useState } from "react"

const ProfilePage = () => {
  const [disabled, setDisabled] = useState<boolean>(true)
  const [metadata, setMetadata] = useState<UserMetadata | undefined>(undefined)
  const [user, setUser] = useState<any | undefined>(undefined)

  const [avatarUrl, setAvatarUrl] = useState<string>()

  const supabase = createClient()

  const handleAvatarChange = async (e: BaseSyntheticEvent) => {
    const file = e.target.files[0]

    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `avatar/${fileName}`

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file)

    if (error) {
      console.error(error)
      return `An error occurred: ${error.message}`
    }

    const { data: urlImageData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath)

    if (!urlImageData.publicUrl) return "Image not found"

    const { data: profileUpData, error: profileError } = await supabase
      .from("profiles")
      .update({ avatar_url: urlImageData.publicUrl })
      .eq("id", user?.id)

    if (profileError) {
      console.error(profileError)
      return `An error occured: ${profileError.message}`
    }

    console.log(profileUpData)
    console.log(avatarUrl)
  }

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser()
    if (!error) {
      const { data: dbUser, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", data.user.id)

      setUser(dbUser![0])

      console.log(user)

      setMetadata(data.user?.user_metadata)
    } else {
      console.error("error fetching user: " + error)
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
          first_name: updateUser.first_name,
          last_name: updateUser.last_name,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user?.id)

      if (error) {
        console.error("Erro ao atualizar dados do perfil:", error)
      }
    }
  }

  return (
    <section className="h-full flex flex-col justify-center items-center">
      <form className="w-1/2 h-1/2 flex flex-col gap-8 justify-center">
        <div className="mx-auto">
          <Image
            src={
              user && user!.avatar_url
                ? user!.avatar_url
                : "https://i.pinimg.com/236x/1a/84/02/1a8402aa701a7a262958c9b8fb4735e9.jpg"
            }
            className="block mx-auto mb-2 rounded-full"
            width={100}
            height={100}
            alt="profile image"
          />
          <div className={`mx-auto w-fit ${disabled ? "hidden" : ""}`}>
            <label
              htmlFor="profile_image"
              className=" text-xs text-center cursor-pointer text-[#26a69a] hover:text-[#3fc5b8] hover:underline"
            >
              Change image
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
          <h1 className="text-center">Welcome, {user && user.full_name}</h1>
        </div>
        {disabled ? <InfoProfile user={user} /> : <EditProfile />}
        <div className="w-full flex gap-2 justify-end">
          <button
            onClick={(e) => {
              e.preventDefault()
              setDisabled((prev) => !prev)
            }}
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
      </form>
    </section>
  )
}

export default ProfilePage
