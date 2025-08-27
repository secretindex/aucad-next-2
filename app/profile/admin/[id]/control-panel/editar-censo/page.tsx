"use client"

import CensoMiniature from "@/components/control-panel/censos/CensoMiniature"
import LoadingSpin from "@/components/LoadingSpin"
import axios from "axios"

import useSWR from "swr"

const fetcher = (url: string) => axios.get(url).then((res) => res.data.data)

const EditarCenso = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/census/get-all-census",
    fetcher
  )

  console.log(data, error)

  const deleteCensus = async (id: string) => {
    const deleted = await axios.delete("/api/census/" + id)
    console.log(deleted.data.status)

    mutate()
  }

  return (
    <section className="flex flex-col h-full justify-center items-center">
      <div className="flex flex-col items-center gap-8 w-2/3">
        <div className="text-center mx-auto">
          <h2 className="text-2xl font-semibold">Editar Censo</h2>
        </div>
        <div className="">
          <ul className="flex flex-row md:flex-wrap xl:flex-nowrap gap-4">
            {isLoading ? (
              <LoadingSpin />
            ) : (
              <>
                {data.map(
                  (censo: {
                    id: string
                    name: string
                    municipio: string
                    estado: string
                    logotipo: string | null
                  }) => (
                    <>
                      <CensoMiniature
                        id={censo.id}
                        name={censo.name}
                        municipio={censo.municipio}
                        cidade={censo.estado}
                        logotipo={censo.logotipo === null ? "" : censo.logotipo}
                        deleteFn={deleteCensus}
                      />
                    </>
                  )
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default EditarCenso
