import { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/ssr/ssrServer"

async function PATCH(req: NextRequest) {
  const supabase = createClient()
  try {
    const id = req.nextUrl.searchParams.get("id")
    const body = await req.json()

    const { data, error } = await supabase.rpc("add_document_id", {
      census_id: id,
      document_id: body.id,
    })

    console.log("document request status ", data, error)

    if (error) throw new Error(error.message)

    return Response.json({ data: data, message: "You did it!", status: "ok" })
  } catch (error) {
    return Response.json({ error: error, status: "fail" })
  }
}

export { PATCH }
