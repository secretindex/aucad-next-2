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

  const fData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const { data, error } = await supabase.auth.signUp({
    email: fData.email,
    password: fData.password,
    options: {
      data: {
        first_name: "Caio",
        last_name: "Programas",
        avatar_url: "",
        admin: false,
      },
    },
  })

  console.log(data)
  console.log(error)

  if (error) {
    console.log("frescura do caralhooooooooooo!!!!!")
    redirect("/error")
  }

  revalidatePath("/", "layout")
  return "Olhe sua lista de emails e confirme sua conta!"
}
