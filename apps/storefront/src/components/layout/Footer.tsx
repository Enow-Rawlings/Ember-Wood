import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, ArrowRight } from 'lucide-react'
import { useLocale } from '@/context/LocaleContext'

function EmberwoodLogoMark() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-9 w-9 flex-shrink-0" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#C46B3C" />
      <path d="M20 6 C15 13 11 16 11 23 C11 29.6 15 34 20 36 C25 34 29 29.6 29 23 C29 16 25 13 20 6Z" fill="white" />
      <path d="M20 12 C17.5 17 16 19.5 16 24 C16 27.5 17.7 30.5 20 32 C22.3 30.5 24 27.5 24 24 C24 19.5 22.5 17 20 12Z" fill="#C46B3C" opacity="0.35" />
    </svg>
  )
}

export function Footer() {
  const { t } = useLocale()

  const footerNav = {
    [t('footer.groupShop')]: [
      { label: t('footer.linkAllFirewood'),       href: '/shop'                     },
      { label: t('footer.linkHardwoodLogs'),      href: '/category/hardwood-logs'   },
      { label: t('footer.linkSoftwoodLogs'),      href: '/category/softwood-logs'   },
      { label: t('footer.linkKindling'),          href: '/category/kindling'        },
      { label: t('footer.linkLogsAndBriquettes'), href: '/category/logs-briquettes' },
      { label: t('footer.linkTimber'),            href: '/category/timber'          },
    ],
    [t('footer.groupInformation')]: [
      { label: t('footer.linkFirewoodGuide'),     href: '/firewood-guide' },
      { label: t('footer.linkDeliveryInfo'),      href: '/delivery'       },
      { label: t('footer.linkAbout'),             href: '/about'          },
      { label: t('footer.linkBlog'),              href: '/blog'           },
      { label: t('footer.linkFaq'),               href: '/help'           },
    ],
    [t('footer.groupSupport')]: [
      { label: t('footer.linkContact'),           href: '/contact'      },
      { label: t('footer.linkTrackOrder'),        href: '/track-order'  },
      { label: t('footer.linkReturns'),           href: '/returns'      },
      { label: t('footer.linkShipping'),          href: '/shipping'     },
    ],
    [t('footer.groupLegal')]: [
      { label: t('footer.linkPrivacy'),           href: '/privacy'       },
      { label: t('footer.linkTerms'),             href: '/terms'         },
      { label: t('footer.linkCookies'),           href: '/cookies'       },
      { label: t('footer.linkAccessibility'),     href: '/accessibility' },
    ],
  }

  return (
    <footer className="bg-forest-green dark:bg-[#0F1512] text-cream/80">
      {/* Top banner */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-center sm:flex-row sm:text-left sm:px-6 lg:px-8">
          <div>
            <p className="font-heading text-lg font-semibold text-cream">{t('footer.freeDeliveryBanner')}</p>
            <p className="mt-0.5 text-sm text-cream/60">{t('footer.freeDeliverySub')}</p>
          </div>
          <Link to="/delivery"
            className="inline-flex items-center gap-2 rounded-lg border border-ember-orange px-5 py-2.5 text-sm font-semibold text-ember-orange no-underline transition-all hover:bg-ember-orange hover:text-white">
            {t('footer.checkDelivery')} <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 no-underline" aria-label="Emberwood home">
              <EmberwoodLogoMark />
              <div className="flex flex-col leading-none">
                <span className="font-heading text-base font-bold tracking-wide text-cream">EMBERWOOD</span>
                <span className="text-[9px] uppercase tracking-[0.16em] text-cream/40">Firewood &amp; Timber</span>
              </div>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/55">{t('footer.tagline')}</p>
            <p className="mt-3 text-xs italic text-cream/35">{t('footer.motto')}</p>

            <div className="mt-6 space-y-2">
              <a href="mailto:hello@emberwood.co.uk"
                className="flex items-center gap-2 text-sm text-cream/60 no-underline transition-colors hover:text-cream">
                <Mail size={13} className="flex-shrink-0 text-ember-orange" aria-hidden="true" />
                hello@emberwood.co.uk
              </a>
              <a href="tel:+441234567890"
                className="flex items-center gap-2 text-sm text-cream/60 no-underline transition-colors hover:text-cream">
                <Phone size={13} className="flex-shrink-0 text-ember-orange" aria-hidden="true" />
                +44 (0) 1234 567 890
              </a>
              <div className="flex items-center gap-2 text-sm text-cream/50">
                <MapPin size={13} className="flex-shrink-0 text-ember-orange" aria-hidden="true" />
                United Kingdom &amp; France
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              {[
                { icon: <Instagram size={16} aria-hidden="true" />, href: '#', label: 'Instagram' },
                { icon: <Facebook  size={16} aria-hidden="true" />, href: '#', label: 'Facebook'  },
                { icon: <Youtube   size={16} aria-hidden="true" />, href: '#', label: 'YouTube'   },
              ].map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-cream/50 no-underline transition-all hover:border-ember-orange hover:bg-ember-orange/10 hover:text-ember-orange">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-3 lg:grid-cols-4">
            {Object.entries(footerNav).map(([group, links]) => (
              <div key={group}>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-cream">{group}</h3>
                <ul className="space-y-2" role="list">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link to={link.href} className="text-sm text-cream/50 no-underline transition-colors hover:text-cream">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 px-6 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-heading text-sm font-semibold text-cream">{t('footer.seasonalTips')}</p>
              <p className="mt-0.5 text-xs text-cream/50">{t('footer.newsletterSub')}</p>
            </div>
            <form onSubmit={(e) => e.preventDefault()}
              className="flex w-full gap-2 sm:w-auto sm:min-w-[340px]"
              aria-label="Newsletter signup">
              <input type="email" placeholder={t('footer.emailPlaceholder')} aria-label={t('footer.emailPlaceholder')}
                className="min-w-0 flex-1 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm text-cream placeholder-cream/30 focus:border-ember-orange focus:outline-none focus:ring-1 focus:ring-ember-orange" />
              <button type="submit"
                className="flex-shrink-0 rounded-lg bg-ember-orange px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#a85a30]">
                {t('common.subscribe')}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-cream/35">&copy; {new Date().getFullYear()} Emberwood. {t('footer.allRightsReserved')}</p>
          <p className="text-xs text-cream/25">{t('footer.priceDisclaimer')}</p>
        </div>
      </div>
    </footer>
  )
}
