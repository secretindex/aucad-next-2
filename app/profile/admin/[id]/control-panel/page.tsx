"use client"

import { createClient } from "@/lib/supabase/ssr/ssrClient"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

const ControlPanel = () => {
  const supabase = createClient()
  const router = useRouter()
  const id = router.query.slug || ""

  const [user, setUser] = useState<any>()

  const fetchUser = async () => {
    const { data, error } = await supabase.from("profile").select().eq("id", id)

    if (error) throw new Error(error.message)

    if (data) {
      setUser(user)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])
  return (
    <section>
      <div>
        <h1>Bem vindo!</h1>
      </div>
    </section>
  )
}

export default ControlPanel
