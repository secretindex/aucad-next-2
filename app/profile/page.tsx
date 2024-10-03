"use client"

import { createClient } from "@/lib/supabase/ssr/ssrClient"
import { User, UserMetadata } from "@supabase/supabase-js"
import Image from "next/image"
import { useEffect, useState } from "react"

const ProfilePage = () => {
  const [editable, setEditable] = useState<boolean>(false)
  const [metadata, setMetadata] = useState<UserMetadata | undefined>(undefined)
  const [user, setUser] = useState<User | undefined>(undefined)
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
              disabled={editable ? false : true}
              className="border-[1px] border-[#bebebe30] px-4 py-[0.3rem] rounded-md"
              value={metadata && metadata!.first_name}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="block">Last Name</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              disabled={editable ? false : true}
              className="border-[1px] border-[#bebebe30] px-4 py-[0.3rem] rounded-md"
              value={metadata && metadata!.last_name}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
