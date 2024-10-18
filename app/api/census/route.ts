import { createClient } from "@/lib/supabase/ssr/ssrServer"
import { NextRequest } from "next/server"

async function GET(req: NextRequest) {
  const supabase = createClient()
  try {
    const id = req.nextUrl.searchParams.get("id")
    const { data, error } = await supabase
      .from("census")
      .select("*")
      .eq("id", id)

    if (error) throw new Error(error.message as string)

    return Response.json({ data, status: "success" })
  } catch (e) {
    return Response.json({ message: e, status: "fail" })
  }
}

async function POST(req: Request) {
  const supabase = createClient()
  try {
    const body = await req.json()

    const { data, error } = await supabase.from("census").insert(body)

    console.log(body)
    console.log(error)

    if (error) throw new Error(error.message)

    return Response.json({ response: data, originalBody: body, data: body })
  } catch (e) {
    console.log(e)
    return Response.json({ message: e, status: "fail" })
  }
}

async function PATCH(req: Request) {
  const body = await req.json()
  console.log(body)

  return Response.json({ response: body, status: "success" })
}

export { GET, POST, PATCH }
