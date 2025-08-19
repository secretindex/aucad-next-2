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
    return error.message
  }

  revalidatePath("/", "layout")
  redirect("/")
}

export async function signup({
  first_name,
  last_name,
  email,
  password,
}: {
  first_name: string
  last_name: string
  email: string
  password: string
}) {
  const supabase = createClient()

  const { data: _data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        username: `${first_name} ${last_name}`,
        first_name: first_name,
        last_name: last_name,
        avatar_url: "",
      },
    },
  })

  if (error) {
    console.error(error)
    return error.message
  }

  return "Olhe sua lista de emails e confirme sua conta! (verifique se está na caixa de spam)"
}
