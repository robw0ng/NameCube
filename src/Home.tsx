import { useState } from 'react';
import Cube from './Cube';
import './Home.css';
import { projects } from './projects';
import robPhoto from './assets/images/rob.jpg';
import githubIcon from './assets/images/github.png';
import linkedinIcon from './assets/images/linkedin.png';
import resumePdf from './assets/Resume.pdf';

/** "Lifetime Financial Planner" -> "lifetime-financial-planner", for #deep-links. */
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default function Home() {
  // `projects` is authored newest-first, so ascending is just the reverse.
  const [newestFirst, setNewestFirst] = useState(true);
  const ordered = newestFirst ? projects : [...projects].reverse();

  return (
    <div className="page">
      <section className="hero">
        <Cube />
        <a className="scroll-cue" href="#about" aria-label="Scroll down to my work">
          <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
            <path
              d="M5 9l7 7 7-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </section>

      <section className="about" id="about">
        <div className="about-inner">
          <img className="about-photo" src={robPhoto} alt="Robert Wong" />
          <div className="about-text">
            <h1>Robert Wong</h1>
            <p className="role">Software Engineer &middot; NYC / Long Island</p>
            <p>
              I'm a software engineer based around New York City and Long Island. I graduated from
              Stony Brook with a B.S. in Computer Science in May 2026.
            </p>
            <p>
              My first computer ran Windows XP, and I spent most of my time on it playing and
              making Roblox games. I had no idea what I was doing. One of them ended up reaching
              40,000 players, which was the first time something I typed turned into something
              other people actually used. I've been chasing that feeling ever since.
            </p>
            <p>
              These days, between AI and natural intelligence, it's never been easier to build the
              things I'm actually interested in. Most of what I make still starts the same way it
              did back then, with me wanting to know whether I can.
            </p>
            <p>
              If you want the non-work version of me, spin the cube up top.
            </p>
            <div className="about-links">
              <a href={resumePdf} target="_blank" rel="noreferrer" className="btn-primary">
                Resume
              </a>
              <a href="https://github.com/robw0ng" target="_blank" rel="noreferrer">
                <img src={githubIcon} alt="" className="icon" />
                GitHub
              </a>
              <a href="https://linkedin.com/in/robertcwong" target="_blank" rel="noreferrer">
                <img src={linkedinIcon} alt="" className="icon" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="projects" id="projects">
        <div className="section-head">
          <h2>Projects</h2>
          <button
            type="button"
            className="sort-toggle"
            onClick={() => setNewestFirst((v) => !v)}
            aria-label={`Sorted ${newestFirst ? 'newest' : 'oldest'} first. Click to reverse.`}
          >
            {newestFirst ? 'Newest first' : 'Oldest first'}
            <span className="sort-arrow" aria-hidden="true">
              {newestFirst ? '↓' : '↑'}
            </span>
          </button>
        </div>

        <ol className="project-list">
          {ordered.map((p) => (
            <li className="project" key={p.name} id={slug(p.name)}>
              <div className="project-meta">
                <span className="project-period">{p.period}</span>
              </div>

              <div className="project-body">
                <h3>
                  {p.name}
                  <span className="project-tagline">{p.tagline}</span>
                </h3>

                <ul className="stack">
                  {p.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>

                <p>{p.blurb}</p>

                {p.links && (
                  <div className="project-links">
                    {p.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                        {l.label} <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                )}

                {p.image && <img className="project-shot" src={p.image} alt={`${p.name} screenshot`} />}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div>
            <p className="footer-lead">Want to talk?</p>
            <a href="mailto:robwong15@gmail.com">robwong15@gmail.com</a>
          </div>
          <p className="copyright">&copy; {new Date().getFullYear()} Robert Wong</p>
        </div>
      </footer>
    </div>
  );
}
