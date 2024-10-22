// import { createClient } from "@/lib/supabase/ssr/ssrServer"

async function PATCH (req: Request) {
  // const supabase = createClient()
  try {
    const body = await req.json()

    console.log(body)

    // const { data, error } = await supabase
    //  .from("profiles")
    //  .update({ logotipo: "newName" })
    //  .eq("id", 1)

    // console.log(data)

    return Response.json({ data: body, status: "ok" })
  } catch (error) {
    return Response.json({ error, status: "ok" })
  }
}

export { PATCH }