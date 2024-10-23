import { createClient } from "@/lib/supabase/ssr/ssrServer"
import { NextRequest } from "next/server"

async function GET(req: NextRequest) {
  const supabase = createClient()
  try {
    const id = req.nextUrl.searchParams.get("id")

    console.log(req.nextUrl.searchParams)

    const { data, error } = await supabase
      .from("profiles")
      .select("avatar_url, username, id")
      .neq("id", id)

    console.log("database error ", data, error)

    if (error) throw new Error(error.message)

    return Response.json({ users: data, status: "ok" })
  } catch (e) {
    return Response.json({ message: e, status: "error" })
  }
}

export { GET }
