import { createClient } from "@/lib/supabase/ssr/ssrClient"

const supabase = createClient()

const avatarChange = async (filePath: string, file: any, id: string) => {
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file)

  if (error) {
    console.error(error)
    return {
      publicUrl: "",
      profileError: `An error occurred: ${error.message}`,
    }
  }

  const { data: urlImageData } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath)

  if (!urlImageData.publicUrl)
    return { publicUrl: "", profileError: "Image not found" }

  const { data: profileUpData, error: profileError } = await supabase
    .from("profiles")
    .update({ avatar_url: urlImageData.publicUrl })
    .eq("id", id)

  if (profileError) {
    console.error(profileError)
    return {
      publicUrl: urlImageData.publicUrl,
      profileError: `An error occured: ${profileError.message}`,
    }
  }

  return { publicUrl: urlImageData.publicUrl, profileError: "" }
}


export default avatarChange