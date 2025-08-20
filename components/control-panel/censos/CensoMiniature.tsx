import Image from "next/image"
import { FC, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

import {
  UserAddOutlined,
  EditOutlined,
  FileOutlined,
  DeleteOutlined,
} from "@ant-design/icons"

interface CensoMiniatureProps {
  id: string
  name: string
  logotipo: string
  municipio: string
  cidade: string
}

const CensoMiniature: FC<CensoMiniatureProps> = ({
  id,
  name,
  logotipo,
  municipio,
  cidade,
}) => {
  const [optionsOpen, setOptionsOpen] = useState<boolean>(false)

  console.log(logotipo)
  const router = useRouter()
  const pathname = usePathname()

  const handleEdit = () => {
    router.push(`${pathname}/${id}`)
  }

  const handleEditDocuments = () => {
    router.push(`${pathname}/${id}/documentos`)
  }

  const handleDelete = () => {
    console.log("oi")
  }

  const handleOpenOptions = () => {
    setOptionsOpen((prev) => !prev)
  }

  return (
    <div
      key={id}
      className="flex flex-row gap-4 border-[1px] w-full border-[#50505045] p-2 rounded-md"
    >
      <div className="flex gap-4 items-center justify-between">
        {logotipo !== "" ? (
          <div className="h-full w-[50px] rounded-md">
            <Image
              className="block w-full h-full rounded-md object-cover"
              src={logotipo}
              alt={name}
              width={60}
              height={60}
            />
          </div>
        ) : (
          <div className="rounded-md h-full flex justify-center items-center w-[50px] m-2 bg-[#6fd199]">
            <span className="text-xl font-normal">{name.charAt(0)}</span>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <div>
            <h3 className="text-xl">{name}</h3>
          </div>
          <footer className="text-sm text-gray-600">
            {municipio} - {cidade}
          </footer>
        </div>
        <div className="relative">
          <button
            onClick={handleOpenOptions}
            className="px-2 py-[0.3rem] hover:bg-gray-100 transition-all ease-in-out rounded-lg border-[1px] border-[#bdbdbd50]"
          >
            <EditOutlined />
          </button>
          {optionsOpen && (
            <div className="absolute left-[120%] bottom-0 p-2 rounded-md bg-[#fff] shadow-md min-w-[200px] no-close">
              <ul className="flex flex-col no-close">
                <li className="w-full no-close">
                  <button
                    onClick={handleEdit}
                    className="flex items-center w-full gap-4 px-2 py-[0.4rem] text-sm rounded-[0.4rem] bg-transparent transition-all ease-in-out hover:bg-gray-100 no-close"
                  >
                    <UserAddOutlined />
                    Adicionar usuários
                  </button>
                </li>
                <li className="w-full no-close">
                  <button
                    onClick={handleEditDocuments}
                    className="flex items-center w-full gap-4 px-2 py-[0.4rem] text-sm rounded-[0.4rem] bg-transparent transition-all ease-in-out hover:bg-gray-100 no-close"
                  >
                    <FileOutlined />
                    Editar documentos
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleDelete}
                    className="flex items-center text-red-600 w-full gap-4 px-2 py-[0.4rem] text-sm rounded-[0.4rem] bg-transparent transition-all ease-in-out hover:bg-red-100 no-close"
                  >
                    <DeleteOutlined />
                    Apagar
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CensoMiniature
