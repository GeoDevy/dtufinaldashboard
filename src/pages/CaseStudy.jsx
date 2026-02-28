import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale, LinearScale, PointElement, LineElement,
    Title, Tooltip, Legend, Filler,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { wayanadJulyData, errorDistribution } from '../data/timeSeriesData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// Try registering annotation plugin if available
try { ChartJS.register(annotationPlugin); } catch (e) { /* optional */ }

const modelColors = {
    rf: { border: '#22c55e', bg: 'rgba(34,197,94,0.12)', label: 'Random Forest' },
    xgb: { border: '#3b82f6', bg: 'rgba(59,130,246,0.12)', label: 'XGBoost' },
    lgb: { border: '#fbbf24', bg: 'rgba(251,191,36,0.12)', label: 'LightGBM' },
};

export default function CaseStudy() {
    const [rainfallView, setRainfallView] = useState('all');

    /* ---------- Wayanad July Rainfall Chart ---------- */
    const baseRainfallDatasets = [
        {
            label: 'IMD (Ground Truth)', data: wayanadJulyData.imd,
            borderColor: '#1e293b', backgroundColor: 'rgba(30,41,59,0.05)',
            borderWidth: 2.5, pointRadius: 3, pointHoverRadius: 6,
            pointBackgroundColor: '#1e293b', tension: 0.3, fill: false, order: 1,
        },
        {
            label: 'Raw IMERG', data: wayanadJulyData.imerg,
            borderColor: 'rgba(239,68,68,0.6)', backgroundColor: 'rgba(239,68,68,0.04)',
            borderWidth: 1.5, borderDash: [6, 4], pointRadius: 2, pointHoverRadius: 5,
            pointBackgroundColor: 'rgba(239,68,68,0.6)', tension: 0.3, fill: false, order: 2,
        },
    ];

    const rainfallModelDS = Object.entries(modelColors).map(([key, c]) => ({
        label: c.label, data: wayanadJulyData[key],
        borderColor: c.border, backgroundColor: c.bg,
        borderWidth: 2, pointRadius: 2, pointHoverRadius: 5,
        pointBackgroundColor: c.border, tension: 0.3, fill: true, order: 3,
    }));

    const rainfallChartData = {
        labels: wayanadJulyData.labels,
        datasets: rainfallView === 'all'
            ? [...baseRainfallDatasets, ...rainfallModelDS]
            : [...baseRainfallDatasets, rainfallModelDS.find(d => d.label === modelColors[rainfallView].label)],
    };

    const landslideAnnotation = annotationPlugin ? {
        annotation: {
            annotations: {
                landslide: {
                    type: 'line', xMin: 'Jul 30', xMax: 'Jul 30',
                    borderColor: 'rgba(220,38,38,0.7)', borderWidth: 2, borderDash: [4, 3],
                    label: {
                        display: true, content: '⚠️ Landslide Event',
                        position: 'start', backgroundColor: 'rgba(220,38,38,0.85)',
                        font: { size: 11, weight: 'bold' }, color: '#fff', padding: 4,
                    },
                },
            },
        },
    } : {};

    const rainfallChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
            legend: { labels: { color: '#475569', font: { family: 'Inter', size: 12 }, usePointStyle: true, pointStyle: 'circle', padding: 16 } },
            tooltip: {
                backgroundColor: 'rgba(30,41,59,0.95)', titleColor: '#e2e8f0', bodyColor: '#cbd5e1',
                borderColor: 'rgba(148,163,184,0.2)', borderWidth: 1, padding: 12,
                titleFont: { family: 'Inter', weight: '600' }, bodyFont: { family: 'Inter' },
                callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(1)} mm/day` },
            },
            ...landslideAnnotation,
        },
        scales: {
            x: {
                ticks: { color: '#94a3b8', font: { family: 'Inter', size: 10 }, maxRotation: 45 },
                grid: { display: false },
            },
            y: {
                min: 0,
                ticks: { color: '#94a3b8', font: { family: 'Inter', size: 11 }, callback: v => v + ' mm' },
                grid: { color: 'rgba(148,163,184,0.1)' },
                title: { display: true, text: 'Avg. Rainfall (mm/day)', color: '#94a3b8', font: { family: 'Inter', size: 12 } },
            },
        },
    };

    /* ---------- Error Distribution Chart ---------- */
    const errorChartData = {
        labels: errorDistribution.imerg.centers,
        datasets: [
            {
                label: 'Raw IMERG', data: errorDistribution.imerg.density,
                borderColor: 'rgba(239,68,68,0.8)', backgroundColor: 'rgba(239,68,68,0.12)',
                borderWidth: 2, pointRadius: 0, pointHoverRadius: 3, fill: true, tension: 0.4,
            },
            {
                label: 'Random Forest', data: errorDistribution.rf.density,
                borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.1)',
                borderWidth: 2, pointRadius: 0, pointHoverRadius: 3, fill: true, tension: 0.4,
            },
            {
                label: 'XGBoost', data: errorDistribution.xgb.density,
                borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.08)',
                borderWidth: 2, pointRadius: 0, pointHoverRadius: 3, fill: true, tension: 0.4,
            },
            {
                label: 'LightGBM', data: errorDistribution.lgb.density,
                borderColor: '#fbbf24', backgroundColor: 'rgba(251,191,36,0.08)',
                borderWidth: 2, pointRadius: 0, pointHoverRadius: 3, fill: true, tension: 0.4,
            },
        ],
    };

    const errorChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
            legend: { labels: { color: '#475569', font: { family: 'Inter', size: 12 }, usePointStyle: true, pointStyle: 'circle', padding: 16 } },
            tooltip: {
                backgroundColor: 'rgba(30,41,59,0.95)', titleColor: '#e2e8f0', bodyColor: '#cbd5e1',
                borderColor: 'rgba(148,163,184,0.2)', borderWidth: 1, padding: 12,
                callbacks: {
                    title: items => `Error: ${items[0].label} mm/day`,
                    label: ctx => `${ctx.dataset.label}: ${(ctx.parsed.y * 100).toFixed(2)}%`,
                },
            },
            annotation: {
                annotations: {
                    zeroLine: {
                        type: 'line', xMin: '-1', xMax: '-1',
                        borderColor: 'rgba(30,41,59,0.4)', borderWidth: 1, borderDash: [4, 3],
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: { color: '#94a3b8', font: { family: 'Inter', size: 10 }, callback: (v, i) => i % 5 === 0 ? errorDistribution.imerg.centers[i] : '' },
                grid: { display: false },
                title: { display: true, text: 'Error: Predicted − Ground Truth (mm/day)', color: '#94a3b8', font: { family: 'Inter', size: 12 } },
            },
            y: {
                ticks: { color: '#94a3b8', font: { family: 'Inter', size: 11 }, callback: v => (v * 100).toFixed(1) + '%' },
                grid: { color: 'rgba(148,163,184,0.1)' },
                title: { display: true, text: 'Density', color: '#94a3b8', font: { family: 'Inter', size: 12 } },
            },
        },
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

                {/* Interactive Rainfall Chart */}
                <div style={{ marginBottom: 32 }}>
                    <div className="cs-chart-header">
                        <div>
                            <h2 className="section-title" style={{ marginBottom: 4 }}>July 2024 Rainfall Overview</h2>
                            <p className="section-subtitle" style={{ marginBottom: 0 }}>Daily rainfall at Wayanad grid point with landslide event marker.</p>
                        </div>
                        <div className="cs-toggle">
                            {[
                                { key: 'all', label: 'All Models' },
                                { key: 'rf', label: '🌲 RF' },
                                { key: 'xgb', label: '⚡ XGB' },
                                { key: 'lgb', label: '🍃 LGB' },
                            ].map(v => (
                                <button
                                    key={v.key}
                                    className={`cs-btn ${rainfallView === v.key ? 'active' : ''}`}
                                    onClick={() => setRainfallView(v.key)}
                                >
                                    {v.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="chart-container" style={{ marginTop: 16 }}>
                        <div style={{ height: 420 }}>
                            <Line data={rainfallChartData} options={rainfallChartOptions} />
                        </div>
                        <p className="cs-note">
                            Hover for daily values. The vertical dashed line marks the July 30 landslide.
                        </p>
                    </div>
                </div>

                {/* Error Distribution Interactive Chart */}
                <div style={{ marginTop: 48 }}>
                    <h2 className="section-title">Error Distribution Analysis</h2>
                    <p className="section-subtitle">
                        Distribution of prediction errors across all grid points (2024 test set).
                        ML models produce narrower, more centered distributions than raw IMERG.
                    </p>
                    <div className="chart-container" style={{ marginTop: 16 }}>
                        <div style={{ height: 400 }}>
                            <Line data={errorChartData} options={errorChartOptions} />
                        </div>
                        <p className="cs-note">
                            Error = Predicted − Ground Truth. Models closer to zero with tighter peaks are more accurate.
                        </p>
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

            <style>{`
                .cs-chart-header {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 16px;
                }
                .cs-toggle {
                    display: flex;
                    gap: 4px;
                    background: var(--bg-secondary);
                    border-radius: var(--radius-sm);
                    padding: 3px;
                }
                .cs-btn {
                    padding: 7px 16px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 0.82rem;
                    font-weight: 500;
                    color: var(--text-muted);
                    border: none;
                    background: transparent;
                    transition: var(--transition);
                    font-family: inherit;
                }
                .cs-btn:hover {
                    color: var(--text-secondary);
                }
                .cs-btn.active {
                    background: var(--accent);
                    color: #fff;
                    box-shadow: 0 2px 8px rgba(20, 184, 166, 0.3);
                }
                .cs-note {
                    margin-top: 12px;
                    font-size: 0.78rem;
                    color: var(--text-muted);
                    text-align: center;
                    font-style: italic;
                }
            `}</style>
        </div>
    );
}
