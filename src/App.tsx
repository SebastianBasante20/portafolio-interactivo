import ProjectsShowcase from './ProjectsShowcase';

export default function App() {
  return (
    <main style={{ width: '100%', minHeight: '100vh', backgroundColor: '#09090b' }}>
      {/* Spacer superior para permitir scroll */}
      <div style={{ height: '35vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#71717a', fontSize: '0.875rem', fontFamily: 'monospace', gap: '0.5rem', textAlign: 'center', paddingTop: '3rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
        <h1 style={{ color: '#ffffff', fontSize: '2rem', margin: 0, fontWeight: 800 }}>Portafolio de Desarrollo</h1>
        <p style={{ margin: 0, color: '#a1a1aa', maxWidth: '32rem' }}>Desplaza hacia abajo para activar la navegación por scroll horizontal con GSAP ScrollTrigger</p>
        <span style={{ marginTop: '1rem', color: '#10b981' }}>↓ DESPLAZA HACIA ABAJO ↓</span>
      </div>

      {/* Componente principal de proyectos con animación GSAP Pinned */}
      <ProjectsShowcase showSpacer={false} />

      {/* Indicador de fin */}
      <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#52525b', fontSize: '0.875rem', fontFamily: 'monospace' }}>
        Fin del carrusel de proyectos • Gracias por visitar.
      </div>
    </main>
  );
}
