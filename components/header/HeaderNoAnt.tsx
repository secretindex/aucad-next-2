"use client"

import { QuestionCircleOutlined, LoginOutlined } from "@ant-design/icons"

import Image from "next/image"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import { usePathname } from "next/navigation"

import ProfileButton from "./ProfileButton"
import axios from "axios"

const fetchUserFromDB = async () => {
  const endUser = await axios.get("/api/users/get-full-user")
  return endUser
}

export default function NoAntHeader() {
  const pathname = usePathname()
  const { data: userFromDb, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUserFromDB(),
  })

  console.log(userFromDb?.data.user)

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

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
      <ul
        key={pathname}
        className="flex flex-row items-center gap-4 text-gray-700"
      >
        <li className="h-full">
          <Link
            href="/about"
            className="text-inherit transition-all ease-in-out hover:text-[#26a69a]"
          >
            <QuestionCircleOutlined className="mr-2" />
            <span className="lg:inline hidden">Sobre</span>
          </Link>
        </li>
        { !userFromDb?.data.user ? (
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
            <ProfileButton key={pathname} id={userFromDb?.data.user.id} admin={userFromDb?.data.user.admin} profileImage={userFromDb?.data.user.avatar_url} />
          </li>
        )}
      </ul>
    </header>
  )
}
