"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { createClient } from "@/lib/supabase/ssr/ssrServer"

export async function logout() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  console.log("deslogando")
  console.log(error)

  if (error) {
    redirect("/error")
  }

  revalidatePath("/", "layout")
  redirect("/")
}
