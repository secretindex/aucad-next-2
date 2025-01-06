import { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/ssr/ssrServer"

async function GET(req: NextRequest) {
  const supabase = createClient()
  try {
    const id = req.nextUrl.searchParams.get("id")

    const { data: censusData, error: censusError } = await supabase
      .from("census")
      .select("ativos_ref")
      .eq("id", id)
      .single()

    console.log(censusData, censusError)

    if (censusError) throw censusError

    const documentIds = censusData?.ativos_ref || []

    const { data: documents, error: documentsError } = await supabase
      .from("documentos")
      .select("*")
      .in("id", documentIds)

    // está funcionando!!!
    console.log(documents, documentsError)

    if (documentsError) throw documentsError

    return Response.json({ data: documents, status: "ok" })
  } catch (error) {
    return Response.json({ error, status: "fail" })
  }
}

async function PATCH(req: NextRequest) {
  const supabase = createClient()
  try {
    const id = req.nextUrl.searchParams.get("id")
    const body = await req.json()

    const { data, error } = await supabase.rpc("add_document_id", {
      census_id: id,
      document_id: body.id,
    })

    console.log("document request status ", data, error)

    if (error) throw error

    return Response.json({ data: data, message: "You did it!", status: "ok" })
  } catch (error) {
    return Response.json({ error: error, status: "fail" })
  }
}

export { GET, PATCH }
