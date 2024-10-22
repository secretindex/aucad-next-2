import { createClient } from "@/lib/supabase/ssr/ssrServer"

async function POST(req: Request) {
  const supabase = createClient()
  try {
    const usersCensuses = await req.json()

    // const { error } = await supabase
    //   .from("profiles_censuses")
    //   .insert(usersCensuses)

    // if (error) throw new Error(error.message)

    return Response.json({ message: usersCensuses, status: "ok" })
  } catch (e) {
    return Response.json({ error: e, status: "error" })
  }
}

export { POST }
