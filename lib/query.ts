// Could be a class;

import { supabaseClient } from "./supabaseClient"

type UserLogin = {
  email: string
  password: string
}

const queryFromDb = async (table: string, user: UserLogin) => {
  const { data, error } = await supabaseClient.from(table).select().eq("email", user.email)

  return { data, error }
}

export default queryFromDb