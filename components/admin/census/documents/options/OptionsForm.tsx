"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { UpOutlined } from "@ant-design/icons"

type DocumentOptions = { option: string; reject: string }

interface OptionProps {
  setOptions: Dispatch<SetStateAction<Array<DocumentOptions>>>
}

const OptionsForm = ({ setOptions }: OptionProps) => {
  const handleSumitRule = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const values = Object.fromEntries(formData.entries())

    console.log(values)

    setOptions((prev) => [...prev, values as DocumentOptions])
  }

  return (
    <div className="flex gap-4 p-4 w-full">
      <form
        onSubmit={handleSumitRule}
        className="flex items-end justify-center w-full gap-1"
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500" htmlFor="option">
            Opção
          </label>
          <input
            type="text"
            className="border-[1px] border-[#bebebe30] focus:border-[#20202060] outline-none px-4 py-[0.3rem] rounded-md"
            name="option"
            id="option"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500" htmlFor="response">
            Resposta
          </label>
          <input
            type="text"
            className="border-[1px] border-[#bebebe30] focus:border-[#20202060] outline-none px-4 py-[0.3rem] rounded-md"
            name="response"
            id="response"
          />
        </div>
        <div>
          <button
            type="submit"
            className="px-4 py-3 w-full flex justify-center gap-2 items-center text-sm border-[1px] rounded-[0.2rem] bg-transparent transition-all ease-in-out hover:bg-gray-100"
          >
            <UpOutlined />
          </button>
        </div>
      </form>
    </div>
  )
}

export default OptionsForm
