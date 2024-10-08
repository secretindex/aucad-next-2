import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/ssr/ssrServer"

export default async function PrivatePage() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  console.log(data)

  if (error || !data?.user) {
    redirect("/login")
  }

  return (
    <div className="w-full text-sm flex flex-col justify-center items-center">
      <p>Hello {data.user.email}</p>
      {data.user.id}
      {data.user.aud}
    </div>
  )
}
