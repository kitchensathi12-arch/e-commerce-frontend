import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }} className="bg-[#1a1a1a] text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .footer-link {
          color: #b0b0b0;
          font-size: 13.5px;
          font-weight: 400;
          text-decoration: none;
          transition: color 0.2s ease;
          line-height: 1;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          font-family: inherit;
        }
        .footer-link:hover { color: #ffffff; }
        .footer-heading {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 20px;
          letter-spacing: 0.01em;
        }
        .subscribe-input {
          background: transparent;
          border: 1px solid #555;
          border-radius: 4px;
          padding: 10px 46px 10px 14px;
          color: #fff;
          font-size: 13px;
          font-family: inherit;
          outline: none;
          width: 100%;
          transition: border-color 0.2s;
        }
        .subscribe-input::placeholder { color: #777; }
        .subscribe-input:focus { border-color: #db4444; }
        .subscribe-btn {
          position: absolute;
          right: 0; top: 0; bottom: 0;
          width: 42px;
          background: #db4444;
          border: none;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .subscribe-btn:hover { background: #c03333; }
        .social-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid #444;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #b0b0b0;
          text-decoration: none;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .social-btn:hover { background: #db4444; border-color: #db4444; color: #fff; }
        .divider { border: none; border-top: 1px solid #2e2e2e; }
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div
        className="footer-grid"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '60px 24px 40px',
          display: 'grid',
          gridTemplateColumns: '1.8fr 1.2fr 1fr 1fr',
          gap: '40px',
        }}
      >
        {/* Col 1: Brand + Subscribe + Social */}
        <div>
          <p style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '16px' }}>Shreenathji Enterprise</p>
          <p style={{ color: '#b0b0b0', fontSize: '13.5px', marginBottom: '10px', fontWeight: '500' }}>Subscribe</p>
          <p style={{ color: '#909090', fontSize: '13px', marginBottom: '14px', lineHeight: '1.5' }}>Get 10% off your first order</p>
          <div style={{ position: 'relative', marginBottom: '28px' }}>
            <input type="email" placeholder="Enter your email" className="subscribe-input" />
            <button className="subscribe-btn" aria-label="Subscribe">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>

          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="#" className="social-btn" aria-label="Facebook">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" className="social-btn" aria-label="X">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="social-btn" aria-label="Instagram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>
            <a href="#" className="social-btn" aria-label="LinkedIn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>

        {/* Col 2: Support */}
        <div>
          <p className="footer-heading">Support</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <li>
              <span style={{ color: '#909090', fontSize: '13px', lineHeight: '1.6' }}>
                No.11-8-664/5, Zahir Towers,
                <br /> Near Rao & Rao Circle,
                <br /> Maidan 4th Cross Road,
                <br /> Maidan Road, Mangalore-575001, Karnataka
              </span>
            </li>
            <li>
              <a href="mailto:Chouhanbanna410@gmail.com" className="footer-link">
                Chouhanbanna410@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+917892664953" className="footer-link">
                +91 7892664953
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Account */}
        <div>
          <p className="footer-heading">Account</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { label: 'My Account', path: '/account' },
              { label: 'Login / Register', path: '/login' },
              { label: 'Cart', path: '/cart' },
              { label: 'Wishlist', path: '/wishlist' },
              { label: 'Shop', path: '/shop' },
            ].map((item) => (
              <li key={item.label}>
                <button className="footer-link" onClick={() => navigate(item.path)}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Quick Link */}
        <div>
          <p className="footer-heading">Quick Link</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { label: 'Privacy Policy', path: '/privacy-policy' },
              { label: 'Terms Of Use', path: '/terms' },
              { label: 'FAQ', path: '/faq' },
              { label: 'Contact', path: '/contact' },
              { label: 'About Us', path: '/about' },
            ].map((item) => (
              <li key={item.label}>
                <button className="footer-link" onClick={() => navigate(item.path)}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <hr className="divider" style={{ margin: '0 24px' }} />
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '18px 24px',
          textAlign: 'center',
          color: '#777',
          fontSize: '13px',
        }}
      >
        © Copyright Shreenathji Enterprise {new Date().getFullYear()}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
