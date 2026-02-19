import { useState } from 'react';
import '@/styles/header.css';

// Inline SVG icons
const BurgerIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 8H13.75M5 12H19M10.25 16L19 16"
      stroke="#7a6840"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HeartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 21.175C11.65 21.175 11.3083 21.1 11.025 20.95C7.39167 18.8333 2 14.5917 2 8.97501C2 5.65834 4.68333 3.00001 8 3.00001C9.65 3.00001 11.2 3.68334 12 4.70001C12.8 3.68334 14.35 3.00001 16 3.00001C19.3167 3.00001 22 5.65834 22 8.97501C22 14.5917 16.6083 18.8333 12.975 20.95C12.6917 21.1 12.35 21.175 12 21.175Z"
      stroke="#7a6840"
      strokeWidth="1.5"
    />
  </svg>
);

const CartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.5 7.67001V6.70001C7.5 4.45001 9.31 2.24001 11.56 2.03001C14.24 1.77001 16.5 3.88001 16.5 6.51001V7.89001"
      stroke="#7a6840"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 22H15C19.02 22 19.74 20.39 19.96 18.43L20.7 12.43C20.98 9.99 20.27 8 16 8H8C3.73 8 3.02 9.99 3.3 12.43L4.04 18.43C4.26 20.39 4.98 22 9 22Z"
      stroke="#7a6840"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface NavItem {
  label: string;
  href: string;
  dropdown?: boolean;
}

const navItems: NavItem[] = [
  { label: 'НАША ІСТОРІЯ', href: '#' },
  { label: 'КОНТАКТИ', href: '#' },
  { label: 'ДОСТАВКА І ОПЛАТА', href: '#' },
];

interface HeaderProps {
  title?: string;
  subtitle?: string;
  logoSrc?: string;
}

export function Header({ logoSrc }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="header">
      {/* Top decorative line */}
      <div className="header-top-line" />

      <div className="header-inner">
        {/* Left: Burger + Nav */}
        <div className="header-left">
          <button
            className="burger-btn"
            aria-label="Меню"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <BurgerIcon />
          </button>
          <nav className={`header-nav ${mobileOpen ? 'header-nav--open' : ''}`}>
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Center: Logo */}
        <div className="header-logo">
          {logoSrc ? (
            <img src={logoSrc} alt="Mon Ami Macarons" className="logo-img" />
          ) : (
            <div className="logo-text-wrapper">
              <span className="logo-title">MON AMI</span>
              <span className="logo-subtitle">MACARONS</span>
            </div>
          )}
        </div>

        {/* Right: Phone + Icons */}
        <div className="header-right">
          <a href="tel:0930000000" className="header-phone">
            093-000-00-00
          </a>
          <div className="header-icons">
            <button className="icon-btn" aria-label="Обране">
              <HeartIcon />
            </button>
            <button className="icon-btn" aria-label="Кошик">
              <CartIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="header-bottom-line" />
    </header>
  );
}

export default Header;
