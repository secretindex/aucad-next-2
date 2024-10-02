"use client"

import {
  QuestionCircleOutlined,
  ProfileOutlined,
  UserDeleteOutlined,
  UserOutlined,
  LoginOutlined,
} from "@ant-design/icons"

import Image from "next/image"
import Link from "next/link"

import { createClient } from "@/lib/supabase/ssr/ssrServer"
import { logout } from "@/app/auth/logout/actions"

export default async function NoAntHeader() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="flex border-b-[1px] border-[#cecece60] flex-row justify-between items-center gap-2 py-[0.6rem] text-sm px-4">
      <div>
        <h1>
          <Image
            src={"/assets/aucad.svg"}
            alt="logo"
            width={100}
            height={16}
            draggable="false"
          />
        </h1>
      </div>
      <ul className="flex h-full flex-row transition-all ease-in-out items-center gap-4 text-gray-700">
        <li className="h-full">
          <Link
            href="/cad/ativos"
            className="text-inherit transition-all ease-in-out hover:text-[#26a69a]"
          >
            <UserOutlined className="mr-2" />
            Ativos
          </Link>
        </li>
        <li className="h-full">
          <Link
            href="/cad/inativos"
            className="text-inherit transition-all ease-in-out hover:text-[#26a69a]"
          >
            <UserDeleteOutlined className="mr-2" />
            Inativos
          </Link>
        </li>
        <li className="h-full">
          <Link
            href="/cad/pensionistas"
            className="text-inherit transition-all ease-in-out hover:text-[#26a69a]"
          >
            <ProfileOutlined className="mr-2" />
            Pensionistas
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
            Sobre
          </Link>
        </li>
        {error || !data.user ? (
          <li className="h-full">
            <Link
              href="/auth/login"
              className="text-inherit transition-all ease-in-out hover:text-[#26a69a]"
            >
              <LoginOutlined className="mr-2" />
              Login
            </Link>
          </li>
        ) : (
          <li className="h-full">
            <form>
              <button
                onClick={handleLogout}
                className="text-inherit transition-all ease-in-out hover:text-[#26a69a]"
              >
                <LoginOutlined className="mr-2" />
                Logout
              </button>
            </form>
          </li>
        )}
      </ul>
    </header>
  )
}
