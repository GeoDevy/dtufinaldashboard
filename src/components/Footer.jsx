export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="brand-icon">🌧️</span>
          <span>Rain<span style={{ color: 'var(--accent)' }}>Correct</span></span>
        </div>
        <p className="footer-text">
          ML-Based Bias Correction for Satellite Precipitation over Kerala
        </p>
        <div className="footer-bottom">
          <span>© 2024–2025 RainCorrect Project</span>
          <span className="footer-sep">·</span>
          <span>DTU Research</span>
        </div>
      </div>

      <style>{`
        .footer {
          border-top: 2px solid transparent;
          border-image: linear-gradient(90deg, transparent, var(--accent-light), var(--accent), var(--accent-light), transparent) 1;
          padding: 48px 0 32px;
          margin-top: 80px;
          background: linear-gradient(180deg, transparent, rgba(241,245,249,0.5));
        }
        .footer-inner { text-align: center; }
        .footer-brand {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .footer-text {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 24px;
        }
        .footer-bottom {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .footer-sep { margin: 0 8px; }
      `}</style>
    </footer>
  );
}
