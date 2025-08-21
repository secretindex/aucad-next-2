import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/ssr/ssrServer"

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = createClient()
    const { id } = await params

    console.log("this is ID", id)

    const { error } = await supabase.from("census").delete().eq("id", id)

    if (error) throw new Error(error.message)

    return NextResponse.json({ message: "Endpoint", status: "ok" })
  } catch (err) {
    return NextResponse.json({ message: err, status: "fail" })
  }
}
