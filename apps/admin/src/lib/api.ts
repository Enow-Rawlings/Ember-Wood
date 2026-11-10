import axios from 'axios'

// Ensure /api/v1 suffix is always present — works whether the env var
// includes it or not (e.g. "https://ember-wood.onrender.com" or ".../api/v1")
const rawBase = (import.meta.env.VITE_ADMIN_API_BASE_URL ?? '/api/v1').replace(/\/$/, '')
const baseURL = rawBase.endsWith('/api/v1') ? rawBase : `${rawBase}/api/v1`

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(async (config) => {
  const { supabase } = await import('./supabase')
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
