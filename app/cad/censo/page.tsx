"use server"

import { createClient } from "@/lib/supabase/ssr/ssrServer"
import Image from "next/image"
import Link from "next/link"

async function SelectCensoPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from("profiles_censuses")
    .select("census(*)")
    .eq("profile_id", user?.id)

  if (error) {
    return (
      <>
        <section className="h-full w-ful flex flex-col justify-center items-center">
          <div className="h-32">
            <h2 style={{ fontSize: "36px", fontWeight: "bold" }}>
              Não associado a nenhum censo. Fale com um administrador.
            </h2>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <section className="h-full w-full flex flex-col justify-center items-center">
        <div className="h-32">
          <h2 style={{ fontSize: "36px", fontWeight: "bold" }}>
            Selecione o censo
          </h2>
        </div>
        {data?.map(({ census }: { census: any }) => (
          <Link href={`/cad/censo/${census.id}`}>
            <div
              key={census.id}
              className="rounded-md p-4 border-[1px] border-[#50505030] bg-white shadow-md flex flex-col cursor-pointer pointer hover:bg-gray-50"
            >
              <div>
                {census.logotipo && (
                  <Image
                    src={census.logotipo}
                    alt="logotipo do censo"
                    width={100}
                    height={100}
                  />
                )}
              </div>
              <div>
                <h3 className="font-bold">{census.name}</h3>
                <span>
                  {census.estado}, {census.municipio}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </>
  )
}

export default SelectCensoPage
