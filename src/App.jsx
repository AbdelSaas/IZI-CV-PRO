import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Mail, Phone, Briefcase, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // HERO Animations
      gsap.fromTo('.hero-anim', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      );

      // ABOUT Animations
      gsap.fromTo('.about-anim',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: '#about',
            start: 'top 80%',
          }
        }
      );

      // TIMELINE Animations
      gsap.utils.toArray('.timeline-card').forEach((card) => {
        gsap.fromTo(card,
          { x: card.classList.contains('left-card') ? -50 : 50, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            }
          }
        );
      });

      // SKILLS Animations (Tags Pondérés pattern)
      gsap.fromTo('.skill-tag',
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '#skills',
            start: 'top 80%',
          }
        }
      );

      // EDUCATION Animations
      gsap.fromTo('.edu-card',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: '#education',
            start: 'top 85%',
          }
        }
      );

      // CONTACT Animations
      gsap.fromTo('.contact-anim',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: '#contact',
            start: 'top 85%',
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="noise-overlay"></div>
      
      {/* --- A. NAVBAR --- */}
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 w-[90%] max-w-3xl ${isScrolled ? 'bg-background/60 backdrop-blur-xl border border-gray-200/20 shadow-lg text-text' : 'bg-transparent text-white'}`}>
        <div className="font-sans font-bold text-lg tracking-tight">ND.</div>
        <ul className="hidden md:flex items-center gap-8 font-mono text-sm">
          <li><a href="#about" className="link-lift hover:text-accent transition-colors">À propos</a></li>
          <li><a href="#experience" className="link-lift hover:text-accent transition-colors">Expérience</a></li>
          <li><a href="#skills" className="link-lift hover:text-accent transition-colors">Compétences</a></li>
          <li><a href="#contact" className="link-lift hover:text-accent transition-colors">Contact</a></li>
        </ul>
        <a href="/CV.pdf" download className="magnetic-btn hidden md:flex items-center gap-2 bg-accent text-white px-5 py-2 rounded-full font-sans font-semibold text-sm">
          <Download size={16} />
          <span>CV</span>
        </a>
      </nav>

      {/* --- B. SECTION HERO --- */}
      <section className="relative w-full h-[100dvh] flex items-center justify-center bg-primary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
            alt="Abstract Digital Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center flex flex-col items-center px-4 w-full max-w-5xl">
          <div className="hero-anim mb-8 rounded-full p-[2px] bg-gradient-to-tr from-accent to-transparent">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-800 rounded-full flex items-center justify-center text-4xl font-serif text-white/50 border border-white/10">
              ND
            </div>
          </div>
          
          <h1 className="hero-anim font-sans font-extrabold text-5xl md:text-7xl lg:text-8xl tracking-tighter text-white mb-4 text-glow">
            NDENKA Delore
          </h1>
          <h2 className="hero-anim font-serif italic text-2xl md:text-4xl text-white/80 mb-10">
            Ingénieur en bâtiment et Entrepreneur
          </h2>
          
          <div className="hero-anim flex flex-wrap justify-center items-center gap-4 md:gap-8 font-mono text-sm md:text-base text-accent mb-12">
            <span>[Burkina Faso]</span>
            <span className="hidden md:inline text-white/20">|</span>
            <span>[Ingénierie & Sourcing]</span>
            <span className="hidden md:inline text-white/20">|</span>
            <span>[Entrepreneuriat]</span>
          </div>

          <div className="hero-anim flex flex-col sm:flex-row items-center gap-4 mt-8">
            <a href="/CV.pdf" download className="magnetic-btn px-8 py-4 bg-accent text-white rounded-full font-sans font-bold text-lg shadow-[0_0_20px_rgba(123,97,255,0.6)] hover:shadow-[0_0_30px_rgba(123,97,255,0.8)] flex items-center justify-center gap-2 transition-shadow">
              Télécharger CV
            </a>
            <a href="#contact" className="magnetic-btn px-8 py-4 border-2 border-accent text-white hover:bg-accent hover:text-white rounded-full font-sans font-bold text-lg transition-colors flex justify-center">
              Me contacter
            </a>
          </div>
        </div>
      </section>

      {/* --- C. À PROPOS --- */}
      <section id="about" className="py-24 md:py-32 px-6 w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          <div className="md:w-1/3">
            <h2 className="about-anim font-serif italic text-4xl md:text-6xl text-text">À propos</h2>
          </div>
          <div className="hidden md:block w-[2px] bg-accent/30 rounded-full about-anim"></div>
          <div className="md:w-2/3 flex flex-col justify-center">
            <p className="about-anim font-sans text-lg md:text-xl leading-relaxed text-text/80">
              Après le BAC obtenu au Cameroun, j'ai obtenu mon diplôme d'ingénieur en bâtiment à 2IE au Burkina. Mon parcours est guidé par la volonté de construire et d'entreprendre.
            </p>
            <p className="about-anim font-sans text-lg md:text-xl leading-relaxed text-text/80 mt-6">
              Aujourd'hui, j'ambitionne d'implanter une usine de sacs à main pour femmes et de baskets pour homme, alliant ma rigueur d'ingénieur à ma fibre entrepreneuriale.
            </p>
          </div>
        </div>
      </section>

      {/* --- D. EXPÉRIENCE --- */}
      <section id="experience" className="py-24 md:py-32 bg-white px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif italic text-4xl md:text-6xl text-text text-center mb-20">L'Expérience</h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-accent/30"></div>

            <div className="space-y-16">
              {/* Card 1 */}
              <div className="timeline-card left-card relative flex flex-col md:flex-row items-center justify-end md:justify-start w-full">
                <div className="hidden md:block md:w-1/2 pr-12 text-right">
                  <div className="card-lift bg-background p-8 rounded-[2rem] shadow-sm border border-gray-100 text-left md:text-right">
                    <span className="font-mono text-sm text-accent mb-2 block">[Projet Majeur]</span>
                    <h3 className="font-sans font-bold text-2xl mb-1">Construction d'un immeuble et pont</h3>
                    <p className="font-sans text-text/60 mb-4">Burkina Faso</p>
                    <p className="font-sans text-text/80 leading-relaxed">
                      Pilotage de la construction d'un immeuble à 6 niveaux et réalisation d'un pont, démontrant une expertise technique pointue en ingénierie civile.
                    </p>
                  </div>
                </div>
                <div className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 w-[9px] h-[9px] rounded-full bg-accent z-10 shadow-[0_0_10px_rgba(123,97,255,0.8)] timeline-dot"></div>
                <div className="md:hidden w-full pl-12">
                  <div className="card-lift bg-background p-8 rounded-[2rem] shadow-sm border border-gray-100">
                    <span className="font-mono text-sm text-accent mb-2 block">[Projet Majeur]</span>
                    <h3 className="font-sans font-bold text-xl mb-1">Construction d'un immeuble et pont</h3>
                    <p className="font-sans text-text/60 mb-4">Burkina Faso</p>
                    <p className="font-sans text-text/80 leading-relaxed">
                      Pilotage de la construction d'un immeuble à 6 niveaux et réalisation d'un pont, démontrant une expertise technique pointue en ingénierie civile.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="timeline-card right-card relative flex flex-col md:flex-row items-center justify-end w-full">
                <div className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 w-[9px] h-[9px] rounded-full bg-accent z-10 shadow-[0_0_10px_rgba(123,97,255,0.8)] timeline-dot"></div>
                <div className="w-full pl-12 md:w-1/2 md:pl-12">
                  <div className="card-lift bg-background p-8 rounded-[2rem] shadow-sm border border-gray-100">
                    <span className="font-mono text-sm text-accent mb-2 block">[Management]</span>
                    <h3 className="font-sans font-bold text-xl md:text-2xl mb-1">Pilotage d'entreprise</h3>
                    <p className="font-sans text-text/60 mb-4">20 collaborateurs</p>
                    <p className="font-sans text-text/80 leading-relaxed">
                      Direction et gestion quotidienne d'une entreprise de 20 personnes. Optimisation des ressources et management des équipes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="timeline-card left-card relative flex flex-col md:flex-row items-center justify-end md:justify-start w-full">
                <div className="hidden md:block md:w-1/2 pr-12 text-right">
                  <div className="card-lift bg-background p-8 rounded-[2rem] shadow-sm border border-gray-100 text-left md:text-right">
                    <span className="font-mono text-sm text-accent mb-2 block">[Commerce International]</span>
                    <h3 className="font-sans font-bold text-2xl mb-1">Sourcing & Importation</h3>
                    <p className="font-sans text-text/60 mb-4">Chine - Burkina Faso</p>
                    <p className="font-sans text-text/80 leading-relaxed">
                      Gestion des opérations d'importation depuis la Chine vers le Burkina. Recherche de fournisseurs et négociation commerciale.
                    </p>
                  </div>
                </div>
                <div className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 w-[9px] h-[9px] rounded-full bg-accent z-10 shadow-[0_0_10px_rgba(123,97,255,0.8)] timeline-dot"></div>
                <div className="md:hidden w-full pl-12">
                  <div className="card-lift bg-background p-8 rounded-[2rem] shadow-sm border border-gray-100">
                    <span className="font-mono text-sm text-accent mb-2 block">[Commerce International]</span>
                    <h3 className="font-sans font-bold text-xl mb-1">Sourcing & Importation</h3>
                    <p className="font-sans text-text/60 mb-4">Chine - Burkina Faso</p>
                    <p className="font-sans text-text/80 leading-relaxed">
                      Gestion des opérations d'importation depuis la Chine vers le Burkina. Recherche de fournisseurs et négociation commerciale.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* --- E. COMPÉTENCES --- */}
      <section id="skills" className="py-24 md:py-32 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif italic text-4xl md:text-6xl text-text mb-16">Expertises</h2>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            <div className="skill-tag px-6 py-3 rounded-full bg-white border border-gray-100 text-text font-sans font-semibold text-lg shadow-sm hover:border-accent hover:text-accent transition-colors">Gestion d'entreprise</div>
            <div className="skill-tag px-6 py-3 rounded-full bg-white border border-gray-100 text-text font-sans font-semibold text-lg shadow-sm hover:border-accent hover:text-accent transition-colors">Pilotage de projet</div>
            <div className="skill-tag px-6 py-3 rounded-full bg-white border border-gray-100 text-text font-sans font-semibold text-lg shadow-sm hover:border-accent hover:text-accent transition-colors">Création d'entreprise</div>
            <div className="skill-tag px-6 py-3 rounded-full bg-white border border-gray-100 text-text font-sans font-semibold text-lg shadow-sm hover:border-accent hover:text-accent transition-colors">Vente</div>
            <div className="skill-tag px-6 py-3 rounded-full bg-white border border-gray-100 text-text font-sans font-semibold text-lg shadow-sm hover:border-accent hover:text-accent transition-colors">Importation Chine - Burkina</div>
          </div>
        </div>
      </section>

      {/* --- F. FORMATION --- */}
      <section id="education" className="py-24 md:py-32 px-6 bg-primary text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif italic text-4xl md:text-6xl text-center mb-16">Fondations</h2>
          <div className="flex flex-col gap-6">
            <div className="edu-card bg-white/5 p-8 md:p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm card-lift">
              <span className="font-mono text-accent block mb-2">[Diplôme d'Ingénieur]</span>
              <h3 className="font-sans font-bold text-2xl mb-1">Ingénieur en Bâtiment</h3>
              <p className="font-sans text-white/60">Institut 2IE, Burkina Faso</p>
            </div>
            <div className="edu-card bg-white/5 p-8 md:p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm card-lift">
              <span className="font-mono text-accent block mb-2">[Diplôme d'État]</span>
              <h3 className="font-sans font-bold text-2xl mb-1">Baccalauréat</h3>
              <p className="font-sans text-white/60">Cameroun</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- G. CONTACT --- */}
      <section id="contact" className="py-24 md:py-32 px-6 bg-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <h2 className="contact-anim font-serif italic text-5xl md:text-7xl text-white mb-12">Travaillons ensemble</h2>
          
          <div className="contact-anim flex flex-wrap justify-center gap-6 mb-16">
            <a href="mailto:contact@ndenka.com" className="magnetic-btn flex items-center gap-3 bg-white/10 hover:bg-white/20 px-6 py-4 rounded-full text-white backdrop-blur-md transition-colors border border-white/10">
              <Mail size={20} />
              <span className="font-sans font-medium">Email</span>
            </a>
            <a href="#" className="magnetic-btn flex items-center gap-3 bg-white/10 hover:bg-white/20 px-6 py-4 rounded-full text-white backdrop-blur-md transition-colors border border-white/10">
              <Phone size={20} />
              <span className="font-sans font-medium">Téléphone</span>
            </a>
            <a href="#" className="magnetic-btn flex items-center gap-3 bg-white/10 hover:bg-white/20 px-6 py-4 rounded-full text-white backdrop-blur-md transition-colors border border-white/10">
              <Briefcase size={20} />
              <span className="font-sans font-medium">LinkedIn</span>
            </a>
          </div>

          <a href="mailto:contact@ndenka.com" className="contact-anim magnetic-btn group bg-white text-accent px-10 py-5 rounded-full font-sans font-bold text-xl flex items-center gap-4 shadow-xl">
            Envoyer un message
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* --- H. PIED DE PAGE --- */}
      <footer className="bg-primary pt-20 pb-8 px-6 rounded-t-[4rem] -mt-8 relative z-20 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
          <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="font-mono text-xs text-white/70">En ligne & disponible</span>
          </div>
          <p className="font-sans text-white/40 text-sm">
            © {new Date().getFullYear()} NDENKA Delore. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
