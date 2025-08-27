import { createClient } from "@/lib/supabase/ssr/ssrServer"
import { NextResponse } from "next/server"

export async function GET({ params }: { params: Promise<{ name: string }> }) {
  try {
    const supabase = createClient()
    const { name } = await params

    const { data, error } = await supabase
      .from("documents")
      .select()
      .eq("name", name)

    if (error) throw new Error(error.message)

    return NextResponse.json({ message: data, status: "ok" })
  } catch (error) {
    return NextResponse.json({ message: error, status: "fail" })
  }
}
