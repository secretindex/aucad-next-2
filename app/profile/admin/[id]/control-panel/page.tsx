import { ReactNode } from "react"
import Link from "next/link"
import { EditOutlined, PlusOutlined, UserAddOutlined } from "@ant-design/icons"
import { createClient } from "@/lib/supabase/ssr/ssrServer"
import { redirect } from "next/navigation"

type ControlPanelButtons = { link: string; title: string; icon: JSX.Element }[]

const buttons: ControlPanelButtons = [
  {
    link: "/profile/admin/[id]/control-panel/criar-censo",
    title: "Criar novo censo",
    icon: <PlusOutlined />,
  },
  {
    link: "/profile/admin/[id]/control-panel/usuarios",
    title: "Configura usuários",
    icon: <UserAddOutlined />,
  },
  {
    link: "/profile/admin/[id]/control-panel/editar-censo",
    title: "Editar censos",
    icon: <EditOutlined />,
  }
]

interface ControlButtonProps {
  link: string
  title: string
  icon: ReactNode
  id: string
}

const ControlButton: React.FC<ControlButtonProps> = ({
  link,
  title,
  icon,
  id,
}) => {
  return (
    <Link className="w-full" href={link.replace("[id]", id)}>
      <div className="flex flex-col w-full gap-6 rounded-lg shadow-sm px-8 py-12 transition-all ease-in-out hover:bg-[#26a69a] hover:text-white border-[1px] border-[#bebebe40] ">
        <h3 className="text-md text-center">{title}</h3>
        <div className="text-center text-4xl">{icon}</div>
      </div>
    </Link>
  )
}

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
        {buttons.map((button) => {
          return (
            <ControlButton
              key={button.title}
              title={button.title}
              icon={button.icon}
              link={button.link}
              id={params.id}
            />
          )
        })}
      </div>
    </section>
  )
}

export default ControlPanel
