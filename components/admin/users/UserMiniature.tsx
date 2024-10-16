"use client"

import { EditOutlined } from "@ant-design/icons"
import Image from "next/image"
import { FC, useState } from "react"
import UserOptions from "./edit/UserOptions"

interface UserMiniatureProps {
  user: any
}

const UserMiniature: FC<UserMiniatureProps> = ({ user }) => {
  const [optionsMenuVisible, setOptionsMenuVisible] = useState<boolean>(false)

  const handleEditClick = () => {
    setOptionsMenuVisible(true)
  }

  return (
    <div className="flex flex-row items-center justify-between hover:bg-gray-100 transition-all ease-in-out w-full py-2 px-4 border-[1px] border-[#bdbdbd50] rounded-md gap-2 ">
      <div className="flex gap-2 items-center">
        <Image
          src={user.avatar_url}
          alt="User"
          width={24}
          height={24}
          className="w-[24px] h-[24px] rounded-full object-cover"
        />
        <span>{user.username}</span>
      </div>
      <div>
        <span className="text-sm text-gray-500">
          {user.admin ? "Administrador" : "Usuário comum"}
        </span>
      </div>
      <div className="relative">
        <button
          onClick={handleEditClick}
          className="px-2 py-[0.3rem] rounded-lg border-[1px] border-[#bdbdbd50] "
        >
          <EditOutlined />
        </button>
        {
          optionsMenuVisible && (
            <UserOptions setOptionsMenuVisible={setOptionsMenuVisible} />
          )
        }
      </div>
    </div>
  )
}

export default UserMiniature
