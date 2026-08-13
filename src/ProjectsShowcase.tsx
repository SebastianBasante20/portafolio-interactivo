import { useEffect, useRef, useState } from 'react';
import { ExternalLink, ShoppingBag, Sparkles, Box, Film, Image, CheckCircle, Database, ChevronDown, ArrowRight, X } from 'lucide-react';
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
  problem: string;
  architecture: string;
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
    problem: 'En municipios con baja conectividad, las caídas de internet paralizan la facturación en caja.',
    architecture: 'Aplicación Desktop Electron con SQLite embebido y Drizzle ORM. Persistencia 100% offline en disco local con sync opcional.',
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
    problem: 'Las empresas B2B tardan horas preparando cotizaciones en PDF y pierden seguimiento de ventas.',
    architecture: 'Arquitectura multi-empresa isolada con Supabase RLS, asistente IA seguro en backend serverless y firma digital con trazabilidad.',
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
    problem: 'Renderizar videos pesados para personajes 3D ralentiza la carga web en teléfonos.',
    architecture: 'Generación vectorial interactiva con GSAP ScrollTrigger sobre Canvas 2D a 60 FPS estables sin descargar videos.',
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
    problem: 'Producir tráilers publicitarios requiere costosos softwares de edición y horas de render.',
    architecture: 'Pipeline serverless que combina APIs generativas de video/voz con una línea de tiempo modular en React.',
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
    problem: 'Depender de servidores externos para quitar fondos incrementa costos y tiempos de latencia.',
    architecture: 'Algoritmo de segmentación ejecutado directo en cliente con Canvas API y canal Alfa PNG sin enviar imágenes a terceros.',
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
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const currentIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const [isDraggingState, setIsDraggingState] = useState(false);

  const nodeAngles = [0, 72, 144, 216, 288];

  // Función de desplazamiento instantáneo a un índice específico sin retardo de inicio
  const goToIndex = (targetIndex: number) => {
    const newIndex = Math.max(0, Math.min(projects.length - 1, targetIndex));
    currentIndexRef.current = newIndex;
    setActiveStep(newIndex + 1);

    const p = newIndex / (projects.length - 1);
    setProgressPercent(Math.round(p * 100));

    const track = trackRef.current;
    const orbit = orbitRef.current;
    const section = sectionRef.current;

    if (!track || !section) return;

    const trackWidth = track.scrollWidth;
    const maxScroll = trackWidth - window.innerWidth + 60;
    const targetX = -p * maxScroll;
    const orbitRotation = -p * 288;

    isAnimatingRef.current = true;

    // Transición directa en 0.35s con respuesta inmediata
    gsap.to(track, {
      x: targetX,
      duration: 0.35,
      ease: 'power2.out',
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    if (orbit) {
      gsap.to(orbit, {
        rotate: orbitRotation,
        duration: 0.35,
        ease: 'power2.out',
      });
    }

    const cards = section.querySelectorAll('.landmark-card');
    cards.forEach((card, idx) => {
      const baseAngle = nodeAngles[idx] || 0;
      const currentTotalAngle = orbitRotation + baseAngle;
      gsap.to(card, {
        rotate: -currentTotalAngle,
        duration: 0.35,
        ease: 'power2.out',
      });
    });
  };

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

      // ScrollTrigger ultra-reactivo 1:1 sin snap interno diferido
      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${track.scrollWidth}`,
          pin: true,
          scrub: 0.1, // Respuesta de 0.1s instantánea en scroll continuo
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = Math.max(0, Math.min(1, self.progress));
            setProgressPercent(Math.round(p * 100));

            const closestStep = Math.min(
              projects.length - 1,
              Math.round(p * (projects.length - 1))
            );
            currentIndexRef.current = closestStep;
            setActiveStep(closestStep + 1);

            const orbitRotation = -p * 288;
            if (orbit) {
              gsap.set(orbit, { rotate: orbitRotation });
            }

            const cards = section.querySelectorAll('.landmark-card');
            cards.forEach((card, idx) => {
              const baseAngle = nodeAngles[idx] || 0;
              const currentTotalAngle = orbitRotation + baseAngle;
              gsap.set(card, { rotate: -currentTotalAngle });
            });
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  // Captura inmediata de rueda del mouse (0ms de retraso al girar la rueda)
  const handleWheelNative = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (Math.abs(delta) < 8 || isAnimatingRef.current) return;

    if (delta > 0) {
      if (currentIndexRef.current < projects.length - 1) {
        goToIndex(currentIndexRef.current + 1);
      }
    } else {
      if (currentIndexRef.current > 0) {
        goToIndex(currentIndexRef.current - 1);
      }
    }
  };

  const handleCardClick = (id: string) => {
    if (isDraggingRef.current) return;
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  // Arrastre directo por mouse sin retardo
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, a')) return;
    isDraggingRef.current = false;
    startXRef.current = e.clientX;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = startXRef.current - moveEvent.clientX;
      if (Math.abs(deltaX) > 4) {
        isDraggingRef.current = true;
        setIsDraggingState(true);
        window.scrollBy(0, deltaX * 2.2);
        startXRef.current = moveEvent.clientX;
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      setTimeout(() => {
        isDraggingRef.current = false;
        setIsDraggingState(false);
      }, 30);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

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
    <div className={`projects-showcase-wrapper ${className}`} onWheel={handleWheelNative}>
      {showSpacer && (
        <div className="projects-showcase-spacer-top">
          <span>↓ Desplaza hacia abajo para ver la animación pinned ↓</span>
        </div>
      )}

      <section ref={sectionRef} className="projects-showcase-section">
        {/* ESTRUCTURA ORBITAL Y NODOS ILUSTRADOS VECTORIALES SVG */}
        <div className="giant-orbit-wrapper" aria-hidden="true">
          <div ref={orbitRef} className="system-core-container">
            <svg className="system-core-svg" viewBox="0 0 700 700" fill="none">
              <defs>
                <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.22" />
                  <stop offset="40%" stopColor="#06b6d4" stopOpacity="0.12" />
                  <stop offset="80%" stopColor="#a855f7" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="ring-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="40%" stopColor="#06b6d4" />
                  <stop offset="80%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
                <filter id="orb-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <circle cx="350" cy="350" r="320" fill="url(#core-glow)" />
              <circle cx="350" cy="350" r="290" stroke="url(#ring-grad-1)" strokeWidth="3" filter="url(#orb-glow)" opacity="0.9" />
              <circle cx="350" cy="350" r="290" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="6 8" />
              <circle cx="350" cy="350" r="210" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="100 20 50 20" opacity="0.5" />
              <circle cx="350" cy="350" r="140" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="60 15" opacity="0.4" />

              <line x1="350" y1="30" x2="350" y2="670" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="30" y1="350" x2="670" y2="350" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" strokeDasharray="4 4" />
            </svg>

            {/* NODOS SOBRE LOS PUNTOS BRILLANTES */}
            <div className="system-badges-ring">
              <div className="tech-landmark-node node-pos" style={{ transform: 'rotate(0deg) translateY(-290px)' }}>
                <span className="glowing-orb-dot emerald" />
                <div className="node-stalk emerald" />
                <div className="landmark-card emerald">
                  <svg className="landmark-svg" viewBox="0 0 32 32" fill="none">
                    <rect x="4" y="6" width="24" height="16" rx="3" stroke="#10b981" strokeWidth="2" fill="rgba(16, 185, 129, 0.18)" />
                    <path d="M 12 11 H 20 M 16 7 V 15" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 8 26 H 24 M 16 22 V 26" stroke="#10b981" strokeWidth="2" />
                  </svg>
                  <div className="landmark-text">
                    <strong>POS Farma</strong>
                    <small>POS Terminal & SQLite</small>
                  </div>
                </div>
              </div>

              <div className="tech-landmark-node node-cotipro" style={{ transform: 'rotate(72deg) translateY(-290px)' }}>
                <span className="glowing-orb-dot cyan" />
                <div className="node-stalk cyan" />
                <div className="landmark-card cyan">
                  <svg className="landmark-svg" viewBox="0 0 32 32" fill="none">
                    <path d="M 8 4 H 20 L 26 10 V 26 C 26 27.1 25.1 28 24 28 H 8 C 6.9 28 6 27.1 6 26 V 6 C 6 4.9 6.9 4 8 4 Z" stroke="#06b6d4" strokeWidth="2" fill="rgba(6, 182, 212, 0.18)" />
                    <path d="M 12 16 L 15 19 L 21 13" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="23" cy="7" r="2" fill="#38bdf8" />
                  </svg>
                  <div className="landmark-text">
                    <strong>CotiPro SaaS</strong>
                    <small>Firma Digital & IA</small>
                  </div>
                </div>
              </div>

              <div className="tech-landmark-node node-vortex" style={{ transform: 'rotate(144deg) translateY(-290px)' }}>
                <span className="glowing-orb-dot purple" />
                <div className="node-stalk purple" />
                <div className="landmark-card purple">
                  <svg className="landmark-svg" viewBox="0 0 32 32" fill="none">
                    <path d="M 16 3 L 28 9 V 23 L 16 29 L 4 23 V 9 Z" stroke="#a855f7" strokeWidth="2" fill="rgba(168, 85, 247, 0.18)" />
                    <path d="M 16 3 V 29 M 4 9 L 28 23 M 28 9 L 4 23" stroke="#c084fc" strokeWidth="1.2" />
                  </svg>
                  <div className="landmark-text">
                    <strong>Vortex 3D</strong>
                    <small>Motor GSAP & Canvas</small>
                  </div>
                </div>
              </div>

              <div className="tech-landmark-node node-trailer" style={{ transform: 'rotate(216deg) translateY(-290px)' }}>
                <span className="glowing-orb-dot amber" />
                <div className="node-stalk amber" />
                <div className="landmark-card amber">
                  <svg className="landmark-svg" viewBox="0 0 32 32" fill="none">
                    <rect x="4" y="8" width="24" height="18" rx="3" stroke="#f59e0b" strokeWidth="2" fill="rgba(245, 158, 11, 0.18)" />
                    <path d="M 13 13 L 21 17 L 13 21 Z" fill="#fbbf24" />
                    <path d="M 4 12 H 28" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                  </svg>
                  <div className="landmark-text">
                    <strong>AI Trailer</strong>
                    <small>Generador de Video</small>
                  </div>
                </div>
              </div>

              <div className="tech-landmark-node node-remover" style={{ transform: 'rotate(288deg) translateY(-290px)' }}>
                <span className="glowing-orb-dot pink" />
                <div className="node-stalk pink" />
                <div className="landmark-card pink">
                  <svg className="landmark-svg" viewBox="0 0 32 32" fill="none">
                    <rect x="5" y="5" width="22" height="22" rx="4" stroke="#ec4899" strokeWidth="2" fill="rgba(236, 72, 153, 0.18)" />
                    <circle cx="12" cy="12" r="3" fill="#f472b6" />
                    <path d="M 7 24 L 14 17 L 19 21 L 22 18 L 27 24" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <div className="landmark-text">
                    <strong>Bg Remover</strong>
                    <small>Canvas Alpha API</small>
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

        {/* Pista horizontal de tarjetas */}
        <div
          className={`projects-showcase-track-container ${isDraggingState ? 'is-dragging' : ''}`}
          onMouseDown={handleMouseDown}
        >
          <div ref={trackRef} className="projects-showcase-track">
            {projects.map((project, idx) => {
              const isExpanded = expandedCardId === project.id;
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
                  className={`projects-showcase-card card-large ${isExpanded ? 'is-expanded' : ''}`}
                  onClick={() => {
                    goToIndex(idx);
                    handleCardClick(project.id);
                  }}
                >
                  {/* CONTENIDO SUPERIOR DE LA TARJETA */}
                  <div className="card-top-content">
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

                        {/* BOTÓN VER CASO QUE DESPLIEGA EL CUADRO ATRÁS */}
                        <button
                          className={`ver-caso-trigger-btn ${isExpanded ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            goToIndex(idx);
                            handleCardClick(project.id);
                          }}
                        >
                          {isExpanded ? (
                            <>
                              Ocultar detalles <X size={14} />
                            </>
                          ) : (
                            <>
                              Ver caso <ChevronDown size={14} className="chevron-icon" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Window Mockup Frame */}
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

                  {/* CUADRO ATRÁS QUE SE DESPLAZA AL DAR CLICK EN LA TARJETA */}
                  <div className="card-sliding-panel" onClick={(e) => e.stopPropagation()}>
                    <div className="panel-inner-container">
                      <div className="panel-header-row">
                        <div>
                          <span className="panel-badge-code">DETALLES Y ARQUITECTURA DE CASO</span>
                          <h4 className="panel-project-title">{project.title}</h4>
                        </div>
                        {project.link && (
                          <a
                            href={project.link}
                            className="panel-ver-caso-btn"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Ir a sitio oficial <ArrowRight size={14} />
                          </a>
                        )}
                      </div>

                      <div className="panel-grid-info">
                        <div className="panel-info-box">
                          <strong className="box-title">Problema & Reto:</strong>
                          <p className="box-description">{project.problem}</p>
                        </div>
                        <div className="panel-info-box">
                          <strong className="box-title">Decisiones Técnicas de Arquitectura:</strong>
                          <p className="box-description">{project.architecture}</p>
                        </div>
                      </div>
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
            <span>PORTFOLIO SHOWCASE • NAVEGACIÓN INSTANTÁNEA 0ms</span>
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
