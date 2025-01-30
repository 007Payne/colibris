export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          encrypted_password: string | null
          role: 'client' | 'partner'
          first_name: string
          last_name: string
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          encrypted_password?: string | null
          role: 'client' | 'partner'
          first_name: string
          last_name: string
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          encrypted_password?: string | null
          role?: 'client' | 'partner'
          first_name?: string
          last_name?: string
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
} 