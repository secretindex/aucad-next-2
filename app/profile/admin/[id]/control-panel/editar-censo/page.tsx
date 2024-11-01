"use client"

import axios from "axios"
import { useEffect, useState } from "react"

const EditarCenso = () => {
  const [censoList, setCensoList] = useState<Array<any>>([])

  const getCensos = async () => {
    const censos = await axios.get("/api/census/get-all-census")
    setCensoList(censos.data.data)
  }

  useEffect(() => {
    getCensos()
  }, [])

  return (
    <section>
      <div>
        <h2>Editar Censo</h2>
      </div>
      <div>
        <ul>
          {censoList.map((censo) => (
            <li key={censo.id}>
              {censo.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default EditarCenso
