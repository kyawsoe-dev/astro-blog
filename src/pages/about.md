---
title: "About Me"
description: "Learn more about the developer behind this blog and what this site is about."
layout: "../layouts/CustomLayout.astro"
editUrl: false
lastUpdated: false
toc: false
pagination: false
---

<div class="about-hero">
  <div class="about-container">
    <div class="about-header">
      <div class="profile-section">
        <div class="profile-image">
          <img src="/me.jpg" alt="Kyaw Soe Profile Picture" />
        </div>
        <div class="profile-info">
          <h1>Hi, I'm Kyaw Soe</h1>
          <p class="role">Full-Stack Developer & Technical Writer</p>
          <p class="location">Based in Myanmar</p>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="about-container">
  <section class="intro-section">
    <h2>Introduction</h2>
    <p>
      I'm a passionate <strong>full-stack developer</strong> focused on building modern web and
      mobile applications with clean, efficient code. With experience across multiple technologies,
      I specialize in creating solutions that are both functional and maintainable.
    </p>
    <p>
      This blog is where I share <strong>practical knowledge</strong>,
      <strong>real-world fixes</strong>, and <strong>lessons learned</strong> while
      working with production systems. My goal is to help other developers solve problems faster
      and write better code.
    </p>
    <div class="journey-highlights">
      <div class="highlight-card">
        <h3>Experience</h3>
        <p>5+ years building scalable applications across various domains</p>
      </div>
      <div class="highlight-card">
        <h3>Focus</h3>
        <p>Clean architecture, performance optimization, and developer experience</p>
      </div>
      <div class="highlight-card">
        <h3>Approach</h3>
        <p>Practical solutions based on real-world challenges</p>
      </div>
    </div>
  </section>

  <section class="mission-section">
    <h2>Mission & Goals</h2>
    <p>
      This site serves as a <strong>developer notebook</strong> built from real experience,
      not just another tutorial dump. I document solutions to problems I encounter in my
      daily work, so I don't forget them and others can benefit too.
    </p>
    <div class="mission-goals">
      <div class="goal-item">
        <div class="goal-icon">📚</div>
        <div class="goal-content">
          <h3>Knowledge Sharing</h3>
          <p>Document solutions I don't want to forget and share with the community</p>
        </div>
      </div>
      <div class="goal-item">
        <div class="goal-icon">🤝</div>
        <div class="goal-content">
          <h3>Help Others</h3>
          <p>Help other developers avoid common mistakes and learn faster</p>
        </div>
      </div>
      <div class="goal-item">
        <div class="goal-icon">✨</div>
        <div class="goal-content">
          <h3>Best Practices</h3>
          <p>Share clean patterns and proven best practices</p>
        </div>
      </div>
    </div>
  </section>

  <section class="skills-section">
    <h2>Technical Expertise</h2>
    <div class="skills-grid">
      <div class="skill-category">
        <h3>Mobile Development</h3>
        <ul>
          <li>Flutter & Dart</li>
          <li>Native iOS/Android</li>
          <li>Mobile Architecture</li>
          <li>Performance Optimization</li>
        </ul>
      </div>
      <div class="skill-category">
        <h3>Web Development</h3>
        <ul>
          <li>Astro, Next.js, React</li>
          <li>TypeScript & JavaScript</li>
          <li>Frontend Frameworks</li>
          <li>UI/UX Implementation</li>
        </ul>
      </div>
      <div class="skill-category">
        <h3>Backend & APIs</h3>
        <ul>
          <li>Node.js & Express</li>
          <li>NestJS</li>
          <li>Prisma ORM</li>
          <li>REST & GraphQL APIs</li>
        </ul>
      </div>
      <div class="skill-category">
        <h3>DevOps & Tools</h3>
        <ul>
          <li>Deployment (Vercel, Cloudflare)</li>
          <li>Database Management</li>
          <li>CI/CD Pipelines</li>
          <li>Performance Monitoring</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="connect-section">
    <h2>Connect With Me</h2>
    <p class="connect-text">Feel free to reach out if you have questions, suggestions, or just want to connect!</p>
    <div class="social-links">
      <a href="https://github.com/kyawsoe-dev" target="_blank" rel="noopener" class="social-link">
        <div class="icon">💻</div>
        <span>GitHub</span>
      </a>
      <a href="mailto:kyawsoedeveloper@gmail.com" class="social-link">
        <div class="icon">✉️</div>
        <span>Email</span>
      </a>
    </div>
  </section>
</div>

