import { useState } from 'react';

export default function Maps() {
    const [lightbox, setLightbox] = useState(null);

    const maps = [
        { src: '/images/study_area_map.png', caption: 'Study Area Map — Kerala & Grid Points', category: 'Study Area' },
        { src: '/images/kerala_dem_cartographic_map.png', caption: 'Digital Elevation Model (DEM) — Cartographic Map', category: 'Topography' },
        { src: '/images/predictor_map_imerg.png', caption: 'IMERG Rainfall — Spatial Distribution', category: 'Predictors' },
        { src: '/images/predictor_map_coast.png', caption: 'Distance to Coast — Spatial Map', category: 'Predictors' },
        { src: '/images/predictor_map_slope.png', caption: 'Terrain Slope — Spatial Map', category: 'Predictors' },
    ];

    const [filter, setFilter] = useState('All');
    const categories = ['All', 'Study Area', 'Topography', 'Predictors'];
    const filtered = filter === 'All' ? maps : maps.filter(m => m.category === filter);

    return (
        <div className="page-enter">
            <section className="section container">
                <span className="badge badge-teal">Spatial Visualizations</span>
                <h1 className="section-title" style={{ marginTop: 12 }}>Maps & Cartography</h1>
                <p className="section-subtitle">
                    Explore the study area, topographic features, and predictor variable maps used in the
                    bias correction framework.
                </p>

                <div className="tabs">
                    {categories.map(c => (
                        <button
                            key={c}
                            className={`tab ${filter === c ? 'active' : ''}`}
                            onClick={() => setFilter(c)}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                <div className="image-gallery">
                    {filtered.map((m, i) => (
                        <div className="gallery-item" key={i} onClick={() => setLightbox(m.src)}>
                            <img src={m.src} alt={m.caption} loading="lazy" />
                            <div className="caption">{m.caption}</div>
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
