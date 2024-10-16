"use client"

import { BarsOutlined, CrownOutlined } from "@ant-design/icons"
import { Dispatch, FC, SetStateAction, useEffect } from "react"

interface UserOptionsProps {
  setOptionsMenuVisible: Dispatch<SetStateAction<boolean>>
}

const UserOptions: FC<UserOptionsProps> = ({ setOptionsMenuVisible }) => {
  const handleDocumentClick = (e: MouseEvent) => {
    if (!(e.target as HTMLElement).classList.contains("no-close")) {
      setOptionsMenuVisible(false)
    } else {
      return
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick)

    return () => {
      document.removeEventListener("click", handleDocumentClick)
    }
  }, [])

  return (
    <div className="absolute left-[120%] bottom-0 p-2 rounded-md bg-[#fff] shadow-md min-w-[200px] no-close">
      <ul className="flex flex-col no-close">
        <li className="w-full no-close">
          <button className="flex items-center w-full gap-4 px-2 py-[0.4rem] text-sm rounded-[0.4rem] bg-transparent transition-all ease-in-out hover:bg-gray-100 no-close">
            <BarsOutlined />
            Adicionar ao censo
          </button>
        </li>
        <li className="w-full no-close">
          <button className="flex items-center w-full gap-4 px-2 py-[0.4rem] text-sm rounded-[0.4rem] bg-transparent transition-all ease-in-out hover:bg-gray-100 no-close">
            <CrownOutlined />
            Tornar admin
          </button>
        </li>
      </ul>
    </div>
  )
}

export default UserOptions
