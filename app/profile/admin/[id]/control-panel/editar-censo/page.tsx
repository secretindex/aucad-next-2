"use client"

import CensoMiniature from "@/components/control-panel/censos/CensoMiniature"
import axios from "axios"
import { useEffect, useState } from "react"

const EditarCenso = () => {
  const [censoList, setCensoList] = useState<Array<any>>([])

  const getCensos = async () => {
    const censos = await axios.get("/api/census/get-all-census")
    setCensoList(censos.data.data)

    console.log(censos.data.data)
  }

  useEffect(() => {
    getCensos()
  }, [])

  return (
    <section className="flex flex-col h-full justify-center items-center">
      <div className="flex flex-col items-center gap-8 w-2/3">
        <div className="text-center mx-auto">
          <h2 className="text-2xl font-semibold">Editar Censo</h2>
        </div>
        <div className="">
          <ul className="flex flex-row gap-4">
            {censoList.map((censo) => (
              <>
                <CensoMiniature
                  id={censo.id}
                  name={censo.name}
                  municipio={censo.municipio}
                  cidade={censo.estado}
                  logotipo={censo.logotipo === null ? "" : censo.logotipo}
                />
              </>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default EditarCenso
