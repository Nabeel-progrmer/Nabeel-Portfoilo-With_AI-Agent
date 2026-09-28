"use client";

import Image from "next/image";
import { motion } from "motion/react";
import ChatWidget from "./components/ChatWidget";

const projects = [
  {
    title: "Workforce Management",
    description:
      "A full-stack workforce platform with authentication, role-based dashboards, attendance, QR scanning, tasks and employee management.",
    stack: ["React", "Vite", "Express", "MongoDB", "JWT"],
    live: "https://workforce-management-crgn.vercel.app/",
    github: "https://github.com/Nabeel-progrmer/Workforce-Management",
    backend: "https://github.com/Nabeel-progrmer/Workforce-backend",
    featured: true,
  },
  {
    title: "Nexaura Academy",
    description:
      "An interactive learning platform designed to provide a clean and engaging digital learning experience.",
    stack: ["HTML", "CSS", "JavaScript", "Supabase"],
    live: "https://nexaura-academy.netlify.app/",
    github: "https://github.com/Nabeel-progrmer/Nexaura-academy",
  },
  {
    title: "NOVA E-Commerce",
    description:
      "A modern e-commerce interface with reusable React components and centralized state management.",
    stack: ["React", "Redux Toolkit", "JavaScript", "CSS"],
    live: "https://e-commerce-nova.netlify.app/",
    github: "https://github.com/Nabeel-progrmer/E-commerce-Redux",
  },
  {
    title: "Bakery Website",
    description:
      "A modern bakery website built with Next.js and TypeScript with a clean responsive interface.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    live: "https://bakery-website-1-two.vercel.app/",
    github: "https://github.com/Nabeel-progrmer/Bakery-Website",
  },
];

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Prompt Engineering",
  "Tailwind CSS",
  "Bootstrap",
  "Ant Design",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "SQL",
  "Supabase",
  "Redux Toolkit",
  "Zustand",
  "Git",
  "REST APIs",
];

