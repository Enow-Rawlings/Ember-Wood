/**
 * Create the first Emberwood admin (owner) account.
 *
 * Usage:
 *   node e:\Work\2026\Websites\Firewood\emberwood\node_modules\tsx\dist\cli.mjs src/scripts/create-admin.ts
 *
 * Run once against a fresh database. Safe to re-run — skips if email already exists.
 */

import { config } from 'dotenv'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
config({ path: resolve(__dirname, '../../../../.env.local') })
config({ path: resolve(__dirname, '../../../../.env') })

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('[create-admin] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

// ── Change these to your preferred admin credentials ─────────────────────────
const ADMIN_EMAIL    = 'admin@emberwood.co.uk'
const ADMIN_PASSWORD = 'Emberwood2026!'
const ADMIN_NAME     = 'Emberwood Owner'
const ADMIN_ROLE     = 'owner'
// ─────────────────────────────────────────────────────────────────────────────

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

async function run() {
  console.log('[create-admin] Connecting to Supabase...')

  // Check if admin already exists
  const { data: existing } = await supabase
    .from('admin_users')
    .select('id, email, role')
    .eq('email', ADMIN_EMAIL)
    .maybeSingle()

  if (existing) {
    console.log(`[create-admin] Admin already exists: ${existing.email} (${existing.role})`)
    console.log('[create-admin] Nothing to do.')
    return
  }

  // 1. Create Supabase Auth user
  console.log(`[create-admin] Creating auth user: ${ADMIN_EMAIL}`)
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    email_confirm: true,
    user_metadata: { name: ADMIN_NAME },
  })

  if (authError || !authData.user) {
    console.error('[create-admin] Failed to create auth user:', authError?.message)
    process.exit(1)
  }

  console.log(`[create-admin] Auth user created: ${authData.user.id}`)

  // 2. Insert admin_users record with owner role
  const { data: adminUser, error: insertError } = await supabase
    .from('admin_users')
    .insert({
      auth_user_id: authData.user.id,
      email:        ADMIN_EMAIL,
      name:         ADMIN_NAME,
      role:         ADMIN_ROLE,
      is_active:    true,
    })
    .select('id, email, name, role')
    .single()

  if (insertError || !adminUser) {
    console.error('[create-admin] Failed to insert admin_users record:', insertError?.message)
    // Clean up auth user
    await supabase.auth.admin.deleteUser(authData.user.id)
    process.exit(1)
  }

  console.log('')
  console.log('[create-admin] ✓ Admin owner account created successfully!')
  console.log(`  Email:    ${ADMIN_EMAIL}`)
  console.log(`  Password: ${ADMIN_PASSWORD}`)
  console.log(`  Role:     ${ADMIN_ROLE}`)
  console.log(`  Admin ID: ${adminUser.id}`)
  console.log('')
  console.log('[create-admin] Login at: http://localhost:5174/login')
  console.log('[create-admin] Change your password after first login!')
}

run().catch((err) => {
  console.error('[create-admin] Unexpected error:', err)
  process.exit(1)
})
