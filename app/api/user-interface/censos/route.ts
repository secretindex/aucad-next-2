import { createClient } from "@/lib/supabase/ssr/ssrServer"
import { NextRequest } from "next/server"

async function GET(req: NextRequest) {
  const supabase = createClient()
  try {
    const user_id = req.nextUrl.searchParams.get("user_id")

    const { data, error } = await supabase.from("profiles_censuses").select("census(*)").eq("profile_id", user_id)

    if (error) throw new Error(error.message)

    return Response.json({ message: data, status: "ok" })
  } catch (e) {
    return Response.json({ message: "Você não possui acesso a nenhum censo. Fale com um administrador.", error: e, status: "fail" })
  }
}

export { GET }
