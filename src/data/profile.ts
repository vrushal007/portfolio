export const profile = {
  name: "Vrushal Patel",
  email: "vrushalkpatel007@gmail.com",
  role: "Software Engineer",
  tagline: "I turn ambiguous problems into shipped, working software.",
  yearsExperience: 3,
  github: "https://github.com/vrushal007",
  linkedin: "https://www.linkedin.com/in/vrushalpatel/",
  resume: "/assets/Vrushal_Patel.pdf",
  summary:
    "I'm a software engineer who likes owning things end to end — from a rough idea to a system in production. Most of my time lives in React, Next.js, Node.js, and NestJS, but I'm just as comfortable reasoning about queues, tenancy, and infrastructure as I am about pixels. I built UnifyPay, an open-source library unifying Stripe and Razorpay, because I got tired of solving the same payments problem twice.",
  stats: [
    { label: "Clients on my Multi-Tenant SaaS", value: 60, suffix: "+" },
    { label: "Site Load Time Reduced", value: 60, suffix: "%" },
    { label: "Latency cut on chat streaming", value: 99, suffix: "%" },
    { label: "Orgs on my RBAC panel", value: 40, suffix: "+" },
    { label: "Years Shipping", value: 3, suffix: "+" },
    { label: "Companies Built For", value: 3, suffix: "" },
  ],
  nav: [
    { label: "About", id: "about" },
    { label: "Work", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Approach", id: "approach" },
    { label: "Experience", id: "experience" },
    { label: "Contact", id: "contact" },
  ],
  skillGroups: [
    {
      key: "frontend",
      title: "Frontend",
      note: "the craft this site is arguing for",
      skills: [
        { name: "React.js", level: 95 },
        { name: "Next.js", level: 92 },
        { name: "TypeScript", level: 90 },
        { name: "Redux Toolkit", level: 88 },
        { name: "GSAP", level: 90 },
        { name: "MUI", level: 88 },
      ],
    },
    {
      key: "backend",
      title: "Backend",
      note: "the systems behind the UI",
      skills: [
        { name: "Node.js", level: 92 },
        { name: "NestJS", level: 85 },
        { name: "Express.js", level: 85 },
        { name: "REST APIs", level: 90 },
        { name: "PostgreSQL", level: 82 },
        { name: "Redis / MongoDB", level: 78 },
      ],
    },
    {
      key: "platform",
      title: "Platform & Tools",
      note: "how it ships and stays up",
      skills: [
        { name: "AWS (EKS, SQS, SNS)", level: 82 },
        { name: "Docker", level: 85 },
        { name: "Datadog", level: 75 },
        { name: "Jest", level: 80 },
        { name: "OpenAI API", level: 78 },
        { name: "Vector Search", level: 72 },
      ],
    },
  ],
  experience: [
    {
      role: "Software Engineer",
      company: "Kitchen365 Technologies",
      location: "Ahmedabad, Gujarat",
      period: "04/2025 — Present",
      bullets: [
        "Architected a JSON-driven dynamic UI platform for runtime page routing, configurable blocks, dynamic forms, and SEO metadata generation, working closely with an 8-person engineering team through PR reviews and architecture decisions",
        "Implemented tenant-aware payment orchestration (Authorize.net, Stripe, PayPal) via a centralized service for dynamic resolution across multi-tenant apps",
        "Built an event-driven integration architecture on AWS SNS/SQS with three connectors (Freshsales, QuickBooks, internal inventory sync) for decoupled, fault-tolerant sync",
      ],
    },
    {
      role: "Software Engineer",
      company: "Sunbots Innovations LLP",
      location: "Ahmedabad, Gujarat",
      period: "06/2023 — 11/2024",
      bullets: [
        "Built a dynamic RBAC-based Admin Panel from scratch managing 40+ organizations and 10,000+ users, with column-level access control eliminating manual code changes for permission updates",
        "Integrated GA4 into the management dashboard with automated date-range filters, cutting manual reporting effort by 60% for C-level stakeholders",
        "Implemented Server-Sent Events for AI chat streaming, cutting first-response latency from 3-4s to ~20ms",
        "Built a RAG pipeline on OpenAI embeddings and vector search for natural-language document search, supporting blind and visually impaired users",
      ],
    },
    {
      role: "Front-end Developer Intern",
      company: "Obligate Solutions",
      location: "Remote",
      period: "06/2022 — 12/2022",
      bullets: [
        "Led development of an e-commerce website from scratch using React.js, tailored to client requirements",
        "Collaborated with cross-functional teams to ensure seamless front-end integration, shipping a high-performing, user-friendly storefront",
      ],
    },
    {
      role: "Android Developer Intern",
      company: "Veybit Technologies Pvt. Ltd.",
      location: "Remote",
      period: "01/2022 — 02/2022",
      bullets: [
        "Developed the company's mobile app end-to-end and deployed it on the Google Play Store",
        "Owned coding, testing, and troubleshooting independently, managing the entire app project single-handedly",
      ],
    },
  ],
  approach: [
    {
      step: "01",
      title: "Understand the real problem",
      body: "Before touching code, I dig into what's actually broken — for the user, and for the business. Most bad software solves the wrong problem well.",
    },
    {
      step: "02",
      title: "Design for the next hire, not just today",
      body: "Systems outlive the person who built them. I architect for the engineer who inherits this code with no context.",
    },
    {
      step: "03",
      title: "Ship the thin slice first",
      body: "A working end-to-end path beats a half-built perfect one. I get something real in front of people fast, then harden it.",
    },
    {
      step: "04",
      title: "Instrument, then improve",
      body: "Opinions are cheap. I add logging, metrics, and dashboards early so the next decision is backed by data, not a hunch.",
    },
  ],
  projects: [
    {
      title: "UnifyPay",
      tag: "Open-source · npm",
      description:
        "I co-authored this TypeScript library after hitting the same wall twice in production: every client wanted a different payment gateway. UnifyPay puts Stripe and Razorpay behind one type-safe interface, so switching or supporting both is a config change, not a rewrite.",
      tech: ["TypeScript", "Node.js", "OOP"],
      github: "https://github.com/DarshilChauhan1/unified-pay",
      live: "https://npmjs.com/package/unified-pay-node",
    },
    {
      title: "Course Commerce",
      tag: "Full-stack platform",
      description:
        "A course enrollment platform I built solo end to end — JWT auth, role-based access, and CRUD over courses on an Express/Sequelize backend, with a Redux + MUI frontend on Vite that stays fast on both mobile and desktop.",
      tech: ["React", "Vite", "Express.js", "Sequelize"],
      github: "https://github.com/vrushal007/course-commerce-client",
      live: "https://drive.google.com/file/d/1UAxtD6_qGh-cpz3LcrC1r6_nJQixjh0V/view?usp=drive_link",
    },
    {
      title: "Hotel Management System",
      tag: "Admin dashboard · MERN",
      description:
        "A room-booking admin panel that stops double-bookings before they happen — conflict checks on every reservation, automatic cleanup when rooms are edited or removed, and a refund flow for cancellations, on a MERN stack.",
      tech: ["React", "Express.js", "MongoDB", "Mongoose"],
      github: "https://github.com/vrushal007/Hotel-Management-Admin-App",
      live: "https://hotelmanagementadminapp.vercel.app/",
    },
  ],
  content: {
    nav: {
      logo: "VP//",
    },
    hero: {
      marquee: ["FRONTEND ENGINEER", "REACT", "NEXT.JS", "GSAP", "TYPESCRIPT"],
      clockLabel: "ON THIS PAGE FOR",
      clockSuffix: "S",
    },
    about: {
      headingPart1: "I DON'T JUST WRITE ",
      headingEmphasis1: "CODE.",
      headingPart2: " I ",
      headingEmphasis2: "ARCHITECT",
      headingPart3: " SYSTEMS THAT ",
      headingEmphasis3: "SHIP.",
    },
    skills: {
      heading: "WHAT I BUILD WITH",
      blurb:
        "This section is the argument, not just the list: hover the tags below — every one reacts to your cursor via GSAP.",
    },
    experience: {
      heading: "WHERE I'VE BUILT",
    },
    approach: {
      heading: "HOW I BUILD",
    },
    projects: {
      heading: "SELECTED WORK",
      hint: "Drag to explore →",
    },
    contact: {
      headingLine1: "LET'S BUILD",
      headingLine2Prefix: "SOMETHING ",
      headingEmphasis: "FAST.",
      blurbPrefix:
        "Open to new roles and collaborations. Drop a message, or reach me directly at",
      form: { name: "Name", email: "Email", message: "Message" },
      submitLabel: "Send Message",
      links: [
        { label: "GitHub", hrefField: "github" },
        { label: "LinkedIn", hrefField: "linkedin" },
        { label: "Resume", hrefField: "resume" },
      ],
    },
  },
};

export type Profile = typeof profile;
