import { PlusOutlined, UserAddOutlined } from "@ant-design/icons"
import { createClient } from "@/lib/supabase/ssr/ssrServer"
import { redirect } from "next/navigation"
import Link from "next/link"

const ControlPanel = async ({ params }: { params: { id: string } }) => {
  const supabase = createClient()
  const id = params.id

  const { data, error } = await supabase.from("profiles").select().eq("id", id)

  if (error || !data[0]) redirect("/auth/login")

  const user = data[0]

  if (user.admin === false) redirect("/")

  return (
    <section className="h-full w-full flex flex-col justify-center items-center gap-4 ">
      <div>
        <h1 className="text-4xl text-center">
          Olá, {user && user.first_name}!
        </h1>
        <p className="text-sm text-gray-500">O que deseja fazer agora?</p>
      </div>
      <div className="flex gap-4 w-2/6">
        <Link
          className="w-full"
          href={`/profile/admin/${id}/control-panel/criar-censo`}
        >
          <div className="flex flex-col w-full gap-6 rounded-lg shadow-sm px-8 py-12 transition-all ease-in-out hover:bg-[#26a69a] hover:text-white border-[1px] border-[#bebebe40] ">
            <h2 className="text-md text-center">Configurar novo censo</h2>
            <div className="text-center text-4xl">
              <PlusOutlined />
            </div>
          </div>
        </Link>
        <Link
          className="w-full"
          href={`/profile/admin/${id}/control-panel/usuarios`}
        >
          <div className="flex flex-col w-full gap-6 rounded-lg shadow-sm px-8 py-12 cursor-pointer transition-all ease-in-out hover:bg-[#2ab6a8] hover:text-white border-[1px] border-[#bebebe40] ">
            <h2 className="text-md text-center">Configurar usuários</h2>
            <div className="text-center text-4xl">
              <UserAddOutlined />
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}

export default ControlPanel
