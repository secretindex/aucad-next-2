import { createClient } from "@/lib/supabase/ssr/ssrClient"
import { functions } from "lodash"

const uploadImageToCenso = async (url: string) => {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  return { data, error }
}
const removeCensusUser = async function() {

}


export default uploadImageToCenso
