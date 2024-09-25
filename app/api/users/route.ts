import { supabaseClient } from "@/lib/supabaseClient"

async function GET(res: Response) {
  const { data, error } = await supabaseClient.from("users").select("*")

  if (error) {
    return Response.json({ message: error, status: "error" })
  }

  return Response.json({ data: data, status: "ok" })
}

async function POST(req: Request, _res: Response) {
  const {
    name = "johny prev",
    email,
    password,
    personalMessages = { name: "" },
    admin = false,
  } = await req.json()

  const { error } = await supabaseClient
    .from("users")
    .insert({ name, email: email, password: password, personalMessages, admin })

  if (error) return Response.json({ error: error, status: "error" })

  return Response.json({ message: "user created successfully", status: "ok" })
}

export { GET, POST }
