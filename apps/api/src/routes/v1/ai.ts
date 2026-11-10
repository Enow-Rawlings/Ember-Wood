import { Router } from 'express'
import { z } from 'zod'
import { requireAuth, requireAdminAuth } from '../../middleware/auth.js'
import { validateBody } from '../../middleware/validate.js'
import { ok } from '../../utils/response.js'
import { ApiError } from '../../utils/ApiError.js'
import { env } from '../../config/env.js'

export const aiRouter = Router()

const SYSTEM_PROMPT = `You are an expert SEO copywriter for Emberwood, a UK firewood and timber delivery company based online at buyfirewoodonline.co.uk.

BUSINESS CONTEXT:
- We sell firewood, hardwood logs, kindling, briquettes and timber across the UK
- Customers buy for wood-burning stoves, open fireplaces, fire pits, chimineas and outdoor fires
- Key selling points: kiln-dried ready-to-burn, UK delivery, seasoned hardwood, premium quality
- Primary audience: UK homeowners, wood-burning stove owners, open fireplace users

SEO KEYWORD STRATEGY — naturally weave in high-value keywords such as:
- "buy firewood online UK", "firewood for sale", "kiln dried logs"
- "buy logs online", "firewood delivered", "hardwood logs for sale"
- "wood burning stove logs", "seasoned firewood", "logs near me"
- "kiln dried hardwood", "firewood bulk buy", "cheap firewood UK"
- Species-specific: "oak logs", "ash logs", "birch logs", "beech logs"
- Format-specific: "bulk bag firewood", "log crate", "firewood pallet"

STRICT RULES:
- NEVER mention laboratory, research, peptides, clinical, therapeutic, or scientific use
- NEVER mention human or veterinary use — this is firewood, not medicine
- Always write for UK English (spelling, terminology)
- Use natural flowing language — do not keyword-stuff awkwardly
- Do not invent moisture content, certifications or delivery times unless provided
- Do not use em-dashes (—) or en-dashes (–) — use commas or new sentences instead
- Keep descriptions factual and grounded in what is provided`

type GenerationType =
  | 'product_short_description'
  | 'product_long_description'
  | 'product_seo_title'
  | 'product_seo_description'
  | 'product_tags'
  | 'category_description'
  | 'category_seo_title'
  | 'category_seo_description'
  | 'blog_excerpt'
  | 'blog_content'

interface GenerateContext {
  name?: string | undefined
  sku?: string | undefined
  shortDescription?: string | undefined
  longDescription?: string | undefined
  woodSpecies?: string | undefined
  woodType?: string | undefined
  woodCondition?: string | undefined
  packFormat?: string | undefined
  categoryName?: string | undefined
  existing?: string | undefined
}

