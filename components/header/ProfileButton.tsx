"use client"

import { FC, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { logout } from "@/app/auth/logout/actions"
import {
  ControlOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { createClient } from "@/lib/supabase/ssr/ssrClient"
import axios from "axios"

interface ProfileProps {
  profileImage: string
}

const ProfileButton: FC<ProfileProps> = ({ profileImage }) => {
  const supabase = createClient()

  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [idNum, setIdNum] = useState<string | undefined>(undefined)

  const handleDocumentClick = (e: MouseEvent) => {
    console.log((e.target as HTMLElement).closest("div")?.classList)
    if (
      !(e.target as HTMLElement).closest("div")?.classList.contains("dropd")
    ) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  }

  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser()

    if (error) throw new Error(error.message)

    const dados = await axios.get(`/api/users?id=${data.user.id}`)

    return dados.data.data[0]
  }

  useEffect(() => {
    fetchUser()
      .then((userDb) => {
        console.log("fetching user")

        console.log(userDb)

        setIsAdmin(userDb.admin)
        setIdNum(userDb.id)
      })
      .catch((error) => {
        alert(error)
      })

    if (isVisible) {
      document.addEventListener("click", handleDocumentClick)
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick)
    }
  }, [])

  const handleLogout = () => {
    logout()
  }

  return (
    <div
      className="relative dropd"
      onClick={() => setIsVisible((prev) => !prev)}
    >
      <div className="cursor-pointer">
        <Image
          src={profileImage && (profileImage as string)}
          width={22}
          height={22}
          loading="lazy"
          className="w-[22px] h-[22px] rounded-full object-cover"
          alt="menu-image"
        />
      </div>
      <div
        className={`absolute right-0 top-[160%] bg-[#fefefe] border-[#bebebe60] border-[1px] shadow-sm w-[190px] min-w-[128px] dropd rounded-md p-2 ${
          isVisible ? "appear" : "disappear"
        }`}
      >
        <ul className="flex flex-col gap-0">
          <li className="w-full text-sm">
            <Link
              href={"/profile"}
              className="w-full flex cursor-default items-center text-inherit transition-all ease-in-out hover:bg-[#cecece20] rounded-md justify-evenly gap-4 py-[0.4rem] px-2"
            >
              <div className="text-left">
                <UserOutlined />
              </div>
              <div className="w-full text-gray-600 text-sm text-left">
                Perfil
              </div>
            </Link>
          </li>
          {isAdmin ? (
            <li>
              <Link
                href={`/profile/admin/${idNum}/control-panel`}
                className="w-full flex cursor-default items-center text-inherit transition-all ease-in-out hover:bg-[#cecece20] rounded-md justify-evenly gap-4 py-[0.4rem] px-2"
              >
                <div className="text-left">
                  <ControlOutlined />
                </div>
                <div className="w-full text-gray-600 text-sm text-left">
                  Painel de Controle
                </div>
              </Link>
            </li>
          ) : (
            <></>
          )}
          <li className="text-sm">
            <button
              onClick={handleLogout}
              className="w-full flex cursor-default items-center text-inherit transition-all ease-in-out hover:bg-[#cecece20] rounded-md justify-evenly gap-4 py-[0.4rem] px-2"
            >
              <div className="text-left">
                <LogoutOutlined />
              </div>
              <div className="w-full text-gray-600 text-sm text-left">Sair</div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ProfileButton