const services = [
  {
    number: "01",
    title: "Frontend Development",
    description:
      "Building responsive, modern and interactive web interfaces with React, Next.js and TypeScript.",
  },
  {
    number: "02",
    title: "Full-Stack Development",
    description:
      "Developing complete web applications using React, Node.js, Express, MongoDB and REST APIs.",
  },
  {
    number: "03",
    title: "AI-Powered Applications",
    description:
      "Exploring AI, LLM integrations and agentic workflows to build smarter applications.",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

export default function Home() {
  return (
    <main>
      {/* =========================
          NAVBAR
      ========================= */}

      <motion.nav
        className="navbar"
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <a href="#home" className="logo">
          NF<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#services">What I Do</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>

        <a
          href="https://www.linkedin.com/in/nabeel-faisal-926a46386/"
          target="_blank"
          rel="noreferrer"
          className="nav-button"
        >
          Let&apos;s Talk ↗
        </a>
      </motion.nav>

      {/* =========================
          HERO
      ========================= */}

      <section className="hero" id="home">
        <div className="hero-content">
          <motion.div
            className="status"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="status-dot" />
            Available for opportunities
          </motion.div>

          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04, duration: 0.3 }}
          >
            MERN STACK DEVELOPER
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.06,
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            Building digital
            <br />
            <span>experiences that matter.</span>
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.35 }}
          >
            I&apos;m Nabeel Faisal, a MERN Stack Developer focused on building
            modern web applications and exploring AI-powered experiences.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <motion.a
              href="#projects"
              className="primary-button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              View My Work ↗
            </motion.a>

            <motion.a
              href="#contact"
              className="secondary-button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>

          <motion.p
            className="location"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12, duration: 0.3 }}
          >
            Pakistan • Open to Remote Opportunities
          </motion.p>
        </div>

        {/* HERO IMAGE */}

        <div className="hero-visual">
          <div className="hero-ring ring-one" />
          <div className="hero-ring ring-two" />

          <div className="hero-photo">
            <Image
              src="/nabeel.jpg"
              alt="Nabeel Faisal"
              width={430}
              height={430}
              priority
            />
          </div>

          <div className="floating-card floating-card-one">
            <strong>4+</strong>
            <span>Projects</span>
          </div>

          <div className="floating-card floating-card-two">
            <strong>20+</strong>
            <span>Technologies</span>
          </div>
        </div>
      </section>

      {/* =========================
          ABOUT
      ========================= */}

      <motion.section
        className="section about-section"
        id="about"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-label">01 — ABOUT</div>

        <div className="about-grid">
          <h2>
            Turning ideas into
            <br />
            <span>real products.</span>
          </h2>

          <div>
            <p className="large-text">
              I&apos;m a MERN Stack Developer who enjoys turning ideas into
              functional and meaningful digital products.
            </p>

            <p>
              My journey started with frontend development and gradually
              expanded into full-stack development. Now I&apos;m also exploring
              AI, LLMs and Agentic AI to understand how intelligent systems can
              improve modern applications.
            </p>
          </div>
        </div>
      </motion.section>

      {/* =========================
          SERVICES
      ========================= */}

      <section className="section" id="services">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label">02 — WHAT I DO</div>
          <h2>Building with purpose.</h2>
        </motion.div>

        <motion.div
          className="services-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {services.map((service) => (
            <motion.div
              className="service-card"
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              whileHover={{
                y: -8,
                transition: { duration: 0.25 },
              }}
              key={service.number}
            >
              <span className="service-number">{service.number}</span>

              <div className="service-copy">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>

              <span className="service-arrow">↗</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* =========================
          PROJECTS
      ========================= */}

      <section className="section projects-section" id="projects">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label">03 — SELECTED WORK</div>
          <h2>Projects I&apos;ve built.</h2>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project, index) => (
            <motion.article
              className={`project-card ${
                project.featured ? "featured-project" : ""
              }`}
              variants={fadeUp}
              transition={{ duration: 0.65 }}
              whileHover={{
                y: -10,
                transition: { duration: 0.25 },
              }}
              key={project.title}
            >
              <div className="project-top">
                <span>0{index + 1}</span>

                {project.featured && (
                  <span className="featured-label">FEATURED</span>
                )}
              </div>

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <div className="stack-list">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <div className="project-links">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Demo ↗
                </a>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub ↗
                </a>

                {project.backend && (
                  <a
                    href={project.backend}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Backend ↗
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* =========================
          SKILLS
      ========================= */}

      <section className="section skills-section" id="skills">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label">04 — SKILLS</div>
          <h2>Tools I work with.</h2>
        </motion.div>

        <motion.div
          className="skills-cloud"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skills.map((skill) => (
            <motion.span
              key={skill}
              variants={{
                hidden: {
                  opacity: 0,
                  scale: 0.7,
                  y: 15,
                },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                },
              }}
              transition={{ duration: 0.4 }}
              whileHover={{
                scale: 1.08,
                y: -4,
              }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* =========================
          ACHIEVEMENT
      ========================= */}

      <section className="section achievement-section">
        <motion.div
          className="section-label"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          05 — ACHIEVEMENT
        </motion.div>

        <motion.div
          className="achievement-grid"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <div className="achievement-content">
            <span className="achievement-year">2026</span>

            <h2>Hackathon Participant</h2>

            <p>
              Participated in a hackathon and received a participation
              certificate while gaining practical experience building under
              time constraints.
            </p>

            <a
              href="/certificate.jpeg"
              target="_blank"
              rel="noreferrer"
              className="secondary-button"
            >
              View Certificate ↗
            </a>
          </div>

          <motion.div
            className="certificate-card"
            whileHover={{
              rotateY: 4,
              rotateX: -4,
              scale: 1.02,
            }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/certificate.jpeg"
              alt="Hackathon Participation Certificate"
              width={800}
              height={600}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* =========================
          JOURNEY
      ========================= */}

      <section className="section journey-section">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="section-label">06 — JOURNEY</div>
          <h2>Always learning.</h2>
        </motion.div>

        <motion.div
          className="journey-list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {[
            [
              "01",
              "Frontend Development",
              "HTML, CSS, JavaScript, React and modern UI development.",
            ],
            [
              "02",
              "Full-Stack Development",
              "Node.js, Express, MongoDB, authentication and APIs.",
            ],
            [
              "03",
              "AI & Agentic AI",
              "Exploring LLMs, AI applications and intelligent agent systems.",
            ],
          ].map(([number, title, description]) => (
            <motion.div
              className="journey-item"
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              key={number}
            >
              <span>{number}</span>

              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* =========================
          CONTACT
      ========================= */}

      <motion.section
        className="section contact-section"
        id="contact"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-label">07 — CONTACT</div>

        <div className="contact-content">
          <h2>
            Let&apos;s build something
            <br />
            <span>worth remembering.</span>
          </h2>

          <p>
            Have an idea, project or opportunity? Let&apos;s connect and see
            what we can build together.
          </p>

          <div className="contact-buttons">
            <motion.a
              href="https://www.linkedin.com/in/nabeel-faisal-926a46386/"
              target="_blank"
              rel="noreferrer"
              className="primary-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              LinkedIn ↗
            </motion.a>

            <motion.a
              href="https://github.com/Nabeel-progrmer"
              target="_blank"
              rel="noreferrer"
              className="secondary-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              GitHub ↗
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* =========================
          FOOTER
      ========================= */}

      <footer className="footer">
        <span>© {new Date().getFullYear()} Nabeel Faisal</span>
        <span>Built with Next.js • React • Motion</span>
      </footer>

      {/* ==================================================
          AI PORTFOLIO CHAT
      ================================================== */}

      <ChatWidget />
    </main>
  );
}
