import { createClient } from "@/lib/supabase/ssr/ssrServer"

async function GET() {
  const supabase = createClient()
  const { data, error } = await supabase.from("census").select("*")
}

async function POST(req: Request) {
  const supabase = createClient()
  try {
    const body = await req.json()

    const { data, error } = await supabase.from("census").insert(body)

    console.log(body)

    if (error) throw new Error(error.message)

    return Response.json({ response: data, originalBody: body, data: body })
  } catch (e) {
    return Response.json({ message: e, status: "fail" })
  }
}

export { GET, POST }
