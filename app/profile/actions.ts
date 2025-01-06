import { createClient } from "@/lib/supabase/ssr/ssrClient"

const supabase = createClient()

const avatarChange = async (filePath: string, file: any, id: string) => {
  const { data: _data, error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file)

  if (error) {
    console.error(error)
    return {
      publicUrl: "",
      profileError: `An error occurred: ${error.message}`,
    }
  }

  // até aqui, working

  console.log("image report  ", _data, error)

  const { data: urlImageData } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath)

  console.log(urlImageData.publicUrl, urlImageData)

  if (!urlImageData.publicUrl)
    return { publicUrl: "", profileError: "Image not found" }

  return { publicUrl: urlImageData.publicUrl, profileError: "" }
}

export default avatarChange
