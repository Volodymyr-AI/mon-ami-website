import { useEffect } from 'react';
import '@/styles/footer.css';

import applePayLogo from '@/assets/icons/footer/applepaylogo.png';
import liqPayLogo from '@/assets/icons/footer/liqpaylogo.png';
import mastercardLogo from '@/assets/icons/footer/mastercardlogo.png';
import visaLogo from '@/assets/icons/footer/visalogo.png';

/* ── SVG icons (no external deps) ── */
const IconTelegram = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
  </svg>
);

const IconViber = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 10.5C3 6.36 6.36 3 10.5 3h3C17.64 3 21 6.36 21 10.5v3c0 4.14-3.36 7.5-7.5 7.5H12l-4 2v-2.5C5.2 19.2 3 16.15 3 12.5v-2z" />
    <path d="M9 10.5c0 2.5 1.5 5 5.5 5M9.5 9c1-1 2.5-1 3.5 0l1 1" />
  </svg>
);

const IconInstagram = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

const IconFacebook = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const IconMail = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconArrowUp = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

/* ── Repeating marquee word set ── */
const MarqueeSet = () => (
  <div className="footer-marquee-set">
    <span className="footer-marquee-word">MÓN AMI</span>
    <span className="footer-marquee-dot">•</span>
    <span className="footer-marquee-word">MACARÓNS</span>
    <span className="footer-marquee-dot">•</span>
    <span className="footer-marquee-word">MÓN AMI</span>
    <span className="footer-marquee-dot">•</span>
    <span className="footer-marquee-word">MACARÓNS</span>
    <span className="footer-marquee-dot">•</span>
  </div>
);

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-top-line" />

      <div className="footer-inner">
        {/* ════ MAIN TWO-COLUMN GRID ════ */}
        <div className="footer-grid">
          {/* ── LEFT: Address + Hours + Payment ── */}
          <div className="footer-left">
            <div className="footer-address">
              <span className="footer-label">Наша адреса</span>
              <p>
                <strong>м. Львів, Остапа Нижанківського, 9</strong>
              </p>
            </div>

            <div className="footer-hours">
              <span className="footer-label">Години роботи</span>
              <p>
                Пн–Пт: 10:00–20:00 &nbsp;·&nbsp; Сб: 10:00–21:00 &nbsp;·&nbsp;
                Нд: 11:00–19:00
              </p>
              <p>Онлайн-замовлення приймаємо 24/7</p>
            </div>

            <div className="footer-payment">
              <div className="footer-payment-badge">
                <img
                  src={applePayLogo}
                  alt="Apple Pay"
                  className="footer-pay-img"
                />
              </div>
              <div className="footer-payment-badge">
                <img src={liqPayLogo} alt="LiqPay" className="footer-pay-img" />
              </div>
              <div className="footer-payment-badge">
                <img
                  src={mastercardLogo}
                  alt="Mastercard"
                  className="footer-pay-img"
                />
              </div>
              <div className="footer-payment-badge">
                <img src={visaLogo} alt="Visa" className="footer-pay-img" />
              </div>
            </div>
          </div>

          {/* ── RIGHT: Phone + Socials + Email ── */}
          <div className="footer-right">
            <div className="footer-phone">
              <span className="footer-label">Гаряча лінія</span>
              <a className="footer-phone-number" href="tel:+380930000000">
                097-091-20-25
              </a>
            </div>

            <div className="footer-socials-block">
              <span className="footer-label">Залишилось питання?</span>
              <div className="footer-socials">
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  aria-label="Telegram"
                >
                  <IconTelegram />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  aria-label="Instagram"
                >
                  <IconInstagram />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  aria-label="Facebook"
                >
                  <IconFacebook />
                </a>
              </div>
            </div>

            <div className="footer-email">
              <a className="footer-email-link" href="mailto:hello@monami.ua">
                <IconMail />
                hello@monami.ua
              </a>
            </div>
          </div>
        </div>

        {/* ════ BOTTOM BAR ════ */}
        <div className="footer-divider" />
        <div className="footer-bottom">
          <span className="footer-copy">
            © 2024 – {year}. Mon Ami Macarons. Всі права захищені.
          </span>
          <div className="footer-bottom-links">
            <a href="#">Договір оферти</a>
            <a href="#">Політика конфіденційності</a>
            <a href="#">Доставка та оплата</a>
          </div>
        </div>
      </div>

      {/* ════ MARQUEE BAND ════ */}
      <div className="footer-marquee-wrap">
        <div className="footer-marquee-track">
          {/* Two identical sets for seamless infinite loop */}
          <MarqueeSet />
          <MarqueeSet />
        </div>
      </div>

      {/* ── Scroll to top ── */}
      <button
        className="footer-scroll-top"
        onClick={scrollToTop}
        aria-label="Прокрутити вгору"
      >
        <IconArrowUp />
      </button>
    </footer>
  );
}
