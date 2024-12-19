import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/ssr/ssrServer";

async function POST (req: NextRequest) {
  const supabase = createClient()
  try {
    // recieve: body and ID from query parameter
    const id = req.nextUrl.searchParams.get("id")
    const { body } = req

    console.log("this is documents ativos route ", body, id)

    // const { error } = await supabase.from("census").update({}).eq("id", id)

  } catch (error) {
    console.log(error)
  }
}

export { POST }