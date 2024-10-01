import { SupabaseClient } from "@supabase/supabase-js"
import { supabaseClient } from "./supabase/client"

// Could be a class;

class Database {
  // Queries (Create, Read, Update, Delete)
  supabase: SupabaseClient
  constructor(supabase: SupabaseClient) {
    this.supabase = supabase
  }
}

export class DbUser extends Database {
  constructor(supabase: SupabaseClient) {
    super(supabase)
  }

  login(email: string, password: string) {
    this.supabase.auth.signInWithPassword({ email, password })
  }

  register(email: string, password: string) {
    this.supabase.auth.signUp({ email, password })
  }
}

type UserLogin = {
  email: string
  password: string
}

const queryFromDb = async (table: string, user: UserLogin) => {
  const { data, error } = await supabaseClient
    .from(table)
    .select()
    .eq("email", user.email)

  return { data, error }
}

export default queryFromDb
