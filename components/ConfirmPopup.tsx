"use client"

import { FC, useContext } from "react"
import useAppReset from "@/utils/useAppReset"
import { Category } from "./SubComponents/types/essentialTypes"
// import { useRouter } from "next/router"
import { RegisterCounterContext } from "@/contexts/RegisterCountContext"

interface ConfirmProps {
  title: string
  message: string
  category: Category
  close: (state: boolean) => void
  closeModal: () => void
  isVisible: boolean
}

const ConfirmPopup: FC<ConfirmProps> = ({
  title,
  category,
  message,
  close,
  closeModal,
  isVisible,
}) => {
  const reset = useAppReset(category)
  const setCount = useContext(RegisterCounterContext)!.setCount

  const handleConfirm = () => {
    setCount((prev: number) => {
      localStorage.setItem("count", String(prev++))
      return prev++
    })

    close(false)
    closeModal()

    reset()
    window.location.reload()
  }

  return (
    <div
      className={`absolute bottom-2 shadow-md border-[2px] transition-all duration-200 ease-in-out border-[#cecece30] bg-white left-12 p-2 w-48 rounded-[0.4rem] flex flex-col gap-2 ${
        isVisible ? "appear" : "disapear"
      }`}
    >
      <div className="font-bold">{title}</div>
      <hr />
      <div>{message}</div>
      <div className="w-full flex justify-end gap-2">
        <button
          onClick={() => close(false)}
          className="px-4 py-[2px] text-sm border-[2px] rounded-[0.2rem] bg-transparent transition-all ease-in-out hover:bg-gray-100"
        >
          Não
        </button>
        <button
          onClick={handleConfirm}
          className="px-4 py-[2px] text-white text-sm rounded-[0.2rem] bg-[#26a69a] transition-all ease-in-out hover:bg-[#6ecdc5]"
        >
          Sim
        </button>
      </div>
    </div>
  )
}

export default ConfirmPopup
