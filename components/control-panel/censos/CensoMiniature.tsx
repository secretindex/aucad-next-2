import { EditOutlined } from "@ant-design/icons"
import Image from "next/image"
import { FC } from "react"
import { usePathname, useRouter } from "next/navigation"

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
  console.log(logotipo)
  const router = useRouter()
  const pathname = usePathname()

  const handleEdit = () => {
    router.push(`${pathname}/${id}`)
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
        <div>
          <button
            onClick={handleEdit}
            className="px-2 py-[0.3rem] hover:bg-gray-100 transition-all ease-in-out rounded-lg border-[1px] border-[#bdbdbd50]"
          >
            <EditOutlined />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CensoMiniature
