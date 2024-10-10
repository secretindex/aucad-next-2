"use client"

import {
  QuestionCircleOutlined,
  ProfileOutlined,
  UserDeleteOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons"

import Image from "next/image"
import Link from "next/link"

import { createClient } from "@/lib/supabase/ssr/ssrClient"
import { logout } from "@/app/auth/logout/actions"
import { useEffect, useState } from "react"
import { AuthError, User } from "@supabase/supabase-js"
import { usePathname } from "next/navigation"

export default function NoAntHeader() {
  const supabase = createClient()
  const pathname = usePathname()

  const [dbData, setDbData] = useState<{ user: User } | { user: null }>({
    user: null,
  })

  const [dbError, setDbError] = useState<AuthError | null>(null)

  async function getUserFromDb() {
    const { data, error } = await supabase.auth.getUser()

    data ? setDbData(data) : setDbData({ user: null })
    error ? setDbError(error) : setDbError(null)

    console.log(data, error)
  }

  useEffect(() => {
    console.log(pathname)
    getUserFromDb()
  }, [pathname])

  return (
    <header className="flex border-b-[1px] border-[#cecece60] flex-row justify-between items-center gap-2 py-[0.6rem] text-sm px-4">
      <div>
        <h1>
          <Link href={"/"}>
            <Image
              src={"/assets/aucad.svg"}
              alt="logo"
              width={100}
              height={16}
              draggable="false"
            />
          </Link>
        </h1>
      </div>
      <ul className="flex h-full w-4/6 flex-row transition-all justify-center ease-in-out items-center gap-4 text-gray-700">
        <li className="h-full">
          <Link
            href="/cad/ativos"
            className="text-inherit transition-all ease-in-out hover:text-[#26a69a]"
          >
            <UserOutlined className="mr-2" />
            <div className="md:inline hidden">Ativos</div>
          </Link>
        </li>
        <li className="h-full">
          <Link
            href="/cad/inativos"
            className="text-inherit transition-all ease-in-out hover:text-[#26a69a]"
          >
            <UserDeleteOutlined className="mr-2" />
            <div className="md:inline hidden">Inativos</div>
          </Link>
        </li>
        <li className="h-full">
          <Link
            href="/cad/pensionistas"
            className="text-inherit transition-all ease-in-out hover:text-[#26a69a]"
          >
            <ProfileOutlined className="mr-2" />
            <div className="md:inline hidden">Pensionistas</div>
          </Link>
        </li>
      </ul>
      <ul className="flex flex-row items-center gap-4 text-gray-700">
        <li className="h-full">
          <Link
            href="/about"
            className="text-inherit transition-all ease-in-out hover:text-[#26a69a]"
          >
            <QuestionCircleOutlined className="mr-2" />
            <span className="lg:inline hidden">Sobre</span>
          </Link>
        </li>
        {dbError !== null ? (
          <li className="h-full">
            <Link
              href="/auth/login"
              className="text-inherit transition-all ease-in-out hover:text-[#26a69a]"
            >
              <LoginOutlined className="mr-2" />
              <span className="lg:inline hidden">Login</span>
            </Link>
          </li>
        ) : (
          <li className="h-full">
            <button
              onClick={() => logout()}
              className="text-inherit transition-all ease-in-out hover:text-[#26a69a]"
            >
              <LogoutOutlined className="mr-2" />
              <span className="lg:inline hidden">Logout</span>
            </button>
          </li>
        )}
      </ul>
    </header>
  )
}
