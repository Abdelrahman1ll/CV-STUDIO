export const abdoData = {
  fullName: "ALEXANDER WRIGHT",
  jobTitle: "SENIOR BACKEND ENGINEER",
  image: null,
  summary:
    "A highly motivated Backend Software Engineer with over 4 years of experience building scalable, secure, and robust systems. Adept at creating microservices using modern Node.js frameworks such as NestJS and Express. Proven track record in optimizing relational database queries, orchestrating deployments using Docker, and ensuring seamless integration between backend logic and client-side applications.",
  contact: {
    phone: "+1 (555) 123-4567",
    email: "alex.wright@example.com",
    address: "San Francisco, CA",
  },
  sections: {
    about: "ABOUT",
    experience: "PROFESSIONAL PROJECTS",
    projects: "PROFESSIONAL PROJECTS (CONTINUED)",
    education: "EDUCATION",
    skills: "PROGRAMMING SKILLS",
    personalSkills: "PERSONAL SKILLS",
    highlights: "KEY HIGHLIGHTS",
    languages: "LANGUAGE",
    links: "LINKS",
    ComputerScienceTools: "Technical Skills",
  },
  links: [
    { name: "github", url: "github.com/alexwright" },
    { name: "linkedin", url: "linkedin.com/in/alexwright-dev" },
  ],
  pageCount: 1,
  skills: [
    "JavaScript",
    "TypeScript",
    "Python",
    "Go",
    "Ruby",

    "Node.js",
    "Express.js",
    "NestJS",
    "Spring Boot",
    "Django",

    "MongoDB",
    "PostgreSQL",
    "Redis",
    "Elasticsearch",
    "MySQL",

    "Docker",
    "AWS",
    "Kubernetes",
    "CI/CD (GitHub Actions)",
    "Linux CLI",
    "Nginx",

    "GraphQL",
    "RESTful APIs",
    "WebSockets",
  ],

  ComputerScienceTools: [
    "Data Structures",
    "Algorithms",
    "OOP",
    "System Design",
    "Unit Testing (Jest)",
    "Git/GitHub",
    "Agile/Scrum",
    "Postman",
    "Swagger/OpenAPI",
  ],

  experience: [
    {
      company: "Project : Zenith E-commerce | Oct 2022 - Present",
      role: "Role : Lead Backend Developer (NestJS)",
      tasks: [
        "Architected scalable backend microservices using NestJS and PostgreSQL, handling over 10,000 concurrent user requests during peak sales events.",
        "Implemented robust authentication strategies using JWT, OAuth2, and RBAC to secure endpoints and isolate admin privileges from regular users.",
        "Engineered background task processing pipelines using Redis queues for automated report generation, email notifications, and data synchronization.",
        "Containerized the deployment workflow utilizing Docker and orchestrated load-balancing via Nginx to ensure high availability across instances.",
        "Designed comprehensive RESTful API documentation using Swagger, enabling smooth collaboration with frontend and mobile development teams.",
      ],
    },
  ],

  education: [
    {
      institution: "State University",
      degree: "B.Sc. in Computer Science",
      date: "2018 - 2022",
    },
  ],
  languages: ["English : Native", "Spanish : Professional"],

  secondaryProjects: [
    {
      company: "Project : NovaHealth App | Jan 2022 - Sep 2022",
      role: "Role : Backend Engineer (Node.js)",
      tasks: [
        "Developed a secure and HIPAA-compliant healthcare portal using Express.js and MongoDB to manage sensitive patient records and appointment scheduling.",
        "Integrated a complex real-time chat module utilizing WebSockets, enabling instant communication between medical professionals and patients.",
        "Engineered an automated PDF generation service using Puppeteer to dynamically create encrypted medical reports and prescriptions.",
      ],
    },
    {
      company: "Project : FinTech Vault | Jun 2021 - Dec 2021",
      role: "Role : Junior Backend Developer",
      tasks: [
        "Assisted in rebuilding a legacy monolithic architecture into faster microservices utilizing Go and gRPC, resulting in a 40% reduction in latency.",
        "Implemented automated unit and integration suites using Jest, increasing overall test coverage from 45% to 85% before major production releases.",
      ],
    },
  ],

  personalSkills: [
    "STRATEGIC PROBLEM SOLVING",
    "AGILE LEADERSHIP",
    "TECHNICAL WRITING",
    "ATTENTION TO DETAIL",
    "COLLABORATIVE TEAMWORK",
  ],
};

export const emptyData = {
  fullName: "",
  jobTitle: "",
  image: null,
  summary: "",
  contact: {
    phone: "",
    email: "",
    address: "",
  },
  sections: {
    about: "ABOUT",
    experience: "PROFESSIONAL PROJECTS",
    projects: "PROFESSIONAL PROJECTS (CONTINUED)",
    education: "EDUCATION",
    skills: "PROGRAMMING SKILLS",
    personalSkills: "PERSONAL SKILLS",
    highlights: "KEY HIGHLIGHTS",
    languages: "LANGUAGE",
    links: "LINKS",
    ComputerScienceTools: "TECHNICAL SKILLS",
  },
  links: [],
  pageCount: 1,
  skills: [],
  ComputerScienceTools: [],
  experience: [],
  education: [],
  languages: [],
  secondaryProjects: [],
  personalSkills: [],
};
