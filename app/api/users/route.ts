import { supabaseClient } from "@/lib/supabase/client"
import { NextRequest } from "next/server"

async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id")

    if (id) {
      const { data, error } = await supabaseClient
        .from("profiles")
        .select()
        .eq("id", id)

      if (error) {
        console.log("this is error")

        console.log(error)
        throw new Error(error.message)
      }

      return Response.json({ data: data, status: "ok" })
    }
  } catch (e) {
    return Response.json({ message: e, status: "error" })
  }
}

async function POST(req: Request) {
  const { email, password } = await req.json()

  console.log(email, password)

  const { data, error } = await supabaseClient.auth.signUp({
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
