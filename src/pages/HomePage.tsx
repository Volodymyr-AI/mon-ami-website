import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import '@/styles/homepage.css';

import lavender from '@/assets/images/macaron/4/54.png';
import rasberry from '@/assets/images/macaron/11/67.png';
import matcha from '@/assets/images/macaron/16/72.png';
import vanilla from '@/assets/images/macaron/5/44.png';
import rose from '@/assets/images/macaron/17/73.png';
import coconut from '@/assets/images/macaron/2/52.png';

gsap.registerPlugin(ScrollTrigger);

const HERO_MACARON = lavender;

const FLOATING = [
  {
    src: rasberry,
    label: 'Малина',
    size: 'lg',
    pos: { left: '6%', top: '18%' },
    anim: 'slow',
    rotateInit: -12,
    depth: 1,
  },
  {
    src: matcha,
    label: 'Матча',
    size: 'md',
    pos: { right: '7%', top: '20%' },
    anim: 'normal',
    rotateInit: 10,
    depth: 0.8,
  },
  {
    src: vanilla,
    label: 'Ваніль',
    size: 'sm',
    pos: { left: '13%', bottom: '20%' },
    anim: 'fast',
    rotateInit: -6,
    depth: 0.6,
  },
  {
    src: rose,
    label: 'Троянда',
    size: 'md',
    pos: { right: '6%', bottom: '24%' },
    anim: 'slow',
    rotateInit: 14,
    depth: 0.9,
  },
  {
    src: coconut,
    label: 'Кокос',
    size: 'sm',
    pos: { right: '19%', top: '62%' },
    anim: 'normal',
    rotateInit: -8,
    depth: 0.5,
  },
  {
    src: matcha,
    label: 'Матча',
    size: 'xs',
    pos: { left: '22%', top: '28%' },
    anim: 'fast',
    rotateInit: 18,
    depth: 0.4,
  },
];

const SIZE_MAP: Record<string, number> = {
  xs: 72,
  sm: 100,
  md: 130,
  lg: 165,
};

