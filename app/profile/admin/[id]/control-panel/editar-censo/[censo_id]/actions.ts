import { createClient } from "@/lib/supabase/ssr/ssrClient"

const uploadImageToCenso = async (url: string) => {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  return { data, error }
}

export default uploadImageToCenso
