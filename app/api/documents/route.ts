import { createClient } from "@/lib/supabase/ssr/ssrServer"

async function GET() {
  const supabase = createClient()
  try {
    const { data, error } = await supabase.from("documentos").select()

    console.log(error)

    if (error) throw new Error(error.message)

    console.log(data)

    return Response.json({ response: data, status: "ok" })
  } catch (e) {
    console.log(e)
    return Response.json({ message: e, status: "fail" })
  }
}

async function POST(req: Request) {
  const supabase = createClient()
  try {
    const body = await req.json()

    console.log(body)

    const { data, error } = await supabase.from("documentos").insert(body)

    console.log(error)

    if (error) throw new Error(error.message)

    console.log(data)

    return Response.json({ response: data, originalBody: body, data: body })
  } catch (e) {
    console.log(e)
    return Response.json({ message: e, status: "fail" })
  }
}

export { POST, GET }
