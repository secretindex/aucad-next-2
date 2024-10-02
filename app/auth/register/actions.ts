"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/ssr/ssrServer"

export async function login(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log(error)
    redirect("/error")
  }

  revalidatePath("/", "layout")
  redirect("/")
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  console.log(data)

  const { error } = await supabase.auth.signUp(data)

  console.log(error)

  if (error) {
    console.log("frescura do caralhooooooooooo!!!!!")
    redirect("/error")
  }

  revalidatePath("/", "layout")
  redirect("/")
}