function buildPrompt(type: GenerationType, ctx: GenerateContext): string {
  const name = ctx.name ?? ''
  const sku = ctx.sku ?? ''
  const shortDescription = ctx.shortDescription ?? ''
  const categoryName = ctx.categoryName ?? ''
  const existing = ctx.existing ?? ''
  const woodSpecies = ctx.woodSpecies ?? ''
  const woodType = ctx.woodType ?? ''
  const woodCondition = ctx.woodCondition ?? ''
  const packFormat = ctx.packFormat ?? ''

  const woodContext = [
    woodSpecies ? `Wood species: ${woodSpecies}` : '',
    woodType ? `Wood type: ${woodType}` : '',
    woodCondition ? `Condition: ${woodCondition}` : '',
    packFormat ? `Pack format: ${packFormat}` : '',
  ].filter(Boolean).join('\n')

  switch (type) {
    case 'product_short_description':
      return [
        'Write a concise, compelling short description (max 120 words) for a firewood product sold online in the UK.',
        `Product name: ${name}`,
        sku ? `SKU: ${sku}` : '',
        woodContext,
        existing ? `Existing description to improve: ${existing}` : '',
        'Requirements:',
        '- Single paragraph, punchy and benefit-led',
        '- Naturally include 1-2 of these SEO phrases where they fit: "buy firewood online", "kiln dried logs", "firewood delivered", "hardwood logs for sale"',
        '- Mention the wood species or type if provided',
        '- Focus on burn quality, heat output, or convenience depending on the product',
        '- UK English spelling',
        'Return only the description text, no quotes, no labels.',
      ].filter(Boolean).join('\n')

    case 'product_long_description':
      return [
        'Write a detailed, SEO-optimised long description (200-350 words) for a firewood product sold online in the UK.',
        `Product name: ${name}`,
        sku ? `SKU: ${sku}` : '',
        woodContext,
        shortDescription ? `Short description: ${shortDescription}` : '',
        existing ? `Existing long description to improve: ${existing}` : '',
        'Requirements:',
        '- 2-4 paragraphs with natural flow',
        '- First paragraph: hook the reader, mention the species/type and what makes it good firewood',
        '- Middle: burning characteristics, heat output, ideal appliances (stove, fireplace, fire pit)',
        '- Final: practical details (pack format, log size, moisture if known)',
        '- Naturally weave in SEO phrases: "buy firewood online", "hardwood logs", "wood burning stove", "kiln dried firewood", "firewood delivered UK" — use the ones that fit naturally',
        '- Do NOT stuff keywords — they should read naturally',
        '- UK English, no em-dashes',
        'Return only the description text, no quotes, no labels.',
      ].filter(Boolean).join('\n')

    case 'product_seo_title':
      return [
        'Write an SEO-optimised page title (max 60 characters) for a firewood product page on a UK firewood website.',
        `Product name: ${name}`,
        woodContext,
        shortDescription ? `About this product: ${shortDescription}` : '',
        'Requirements:',
        '- Include the product name or key species/type',
        '- Include a high-value search term such as "Buy Online UK", "Kiln Dried", "Hardwood Logs", "Free Delivery" or similar if it fits naturally within the character limit',
        '- End with "| Emberwood"',
        '- Exactly within 60 characters total',
        'Return only the title string, no quotes, no labels.',
      ].filter(Boolean).join('\n')

    case 'product_seo_description':
      return [
        'Write an SEO meta description (max 155 characters) for a firewood product page on a UK firewood website.',
        `Product name: ${name}`,
        woodContext,
        shortDescription ? `About this product: ${shortDescription}` : '',
        'Requirements:',
        '- One to two sentences, written naturally',
        '- Include the product name or species and a high-value keyword such as "buy online", "delivered UK", "kiln dried", "hardwood logs for sale"',
        '- End with a subtle call to action if space allows (e.g. "Order today.")',
        '- Maximum 155 characters',
        '- No em-dashes or en-dashes, UK English',
        'Return ONLY the meta description text. No quotes, no labels.',
      ].filter(Boolean).join('\n')

    case 'product_tags':
      return [
        'Generate 6-10 relevant SEO keywords and tags for a firewood product sold online in the UK.',
        `Product name: ${name}`,
        woodContext,
        shortDescription ? `About this product: ${shortDescription}` : '',
        categoryName ? `Category: ${categoryName}` : '',
        'Requirements:',
        '- Mix of high-volume terms: "buy firewood online", "firewood for sale UK", "kiln dried logs"',
        '- Species-specific terms if applicable: "oak logs", "ash logs", "birch logs"',
        '- Format-specific: "bulk bag", "log crate", "firewood pallet"',
        '- Intent-based: "firewood delivered", "logs near me", "cheap firewood UK", "wood burning stove logs"',
        'Return as a comma-separated list only, no quotes, no labels, no numbering.',
      ].filter(Boolean).join('\n')

    case 'category_description':
      return [
        'Write a concise, SEO-friendly category description (max 120 words) for a firewood product category on a UK firewood website.',
        `Category name: ${name}`,
        existing ? `Existing description to improve: ${existing}` : '',
        'Requirements:',
        '- Explain what this category contains and who it is for',
        '- Naturally include SEO phrases such as "buy firewood online UK", "firewood delivered", "kiln dried logs", "hardwood firewood" where appropriate',
        '- Mention suitable appliances (wood-burning stoves, open fireplaces, fire pits) if relevant',
        '- UK English, conversational but professional tone',
        '- No em-dashes',
        'Return only the description text, no quotes, no labels.',
      ].filter(Boolean).join('\n')

    case 'category_seo_title':
      return [
        'Write an SEO page title (max 60 characters) for a firewood product category page on a UK website.',
        `Category name: ${name}`,
        existing ? `Existing: ${existing}` : '',
        'Requirements:',
        '- Include the category name and a strong UK firewood search term',
        '- Example format: "Kiln Dried Hardwood Logs | Buy Online UK | Emberwood"',
        '- End with "| Emberwood"',
        '- Max 60 characters',
        'Return only the title string, no quotes, no labels.',
      ].filter(Boolean).join('\n')

    case 'category_seo_description':
      return [
        'Write an SEO meta description (max 155 characters) for a firewood category page on a UK firewood website.',
        `Category name: ${name}`,
        shortDescription ? `Category description: ${shortDescription}` : '',
        'Requirements:',
        '- One to two concise sentences',
        '- Include a high-value keyword: "buy firewood online", "firewood for sale", "logs delivered UK"',
        '- Subtle call to action where space allows',
        '- Max 155 characters, UK English, no em-dashes',
        'Return only the meta description string, no quotes, no labels.',
      ].filter(Boolean).join('\n')

    case 'blog_excerpt':
      return [
        'Write a compelling blog post excerpt (2-3 sentences, max 200 characters) for a firewood and home heating article on a UK firewood website.',
        `Blog title: ${name}`,
        existing ? `Existing excerpt to improve: ${existing}` : '',
        'Requirements:',
        '- Engaging hook that draws the reader in',
        '- Naturally reference UK firewood themes: wood-burning stoves, kiln dried logs, heating homes, choosing the right firewood',
        '- Professional but warm tone, UK English',
        '- No em-dashes',
        'Return only the excerpt text, no quotes, no labels.',
      ].filter(Boolean).join('\n')

    case 'blog_content':
      return [
        'Write a well-structured, SEO-optimised blog article body (400-600 words) for a UK firewood website blog.',
        `Blog title: ${name}`,
        shortDescription ? `Summary: ${shortDescription}` : '',
        existing ? `Existing draft to improve: ${existing}` : '',
        'STRUCTURE:',
        '1. Opening paragraph (2-3 sentences introducing the topic for UK readers)',
        '2. A section with a clear heading followed by 4-6 bullet points directly relevant to the title',
        '   Format: "• Point text here" — one per line',
        '3. One or two closing paragraphs with practical advice or a natural call to action',
        'SEO REQUIREMENTS:',
        '- Naturally weave in 2-4 of these keywords: "buy firewood online UK", "kiln dried logs", "hardwood firewood", "wood burning stove logs", "firewood delivered", "logs for sale near me"',
        '- Do not keyword-stuff — placement must feel natural',
        'WRITING RULES:',
        '- Warm, helpful, expert tone — like advice from a firewood specialist',
        '- UK English throughout',
        '- No em-dashes or en-dashes',
        '- Separate paragraphs with a blank line',
        '- Never mention laboratory, research, peptides, clinical or scientific use',
        'Return only the article body text, no title, no quotes, no labels.',
      ].filter(Boolean).join('\n')

    default:
      throw new ApiError(400, `Unknown generation type: ${type}`)
  }
}

