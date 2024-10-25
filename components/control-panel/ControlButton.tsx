import Link from "next/link"
import React, { ReactNode } from "react"

interface ControlButtonProps {
  link: string
  title: string
  icon: ReactNode
  id: string
}

const ControlButton: React.FC<ControlButtonProps> = ({
  link,
  title,
  icon,
  id,
}) => {
  return (
    <Link className="w-full" href={{ pathname: link, query: { id: id } }}>
      <div className="flex flex-col w-full gap-6 rounded-lg shadow-sm px-8 py-12 transition-all ease-in-out hover:bg-[#26a69a] hover:text-white border-[1px] border-[#bebebe40] ">
        <h3 className="text-md text-center">{title}</h3>
        <div className="text-center text-4xl">{icon}</div>
      </div>
    </Link>
  )
}

export default ControlButton
