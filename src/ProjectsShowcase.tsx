import { useEffect, useRef, useState } from 'react';
import { ExternalLink, ShoppingBag, Sparkles, Box, Film, Image, CheckCircle, Database, Layers } from 'lucide-react';
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

      // Rotación 360° de la matriz de arquitectura en el fondo
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

  // Vistas previas sin emojis usando SVG icons técnicos
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
              <div className="remover-arrow">-&gt;</div>
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
        {/* NÚCLEO Y MATRIZ DE ARQUITECTURA DE SOFTWARE (DETRÁS DE LAS TARJETAS) */}
        <div className="giant-orbit-wrapper" aria-hidden="true">
          <div ref={orbitRef} className="system-core-container">
            {/* SVG con anillos de radar y ejes de datos */}
            <svg className="system-core-svg" viewBox="0 0 700 700" fill="none">
              <defs>
                <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                  <stop offset="40%" stopColor="#06b6d4" stopOpacity="0.12" />
                  <stop offset="80%" stopColor="#a855f7" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="ring-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>

              {/* Resplandor del núcleo */}
              <circle cx="350" cy="350" r="320" fill="url(#core-glow)" />

              {/* Anillos concéntricos de arquitectura */}
              <circle cx="350" cy="350" r="310" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" strokeDasharray="4 8" />
              <circle cx="350" cy="350" r="290" stroke="url(#ring-grad-1)" strokeWidth="2" strokeDasharray="160 20 40 20" opacity="0.85" />
              <circle cx="350" cy="350" r="240" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="80 15 200 15" opacity="0.6" />
              <circle cx="350" cy="350" r="190" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="120 30" opacity="0.5" />
              <circle cx="350" cy="350" r="140" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1" strokeDasharray="6 6" />
              <circle cx="350" cy="350" r="90" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />

              {/* Ejes transversales de sistema */}
              <line x1="350" y1="20" x2="350" y2="680" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="20" y1="350" x2="680" y2="350" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="117" y1="117" x2="583" y2="583" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="583" y1="117" x2="117" y2="583" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" strokeDasharray="4 4" />

              {/* Indicador del núcleo central */}
              <circle cx="350" cy="350" r="16" fill="#09090b" stroke="#10b981" strokeWidth="2" />
              <circle cx="350" cy="350" r="6" fill="#34d399" />
            </svg>

            {/* NODOS DE SISTEMA TÉCNICOS SIN EMOJIS EN EL PERÍMETRO */}
            <div className="system-badges-ring">
              {/* Nodo 1: POS Farma - 0 deg (Arriba) */}
              <div className="tech-node-badge node-pos" style={{ transform: 'rotate(0deg) translateY(-290px) rotate(0deg)' }}>
                <span className="node-dot emerald" />
                <div className="node-info">
                  <span className="node-code">SYS-01</span>
                  <span className="node-title">POS Farma</span>
                </div>
              </div>

              {/* Nodo 2: CotiPro SaaS - 72 deg */}
              <div className="tech-node-badge node-cotipro" style={{ transform: 'rotate(72deg) translateY(-290px) rotate(-72deg)' }}>
                <span className="node-dot cyan" />
                <div className="node-info">
                  <span className="node-code">SYS-02</span>
                  <span className="node-title">CotiPro SaaS</span>
                </div>
              </div>

              {/* Nodo 3: Vortex 3D - 144 deg */}
              <div className="tech-node-badge node-vortex" style={{ transform: 'rotate(144deg) translateY(-290px) rotate(-144deg)' }}>
                <span className="node-dot purple" />
                <div className="node-info">
                  <span className="node-code">SYS-03</span>
                  <span className="node-title">Vortex 3D</span>
                </div>
              </div>

              {/* Nodo 4: AI Trailer - 216 deg */}
              <div className="tech-node-badge node-trailer" style={{ transform: 'rotate(216deg) translateY(-290px) rotate(-216deg)' }}>
                <span className="node-dot amber" />
                <div className="node-info">
                  <span className="node-code">SYS-04</span>
                  <span className="node-title">AI Trailer</span>
                </div>
              </div>

              {/* Nodo 5: Image Remover - 288 deg */}
              <div className="tech-node-badge node-remover" style={{ transform: 'rotate(288deg) translateY(-290px) rotate(-288deg)' }}>
                <span className="node-dot pink" />
                <div className="node-info">
                  <span className="node-code">SYS-05</span>
                  <span className="node-title">Bg Remover</span>
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

        {/* Pista horizontal de tarjetas (flotando al frente del núcleo técnico) */}
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

                  {/* Window Mockup Frame con contenido del proyecto */}
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
