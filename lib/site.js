// ─────────────────────────────────────────────────────────────
//  All personal content lives here. Edit this file to update
//  the site — no need to touch the components.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Pon Sanmuga Vishal G",
  shortName: "Vishal",
  role: "Aspiring Software Developer",
  tagline: "ECE student who builds software, from AI workflows to real-world apps.",
  url: "https://ponsanmugavishal.vercel.app",
  location: "Paramathi Velur, Namakkal, Tamil Nadu",
  status: "Open to internships",

  email: "ponsanmugavishalgowri@gmail.com",
  phone: "+91 93421 34828",
  phoneHref: "tel:+919342134828",

  resume: "/resume/Pon_Sanmuga_Vishal_G_Resume.pdf",
  photo: "/images/vishal-cutout.webp",

  githubUsername: "ponsanmugavishal",

  // Leave a url empty ("") to hide that link everywhere on the site.
  socials: [
    { label: "GitHub", url: "https://github.com/ponsanmugavishal", icon: "code" },
    { label: "HackerRank", url: "https://www.hackerrank.com/profile/ponsanmugavisha1", icon: "terminal" },
    { label: "LinkedIn", url: "", icon: "briefcase" },
    { label: "Email", url: "mailto:ponsanmugavishalgowri@gmail.com", icon: "mail" },
  ],
};

export const about = {
  intro:
    "I'm an Electronics and Communication Engineering student at M. Kumarasamy College of Engineering (2024–2028 batch) with a keen interest in software development.",
  body:
    "I like turning ideas into working projects — an LLM that runs multi-step tasks with tools, an SOS app that dispatches an ambulance automatically, and a web app that helps farmers make better crop decisions. Right now I'm sharpening my Python and Java, and looking for an internship where I can learn from a real team and contribute.",
  facts: [
    { label: "College", value: "M. Kumarasamy College of Engineering" },
    { label: "Degree", value: "B.E. ECE · 2024–2028" },
    { label: "Based in", value: "Namakkal, Tamil Nadu" },
    { label: "Languages", value: "Tamil, English, German (A1)" },
  ],
  strengths: ["Quick learner", "Teamwork", "Problem solving", "Adaptability"],
  hobbies: [
    { label: "Gym & fitness", icon: "dumbbell" },
    { label: "Music", icon: "headphones" },
    { label: "Manga & manhwa", icon: "book" },
  ],
};

export const skills = {
  groups: [
    { title: "Languages", items: ["Python", "Java"] },
    { title: "Database", items: ["MySQL"] },
    { title: "Areas", items: ["LLM API integration", "Web development", "Debugging & testing"] },
    { title: "Tools & hardware", items: ["Git & GitHub", "Arduino"] },
  ],
  marquee: ["Python", "Java", "MySQL", "LLM APIs", "Tool calling", "Web apps", "GitHub", "Arduino", "Debugging", "Testing"],
};

export const projects = [
  {
    id: "ai-workflow",
    title: "AI Workflow Automation Platform",
    label: "Hackathon project",
    visual: "workflow",
    tech: ["Python", "LLM API", "Tool calling"],
    summary: "An LLM that finishes multi-step tasks by calling registered tools, without losing control of the run.",
    points: [
      "Built a platform where an LLM completes multi-step tasks by calling registered tools through a Python backend.",
      "Designed it so each step stays controllable and the workflow can recover when a step fails.",
    ],
    links: [],
  },
  {
    id: "ambulance",
    title: "Ambulance SOS & Auto-Dispatch",
    label: "Java",
    visual: "ambulance",
    tech: ["Java", "Location-based"],
    summary: "One tap sends an SOS with live location, and the backend dispatches an ambulance on its own.",
    points: [
      "Built an app that sends an SOS alert with live location to the backend.",
      "Set up the backend to auto-dispatch an ambulance to that location.",
      "Tested the system locally with the app and backend on the same network.",
    ],
    links: [{ label: "Repository", url: "https://github.com/ponsanmugavishal/project-java" }],
  },
  {
    id: "crop",
    title: "Smart Crop Advisory System",
    label: "Web app",
    visual: "crop",
    tech: ["Python", "MySQL"],
    summary: "A web app that turns real-time field data into crop advice farmers can act on.",
    points: [
      "Built a web app that helps farmers analyse real-time field data and make better crop decisions.",
      "Used MySQL to store field data and Python for the backend logic that gives crop advice.",
    ],
    links: [],
  },
  {
    id: "sound",
    title: "Sound-Controlled Switch",
    label: "Hardware",
    visual: "sound",
    tech: ["Arduino", "Sound sensor", "Relay"],
    summary: "Sound turns appliances on and off, so people with physical disabilities can do it on their own.",
    points: [
      "Built a sound-activated switch that lets physically disabled people operate electrical appliances on their own.",
      "Tested and debugged each module to make the system reliable.",
    ],
    links: [],
  },
];

export const education = [
  {
    title: "B.E. Electronics and Communication Engineering",
    place: "M. Kumarasamy College of Engineering, Karur",
    period: "2024 – 2028",
    score: "CGPA 6.66",
  },
  {
    title: "12th Standard",
    place: "SKV Vidhyaashram Senior Secondary School",
    period: "2024",
    score: "63%",
  },
  {
    title: "10th Standard",
    place: "SKV Vidhyaashram Senior Secondary School",
    period: "2022",
    score: "77.7%",
  },
];
