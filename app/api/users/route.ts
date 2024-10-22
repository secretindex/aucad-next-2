import { createClient } from "@/lib/supabase/ssr/ssrServer"
import { NextRequest } from "next/server"

async function GET(req: NextRequest) {
  try {
    const supabase = createClient()

    console.log("parameters ", req.nextUrl.searchParams)
    const id = req.nextUrl.searchParams.get("id")

    if (id !== "undefined" && id !== undefined && id !== null) {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", id)

      console.log("user with id ", data, error)

      if (error) {
        console.log(error)
        throw new Error(error.message)
      }

      return Response.json({ data: data[0], status: "ok" })
    } else {
      const { data, error } = await supabase.auth.getUser()

      console.log("user without id ", data, error)

      if (error) throw new Error(error.message)

      return Response.json({ data, status: "ok" })
    }
  } catch (e) {
    return Response.json({ message: e, status: "error" })
  }
}

async function POST(req: Request) {
  const supabase = createClient()

  const { email, password } = await req.json()

  console.log(email, password)

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  console.log(data)

  if (error) return Response.json({ error: error, status: "error" })

  return Response.json({
    message: "user created successfully",
    data: data,
    status: "ok",
  })
}

export { GET, POST }
