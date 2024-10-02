import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { createClient } from '@/lib/supabase/ssr/ssrServer'

export async function logout() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  console.error(error)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}