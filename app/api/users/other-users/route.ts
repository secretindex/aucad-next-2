import { createClient } from "@/lib/supabase/ssr/ssrServer"
import { NextRequest } from "next/server"

async function GET(req: NextRequest) {
  const supabase = createClient()
  try {
    const id = req.nextUrl.searchParams.get("id")
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .neq("id", id)

    if (error) throw new Error(error.message)

    return Response.json({ users: data, status: "ok" })
  } catch (e) {
    return Response.json({ message: e, status: "error" })
  }
}

export { GET }
