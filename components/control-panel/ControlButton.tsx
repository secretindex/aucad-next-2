import Link from "next/link"
import { ReactNode } from "react"

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
    <Link className="w-1/6" href={link.replace("[id]", id)}>
      <div className="flex flex-col no-wrap w-full gap-6 rounded-lg shadow-sm px-8 py-12 transition-all ease-in-out hover:bg-[#26a69a] hover:text-white border-[1px] border-[#0003] ">
        <h3 className="text-md text-center text-nowrap">{title}</h3>
        <div className="text-center text-4xl">{icon}</div>
      </div>
    </Link>
  )
}

export default ControlButton
