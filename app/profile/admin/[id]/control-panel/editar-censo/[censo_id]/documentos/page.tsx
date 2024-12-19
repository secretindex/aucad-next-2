"use client"

import {
  UserOutlined,
  UserDeleteOutlined,
  ProfileOutlined,
} from "@ant-design/icons"
import Link from "next/link"

import { usePathname } from "next/navigation"

const CensoDocuments = () => {
  const pathname = usePathname()

  console.log(pathname)

  return (
    <section className="flex h-full w-full flex-col items-center justify-center">
      <div className="h-32 flex flex-col gap-2 items-center justify-center text-center">
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
          Escolha uma categoria e comece a configuração
        </h1>
      </div>
      <div className="flex flex-row w-full justify-center">
        <ul className="flex flex-row w-3/6 gap-2">
          <li className="w-full">
            <Link href={pathname + "/ativos"} className="w-full">
              <div className="flex flex-col no-wrap w-full gap-6 rounded-lg shadow-sm px-8 py-12 transition-all ease-in-out hover:bg-[#26a69a] hover:text-white border-[1px] border-[#bebebe40] ">
                <div className="text-center text-4xl">
                  <UserOutlined />
                </div>
                <h3 className="text-md text-center text-nowrap">Ativos</h3>
              </div>
            </Link>
          </li>
          <li className="w-full">
            <Link href={pathname + "/inativos"} className="w-full">
              <div className="flex flex-col no-wrap w-full gap-6 rounded-lg shadow-sm px-8 py-12 transition-all ease-in-out hover:bg-[#26a69a] hover:text-white border-[1px] border-[#bebebe40] ">
                <div className="text-center text-4xl">
                  <UserDeleteOutlined />
                </div>
                <h3 className="text-md text-center text-nowrap">Aposentados</h3>
              </div>
            </Link>
          </li>
          <li className="w-full">
            <Link href={pathname + "/pensionistas"} className="w-full">
              <div className="flex flex-col no-wrap w-full gap-6 rounded-lg shadow-sm px-8 py-12 transition-all ease-in-out hover:bg-[#26a69a] hover:text-white border-[1px] border-[#bebebe40] ">
                <div className="text-center text-4xl">
                  <ProfileOutlined />
                </div>
                <h3 className="text-md text-center text-nowrap">
                  Pensionistas
                </h3>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default CensoDocuments
