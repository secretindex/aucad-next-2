import { FC, useEffect, useRef } from "react"

import { List } from "antd"
import AditionalTexts from "@/utils/objects/AditionalRejectTexts"
import TextBox from "./rejectComponent/TextBox"

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

      console.log(bound.bottom  + " " + window.innerHeight)

      if (bound.bottom > window.innerHeight) {
        menu.style.top = `${Math.abs(mouseCoords.y - (bound.bottom - window.innerHeight))}px`;
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
      className="dropdown flex flex-col justify-between gap-4 overflow-auto bg-[#fefefe]"
    >
      <header className="mt-2">
        <h4 className="text-center font-bold">Textos adicionais</h4>
      </header>
      <List className="w-full">
        {AditionalTexts.map((el) => {
          return (
            <List.Item key={el.name}>
              <TextBox text={el.text} title={el.name} />
            </List.Item>
          )
        })}
      </List>
    </div>
  )
}

export default AditionalRejectText
