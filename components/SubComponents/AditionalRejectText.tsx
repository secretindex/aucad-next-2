import { FC, useEffect, useRef } from "react"

import AditionalTexts from "@/utils/objects/AditionalRejectTexts"
import TextBox from "./rejectComponent/TextBox"
import { PlusOutlined } from "@ant-design/icons"

interface MouseCoords {
  x: number
  y: number
}

interface RejectProps {
  mouseCoords: MouseCoords
}

const AditionalRejectText: FC<RejectProps> = ({ mouseCoords }) => {
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const menu = menuRef.current

    console.log(menu)

    if (menu) {
      const bound = menu.getBoundingClientRect()

      console.log(bound.bottom + " " + window.innerHeight)

      if (bound.bottom > window.innerHeight) {
        menu.style.top = `${Math.abs(
          mouseCoords.y - (bound.bottom - window.innerHeight)
        )}px`
      }
    }
  }, [mouseCoords])

  return (
    <div
      ref={menuRef}
      style={{
        zIndex: 1000,
        position: "absolute",
        top: mouseCoords.y,
        left: mouseCoords.x,
      }}
      className="dropdown flex flex-col justify-between gap-2 overflow-auto bg-[#fefefe]"
    >
      <header className="py-2 flex flex-row justify-between items-center">
        <h4 className="pl-4 text-center font-bold">Textos adicionais</h4>{" "}
        <button className="px-[0.7rem] py-[0.3rem] rounded-lg border-[1px] border-[#bdbdbd40] transition-all ease-in-out hover:bg-gray-100">
          <PlusOutlined />
        </button>
      </header>
      <ul className="w-full">
        {AditionalTexts.map((el) => {
          return (
            <li key={el.name}>
              <TextBox text={el.text} title={el.name} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default AditionalRejectText
