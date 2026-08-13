import { useEffect, useRef, useState } from 'react';
import { ExternalLink, ShoppingBag, Sparkles, Box, Film, Image, CheckCircle, Database } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProjectsShowcase.css';

export interface ProjectItem {
  id: string;
  badge: string;
  badgeType?: 'emerald' | 'cyan' | 'purple' | 'amber' | 'pink';
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  domain?: string;
  icon: any;
  previewType: 'pos' | 'cotipro' | 'vortex' | 'trailer' | 'remover';
}

export const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: 'pos-farma',
    badge: '01 DESTACADO',
    badgeType: 'emerald',
    title: 'POS Farmaeconomica',
    description:
      'Punto de venta e inventarios para droguería en Nariño. Funciona sin internet en un solo computador con Windows.',
    techStack: ['Electron', 'React', 'TypeScript', 'SQLite', 'Drizzle ORM', 'Vite'],
    link: '#',
    domain: 'farmaeconomica.pos.local',
    icon: ShoppingBag,
    previewType: 'pos',
  },
  {
    id: 'cotipro',
    badge: '02 DESTACADO',
    badgeType: 'cyan',
    title: 'CotiPro',
    description:
      'Plataforma SaaS para crear, gestionar y firmar digitalmente cotizaciones B2B con asistente de IA integrado.',
    techStack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'OpenAI API', 'n8n'],
    link: '#',
    domain: 'cotipro.app',
    icon: Sparkles,
    previewType: 'cotipro',
  },
  {
    id: 'vortex-studio',
    badge: '03',
    badgeType: 'purple',
    title: 'Vortex Studio',
    description:
      'El héroe de GTA VI, hecho con geometría medida en vez de un video.',
    techStack: ['HTML', 'Tailwind CSS', 'GSAP'],
    link: '#',
    domain: 'vortex.studio.dev',
    icon: Box,
    previewType: 'vortex',
  },
  {
    id: 'ai-trailer',
    badge: '04',
    badgeType: 'amber',
    title: 'AI Trailer Studio',
    description:
      'Un prompt y una marca entran; sale un tráiler publicitario listo.',
    techStack: ['TypeScript', 'React', 'Vite'],
    link: '#',
    domain: 'aitrailer.studio',
    icon: Film,
    previewType: 'trailer',
  },
  {
    id: 'bg-remover',
    badge: '05',
    badgeType: 'pink',
    title: 'Removedor de Fondo',
    description:
      'Quitar el fondo de una imagen sin depender de un servicio ajeno.',
    techStack: ['JavaScript', 'Canvas API', 'Claude API'],
    link: '#',
    domain: 'bg-remover.local',
    icon: Image,
    previewType: 'remover',
  },
];

export interface ProjectsShowcaseProps {
  title?: string;
  description?: string;
  projects?: ProjectItem[];
  className?: string;
  showSpacer?: boolean;
}