export default function HomePage() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const floatRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* ── mouse parallax state ── */
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* ── 1. PAGE LOAD timeline ── */
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Orb scale in
      tl.fromTo(
        orbRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.1 }
      );

      // Hero macaron drops in with bounce
      tl.fromTo(
        heroImgRef.current,
        { y: -60, scale: 0.88, opacity: 0, rotateX: 30 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          rotateX: 0,
          duration: 1.0,
          ease: 'back.out(1.6)',
        },
        '-=0.85'
      );

      // Label slides up
      tl.fromTo(
        labelRef.current,
        { y: 20, opacity: 0, letterSpacing: '0.3em' },
        { y: 0, opacity: 1, letterSpacing: '0.2em', duration: 0.7 },
        '-=0.5'
      );

      // Headline — char by char
      if (headlineRef.current) {
        const text =
          headlineRef.current.dataset.text || headlineRef.current.innerText;
        headlineRef.current.dataset.text = text;
        headlineRef.current.innerHTML = text
          .split('')
          .map(
            (c) => `<span class="hero-char">${c === ' ' ? '&nbsp;' : c}</span>`
          )
          .join('');
        tl.fromTo(
          headlineRef.current.querySelectorAll('.hero-char'),
          { y: 40, opacity: 0, rotateY: -40 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.55,
            stagger: 0.035,
            ease: 'back.out(2)',
          },
          '-=0.4'
        );
      }

      // Sub + CTA
      tl.fromTo(
        [subRef.current, ctaRef.current],
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.12 },
        '-=0.25'
      );

      // Floating macarons cascade in
      tl.fromTo(
        floatRefs.current.filter(Boolean),
        { scale: 0, opacity: 0, rotateZ: -25 },
        {
          scale: 1,
          opacity: 1,
          rotateZ: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'back.out(1.8)',
        },
        '-=0.4'
      );

      // Arrow bounce fade in
      tl.fromTo(
        arrowRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.2'
      );

      /* ── 2. Continuous idle float per element ── */
      floatRefs.current.forEach((el, i) => {
        if (!el) return;
        const dur = 2.8 + i * 0.4;
        const yAmt = 10 + (i % 3) * 5;
        gsap.to(el, {
          y: `-=${yAmt}`,
          rotateZ: `+=${4 + (i % 3) * 2}`,
          duration: dur,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3,
        });
      });

      // Hero macaron gentle bob
      gsap.to(heroImgRef.current, {
        y: -14,
        rotateZ: 2,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      /* ── 3. SCROLL EXIT (pinned) ── */
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
        },
      });

      // Text exits upward first
      exitTl.to(
        [
          labelRef.current,
          headlineRef.current,
          subRef.current,
          ctaRef.current,
          arrowRef.current,
        ],
        { y: '-22vh', opacity: 0, ease: 'power2.in', stagger: 0.04 },
        0.6
      );

      // Hero macaron flies left + shrinks
      exitTl.to(
        heroImgRef.current,
        { x: '-32vw', scale: 0.7, rotate: -12, opacity: 0, ease: 'power2.in' },
        0.65
      );

      // Orb expands and fades
      exitTl.to(
        orbRef.current,
        { scale: 1.6, opacity: 0, ease: 'power2.in' },
        0.6
      );

      // Floaters scatter
      floatRefs.current.forEach((el, i) => {
        if (!el) return;
        const depth = FLOATING[i]?.depth ?? 1;
        exitTl.to(
          el,
          {
            x: `${(i % 2 === 0 ? 1 : -1) * 25 * depth}vw`,
            y: `${(i % 3 === 0 ? -1 : 1) * 20 * depth}vh`,
            scale: 0.5,
            opacity: 0,
            ease: 'power2.in',
          },
          0.62 + i * 0.02
        );
      });
    }, section);

    /* ── 4. Mouse 3D parallax ── */
    const handleMouse = (e: MouseEvent) => {
      const { innerWidth: W, innerHeight: H } = window;
      mouseRef.current = {
        x: (e.clientX / W - 0.5) * 2, // -1 → +1
        y: (e.clientY / H - 0.5) * 2,
      };
      const { x, y } = mouseRef.current;

      // Floating macarons — each layer shifts by depth
      floatRefs.current.forEach((el, i) => {
        if (!el) return;
        const depth = (FLOATING[i]?.depth ?? 0.5) * 18;
        gsap.to(el, {
          x: x * depth,
          y: y * depth * 0.6,
          rotateY: x * 10,
          rotateX: -y * 8,
          duration: 0.9,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });

      // Hero macaron subtle tilt
      gsap.to(heroImgRef.current, {
        rotateY: x * 8,
        rotateX: -y * 6,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      // Orb shifts slightly opposite
      gsap.to(orbRef.current, {
        x: -x * 12,
        y: -y * 8,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    window.addEventListener('mousemove', handleMouse);
    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  const scrollDown = () => {
    const el =
      document.getElementById('story') ??
      document.querySelector('section:nth-of-type(2)');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="home" className="hero-section">
      {/* Soft radial background gradient */}
      <div className="hero-bg-gradient" />

      {/* Decorative gold ring */}
      <div className="hero-ring" />

      {/* Orb — softly coloured circle behind the macaron */}
      <div ref={orbRef} className="hero-orb" />

      {/* ── Floating side macarons ── */}
      {FLOATING.map((m, i) => (
        <div
          key={i}
          ref={(el) => {
            floatRefs.current[i] = el;
          }}
          className="hero-float-wrap"
          style={
            {
              ...m.pos,
              '--rot': `${m.rotateInit}deg`,
            } as unknown as React.CSSProperties
          }
        >
          <img
            src={m.src}
            alt={m.label}
            width={SIZE_MAP[m.size]}
            height={SIZE_MAP[m.size]}
            className="hero-float-img"
            style={{
              width: `clamp(${SIZE_MAP[m.size] * 0.6}px, ${SIZE_MAP[m.size] / 16}vw + 20px, ${SIZE_MAP[m.size] * 1.2}px)`,
            }}
          />
          <span className="hero-float-label">{m.label}</span>
        </div>
      ))}

      {/* ── Centre hero macaron ── */}
      <img
        ref={heroImgRef}
        src={HERO_MACARON}
        alt="Mon Ami Macaron"
        className="hero-main-img"
        style={{ perspective: '600px' }}
      />

      {/* ── Text content ── */}
      <div className="hero-content">
        <p ref={labelRef} className="hero-label">
          Французькі Макарони
        </p>

        <p ref={subRef} className="hero-sub">
          Ручна робота та найкращі інгредієнти
        </p>

        <button ref={ctaRef} className="hero-cta" onClick={scrollDown}>
          Переглянути колекцію
        </button>
      </div>

      {/* ── Scroll arrow ── */}
      <div ref={arrowRef} className="hero-arrow" onClick={scrollDown}>
        <span className="hero-arrow-label">Гортайте вниз</span>
        <ChevronDown size={20} className="hero-arrow-icon" />
      </div>
    </section>
  );
}
