import { supabaseClient } from "@/lib/supabase/client"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    return Response.json({ message: data, status: "ok" })
  } catch (err) {
    return Response.json({ status: "fail", message: err })
  }
}
