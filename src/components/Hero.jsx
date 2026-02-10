import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

function Hero({ profile }) {
  const [particlesReady, setParticlesReady] = useState(false);
  const [showParticles, setShowParticles] = useState(true);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setShowParticles(!motionPreference.matches);

    updateMotionPreference();

    if (motionPreference.addEventListener) {
      motionPreference.addEventListener('change', updateMotionPreference);
    } else {
      motionPreference.addListener(updateMotionPreference);
    }

    return () => {
      if (motionPreference.removeEventListener) {
        motionPreference.removeEventListener('change', updateMotionPreference);
      } else {
        motionPreference.removeListener(updateMotionPreference);
      }
    };
  }, []);

  useEffect(() => {
    if (!showParticles) {
      setParticlesReady(false);
      return;
    }

    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setParticlesReady(true);
    });
  }, [showParticles]);

  const particleOptions = useMemo(
    () => ({
      background: {
        color: {
          value: 'transparent'
        }
      },
      detectRetina: true,
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: 'grab'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 145,
            links: {
              opacity: 0.35
            }
          }
        }
      },
      particles: {
        color: {
          value: ['#2ac178', '#55d4a3', '#2f67d3']
        },
        links: {
          color: '#2ac178',
          distance: 140,
          enable: true,
          opacity: 0.2,
          width: 1
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'out'
          },
          random: false,
          speed: 1.2,
          straight: false
        },
        number: {
          density: {
            enable: true,
            area: 900
          },
          value: 55
        },
        opacity: {
          value: 0.45
        },
        shape: {
          type: 'circle'
        },
        size: {
          value: {
            min: 1,
            max: 3
          }
        }
      }
    }),
    []
  );

  return (
    <section className="hero" id="home">
      {showParticles && particlesReady && (
        <Particles id="hero-particles" className="hero-particles" options={particleOptions} />
      )}

      <div className="hero-content">
        <h1>{profile.name}</h1>
        <h2>{profile.role}</h2>
        <p>{profile.summary}</p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            View Projects
          </a>
          <a href={profile.resume} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
            Download Resume
          </a>
        </div>
      </div>
      <div className="hero-art">
        <img src={profile.image} alt="Portrait of Ritam Mukherjee" />
      </div>
    </section>
  );
}

export default Hero;
