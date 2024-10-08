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
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const { data, error } = await supabase.auth.signUp({
    email: fData.email,
    password: fData.password,
  })

  if (error) {
    console.error(error)
    return error.message
  }

  // const user = data.user

  // const { data: profileData, error: profileError } = await supabase
  //   .from("profiles")
  //   .insert([
  //     {
  //       id: user!.id,
  //       username: fData.first_name + " " + fData.last_name,
  //       first_name: fData.first_name,
  //       last_name: fData.last_name,
  //       avatar_url: "",
  //       admin: false,
  //       updatedAt: new Date().toISOString(),
  //     },
  //   ])

  // console.log(profileData)
  // console.log(profileError)

  revalidatePath("/", "layout")
  return "Olhe sua lista de emails e confirme sua conta!"
}
