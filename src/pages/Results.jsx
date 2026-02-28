import { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale, LinearScale, BarElement, PointElement, LineElement,
    Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { statewideMetrics, districtRMSE, monthlyMetrics, correctionFactors, featureImportances } from '../data/metricsData';
import { statewideTimeSeries } from '../data/timeSeriesData';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const modelColors = {
    rf: { bg: 'rgba(34,197,94,0.75)', border: '#22c55e', bgLight: 'rgba(34,197,94,0.12)' },
    xgb: { bg: 'rgba(59,130,246,0.75)', border: '#3b82f6', bgLight: 'rgba(59,130,246,0.12)' },
    lgb: { bg: 'rgba(251,191,36,0.75)', border: '#fbbf24', bgLight: 'rgba(251,191,36,0.12)' },
};

const chartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { labels: { color: '#475569', font: { family: 'Inter', size: 12 } } },
        tooltip: {
            backgroundColor: '#ffffff',
            titleColor: '#1e293b',
            bodyColor: '#475569',
            borderColor: 'rgba(13,148,136,0.3)',
            borderWidth: 1,
            cornerRadius: 8,
            titleFont: { family: 'Inter', weight: 600 },
            bodyFont: { family: 'Inter' },
        },
    },
    scales: {
        x: { ticks: { color: '#94a3b8', font: { family: 'Inter', size: 11 } }, grid: { color: 'rgba(148,163,184,0.1)' } },
        y: { ticks: { color: '#94a3b8', font: { family: 'Inter', size: 11 } }, grid: { color: 'rgba(148,163,184,0.1)' } },
    },
};

function makeFeatureChart(modelKey) {
    const model = featureImportances[modelKey];
    const color = modelColors[modelKey];
    return {
        labels: featureImportances.features,
        datasets: [{
            label: model.label,
            data: model.pct,
            backgroundColor: color.bg,
            borderColor: color.border,
            borderWidth: 1.5,
            borderRadius: 6,
            borderSkipped: false,
        }],
    };
}

function featureChartOptions(modelKey) {
    const model = featureImportances[modelKey];
    return {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                ...chartDefaults.plugins.tooltip,
                callbacks: {
                    label: (ctx) => {
                        const raw = model.raw[ctx.dataIndex];
                        return `${ctx.dataset.label}: ${ctx.parsed.x.toFixed(1)}% (raw: ${raw})`;
                    },
                },
            },
        },
        scales: {
            x: {
                max: 105,
                ticks: { color: '#94a3b8', font: { family: 'Inter', size: 11 }, callback: v => v + '%' },
                grid: { color: 'rgba(148,163,184,0.08)' },
                title: { display: true, text: 'Relative Importance (%)', color: '#94a3b8', font: { family: 'Inter', size: 12, weight: 500 } },
            },
            y: {
                ticks: { color: '#475569', font: { family: 'Inter', size: 12, weight: 500 } },
                grid: { display: false },
            },
        },
    };
}

const combinedFeatureData = {
    labels: featureImportances.features,
    datasets: [
        { label: 'Random Forest', data: featureImportances.rf.pct, backgroundColor: modelColors.rf.bg, borderColor: modelColors.rf.border, borderWidth: 1.5, borderRadius: 4, borderSkipped: false },
        { label: 'XGBoost', data: featureImportances.xgb.pct, backgroundColor: modelColors.xgb.bg, borderColor: modelColors.xgb.border, borderWidth: 1.5, borderRadius: 4, borderSkipped: false },
        { label: 'LightGBM', data: featureImportances.lgb.pct, backgroundColor: modelColors.lgb.bg, borderColor: modelColors.lgb.border, borderWidth: 1.5, borderRadius: 4, borderSkipped: false },
    ],
};

const combinedFeatureOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { labels: { color: '#475569', font: { family: 'Inter', size: 12 }, usePointStyle: true, pointStyle: 'rectRounded', padding: 20 } },
        tooltip: {
            ...chartDefaults.plugins.tooltip,
            callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.x.toFixed(1)}%` },
        },
    },
    scales: {
        x: {
            max: 105,
            ticks: { color: '#94a3b8', font: { family: 'Inter', size: 11 }, callback: v => v + '%' },
            grid: { color: 'rgba(148,163,184,0.08)' },
            title: { display: true, text: 'Relative Importance (%)', color: '#94a3b8', font: { family: 'Inter', size: 12, weight: 500 } },
        },
        y: {
            ticks: { color: '#475569', font: { family: 'Inter', size: 12, weight: 500 } },
            grid: { display: false },
        },
    },
};

export default function Results() {
    const [activeTab, setActiveTab] = useState('overview');
    const [featureView, setFeatureView] = useState('combined');
    const [comparisonModel, setComparisonModel] = useState('all');
    const [lightbox, setLightbox] = useState(null);

    const districtChartData = {
        labels: districtRMSE.districts.map(d => d.length > 8 ? d.substring(0, 8) + '…' : d),
        datasets: [
            { label: 'IMERG (Raw)', data: districtRMSE.imerg, backgroundColor: 'rgba(239,68,68,0.7)', borderRadius: 4 },
            { label: 'Random Forest', data: districtRMSE.rf, backgroundColor: 'rgba(34,197,94,0.7)', borderRadius: 4 },
            { label: 'XGBoost', data: districtRMSE.xgb, backgroundColor: 'rgba(59,130,246,0.7)', borderRadius: 4 },
            { label: 'LightGBM', data: districtRMSE.lgb, backgroundColor: 'rgba(251,191,36,0.7)', borderRadius: 4 },
        ],
    };

    const monthlyChartData = {
        labels: monthlyMetrics.months,
        datasets: [
            { label: 'RF RMSE', data: monthlyMetrics.rf_rmse, borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.1)', fill: true, tension: 0.4 },
            { label: 'XGBoost RMSE', data: monthlyMetrics.xgb_rmse, borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.1)', fill: true, tension: 0.4 },
            { label: 'LightGBM RMSE', data: monthlyMetrics.lgb_rmse, borderColor: '#fbbf24', backgroundColor: 'rgba(251,191,36,0.1)', fill: true, tension: 0.4 },
        ],
    };

    // Build statewide comparison chart data
    const baseDatasets = [
        { label: 'IMD (Ground Truth)', data: statewideTimeSeries.imd, borderColor: '#1e293b', backgroundColor: 'rgba(30,41,59,0.05)', borderWidth: 2, pointRadius: 0, pointHoverRadius: 4, tension: 0.3, fill: false, order: 1 },
        { label: 'Raw IMERG', data: statewideTimeSeries.imerg, borderColor: 'rgba(239,68,68,0.6)', backgroundColor: 'rgba(239,68,68,0.04)', borderWidth: 1.5, borderDash: [5, 4], pointRadius: 0, pointHoverRadius: 3, tension: 0.3, fill: false, order: 2 },
    ];
    const modelDatasets = {
        rf: { label: 'Random Forest', data: statewideTimeSeries.rf, borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.1)', borderWidth: 2, pointRadius: 0, pointHoverRadius: 4, tension: 0.3, fill: true, order: 3 },
        xgb: { label: 'XGBoost', data: statewideTimeSeries.xgb, borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.1)', borderWidth: 2, pointRadius: 0, pointHoverRadius: 4, tension: 0.3, fill: true, order: 3 },
        lgb: { label: 'LightGBM', data: statewideTimeSeries.lgb, borderColor: '#fbbf24', backgroundColor: 'rgba(251,191,36,0.1)', borderWidth: 2, pointRadius: 0, pointHoverRadius: 4, tension: 0.3, fill: true, order: 3 },
    };

    const comparisonChartData = {
        labels: statewideTimeSeries.labels,
        datasets: comparisonModel === 'all'
            ? [...baseDatasets, modelDatasets.rf, modelDatasets.xgb, modelDatasets.lgb]
            : [...baseDatasets, modelDatasets[comparisonModel]],
    };

    const comparisonChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
            legend: { labels: { color: '#475569', font: { family: 'Inter', size: 12 }, usePointStyle: true, pointStyle: 'line', padding: 20 } },
            tooltip: {
                ...chartDefaults.plugins.tooltip,
                callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(1)} mm/day` },
            },
        },
        scales: {
            x: { ticks: { color: '#94a3b8', font: { family: 'Inter', size: 10 }, maxRotation: 45, autoSkip: true, maxTicksLimit: 18 }, grid: { display: false } },
            y: { ticks: { color: '#94a3b8', font: { family: 'Inter', size: 11 }, callback: v => v + ' mm' }, grid: { color: 'rgba(148,163,184,0.1)' }, title: { display: true, text: 'Avg. Rainfall (mm/day)', color: '#94a3b8', font: { family: 'Inter', size: 12 } } },
        },
    };

    const tabLabels = {
        overview: '📊 Overview',
        districts: '🏘️ Districts',
        monthly: '📅 Monthly',
        features: '🎯 Features',
        comparison: '⚖️ Comparison',
    };

    return (
        <div className="page-enter">
            <section className="section container">
                <span className="badge badge-teal">Model Performance</span>
                <h1 className="section-title" style={{ marginTop: 12 }}>Results & Validation</h1>
                <p className="section-subtitle">
                    Comprehensive evaluation of all three ML models against IMD ground truth for 2024.
                </p>

                <div className="tabs">
                    {Object.entries(tabLabels).map(([key, label]) => (
                        <button
                            key={key}
                            className={`tab ${activeTab === key ? 'active' : ''}`}
                            onClick={() => setActiveTab(key)}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="slide-up">
                        <div className="glass-card" style={{ marginBottom: 32 }}>
                            <h3 style={{ marginBottom: 20, fontSize: '1.1rem' }}>Statewide Metrics Matrix</h3>
                            <div style={{ overflowX: 'auto' }}>
                                <table className="data-table">
                                    <thead>
                                        <tr>{statewideMetrics.headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
                                    </thead>
                                    <tbody>
                                        {statewideMetrics.rows.map((row, i) => (
                                            <tr key={i}>{row.map((c, j) => <td key={j}>{c}</td>)}</tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="glass-card">
                            <h3 style={{ marginBottom: 20, fontSize: '1.1rem' }}>Correction Factors by Terrain</h3>
                            <div style={{ overflowX: 'auto' }}>
                                <table className="data-table">
                                    <thead>
                                        <tr>{correctionFactors.headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
                                    </thead>
                                    <tbody>
                                        {correctionFactors.rows.map((row, i) => (
                                            <tr key={i}>{row.map((c, j) => <td key={j}>{c}</td>)}</tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Districts Tab */}
                {activeTab === 'districts' && (
                    <div className="slide-up">
                        <div className="chart-container">
                            <h3>District-wise RMSE (mm/day)</h3>
                            <div style={{ height: 400 }}>
                                <Bar data={districtChartData} options={{ ...chartDefaults, plugins: { ...chartDefaults.plugins, title: { display: false } } }} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Monthly Tab */}
                {activeTab === 'monthly' && (
                    <div className="slide-up">
                        <div className="chart-container">
                            <h3>Monthly RMSE Variation (2024)</h3>
                            <div style={{ height: 400 }}>
                                <Line data={monthlyChartData} options={{ ...chartDefaults, plugins: { ...chartDefaults.plugins, title: { display: false } } }} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Features Tab — Interactive Charts */}
                {activeTab === 'features' && (
                    <div className="slide-up">
                        <div className="feature-header">
                            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Feature Importances</h3>
                            <div className="feature-toggle">
                                {[
                                    { key: 'combined', label: 'All Models' },
                                    { key: 'rf', label: '🌲 RF' },
                                    { key: 'xgb', label: '⚡ XGB' },
                                    { key: 'lgb', label: '🍃 LGB' },
                                ].map(v => (
                                    <button
                                        key={v.key}
                                        className={`feature-btn ${featureView === v.key ? 'active' : ''}`}
                                        onClick={() => setFeatureView(v.key)}
                                    >
                                        {v.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {featureView === 'combined' ? (
                            <div className="chart-container" style={{ marginTop: 16 }}>
                                <div style={{ height: 420 }}>
                                    <Bar data={combinedFeatureData} options={combinedFeatureOptions} />
                                </div>
                                <p className="chart-note">
                                    Values normalized to percentage of most important feature per model.
                                    Hover bars for details.
                                </p>
                            </div>
                        ) : (
                            <div className="chart-container" style={{ marginTop: 16 }}>
                                <div className="feature-model-badge" style={{ color: modelColors[featureView].border }}>
                                    {featureImportances[featureView].label}
                                </div>
                                <div style={{ height: 380 }}>
                                    <Bar data={makeFeatureChart(featureView)} options={featureChartOptions(featureView)} />
                                </div>
                                <p className="chart-note">
                                    Hover bars to see raw importance score. Values normalized as percentage of top feature.
                                </p>
                            </div>
                        )}

                        {/* Key insight card */}
                        <div className="glass-card insight-card" style={{ marginTop: 24 }}>
                            <div className="insight-icon">💡</div>
                            <div>
                                <strong>Key Insight:</strong> IMERG rainfall is the dominant predictor across all models,
                                followed by month (seasonality). Terrain features (elevation, slope, coastal distance) play
                                a supporting but crucial role — especially in XGBoost and LightGBM where their relative
                                contribution is 15–38%.
                            </div>
                        </div>
                    </div>
                )}

                {/* Comparison Tab — Interactive Line Chart */}
                {activeTab === 'comparison' && (
                    <div className="slide-up">
                        <div className="feature-header">
                            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Daily Average Rainfall — Kerala 2024</h3>
                            <div className="feature-toggle">
                                {[
                                    { key: 'all', label: 'All Models' },
                                    { key: 'rf', label: '🌲 RF' },
                                    { key: 'xgb', label: '⚡ XGB' },
                                    { key: 'lgb', label: '🍃 LGB' },
                                ].map(v => (
                                    <button
                                        key={v.key}
                                        className={`feature-btn ${comparisonModel === v.key ? 'active' : ''}`}
                                        onClick={() => setComparisonModel(v.key)}
                                    >
                                        {v.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="chart-container" style={{ marginTop: 16 }}>
                            <div style={{ height: 420 }}>
                                <Line data={comparisonChartData} options={comparisonChartOptions} />
                            </div>
                            <p className="chart-note">
                                Weekly averaged daily rainfall across all 12 Kerala grid points. Hover for exact values.
                            </p>
                        </div>
                        <div className="glass-card insight-card" style={{ marginTop: 24 }}>
                            <div className="insight-icon">📈</div>
                            <div>
                                <strong>Observation:</strong> ML corrections closely track IMD ground truth throughout
                                2024, significantly improving upon raw IMERG during the monsoon peak (Jun–Sep). Random
                                Forest and XGBoost corrections are smoother and more accurate than LightGBM.
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {lightbox && (
                <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
                    <img src={lightbox} alt="Preview" />
                </div>
            )}

            <style>{`
                .feature-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 16px;
                    margin-bottom: 8px;
                }
                .feature-toggle {
                    display: flex;
                    gap: 4px;
                    background: var(--bg-secondary);
                    border-radius: var(--radius-sm);
                    padding: 3px;
                }
                .feature-btn {
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
                .feature-btn:hover {
                    color: var(--text-secondary);
                }
                .feature-btn.active {
                    background: var(--accent);
                    color: #fff;
                    box-shadow: 0 2px 8px rgba(20, 184, 166, 0.3);
                }
                .feature-model-badge {
                    font-size: 0.85rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 12px;
                }
                .chart-note {
                    margin-top: 12px;
                    font-size: 0.78rem;
                    color: var(--text-muted);
                    text-align: center;
                    font-style: italic;
                }
                .insight-card {
                    display: flex;
                    gap: 16px;
                    align-items: flex-start;
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                    line-height: 1.7;
                    border-left: 3px solid var(--accent);
                }
                .insight-icon {
                    font-size: 1.5rem;
                    flex-shrink: 0;
                    margin-top: 2px;
                }
                @media (max-width: 640px) {
                    .feature-header { flex-direction: column; align-items: flex-start; }
                }
            `}</style>
        </div>
    );
}
