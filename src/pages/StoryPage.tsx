import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Heart, Sparkles } from 'lucide-react';

import denis from '@/assets/images/denis/10.jpeg';
import '@/styles/storypage.css';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { num: '15+', label: 'Унікальних смаків' },
  { num: '50K+', label: 'Щасливих клієнтів' },
  { num: '100%', label: 'Натуральні інгредієнти' },
  { num: '4.9', label: 'Рейтинг на Google' },
];

const VALUES = [
  { icon: <Heart size={18} />, label: "З любов'ю" },
  { icon: <Sparkles size={18} />, label: 'Вручну' },
  { icon: <Award size={18} />, label: 'Якісно' },
];

export default function StoryPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* ── Image column slides in from left ── */
      gsap.fromTo(
        imageRef.current,
        { x: '-8vw', opacity: 0, scale: 0.96 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            end: 'top 38%',
            scrub: 0.6,
          },
        }
      );

      /* ── Eyebrow label ── */
      gsap.fromTo(
        eyebrowRef.current,
        { y: 16, opacity: 0, letterSpacing: '0.5em' },
        {
          y: 0,
          opacity: 1,
          letterSpacing: '0.28em',
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      /* ── Content children stagger ── */
      if (contentRef.current) {
        const children = Array.from(contentRef.current.children);
        gsap.fromTo(
          children,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.11,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 72%',
              end: 'top 32%',
              scrub: 0.5,
            },
          }
        );
      }

      /* ── Stats count-up feel (fade + slight scale) ── */
      if (statsRef.current) {
        const statItems = Array.from(statsRef.current.children);
        gsap.fromTo(
          statItems,
          { y: 22, opacity: 0, scale: 0.92 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.65,
            stagger: 0.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="story" className="story-section">
      <div className="story-inner">
        {/* ── Main grid: photo + text ── */}
        <div className="story-grid">
          {/* ── Image column ── */}
          <div ref={imageRef} className="story-image-col">
            <div className="story-image-frame">
              <img src={denis} alt="Денис Азімов — Шеф-кондитер Mon Ami" />
              <div className="story-image-overlay" />
            </div>

            {/* Decorative circles */}
            <div className="story-deco-circle-lg" />
            <div className="story-deco-circle-sm" />

            {/* Experience badge */}
            <div className="story-badge">
              <span className="story-badge-num">10+</span>
              <span className="story-badge-label">років досвіду</span>
            </div>
          </div>

          {/* ── Content column ── */}
          <div ref={contentRef} className="story-content-col">
            <span ref={eyebrowRef} className="story-eyebrow">
              Історія Món Ami
            </span>

            <h2 className="story-title">
              Мистецтво Macarón
              <br />
              від <em>Дениса Азімова</em>
            </h2>

            <div className="story-text-block">
              <p>
                Món Ami — це не просто кондитерська. Це місце, де французька
                традиція зустрічається з львівською душею. Кожен макарон, що
                виходить з нашої кухні, — це результат років практики, пошуку
                ідеальних пропорцій та невтомної пристрасті до кондитерського
                мистецтва.
              </p>
              <p>
                Денис Азімов навчався у кращих майстрів Франції та Італії,
                привносячи свій унікальний підхід до класичного французького
                десерту — смаки, що вражають витонченістю та глибиною.
              </p>
              <p>
                Ми використовуємо лише натуральні інгредієнти найвищої якості:
                мигдаль з Каліфорнії, вершкове масло з Нормандії, шоколад з
                Бельгії та свіжі фрукти з місцевих ферм.
              </p>
            </div>

            {/* Values */}
            <div className="story-values">
              {VALUES.map(({ icon, label }) => (
                <div key={label} className="story-value-item">
                  <div className="story-value-icon">{icon}</div>
                  <span className="story-value-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div ref={statsRef} className="story-stats">
          {STATS.map(({ num, label }) => (
            <div key={label} className="story-stat-item">
              <span className="story-stat-num">{num}</span>
              <span className="story-stat-label">{label}</span>
            </div>
          ))}
        </div>

        {/* ── Ornament ── */}
        <div className="story-ornament">
          <div className="story-ornament-line" />
          <div className="story-ornament-diamond" />
          <div className="story-ornament-line" />
        </div>
      </div>
    </section>
  );
}
