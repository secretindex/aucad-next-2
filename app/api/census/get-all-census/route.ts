import { createClient } from "@/lib/supabase/ssr/ssrServer"

async function GET() {
  const supabase = createClient()
  try {
    const { data, error } = await supabase.from("census").select()

    if (error) throw new Error(error.message)

    return Response.json({ data: data, status: "ok" })
  } catch (e) {
    return Response.json({ message: e, status: "error" })
  }
}

export { GET }
