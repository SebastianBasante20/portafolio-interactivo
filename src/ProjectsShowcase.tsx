import { useEffect, useRef, useState } from 'react';
import { ExternalLink, ShoppingBag, Sparkles, Box, Film, Image, CheckCircle, Database, Cpu } from 'lucide-react';
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
  const orbitRef = useRef<SVGSVGElement>(null);
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

      // Rotación 360° del gran globo en el fondo detrás de las tarjetas
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
        {/* GRAN GLOBO / ÓRBITA CIRCULAR EN EL FONDO (DETRÁS DE LAS TARJETAS Y OCUPANDO LA PANTALLA) */}
        <div className="giant-orbit-wrapper" aria-hidden="true">
          <svg
            ref={orbitRef}
            className="giant-orbit-svg"
            viewBox="0 0 600 600"
            fill="none"
          >
            {/* Anillos atmosféricos del planeta / globo */}
            <circle cx="300" cy="300" r="280" stroke="rgba(16, 185, 129, 0.18)" strokeWidth="2" strokeDasharray="8 8" />
            <circle cx="300" cy="300" r="240" stroke="rgba(6, 182, 212, 0.25)" strokeWidth="1.5" />
            <circle cx="300" cy="300" r="200" fill="url(#globe-gradient)" opacity="0.25" />

            <defs>
              <radialGradient id="globe-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Líneas de latitud y longitud del globo terráqueo */}
            <ellipse cx="300" cy="300" rx="240" ry="90" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <ellipse cx="300" cy="300" rx="240" ry="160" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <line x1="300" y1="60" x2="300" y2="540" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="6 6" />
            <line x1="60" y1="300" x2="540" y2="300" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="6 6" />

            {/* Nodos de tecnología / monumentos alrededor del perímetro del gran globo */}
            {/* Nodo 1: POS Farma - Top (0°) */}
            <g transform="translate(300, 60)">
              <circle cx="0" cy="0" r="24" fill="#09090b" stroke="#10b981" strokeWidth="2.5" />
              <text x="0" y="4" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="monospace">POS</text>
              <text x="0" y="-34" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold" fontFamily="sans-serif">FARMA</text>
            </g>

            {/* Nodo 2: CotiPro - 72° */}
            <g transform="translate(528, 226)">
              <circle cx="0" cy="0" r="24" fill="#09090b" stroke="#06b6d4" strokeWidth="2.5" />
              <text x="0" y="4" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold" fontFamily="monospace">SAAS</text>
              <text x="40" y="4" textAnchor="start" fill="#06b6d4" fontSize="12" fontWeight="bold" fontFamily="sans-serif">COTIPRO</text>
            </g>

            {/* Nodo 3: Vortex - 144° */}
            <g transform="translate(441, 494)">
              <circle cx="0" cy="0" r="24" fill="#09090b" stroke="#a855f7" strokeWidth="2.5" />
              <text x="0" y="4" textAnchor="middle" fill="#c084fc" fontSize="10" fontWeight="bold" fontFamily="monospace">3D</text>
              <text x="0" y="42" textAnchor="middle" fill="#a855f7" fontSize="12" fontWeight="bold" fontFamily="sans-serif">VORTEX</text>
            </g>

            {/* Nodo 4: AI Trailer - 216° */}
            <g transform="translate(159, 494)">
              <circle cx="0" cy="0" r="24" fill="#09090b" stroke="#f59e0b" strokeWidth="2.5" />
              <text x="0" y="4" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace">AI</text>
              <text x="0" y="42" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold" fontFamily="sans-serif">TRAILER</text>
            </g>

            {/* Nodo 5: Bg Remover - 288° */}
            <g transform="translate(72, 226)">
              <circle cx="0" cy="0" r="24" fill="#09090b" stroke="#ec4899" strokeWidth="2.5" />
              <text x="0" y="4" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold" fontFamily="monospace">IMG</text>
              <text x="-40" y="4" textAnchor="end" fill="#ec4899" fontSize="12" fontWeight="bold" fontFamily="sans-serif">REMOVER</text>
            </g>
          </svg>
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
