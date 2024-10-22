import { createClient } from "@/lib/supabase/ssr/ssrServer"

async function GET() {
  const supabase = createClient()
  try {
    const { data, error } = await supabase.auth.getUser()
    if (error) throw new Error(error.message)

    if (data.user) {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select()
        .eq("id", data.user.id)

      if (profileError) throw new Error(profileError.message)

      return Response.json({ user: profileData[0], status: "ok" })
    }
  } catch (e) {
    return Response.json({ message: e, status: "error" })
  }
}

export { GET }