export default function ProjectsShowcase({
  title = 'Lo que he construido',
  description = 'Cada proyecto es una herramienta que alguien usa, no un ejercicio. Entra a cualquiera para ver el problema, la arquitectura y las decisiones técnicas.',
  projects = DEFAULT_PROJECTS,
  className = '',
  showSpacer = false,
}: ProjectsShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(1);
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const orbit = orbitRef.current;

      if (!section || !track) return;

      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        return -(trackWidth - window.innerWidth + 60);
      };

      // Desplazamiento horizontal pinned
      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${track.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = Math.max(0, Math.min(1, self.progress));
            setProgressPercent(Math.round(p * 100));
            const step = Math.min(
              projects.length,
              Math.floor(p * projects.length) + 1
            );
            setActiveStep(step);
          },
        },
      });

      // Rotación de 360° del Planeta 3D y Banderas Tecnológicas en el fondo
      if (orbit) {
        gsap.to(orbit, {
          rotate: 360,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${track.scrollWidth}`,
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  // Renderizar vistas previas personalizadas por proyecto
  const renderProjectPreview = (type: string) => {
    switch (type) {
      case 'pos':
        return (
          <div className="preview-pos">
            <div className="pos-top-bar">
              <span className="pos-badge-status"><Database size={12} /> Offline Mode (SQLite)</span>
              <span className="pos-terminal-id">Caja #01 • Nariño</span>
            </div>
            <div className="pos-items-list">
              <div className="pos-item">
                <span>Paracetamol 500mg (x2)</span>
                <strong>$12.500</strong>
              </div>
              <div className="pos-item">
                <span>Amoxicilina 500mg (x1)</span>
                <strong>$28.000</strong>
              </div>
              <div className="pos-item">
                <span>Alcohol Antiséptico (x1)</span>
                <strong>$6.500</strong>
              </div>
            </div>
            <div className="pos-total-row">
              <span>TOTAL VENTAS:</span>
              <strong className="pos-price">$47.000 COP</strong>
            </div>
          </div>
        );
      case 'cotipro':
        return (
          <div className="preview-cotipro">
            <div className="cotipro-header-row">
              <span className="cotipro-doc-title">Cotización #2026-081</span>
              <span className="cotipro-signed-badge"><CheckCircle size={12} /> Aceptada & Firmada</span>
            </div>
            <div className="cotipro-client">Cliente: Soluciones Empresariales S.A.S.</div>
            <div className="cotipro-items-table">
              <div className="table-row"><span>Licencia SaaS Pro</span><span>$49.900</span></div>
              <div className="table-row"><span>Módulo Asistente IA</span><span>$99.900</span></div>
            </div>
            <div className="cotipro-ai-tag">
              <Sparkles size={12} /> Coti AI: Cotización generada y enviada en 2 min
            </div>
          </div>
        );
      case 'vortex':
        return (
          <div className="preview-vortex">
            <div className="vortex-canvas">
              <div className="vortex-wireframe">
                <div className="wireframe-box box-1" />
                <div className="wireframe-box box-2" />
                <div className="wireframe-box box-3" />
              </div>
              <div className="vortex-info">
                <span>FPS: 60</span>
                <span>GSAP Timeline: 100%</span>
                <span>Polys: 4,820</span>
              </div>
            </div>
          </div>
        );
      case 'trailer':
        return (
          <div className="preview-trailer">
            <div className="trailer-prompt-box">
              <span className="prompt-label">PROMPT:</span>
              <span className="prompt-text">"Tráiler cinematográfico cyberpunk para marca Neura"</span>
            </div>
            <div className="trailer-timeline">
              <div className="timeline-track">
                <div className="clip c1">Vid 01</div>
                <div className="clip c2">Audio AI</div>
                <div className="clip c3">FX</div>
              </div>
            </div>
          </div>
        );
      case 'remover':
        return (
          <div className="preview-remover">
            <div className="remover-split">
              <div className="remover-original">
                <span>Original</span>
              </div>
              <div className="remover-arrow">➔</div>
              <div className="remover-result">
                <div className="checkerboard-bg">
                  <span className="png-badge">PNG Alpha</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="preview-placeholder">[ Vista previa ]</div>;
    }
  };

  return (
    <div className={`projects-showcase-wrapper ${className}`}>
      {showSpacer && (
        <div className="projects-showcase-spacer-top">
          <span>↓ Desplaza hacia abajo para ver la animación pinned ↓</span>
        </div>
      )}

      <section ref={sectionRef} className="projects-showcase-section">
        {/* GLOBO PLANETARIO 3D VIBRANTE Y BANDERAS TECNOLÓGICAS (DETRÁS DE LAS TARJETAS) */}
        <div className="giant-orbit-wrapper" aria-hidden="true">
          <div ref={orbitRef} className="planet-container">
            {/* Esfera 3D del Planeta estilo Travel Slider */}
            <svg className="planet-globe-svg" viewBox="0 0 700 700" fill="none">
              <defs>
                <radialGradient id="ocean-grad" cx="40%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="45%" stopColor="#0284c7" />
                  <stop offset="85%" stopColor="#0369a1" />
                  <stop offset="100%" stopColor="#0f172a" />
                </radialGradient>
                <radialGradient id="atmosphere-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="70%" stopColor="rgba(56, 189, 248, 0)" />
                  <stop offset="92%" stopColor="rgba(56, 189, 248, 0.4)" />
                  <stop offset="100%" stopColor="rgba(16, 185, 129, 0.65)" />
                </radialGradient>
                <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="14" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Anillos de atmósfera exterior */}
              <circle cx="350" cy="350" r="325" fill="none" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="2" strokeDasharray="6 8" />
              <circle cx="350" cy="350" r="300" fill="none" stroke="rgba(16, 185, 129, 0.45)" strokeWidth="2" filter="url(#glow-filter)" />

              {/* Esfera Base del Planeta */}
              <circle cx="350" cy="350" r="280" fill="url(#ocean-grad)" />

              {/* Capa de Atmósfera Brillante */}
              <circle cx="350" cy="350" r="280" fill="url(#atmosphere-glow)" />

              {/* Continentes Esmeralda Estilizados */}
              <g fill="#10b981" opacity="0.92">
                <path d="M 210 180 Q 230 150 270 170 Q 300 190 280 250 Q 260 270 290 320 Q 320 370 280 440 Q 250 480 230 420 Q 220 360 240 310 Q 210 270 190 220 Z" />
                <path d="M 370 160 Q 420 140 450 170 Q 430 220 400 240 Q 420 300 460 350 Q 430 430 380 450 Q 360 380 370 320 Q 350 250 370 160 Z" />
                <path d="M 480 180 Q 560 170 580 230 Q 540 280 500 260 Q 520 330 560 370 Q 540 430 490 400 Q 470 340 480 180 Z" />
              </g>

              {/* Líneas de Latitud y Longitud */}
              <g stroke="rgba(255, 255, 255, 0.18)" strokeWidth="1.5" fill="none">
                <ellipse cx="350" cy="350" rx="280" ry="110" />
                <ellipse cx="350" cy="350" rx="280" ry="200" />
                <ellipse cx="350" cy="350" rx="130" ry="280" />
                <ellipse cx="350" cy="350" rx="220" ry="280" />
              </g>
            </svg>

            {/* BANDERAS TECNOLÓGICAS 3D ROTANDO EN LA CURVATURA SUPERIOR DEL PLANETA */}
            <div className="planet-badges-ring">
              {/* Nodo 1: POS Farma - 0 deg (Arriba) */}
              <div className="tech-flag-badge badge-pos" style={{ transform: 'rotate(0deg) translateY(-295px) rotate(0deg)' }}>
                <div className="flag-content emerald">
                  <span className="flag-icon">💊</span>
                  <div className="flag-text">
                    <strong>POS Farma</strong>
                    <small>Desktop • SQLite</small>
                  </div>
                </div>
              </div>

              {/* Nodo 2: CotiPro SaaS - 72 deg */}
              <div className="tech-flag-badge badge-cotipro" style={{ transform: 'rotate(72deg) translateY(-295px) rotate(-72deg)' }}>
                <div className="flag-content cyan">
                  <span className="flag-icon">⚡</span>
                  <div className="flag-text">
                    <strong>CotiPro SaaS</strong>
                    <small>React • Supabase</small>
                  </div>
                </div>
              </div>

              {/* Nodo 3: Vortex 3D - 144 deg */}
              <div className="tech-flag-badge badge-vortex" style={{ transform: 'rotate(144deg) translateY(-295px) rotate(-144deg)' }}>
                <div className="flag-content purple">
                  <span className="flag-icon">🎮</span>
                  <div className="flag-text">
                    <strong>Vortex 3D</strong>
                    <small>GSAP • Canvas</small>
                  </div>
                </div>
              </div>

              {/* Nodo 4: AI Trailer - 216 deg */}
              <div className="tech-flag-badge badge-trailer" style={{ transform: 'rotate(216deg) translateY(-295px) rotate(-216deg)' }}>
                <div className="flag-content amber">
                  <span className="flag-icon">🎬</span>
                  <div className="flag-text">
                    <strong>AI Trailer</strong>
                    <small>Vite • React</small>
                  </div>
                </div>
              </div>

              {/* Nodo 5: Image Remover - 288 deg */}
              <div className="tech-flag-badge badge-remover" style={{ transform: 'rotate(288deg) translateY(-295px) rotate(-288deg)' }}>
                <div className="flag-content pink">
                  <span className="flag-icon">✂️</span>
                  <div className="flag-text">
                    <strong>Bg Remover</strong>
                    <small>Canvas API</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Encabezado superior */}
        <div className="projects-showcase-header">
          <h2 className="projects-showcase-title">{title}</h2>
          <p className="projects-showcase-description">{description}</p>
        </div>

        {/* Pista horizontal de tarjetas (flotando al frente del gran globo) */}
        <div className="projects-showcase-track-container">
          <div ref={trackRef} className="projects-showcase-track">
            {projects.map((project) => {
              const badgeClass =
                project.badgeType === 'emerald'
                  ? 'badge-emerald'
                  : project.badgeType === 'cyan'
                  ? 'badge-cyan'
                  : project.badgeType === 'purple'
                  ? 'badge-purple'
                  : project.badgeType === 'amber'
                  ? 'badge-amber'
                  : project.badgeType === 'pink'
                  ? 'badge-pink'
                  : 'badge-neutral';

              const IconComponent = project.icon;

              return (
                <div
                  key={project.id}
                  className="projects-showcase-card card-large"
                >
                  <div className="card-content">
                    <div>
                      <div className="card-badge-row">
                        <span className={`card-badge ${badgeClass}`}>
                          {project.badge}
                        </span>
                        <span className="card-type-icon"><IconComponent size={16} /></span>
                      </div>
                      <h3 className="card-title">{project.title}</h3>
                      <p className="card-description">{project.description}</p>
                    </div>

                    <div>
                      <div className="card-tech-stack">
                        {project.techStack.map((tech, i) => (
                          <span key={i} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {project.link && (
                        <a
                          href={project.link}
                          className="card-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ver caso <ExternalLink size={14} className="inline-icon" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Window Mockup Frame con contenido interactivo del proyecto */}
                  <div className="card-mockup-frame">
                    <div className="mockup-header">
                      <div className="mockup-dots">
                        <span className="dot red" />
                        <span className="dot yellow" />
                        <span className="dot green" />
                      </div>
                      <div className="mockup-url">
                        {project.domain || `${project.id}.dev`}
                      </div>
                    </div>
                    <div className="mockup-body">
                      {renderProjectPreview(project.previewType)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Indicador inferior con progreso */}
        <div className="projects-showcase-footer">
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="footer-label-row">
            <span>PORTFOLIO SHOWCASE • SCROLL HORIZONTAL</span>
            <span className="step-counter">
              0{activeStep} / 0{projects.length}
            </span>
          </div>
        </div>
      </section>

      {showSpacer && (
        <div className="projects-showcase-spacer-bottom">
          <span>Fin de la sección de proyectos.</span>
        </div>
      )}
    </div>
  );
}
