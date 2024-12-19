import { createClient } from "@/lib/supabase/ssr/ssrServer"
import { NextRequest } from "next/server"

async function GET(req: NextRequest) {
  const supabase = createClient()
  try {
    const cen_id = req.nextUrl.searchParams.get("cen_id")

    // Working - 100%

    const { data, error } = await supabase
      .from("profiles_censuses")
      .select("profiles(*)")
      .eq("census_id", cen_id)

   if (error) {
      console.error("Erro ao buscar usuários:", error)
    } else {
      console.log("Usuários associados ao censo:", data)
    }

    return Response.json({ message: data, status: "ok" })
  } catch (e) {
    return Response.json({ error: e, status: "error" })
  }
}

export { GET }
