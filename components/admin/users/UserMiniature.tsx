import { EditOutlined } from "@ant-design/icons"
import Image from "next/image"
import { FC } from "react"

interface UserMiniatureProps {
  user: any
}

const UserMiniature: FC<UserMiniatureProps> = ({ user }) => {
  console.log(user)
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
      <div>
        <button className=" px-2 py-[0.3rem] rounded-lg border-[1px] border-[#bdbdbd50] ">
          <EditOutlined />
        </button>
      </div>
    </div>
  )
}

export default UserMiniature
