// import { redirect } from 'next/navigation'
import { revalidatePath } from "next/cache"
import { useRouter } from "next/router"

import { createClient } from "@/lib/supabase/ssr/ssrClient"

export async function logout() {
  const navigate = useRouter()
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  console.error(error)

  if (error) {
    navigate.push("/error")
  }

  revalidatePath("/", "layout")
  navigate.push("/")
}
