import { useState } from 'react';

export default function Methodology() {
    const [lightbox, setLightbox] = useState(null);

    const predictorMaps = [
        { src: '/images/predictor_map_imerg.png', caption: 'IMERG Rainfall Grid' },
        { src: '/images/predictor_map_coast.png', caption: 'Distance to Coast' },
        { src: '/images/predictor_map_slope.png', caption: 'Terrain Slope' },
    ];

    return (
        <div className="page-enter">
            <section className="section container">
                <span className="badge badge-teal">How It Works</span>
                <h1 className="section-title" style={{ marginTop: 12 }}>Methodology</h1>
                <p className="section-subtitle">
                    A terrain-aware machine learning pipeline that corrects satellite rainfall biases using
                    topographic features and ground truth validation.
                </p>

                {/* Pipeline Flow */}
                <div className="flow-diagram">
                    {[
                        { icon: '🛰️', title: 'IMERG v07', desc: '0.1° daily rainfall' },
                        { icon: '📡', title: 'IMD Ground', desc: '0.25° daily truth' },
                        { icon: '🏔️', title: 'DEM Features', desc: 'Elevation, slope, coast' },
                        { icon: '⚙️', title: 'ML Models', desc: 'RF · XGB · LGB' },
                        { icon: '✅', title: 'Corrected', desc: 'Bias-corrected output' },
                    ].map((s, i, arr) => (
                        <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="flow-step slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                                <div className="step-icon">{s.icon}</div>
                                <div className="step-title">{s.title}</div>
                                <div className="step-desc">{s.desc}</div>
                            </div>
                            {i < arr.length - 1 && <span className="flow-arrow">→</span>}
                        </span>
                    ))}
                </div>
            </section>

            {/* Data Sources */}
            <section className="section container">
                <h2 className="section-title">Data Sources</h2>
                <div className="grid-2">
                    <div className="glass-card method-card">
                        <div className="method-icon">🛰️</div>
                        <h3>NASA GPM IMERG v07</h3>
                        <p>
                            Integrated Multi-satellite Retrievals for GPM, providing global daily
                            precipitation estimates at 0.1° × 0.1° spatial resolution.
                        </p>
                        <ul>
                            <li>Final Run product (research-grade)</li>
                            <li>Period: 2001–2024</li>
                            <li>Resolution: 0.1° (~10 km)</li>
                        </ul>
                    </div>
                    <div className="glass-card method-card">
                        <div className="method-icon">📡</div>
                        <h3>IMD Gridded Rainfall</h3>
                        <p>
                            India Meteorological Department's gauge-based gridded rainfall dataset,
                            used as ground truth for training and validation.
                        </p>
                        <ul>
                            <li>Station-interpolated gridded product</li>
                            <li>Resolution: 0.25° (~25 km)</li>
                            <li>High-quality gauge network over Kerala</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Feature Engineering */}
            <section className="section container">
                <h2 className="section-title">Feature Engineering</h2>
                <p className="section-subtitle">Topographic predictors capture terrain-induced rainfall bias patterns.</p>
                <div className="grid-3">
                    {[
                        {
                            icon: '🏔️', title: 'Elevation',
                            desc: 'ALOS 3D 30m DEM-derived elevation at each grid point. Higher elevations correlate with orographic enhancement of precipitation.',
                        },
                        {
                            icon: '📐', title: 'Terrain Slope',
                            desc: 'Computed from DEM to capture windward vs. leeward effects on rainfall distribution across the Western Ghats.',
                        },
                        {
                            icon: '🌊', title: 'Distance to Coast',
                            desc: 'Euclidean distance from each grid point to the nearest coastline, capturing maritime moisture influence.',
                        },
                    ].map((f, i) => (
                        <div className="glass-card method-card" key={i}>
                            <div className="method-icon">{f.icon}</div>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Predictor Maps */}
            <section className="section container">
                <h2 className="section-title">Predictor Maps</h2>
                <div className="image-gallery">
                    {predictorMaps.map((m, i) => (
                        <div className="gallery-item" key={i} onClick={() => setLightbox(m.src)}>
                            <img src={m.src} alt={m.caption} loading="lazy" />
                            <div className="caption">{m.caption}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ML Models */}
            <section className="section container">
                <h2 className="section-title">Machine Learning Models</h2>
                <div className="grid-3">
                    {[
                        {
                            icon: '🌲', title: 'Random Forest',
                            desc: 'Ensemble of decision trees with bagging. Robust to outliers and effective for capturing non-linear feature interactions.',
                            tag: 'Best R²',
                        },
                        {
                            icon: '⚡', title: 'XGBoost',
                            desc: 'Gradient-boosted trees with regularization. Excels at learning complex error patterns across diverse terrain types.',
                            tag: 'Fast Training',
                        },
                        {
                            icon: '🍃', title: 'LightGBM',
                            desc: 'Leaf-wise tree growth with histogram-based splitting. Memory-efficient and optimized for large gridded datasets.',
                            tag: 'Scalable',
                        },
                    ].map((m, i) => (
                        <div className="glass-card method-card" key={i}>
                            <div className="method-icon">{m.icon}</div>
                            <h3>{m.title}</h3>
                            <span className="badge badge-teal" style={{ marginBottom: 12 }}>{m.tag}</span>
                            <p>{m.desc}</p>
                        </div>
                    ))}
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
