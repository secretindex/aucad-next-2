import { createClient } from "@/lib/supabase/ssr/ssrClient"
import { SupabaseClient } from "@supabase/supabase-js"

const supabase = createClient()

interface ImageUploadInt {
  file: any
  filePath: string
  id: string
  returnImageUrl: () => string
}

class ImageUpload implements ImageUploadInt {
  file: any
  filePath: string
  id: string
  supabase: SupabaseClient
  constructor(file: any, filePath: string, id: string) {
    this.file = file
    this.filePath = filePath
    this.id = id
    this.supabase = createClient()
  }
  returnImageUrl () {


    return ""
  }
}

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

  const { data: urlImageData } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath)

  if (!urlImageData.publicUrl)
    return { publicUrl: "", profileError: "Image not found" }

  const { data: _profileUpData, error: profileError } = await supabase
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