const generateSchema = z.object({
  type: z.enum([
    'product_short_description',
    'product_long_description',
    'product_seo_title',
    'product_seo_description',
    'product_tags',
    'category_description',
    'category_seo_title',
    'category_seo_description',
    'blog_excerpt',
    'blog_content',
  ]),
  context: z.object({
    name: z.string().max(300).optional(),
    sku: z.string().max(100).optional(),
    shortDescription: z.string().max(1000).optional(),
    longDescription: z.string().max(5000).optional(),
    woodSpecies: z.string().max(200).optional(),
    woodType: z.string().max(100).optional(),
    woodCondition: z.string().max(100).optional(),
    packFormat: z.string().max(100).optional(),
    categoryName: z.string().max(200).optional(),
    existing: z.string().max(5000).optional(),
  }),
})

/**
 * POST /api/v1/ai/generate
 * Admin only — generate SEO-optimised firewood content using the Groq API.
 * API key is server-side only and never reaches the client.
 */
aiRouter.post(
  '/generate',
  requireAuth,
  requireAdminAuth,
  validateBody(generateSchema),
  async (req, res, next) => {
    try {
      if (!env.GROQ_API_KEY) {
        throw new ApiError(503, 'AI generation is not configured. Add GROQ_API_KEY to the server environment.')
      }

      const { type, context } = req.body as z.infer<typeof generateSchema>
      const prompt = buildPrompt(type as GenerationType, context)

      const { default: Groq } = await import('groq-sdk')
      const groq = new Groq({ apiKey: env.GROQ_API_KEY })

      const completion = await groq.chat.completions.create({
        model: 'openai/gpt-oss-120b',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
        temperature: 0.4,
        max_tokens: 900,
      })

      let generated = completion.choices[0]?.message?.content?.trim() ?? ''

      // Strip em/en dashes that slip through despite the system prompt rule
      generated = generated.replace(/[—–]/g, ',').replace(/\s,/g, ',').trim()

      // Trim meta descriptions to 155 chars at a word boundary
      if (type === 'product_seo_description' || type === 'category_seo_description') {
        if (generated.length > 155) {
          generated = generated.substring(0, 152).replace(/\s+\S*$/, '') + '...'
        }
      }

      // Trim SEO titles to 60 chars
      if (type === 'product_seo_title' || type === 'category_seo_title') {
        if (generated.length > 60) {
          generated = generated.substring(0, 57).replace(/\s+\S*$/, '') + '...'
        }
      }

      if (!generated) throw new ApiError(500, 'AI returned an empty response. Please try again.')

      ok(res, { generated })
    } catch (err) {
      if ((err as { status?: number }).status && !(err instanceof ApiError)) {
        return next(new ApiError(502, `AI service error: ${(err as Error).message}`))
      }
      next(err)
    }
  }
)
