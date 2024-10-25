import { EditOutlined } from "@ant-design/icons"
import Image from "next/image"
import { FC } from "react"

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
  return (
    <div key={id} className="flex flex-row gap-4">
      <div>
        <div>
          <Image src={logotipo} alt={name} width={40} height={40} />
        </div>
        <div>
          <h3>{name}</h3>
        </div>
        <div>
          <button className="flex justify-center items-center p-2 rounded-lg">
            <EditOutlined />
          </button>
        </div>
      </div>
      <footer className="text-sm text-gray-600">
        {cidade} - {municipio}
      </footer>
    </div>
  )
}

export default CensoMiniature
