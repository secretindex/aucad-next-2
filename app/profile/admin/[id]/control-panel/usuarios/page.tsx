import UserMiniature from "@/components/admin/users/UserMiniature"
import { createClient } from "@/lib/supabase/ssr/ssrServer"

const UserList = async ({ params }: { params: { id: string } }) => {
  const supabase = createClient()
  const id = params.id

  const { data, error } = await supabase.from("profiles").select().neq("id", id)

  return (
    <section className="h-full flex flex-col justify-center items-center">
      <div className="w-2/5 flex flex-col gap-2">
        <div className="mb-4">
          <h2 className="text-2xl text-center">Lista de usuários</h2>
          <span className="text-sm text-center text-gray-500">
            Aqui estão todos os usuários e os censos que eles fazem parte
          </span>
        </div>
        <div className="w-full">
          {error ? (
            <div>
              <p>Ocorreu um erro ao carregar a lista de usuários.</p>
            </div>
          ) : (
            <div>
              <ul className="flex flex-col gap-2 w-full">
                {data.map((user) => (
                  <li key={user.id} className="w-full">
                    <UserMiniature user={user}></UserMiniature>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default UserList