<style>
  :root {
    --primary: #3182ce;
    --primary-dark: #2c5282;
    --secondary: #ebf8ff;
    --accent: #4299e1;
    --text: #4a5568;
    --text-light: #718096;
    --text-dark: #1a202c;
    --bg-light: #f7fafc;
    --border: #e2e8f0;
    --card-bg: #ffffff;
    --shadow: rgba(0, 0, 0, 0.05);
  }

  .about-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .about-hero {
    padding: 6rem 0;
    background: linear-gradient(135deg, #f0f9ff 0%, #e6f6ff 100%);
    position: relative;
    overflow: hidden;
  }

  .about-hero::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(49, 130, 206, 0.05) 0%, transparent 70%);
    z-index: 0;
  }

  .profile-section {
    display: flex;
    align-items: center;
    gap: 3rem;
    text-align: left;
    position: relative;
    z-index: 1;
  }

  .profile-image {
    flex-shrink: 0;
    position: relative;
  }

  .profile-image::before {
    content: "";
    position: absolute;
    top: -15px;
    left: -15px;
    width: calc(100% + 30px);
    height: calc(100% + 30px);
    border: 3px solid var(--secondary);
    border-radius: 50%;
    z-index: -1;
  }

  .profile-image img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 5px solid var(--secondary);
    box-shadow: 0 25px 50px -12px var(--shadow);
    object-fit: cover;
  }

  .profile-info h1 {
    font-size: 3rem;
    margin-bottom: 0.75rem;
    color: var(--text-dark);
    font-weight: 800;
    position: relative;
    display: inline-block;
  }

  .profile-info h1::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: var(--primary);
    border-radius: 2px;
  }

  .role, .location {
    font-size: 1.3rem;
    color: var(--text);
    margin: 0.5rem 0;
    font-weight: 500;
  }

  .role {
    color: var(--primary);
  }

  .connect-text {
    text-align: center;
  }

  .intro-section, .mission-section, .skills-section, .connect-section {
    padding: 5rem 0;
  }

  .intro-section h2, .mission-section h2, .skills-section h2, .connect-section h2 {
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: var(--text-dark);
    text-align: center;
    position: relative;
    display: inline-block;
    left: 50%;
    transform: translateX(-50%);
  }

  .intro-section h2::after, .mission-section h2::after, .skills-section h2::after, .connect-section h2::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: var(--primary);
    border-radius: 2px;
  }

  .intro-section p, .mission-section p {
    font-size: 1.2rem;
    line-height: 1.8;
    color: var(--text);
    max-width: 800px;
    margin: 0 auto 2rem;
    text-align: center;
  }

  .intro-section strong, .mission-section strong {
    color: var(--text-dark);
    font-weight: 600;
  }

  .journey-highlights {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin: 3rem 0;
  }

  .highlight-card {
    background: var(--card-bg);
    padding: 2.5rem;
    border-radius: 1rem;
    box-shadow: 0 10px 15px -3px var(--shadow);
    border: 1px solid var(--border);
    text-align: center;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .highlight-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: var(--primary);
  }

  .highlight-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 25px -5px var(--shadow);
  }

  .highlight-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--text-dark);
  }

  .highlight-card p {
    color: var(--text);
    margin: 0;
  }

  .mission-goals {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2.5rem;
    margin: 3rem 0;
  }

  .goal-item {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    background: var(--card-bg);
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 10px 15px -3px var(--shadow);
    border: 1px solid var(--border);
    transition: all 0.3s ease;
  }

  .goal-item:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 25px -5px var(--shadow);
  }

  .goal-icon {
    font-size: 2.5rem;
    flex-shrink: 0;
    background: var(--secondary);
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  .goal-content h3 {
    margin: 0 0 1rem 0;
    color: var(--text-dark);
    font-size: 1.4rem;
  }

  .goal-content p {
    color: var(--text);
    margin: 0;
    line-height: 1.7;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2.5rem;
  }

  .skill-category {
    background: var(--card-bg);
    padding: 2.5rem;
    border-radius: 1rem;
    box-shadow: 0 10px 15px -3px var(--shadow);
    border: 1px solid var(--border);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .skill-category::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: var(--primary);
  }

  .skill-category:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 25px -5px var(--shadow);
  }

  .skill-category h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--text-dark);
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .skill-category h3::before {
    content: "▹";
    color: var(--primary);
    font-size: 1.8rem;
  }

  .skill-category ul {
    list-style: none;
    padding: 0;
  }

  .skill-category li {
    padding: 0.75rem 0;
    color: var(--text);
    position: relative;
    padding-left: 1.5rem;
    display: flex;
    align-items: center;
    border-bottom: 1px dashed var(--border);
  }

  .skill-category li:last-child {
    border-bottom: none;
  }

  .skill-category li::before {
    content: "✓";
    color: var(--primary);
    font-weight: bold;
    position: absolute;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: rgba(49, 130, 206, 0.1);
    border-radius: 50%;
    font-size: 0.8rem;
  }

  .social-links {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-top: 2.5rem;
      flex-wrap: wrap;
  }

  .social-link {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 2rem;
      background: var(--primary);
      color: white;
      text-decoration: none;
      border-radius: 0.75rem;
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      box-shadow: 0 4px 6px var(--shadow);
      font-weight: 600;
      position: relative;
      overflow: hidden;
  }

  .social-link::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: 0.5s;
  }

  .social-link:hover::before {
      left: 100%;
  }

  .social-link:hover {
      background: var(--primary-dark);
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(49, 130, 206, 0.3);
  }

  .social-link .icon {
      font-size: 1.5rem;
  }

  /* Responsive Design */
  @media (max-width: 1199px) {
    .profile-section {
      flex-direction: column;
      text-align: center;
      gap: 2rem;
    }

    .profile-info h1 {
      font-size: 2.8rem;
    }

    .role, .location {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 992px) {
    .about-container {
      padding: 0 1.25rem;
    }

    .about-hero {
      padding: 5rem 0;
    }

    .profile-info h1 {
      font-size: 2.5rem;
    }

    .profile-info h1::after {
      left: 50%;
      transform: translateX(-50%);
    }

    .role, .location {
      font-size: 1.1rem;
    }

    .intro-section h2, .mission-section h2, .skills-section h2, .connect-section h2 {
      font-size: 2.5rem;
      left: auto;
      transform: none;
      text-align: center;
    }

    .intro-section h2::after, .mission-section h2::after, .skills-section h2::after, .connect-section h2::after {
      left: 50%;
      transform: translateX(-50%);
    }

    .intro-section p, .mission-section p {
      font-size: 1.15rem;
      padding: 0 1rem;
    }
  }

  @media (max-width: 768px) {
    .about-container {
      padding: 0 1rem;
    }

    .about-hero {
      padding: 4rem 0;
    }

    .profile-image img {
      width: 180px;
      height: 180px;
    }

    .profile-info h1 {
      font-size: 2.2rem;
    }

    .intro-section, .mission-section, .skills-section, .connect-section {
      padding: 3.5rem 0;
    }

    .intro-section h2, .mission-section h2, .skills-section h2, .connect-section h2 {
      font-size: 2.2rem;
    }

    .intro-section p, .mission-section p {
      font-size: 1.1rem;
      padding: 0 0.5rem;
    }

    .journey-highlights {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .mission-goals {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .skills-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .social-links {
        flex-direction: column;
        align-items: center;
        gap: 1.25rem;
        margin-top: 2rem;
    }

    .social-link {
        width: 90%;
        max-width: 320px;
        justify-content: center;
        padding: 0.8rem 1.5rem;
        font-size: 0.95rem;
    }

    .social-link .icon {
        font-size: 1.3rem;
    }
  }

  @media (max-width: 576px) {
    .about-hero {
      padding: 3rem 0;
    }

    .profile-image img {
      width: 160px;
      height: 160px;
    }

    .profile-info h1 {
      font-size: 2rem;
    }

    .profile-info h1::after {
      width: 50px;
    }

    .role, .location {
      font-size: 1rem;
    }

    .intro-section, .mission-section, .skills-section, .connect-section {
      padding: 3rem 0;
    }

    .intro-section h2, .mission-section h2, .skills-section h2, .connect-section h2 {
      font-size: 1.9rem;
    }

    .intro-section p, .mission-section p {
      font-size: 1rem;
      line-height: 1.7;
    }

    .highlight-card, .goal-item, .skill-category {
      padding: 1.75rem;
    }

    .highlight-card h3 {
      font-size: 1.3rem;
    }

    .goal-content h3 {
      font-size: 1.2rem;
    }

    .skill-category h3 {
      font-size: 1.3rem;
    }

    .social-link {
      max-width: 100%;
      padding: 0.8rem 1.25rem;
    }
  }

  @media (max-width: 480px) {
    .profile-info h1 {
      font-size: 1.8rem;
    }

    .profile-image img {
      width: 140px;
      height: 140px;
    }

    .intro-section h2, .mission-section h2, .skills-section h2, .connect-section h2 {
      font-size: 1.7rem;
    }

    .journey-highlights, .mission-goals, .skills-grid {
      grid-template-columns: 1fr;
    }

    .goal-item {
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 1.5rem;
    }

    .goal-icon {
      margin-bottom: 1rem;
      width: 50px;
      height: 50px;
      font-size: 1.8rem;
    }

    .social-links {
        gap: 1rem;
        margin-top: 1.5rem;
    }

    .social-link {
        width: 95%;
        padding: 0.7rem 1rem;
        font-size: 0.9rem;
        justify-content: center;
    }

    .social-link .icon {
        font-size: 1.2rem;
    }
  }
</style>
