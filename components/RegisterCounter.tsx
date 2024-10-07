"use client"

import { FC, useContext, useEffect } from "react"
import { RegisterCounterContext } from "../contexts/RegisterCountContext"
import { ReloadOutlined } from "@ant-design/icons"
import Link from "next/link"

const RegisterCounter: FC = () => {
  const count = useContext(RegisterCounterContext)!.count
  const setCount = useContext(RegisterCounterContext)!.setCount

  useEffect(() => {
    localStorage.setItem("count", String(count))
  }, [count])

  const handleConfirm = () => {
    localStorage.setItem("count", "0")
    setCount(0)
  }

  return (
    <div className="absolute bottom-4 left-4 justify-end shadow-md border-[2px] border-[#cecece30] bg-white p-2 px-4 w-fit rounded-[0.4rem] flex flex-col gap-2">
      <div>
        <Link href={"/about/help"}>
          <span className="block text-slate-600 text-sm">Contador</span>
        </Link>
      </div>
      <div className="w-full flex justify-end border-2 rounded-[0.4rem]">
        <div className="px-4 border-r-0">{count}</div>
        <button
          onClick={handleConfirm}
          className="px-4 text-sm bg-transparent border-l-2 transition-all ease-in-out hover:bg-gray-100"
        >
          <ReloadOutlined />
        </button>
      </div>
    </div>
  )
}

export default RegisterCounter
