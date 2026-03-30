'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export type ApplicationStatus =
  | 'applied'
  | 'screening'
  | 'technical'
  | 'offer'
  | 'rejected'
  | 'withdrawn'

export type Application = {
  id: string
  user_id: string
  company: string
  role: string
  status: ApplicationStatus
  applied_date: string | null
  notes: string | null
  url: string | null
  created_at: string
  updated_at: string
}

type ActionState = { error?: string } | undefined

export async function createApplication(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { error } = await supabase.from('applications').insert({
    user_id: user.id,
    company: formData.get('company') as string,
    role: formData.get('role') as string,
    status: (formData.get('status') as ApplicationStatus) || 'applied',
    applied_date: (formData.get('applied_date') as string) || null,
    notes: (formData.get('notes') as string) || null,
    url: (formData.get('url') as string) || null,
  })

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
}

export async function updateApplication(
  id: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { error } = await supabase
    .from('applications')
    .update({
      company: formData.get('company') as string,
      role: formData.get('role') as string,
      status: (formData.get('status') as ApplicationStatus) || 'applied',
      applied_date: (formData.get('applied_date') as string) || null,
      notes: (formData.get('notes') as string) || null,
      url: (formData.get('url') as string) || null,
    })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
}

export async function deleteApplication(id: string): Promise<void> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return

  await supabase
    .from('applications')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  revalidatePath('/dashboard')
}
