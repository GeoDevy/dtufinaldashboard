import { useState } from 'react';

export default function CaseStudy() {
    const [lightbox, setLightbox] = useState(null);

    const allModelsGraph = {
        src: '/images/wayanad_july_2024_rainfall_green_all.png',
        caption: 'Wayanad July 2024 — All Models vs IMD Ground Truth',
    };

    const modelGraphs = [
        { src: '/images/wayanad_rf.png', caption: 'Random Forest Correction', icon: '🌲' },
        { src: '/images/wayanad_xgb.png', caption: 'XGBoost Correction', icon: '⚡' },
        { src: '/images/wayanad_lgb.png', caption: 'LightGBM Correction', icon: '🍃' },
    ];

    const errorGraph = {
        src: '/images/error_distribution_green_all.png',
        caption: 'Error Distribution — All Models vs Raw IMERG',
    };

    return (
        <div className="page-enter">
            <section className="section container">
                <span className="badge badge-teal">Extreme Event Analysis</span>
                <h1 className="section-title" style={{ marginTop: 12 }}>Wayanad Case Study</h1>
                <p className="section-subtitle">
                    Evaluating ML-corrected rainfall during the catastrophic July 2024 Wayanad floods —
                    one of Kerala's deadliest landslide disasters.
                </p>

                {/* Event Overview */}
                <div className="glass-card" style={{ marginBottom: 32 }}>
                    <div className="event-header">
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>🚨 July 30, 2024 — Wayanad Disaster</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                                On July 30, 2024, extreme rainfall triggered devastating landslides in Mundakkai and
                                Chooralmala regions of Wayanad district. Over <strong style={{ color: 'var(--accent)' }}>200+ lives</strong> were
                                lost and thousands displaced. The event exposed critical gaps in satellite precipitation
                                monitoring over complex mountainous terrain.
                            </p>
                        </div>
                    </div>
                    <div className="grid-3" style={{ marginTop: 24 }}>
                        <div className="stat-card">
                            <div className="stat-value">951m</div>
                            <div className="stat-label">Station Elevation</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">63.9km</div>
                            <div className="stat-label">Distance to Coast</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">Jul</div>
                            <div className="stat-label">Peak Monsoon Month</div>
                        </div>
                    </div>
                </div>

                {/* Why It Matters */}
                <div className="glass-card method-card" style={{ marginBottom: 32 }}>
                    <div className="method-icon">🎯</div>
                    <h3>Why Bias Correction Matters Here</h3>
                    <p>
                        The Wayanad grid point (11.75°N, 76.25°E) sits at 951m elevation in the Western Ghats highlands
                        with complex terrain. Satellite sensors systematically <strong>underestimate</strong> orographic
                        rainfall in such regions due to beam blockage and terrain-induced convective processes that
                        are difficult to capture from space.
                    </p>
                    <ul>
                        <li>IMERG often underestimates heavy rainfall events by 30–50% over Western Ghats</li>
                        <li>High elevation + steep slopes create strong orographic precipitation enhancement</li>
                        <li>Bias correction is critical for early warning systems and disaster preparedness</li>
                    </ul>
                </div>

                {/* July 2024 Rainfall — All Models (Full Width) */}
                <div style={{ marginBottom: 40 }}>
                    <h2 className="section-title">July 2024 Rainfall Overview</h2>
                    <p className="section-subtitle">
                        Daily rainfall at Wayanad grid point with landslide event marker — all ML models vs. IMD ground truth.
                    </p>
                    <div className="image-gallery" style={{ gridTemplateColumns: '1fr' }}>
                        <div className="gallery-item" onClick={() => setLightbox(allModelsGraph.src)}>
                            <img src={allModelsGraph.src} alt={allModelsGraph.caption} loading="lazy" />
                            <div className="caption">{allModelsGraph.caption}</div>
                        </div>
                    </div>
                </div>

                {/* Individual Model Corrections (3-column grid) */}
                <div style={{ marginBottom: 40 }}>
                    <h2 className="section-title">Individual Model Corrections</h2>
                    <p className="section-subtitle">
                        Detailed view of each ML model's rainfall correction performance for Wayanad, July 2024.
                    </p>
                    <div className="image-gallery">
                        {modelGraphs.map((m, i) => (
                            <div className="gallery-item" key={i} onClick={() => setLightbox(m.src)}>
                                <img src={m.src} alt={m.caption} loading="lazy" />
                                <div className="caption">{m.icon} {m.caption}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Error Distribution (Full Width) */}
                <div style={{ marginTop: 48 }}>
                    <h2 className="section-title">Error Distribution Analysis</h2>
                    <p className="section-subtitle">
                        Distribution of prediction errors across all grid points (2024 test set).
                        ML models produce narrower, more centered distributions than raw IMERG.
                    </p>
                    <div className="image-gallery" style={{ gridTemplateColumns: '1fr' }}>
                        <div className="gallery-item" onClick={() => setLightbox(errorGraph.src)}>
                            <img src={errorGraph.src} alt={errorGraph.caption} loading="lazy" />
                            <div className="caption">{errorGraph.caption}</div>
                        </div>
                    </div>
                </div>

                {/* Key Takeaway */}
                <div className="glass-card" style={{ marginTop: 32, display: 'flex', gap: 16, alignItems: 'flex-start', borderLeft: '3px solid var(--accent)' }}>
                    <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>📈</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        <strong>Key Takeaway:</strong> On July 30, IMD recorded 93 mm/day at Wayanad while raw IMERG
                        showed only ~19 mm/day — a massive underestimation. XGBoost and Random Forest corrections improved
                        this significantly, though all models struggled with the extreme magnitude. The error distribution
                        confirms ML models produce tighter, more symmetric error distributions compared to the wider spread
                        of raw IMERG errors.
                    </div>
                </div>
            </section>

            {lightbox && (
                <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
                    <img src={lightbox} alt="Preview" />
                </div>
            )}
        </div>
    );
}
