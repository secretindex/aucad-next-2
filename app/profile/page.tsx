"use client"

import EditProfile from "@/components/profile/EditProfile"
import InfoProfile from "@/components/profile/InfoProfile"
import { createClient } from "@/lib/supabase/ssr/ssrClient"
import { User, UserMetadata } from "@supabase/supabase-js"
import Image from "next/image"
import { useEffect, useState } from "react"

const ProfilePage = () => {
  const [disabled, setDisabled] = useState<boolean>(true)
  const [metadata, setMetadata] = useState<UserMetadata | undefined>(undefined)
  const [user, setUser] = useState<User | undefined>(undefined)

  const supabase = createClient()

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser()
    if (!error) {
      setUser(data.user)
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
      <form className="w-1/2 h-1/2 flex flex-col gap-8 justify-center">
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
          <div className={`mx-auto w-fit ${disabled ? "hidden" : ""}`}>
            <label
              htmlFor="profile_image"
              className="text-sm text-center cursor-pointer text-[#26a69a] hover:text-[#3fc5b8] hover:underline"
            >
              Change
            </label>
            <input
              accept="image/*"
              className="hidden"
              type="file"
              name="profile_image"
              id="profile_image"
            />
          </div>
          <h1 className="text-center">
            Welcome,{" "}
            {metadata && `${metadata!.first_name} ${metadata!.last_name}`}
          </h1>
        </div>
        {disabled ? <InfoProfile metadata={metadata} /> : <EditProfile />}
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
