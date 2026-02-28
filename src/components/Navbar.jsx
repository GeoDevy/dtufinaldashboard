import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/methodology', label: 'Methodology' },
    { to: '/results', label: 'Results' },
    { to: '/case-study', label: 'Case Study' },
    { to: '/maps', label: 'Maps' },
    { to: '/about', label: 'About' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-inner container">
        <NavLink to="/" className="navbar-brand">
          <span className="brand-icon">🌧️</span>
          <span className="brand-text">Rain<span className="brand-accent">Correct</span></span>
        </NavLink>
        <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
        <ul className={`navbar-links ${menuOpen ? 'show' : ''}`}>
          {links.map(l => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(248, 250, 252, 0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid transparent;
          transition: var(--transition);
        }
        .navbar-scrolled {
          border-bottom-color: var(--glass-border);
          box-shadow: 0 1px 12px rgba(0,0,0,0.04);
        }
        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-primary) !important;
          transition: var(--transition);
        }
        .navbar-brand:hover { transform: scale(1.02); }
        .brand-icon { font-size: 1.4rem; }
        .brand-accent { color: var(--accent); }
        .navbar-links {
          display: flex;
          list-style: none;
          gap: 2px;
          align-items: center;
        }
        .nav-link {
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-secondary) !important;
          transition: var(--transition);
          position: relative;
        }
        .nav-link:hover {
          color: var(--text-primary) !important;
          background: rgba(148, 163, 184, 0.06);
        }
        .nav-link.active {
          color: var(--accent) !important;
          background: var(--accent-glow);
          font-weight: 600;
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 16px;
          height: 2px;
          background: var(--accent);
          border-radius: 2px;
        }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
          .hamburger span {
          width: 24px;
          height: 2px;
          background: var(--text-primary);
          transition: var(--transition);
          border-radius: 2px;
        }
        .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
        @media (max-width: 768px) {
          .hamburger { display: flex; }
          .navbar-links {
            position: absolute;
            top: 64px;
            left: 0;
            right: 0;
            flex-direction: column;
            background: rgba(248, 250, 252, 0.97);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            padding: 16px;
            gap: 4px;
            display: none;
            border-bottom: 1px solid var(--glass-border);
            box-shadow: 0 8px 24px rgba(0,0,0,0.06);
          }
          .navbar-links.show { display: flex; }
          .nav-link { width: 100%; padding: 12px 16px; }
        }
      `}</style>
    </nav>
  );
}
