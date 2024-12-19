import { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/ssr/ssrServer"

async function PATCH(req: NextRequest) {
  const supabase = createClient()
  try {
    // recieve: body and ID from query parameter
    const id = req.nextUrl.searchParams.get("id")
    const body = await req.json()

    console.log("this is documents ativos route ", body, id)

    const { data, error } = await supabase
      .from("censos")
      .update({
        ativos_ref: [body.id], // Inicializa o array com o primeiro elemento
      })
      .eq("id", id)

    if (error) throw new Error(error.message)

    return Response.json({ data: data, message: "You did it!", status: "ok" })
  } catch (error) {
    return Response.json({ error: error, status: "fail" })
  }
}

export { PATCH }
