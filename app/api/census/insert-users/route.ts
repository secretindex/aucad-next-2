import { createClient } from "@/lib/supabase/ssr/ssrServer"

// insert census users
async function POST(req: Request) {
  const supabase = createClient()
  try {
    const usersCensuses = await req.json()

    console.log("This is from profile censuses", usersCensuses)

    const { error } = await supabase
      .from("profiles_censuses")
      .insert(usersCensuses)

    if (error) throw new Error(error.message)

    return Response.json({ message: usersCensuses, status: "ok" })
  } catch (e) {
    return Response.json({ error: e, status: "error" })
  }
}

export { POST }
