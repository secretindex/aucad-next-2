import { supabaseClient } from "@/lib/supabase/client"

async function POST(req: Request) {
  const { imageUrl, userId } = await req.json();

  console.log(imageUrl)

  const { data, error } = await supabaseClient.storage.createBucket("")

  console.log(data)

  if (error) return Response.json({ error: error, status: "error" })

  return Response.json({ message: "user created successfully", data: data, status: "ok" })
}