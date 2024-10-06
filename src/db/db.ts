import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jstsilrjjnfwxlsyxywb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzdHNpbHJqam5md3hsc3l4eXdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgyNTA4ODcsImV4cCI6MjA0MzgyNjg4N30.mNgvXEKZDXoMTpngHWcd9EsHpECU2iuf0IDbMK1DUig'
const supabase = createClient(supabaseUrl, supabaseKey)

export interface Folder {
  id: number;
  name: string;
  parent_id: number | null;
  tags: string[];
}

export interface Recording {
  id: number;
  title: string;
  audio_url: string;
  folder_id: number | null;
  created_at: Date;
}

export const getFolders = async (): Promise<Folder[]> => {
  const { data, error } = await supabase
    .from('folders')
    .select('*')
  if (error) throw error
  return data || []
}

export const getRecordings = async (): Promise<Recording[]> => {
  const { data, error } = await supabase
    .from('recordings')
    .select('*')
  if (error) throw error
  return data || []
}

export const addFolder = async (name: string, parentId: number | null): Promise<number> => {
  const { data, error } = await supabase
    .from('folders')
    .insert({ name, parent_id: parentId })
    .select()
  if (error) throw error
  return data![0].id
}

export const addRecording = async (title: string, audioUrl: string, folderId: number | null): Promise<number> => {
  const { data, error } = await supabase
    .from('recordings')
    .insert({ title, audio_url: audioUrl, folder_id: folderId })
    .select()
  if (error) throw error
  return data![0].id
}

export const addTag = async (folderId: number, tag: string): Promise<void> => {
  const { data: folder, error: fetchError } = await supabase
    .from('folders')
    .select('tags')
    .eq('id', folderId)
    .single()

  if (fetchError) throw fetchError

  const updatedTags = [...(folder.tags || []), tag]

  const { error: updateError } = await supabase
    .from('folders')
    .update({ tags: updatedTags })
    .eq('id', folderId)

  if (updateError) throw updateError
}