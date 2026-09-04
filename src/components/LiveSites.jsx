import './LiveSites.css'

const SITES = [
  {
    name: 'Nutrify',
    tag: 'Fertilizer D2C',
    url: 'https://nutrifyagri.in', // TODO: replace with real Nutrify URL
  },
  {
    name: 'Acasia Techno',
    tag: 'AgTech platform',
    url: 'https://acasiatechno.com', // TODO: replace with real Acasia Techno URL
  },
  {
    name: 'Nutricrop',
    tag: 'Crop nutrition brand',
    url: 'https://nutricropsagri.in', // TODO: replace with real Nutricrop URL
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
        <span className="live-card__dot" />
        <span className="live-card__dot" />
        <span className="live-card__dot" />
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
        <span className="live-card__name">{site.name}</span>
        <span className="live-card__tag">{site.tag}</span>
        <span className="live-card__cta">Visit site ↗</span>
      </div>
    </a>
  )
}

export default function LiveSites() {
  return (
    <section className="live-sites" id="live-sites">
      <div className="live-sites__head">
        <p className="live-sites__eyebrow">Live on the web</p>
        <h2 className="live-sites__title">Websites we've shipped</h2>
        <p className="live-sites__sub">
          Hover a preview to scroll through the live site.
        </p>
      </div>

      <div className="live-sites__grid">
        {SITES.map((site) => (
          <LiveCard key={site.name} site={site} />
        ))}
      </div>
    </section>
  )
}