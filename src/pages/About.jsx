export default function About() {
    return (
        <div className="page-enter">
            <section className="section container">
                <span className="badge badge-teal">Project Information</span>
                <h1 className="section-title" style={{ marginTop: 12 }}>About RainCorrect</h1>
                <p className="section-subtitle">
                    An ML-based framework for correcting satellite precipitation biases over Kerala, India.
                </p>

                <div className="grid-2">
                    {/* Project Overview */}
                    <div className="glass-card method-card">
                        <div className="method-icon">📋</div>
                        <h3>Project Overview</h3>
                        <p>
                            RainCorrect addresses the systematic biases in NASA GPM IMERG satellite precipitation
                            estimates over Kerala's complex terrain. Using terrain-aware machine learning models,
                            the framework produces bias-corrected daily rainfall estimates that better align with
                            IMD ground truth observations.
                        </p>
                        <ul>
                            <li>Period: 2021–2024</li>
                            <li>Region: Kerala, India (14 districts)</li>
                            <li>Models: Random Forest, XGBoost, LightGBM</li>
                            <li>Predictors: Elevation, slope, coastal distance</li>
                        </ul>
                    </div>

                    {/* Objectives */}
                    <div className="glass-card method-card">
                        <div className="method-icon">🎯</div>
                        <h3>Objectives</h3>
                        <p>
                            The project aims to improve satellite-based rainfall monitoring over India's Western
                            Ghats through:
                        </p>
                        <ul>
                            <li>Quantifying IMERG biases across diverse terrain</li>
                            <li>Training terrain-aware ML correction models</li>
                            <li>Validating 2024 Data</li>
                            <li>Case study of extreme Wayanad floods</li>
                            <li>District-level performance assessment</li>
                        </ul>
                    </div>
                </div>

                {/* Tech Stack */}
                <div style={{ marginTop: 48 }}>
                    <h2 className="section-title">Technology Stack</h2>
                    <div className="grid-4" style={{ marginTop: 24 }}>
                        {[
                            { icon: '🐍', name: 'Python', desc: 'Data processing & ML' },
                            { icon: '🌍', name: 'xarray / netCDF4', desc: 'Gridded data handling' },
                            { icon: '🤖', name: 'scikit-learn', desc: 'ML model training' },
                            { icon: '⚡', name: 'XGBoost · LightGBM', desc: 'Gradient boosting' },
                            { icon: '📊', name: 'Matplotlib', desc: 'Visualization' },
                            { icon: '🗺️', name: 'GeoPandas', desc: 'Spatial analysis' },
                            { icon: '⚛️', name: 'React + Vite', desc: 'Interactive web app' },
                            { icon: '🗄️', name: 'Leaflet', desc: 'Interactive maps' },
                        ].map((t, i) => (
                            <div className="glass-card" key={i} style={{ textAlign: 'center', padding: '24px 16px' }}>
                                <div style={{ fontSize: '2rem', marginBottom: 8 }}>{t.icon}</div>
                                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 4 }}>{t.name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Data Sources */}
                <div style={{ marginTop: 48 }}>
                    <h2 className="section-title">Data Sources</h2>
                    <div className="grid-3" style={{ marginTop: 24 }}>
                        {[
                            {
                                icon: '🛰️', name: 'NASA GPM IMERG v07',
                                desc: 'Global Precipitation Measurement mission — Integrated Multi-satellite Retrievals.',
                                link: 'https://gpm.nasa.gov/data/imerg',
                            },
                            {
                                icon: '📡', name: 'IMD Gridded Rainfall',
                                desc: 'India Meteorological Department gauge-based gridded rainfall analysis.',
                                link: 'https://www.imdpune.gov.in/',
                            },
                            {
                                icon: '🏔️', name: 'ALOS 3D 30m DEM',
                                desc: 'JAXA ALOS World 3D 30m digital elevation model for terrain features.',
                                link: 'https://www.usgs.gov/centers/eros/science/usgs-eros-archive-digital-elevation-shuttle-radar-topography-mission-srtm-1',
                            },
                        ].map((d, i) => (
                            <div className="glass-card method-card" key={i}>
                                <div className="method-icon">{d.icon}</div>
                                <h3>{d.name}</h3>
                                <p>{d.desc}</p>
                                <a
                                    href={d.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ display: 'inline-block', marginTop: 12, fontSize: '0.85rem' }}
                                >
                                    Visit Source →
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team — GeoCoders */}
                <div style={{ marginTop: 48 }}>
                    <h2 className="section-title">Team GeoCoders</h2>
                    <p className="section-subtitle">
                        Built at the DTU Geospatial Hackathon — improving remote sensing precipitation products
                        over India's complex terrain regions.
                    </p>

                    <div className="grid-2" style={{ marginTop: 24 }}>
                        {[
                            { name: 'Dev Kumar', uni: 'Amity University, Uttar Pradesh' },
                            { name: 'Suhail Khan', uni: 'University of Ladakh, Kargil Campus' },
                            { name: 'Anurag Sharma', uni: 'University of Jammu' },
                            { name: 'Harshini Sivakumar', uni: 'Amity University, Uttar Pradesh' },
                        ].map((m, i) => (
                            <div className="glass-card" key={i} style={{ padding: '24px' }}>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 2 }}>{m.name}</div>
                                    <div style={{ fontSize: '0.82rem', color: 'var(--accent)', fontWeight: 500, marginBottom: 4 }}>{m.uni}</div>

                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="glass-card" style={{ marginTop: 24, textAlign: 'center', padding: '32px', borderLeft: '3px solid var(--accent)' }}>
                        <div style={{ fontSize: '1.8rem', marginBottom: 12 }}>🎓</div>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: 8 }}>DTU Geospatial Hackathon</h3>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto', fontSize: '0.9rem', lineHeight: 1.7 }}>
                            This project tackles the critical challenge of satellite precipitation bias correction
                            using terrain-aware machine learning. By combining NASA IMERG satellite data with
                            IMD ground observations and geospatial predictors (elevation, slope, coastal distance),
                            our models significantly reduce rainfall estimation errors across Kerala's 14 districts —
                            with particular focus on extreme events like the 2024 Wayanad landslide.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
