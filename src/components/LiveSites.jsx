import './LiveSites.css'

const SITES = [
  {
    name: 'Nutrify',
    tag: 'Fertilizer D2C',
    url: 'https://nutrifyagri.in',
  },
  {
    name: 'Acasia Techno',
    tag: 'AgTech platform',
    url: 'https://acasiatechno.com',
  },
  {
    name: 'Nutricrop',
    tag: 'Crop nutrition brand',
    url: 'https://nutricropsagri.in',
  },
]

function LiveCard({ site }) {
  return (
    <a
      className="live-card"
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="live-card__browser">
        <span className="live-card__dot live-card__dot--red" />
        <span className="live-card__dot live-card__dot--yellow" />
        <span className="live-card__dot live-card__dot--green" />
        <span className="live-card__url">{site.url.replace(/^https?:\/\//, '')}</span>
      </div>

      <div className="live-card__viewport">
        <iframe
          src={site.url}
          title={site.name}
          className="live-card__iframe"
          loading="lazy"
          tabIndex={-1}
        />
        <div className="live-card__shield" />
      </div>

      <div className="live-card__label">
        <div className="live-card__label-top">
          <span className="live-card__name">{site.name}</span>
          <span className="live-card__tag">{site.tag}</span>
        </div>
        <span className="live-card__cta">
          Visit site
          <svg className="live-card__arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    </a>
  )
}

export default function LiveSites() {
  return (
    <section className="live-sites" id="live-sites">
      <div className="live-sites__head">
        <p className="live-sites__eyebrow">Live on the web</p>
        <h2 className="live-sites__title">Websites We've Built</h2>

      </div>

      <div className="live-sites__grid">
        {SITES.map((site) => (
          <LiveCard key={site.name} site={site} />
        ))}
      </div>
    </section>
  )
}