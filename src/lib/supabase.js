import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY
export const supabase = url && key ? createClient(url, key) : null

export async function submitRequest(payload, files) {
  if (!supabase) return { demo: true }
  const uploads = await Promise.all([...files].map(async file => {
    const path = `${crypto.randomUUID()}-${file.name}`
    const { error } = await supabase.storage.from('customer-files').upload(path, file)
    if (error) throw error
    return supabase.storage.from('customer-files').getPublicUrl(path).data.publicUrl
  }))
  const { error } = await supabase.from('requests').insert({ ...payload, file_urls: uploads })
  if (error) throw error
  return { demo: false }
}
