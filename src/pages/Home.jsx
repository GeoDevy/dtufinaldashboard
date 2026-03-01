import { MapContainer, TileLayer, CircleMarker, Popup, Polygon } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { keralaGridPoints, keralaBoundary } from '../data/metricsData';
import 'leaflet/dist/leaflet.css';

export default function Home() {
    return (
        <div className="page-enter">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-dots" />
                <div className="container">
                    <div className="hero-content">
                        <span className="badge badge-teal" style={{ animation: 'slideInLeft 0.6s ease' }}>ML-Powered Precipitation Correction</span>
                        <h1 className="hero-title">
                            Rain<span className="hero-accent">Correct</span>
                        </h1>
                        <p className="hero-subtitle">
                            Machine Learning–based bias correction framework for NASA GPM IMERG satellite
                            precipitation estimates over Kerala, India - validated against IMD ground truth data.
                        </p>
                        <div className="hero-actions">
                            <Link to="/results" className="btn btn-primary">View Results →</Link>
                            <Link to="/methodology" className="btn btn-outline">Methodology</Link>
                        </div>
                    </div>
                </div>
                <div className="hero-bg-glow" />
                <div className="hero-bg-glow-2" />
            </section>

            {/* Stats */}
            <section className="container">
                <div className="grid-4 stats-row">
                    {[
                        { value: '3', label: 'ML Models' },
                        { value: '14', label: 'Districts' },
                        { value: '12', label: 'Grid Stations' },
                        { value: '2024', label: 'Validation Year' },
                    ].map((s, i) => (
                        <div className="glass-card stat-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                            <div className="stat-value">{s.value}</div>
                            <div className="stat-label">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Interactive Map Section */}
            <section className="section container">
                <h2 className="section-title">Study Area - Kerala, India</h2>
                <p className="section-subtitle">
                    Interactive topographic map showing the 12 IMERG grid points used for bias correction.
                    Click markers for station details.
                </p>
                <div className="map-wrapper">
                    <MapContainer
                        center={[10.5, 76.3]}
                        zoom={7}
                        style={{ height: '560px', width: '100%' }}
                        scrollWheelZoom={true}
                    >
                        <TileLayer
                            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
                        />
                        <Polygon
                            positions={keralaBoundary}
                            pathOptions={{
                                color: '#14b8a6',
                                weight: 2,
                                fillColor: '#14b8a6',
                                fillOpacity: 0.05,
                                dashArray: '6 4',
                            }}
                        />
                        {keralaGridPoints.map((pt, i) => (
                            <CircleMarker
                                key={i}
                                center={[pt.lat, pt.lon]}
                                radius={8}
                                pathOptions={{
                                    color: '#14b8a6',
                                    fillColor: pt.elevation > 500 ? '#f59e0b' : pt.elevation > 100 ? '#06b6d4' : '#22c55e',
                                    fillOpacity: 0.85,
                                    weight: 2,
                                }}
                            >
                                <Popup>
                                    <div className="popup-title">{pt.name}</div>
                                    <div className="popup-row"><span className="popup-label">Lat, Lon</span><span className="popup-value">{pt.lat}°N, {pt.lon}°E</span></div>
                                    <div className="popup-row"><span className="popup-label">Elevation</span><span className="popup-value">{pt.elevation} m</span></div>
                                    <div className="popup-row"><span className="popup-label">Dist to Coast</span><span className="popup-value">{pt.dist_coast} km</span></div>
                                    <div className="popup-row"><span className="popup-label">Slope</span><span className="popup-value">{pt.slope}°</span></div>
                                </Popup>
                            </CircleMarker>
                        ))}
                    </MapContainer>
                </div>
                <div className="map-legend">
                    <span className="legend-item"><span className="legend-dot" style={{ background: '#22c55e' }} /> Low (&lt;100m)</span>
                    <span className="legend-item"><span className="legend-dot" style={{ background: '#06b6d4' }} /> Medium (100–500m)</span>
                    <span className="legend-item"><span className="legend-dot" style={{ background: '#f59e0b' }} /> Highland (&gt;500m)</span>
                </div>
            </section>

            {/* Highlights */}
            <section className="section container">
                <h2 className="section-title">Project Highlights</h2>
                <div className="grid-3">
                    {[
                        {
                            icon: '🛰️',
                            title: 'Satellite Data',
                            desc: 'NASA GPM IMERG v07 daily precipitation at 0.1° resolution as input.',
                        },
                        {
                            icon: '🏔️',
                            title: 'Terrain-Aware',
                            desc: 'Elevation, slope, and coastal proximity used as correction predictors.',
                        },
                        {
                            icon: '🤖',
                            title: 'Ensemble ML',
                            desc: 'Random Forest, XGBoost, and LightGBM models for robust correction.',
                        },
                    ].map((h, i) => (
                        <div className="glass-card method-card" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
                            <div className="method-icon">{h.icon}</div>
                            <h3>{h.title}</h3>
                            <p>{h.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <style>{`
        .hero {
          position: relative;
          padding: 110px 0 70px;
          overflow: hidden;
          background: linear-gradient(160deg, rgba(248,250,252,1) 0%, rgba(241,245,249,0.6) 40%, rgba(209,250,229,0.15) 100%);
        }
        .hero-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 1px 1px, rgba(13,148,136,0.06) 1px, transparent 0);
          background-size: 28px 28px;
          pointer-events: none;
        }
        .hero-content {
          max-width: 680px;
          position: relative;
          z-index: 1;
        }
        .hero-title {
          font-size: 4.2rem;
          font-weight: 800;
          line-height: 1.08;
          margin: 16px 0 20px;
          letter-spacing: -1.5px;
        }
        .hero-accent {
          background: linear-gradient(135deg, var(--accent-dark), var(--accent-light), #34d399);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s ease infinite;
        }
        .hero-subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 32px;
        }
        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .hero-bg-glow {
          position: absolute;
          top: -40%;
          right: -15%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(13, 148, 136, 0.07) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          animation: float 8s ease-in-out infinite;
        }
        .hero-bg-glow-2 {
          position: absolute;
          bottom: -30%;
          left: -10%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          animation: float 10s ease-in-out infinite reverse;
        }
        .stats-row {
          margin-top: -20px;
        }
        .map-wrapper {
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border-accent);
        }
        .map-legend {
          display: flex;
          gap: 24px;
          justify-content: center;
          margin-top: 16px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 4px rgba(0,0,0,0.1);
        }
        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem; }
          .hero { padding: 70px 0 50px; }
        }
      `}</style>
        </div>
    );
}
