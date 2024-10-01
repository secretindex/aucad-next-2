import { supabaseClient } from "@/lib/supabase/client"

async function GET() {
  const { data, error } = await supabaseClient.from("users").select("*")

  if (error) {
    return Response.json({ message: error, status: "error" })
  }

  return Response.json({ data: data, status: "ok" })
}

async function POST(req: Request) {
  const { email, password } = await req.json();

  console.log(email, password)

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password
  });

  console.log(data)

  if (error) return Response.json({ error: error, status: "error" })

  return Response.json({ message: "user created successfully", data: data, status: "ok" })
}

export { GET, POST }
