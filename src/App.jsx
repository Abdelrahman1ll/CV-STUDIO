import React, { useState, useEffect } from "react";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import PremiumTemplate from "./components/PremiumTemplate";
import BasicTemplate from "./components/BasicTemplate";
import {
  Download,
  Layout as LayoutIcon,
  ArrowRight,
  Check,
  RotateCcw,
} from "lucide-react";
import { toJpeg } from "html-to-image";
import jsPDF from "jspdf";

const abdoData = {
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

const emptyData = {
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

const TemplatesPage = ({ onSelect, currentTemplate }) => {
  const templates = [
    {
      id: "premium",
      name: "Premium Elite v9",
      desc: "Pixel-perfect replica of the user design.",
      color: "from-indigo-600 to-purple-600",
    },
    {
      id: "basic",
      name: "Industrial Basic",
      desc: "Minimalist professional standard.",
      color: "from-slate-700 to-slate-900",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-8 font-['Inter']">
      <div className="max-w-4xl w-full text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-7xl font-black mb-4 tracking-[-5px] bg-linear-to-r from-white to-slate-500 bg-clip-text text-transparent uppercase leading-none">
          CV STUDIO
        </h1>
        <p className="text-indigo-500 text-xl uppercase tracking-[15px] font-black italic">
          The Industrial v9 Replica
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={`group relative p-10 rounded-[40px] border-2 transition-all duration-500 hover:scale-[1.02] active:scale-95 ${
              currentTemplate === t.id
                ? "border-indigo-500 bg-slate-900 shadow-[0_0_50px_rgba(79,70,229,0.3)]"
                : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
            }`}
          >
            <div className="flex justify-center mb-8">
              <div className="w-[150px] h-[212px] rounded-xl overflow-hidden relative shadow-2xl group-hover:-translate-y-2 transition-transform bg-white border border-slate-700 pointer-events-none">
                <div
                  style={{
                    transform: "scale(0.189)",
                    transformOrigin: "top left",
                    width: "210mm",
                    height: "297mm",
                  }}
                >
                  {t.id === "premium" ? (
                    <PremiumTemplate data={abdoData} pageIndex={0} />
                  ) : (
                    <BasicTemplate data={abdoData} pageIndex={0} />
                  )}
                </div>
                {/* Glass overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-slate-900/10"></div>
              </div>
            </div>
            <h3 className="text-3xl font-black mb-3 text-left tracking-tight">
              {t.name}
            </h3>
            <p className="text-slate-500 text-left mb-10 text-lg leading-relaxed">
              {t.desc}
            </p>

            <div className="flex items-center gap-3 text-indigo-400 font-black uppercase tracking-[3px] text-xs group-hover:translate-x-2 transition-transform">
              {currentTemplate === t.id
                ? "Active Selection"
                : "Initialize Studio"}{" "}
              {currentTemplate === t.id ? (
                <Check size={18} />
              ) : (
                <ArrowRight size={18} />
              )}
            </div>

            {currentTemplate === t.id && (
              <div className="absolute top-6 right-6 text-indigo-500">
                <Check
                  size={32}
                  strokeWidth={4}
                  className="animate-in zoom-in duration-300"
                />
              </div>
            )}
          </button>
        ))}
      </div>

      <button
        onClick={() => onSelect(currentTemplate)}
        className="mt-16 group bg-white text-slate-950 px-14 py-6 rounded-3xl font-black text-2xl shadow-[0_25px_60px_rgba(255,255,255,0.1)] hover:bg-slate-50 active:scale-95 transition-all flex items-center gap-5"
      >
        ACCESS EDITOR{" "}
        <ArrowRight className="group-hover:translate-x-2 transition-transform" />
      </button>
    </div>
  );
};

function App() {
  const [view, setView] = useState(() => {
    return localStorage.getItem("cvView") || "selection";
  });
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem("cvData");
      return saved ? JSON.parse(saved) : emptyData;
    } catch {
      return emptyData;
    }
  });
  const [template, setTemplate] = useState(() => {
    return localStorage.getItem("cvTemplate") || "premium";
  });
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    localStorage.setItem("cvView", view);
  }, [view]);

  useEffect(() => {
    localStorage.setItem("cvTemplate", template);
  }, [template]);

  useEffect(() => {
    localStorage.setItem("cvData", JSON.stringify(data));
  }, [data]);

  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = async () => {
    if (isExporting) return;
    setIsExporting(true);

    try {
      // Use name from data if available, otherwise default
      const fileName =
        `${data.fullName.replace(/\s+/g, "_")}_CV.pdf` || "CV_Professional.pdf";

      const pages = document.querySelectorAll(".cv-a4-page");
      if (!pages.length) return;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      for (let i = 0; i < pages.length; i++) {
        const pageElement = pages[i];

        // Wait slightly for fonts to render perfectly
        await new Promise((r) => setTimeout(r, 100));

        // Scale resolution high for crisp PDF text rendering
        const dataUrl = await toJpeg(pageElement, {
          quality: 0.85, // Balance crisp lines and reasonable file size
          pixelRatio: 1.5, // 1.5 is extremely crisp on A4 but drastically smaller than 2.0
          style: {
            boxShadow: "none",
            transform: "scale(1)",
          },
        });

        if (i > 0) {
          pdf.addPage("a4", "portrait");
        }

        // JPEG with FAST compression cuts file sizes by over 80% compared to pure PNG
        pdf.addImage(dataUrl, "JPEG", 0, 0, 210, 297, undefined, "FAST");
      }

      pdf.save(fileName);
    } catch (error) {
      console.error("PDF Export Error:", error);
      alert("Failed to export PDF properly. Please see console for details.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleRestore = () => {
    if (
      window.confirm(
        "Clear all fields and restart? This will delete your current progress.",
      )
    ) {
      setData(emptyData);
      setActivePage(0);
    }
  };

  if (view === "selection") {
    return (
      <TemplatesPage
        onSelect={(id) => {
          setTemplate(id);
          setView("editor");
        }}
        currentTemplate={template}
      />
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#0b1221] text-slate-100 overflow-hidden font-['Inter']">
      {/* Header / Toolbar */}
      <header className="h-20 bg-[#0b1221] border-b border-slate-800/50 flex items-center justify-between px-10 shrink-0 z-20 shadow-2xl">
        <div className="flex items-center gap-8">
          <button
            onClick={() => setView("selection")}
            className="bg-white/5 p-3 rounded-2xl hover:bg-white/10 border border-white/10 transition-all group shadow-inner"
            title="Change Template"
          >
            <LayoutIcon
              className="text-white group-hover:rotate-12 transition-transform"
              size={24}
            />
          </button>
          <div className="flex flex-col">
            <h1 className="text-3xl font-black tracking-[-2px] bg-linear-to-r from-white to-slate-500 bg-clip-text text-transparent uppercase leading-none">
              CV <span className="text-indigo-500">STUDIO</span>
            </h1>
            <span className="text-[10px] font-black text-slate-600 tracking-[5px] uppercase mt-1.5 opacity-60">
              Industrial Replica v9.0
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={handleRestore}
            className="flex items-center gap-2 hover:text-white text-slate-500 px-4 py-2.5 rounded-xl text-xs font-black transition-all uppercase tracking-wider group"
          >
            <RotateCcw
              size={16}
              className="group-hover:-rotate-45 transition-transform"
            />{" "}
            Restore Empty State
          </button>
          <button
            disabled={isExporting}
            onClick={handleDownload}
            className={`flex items-center gap-3 ${isExporting ? "bg-slate-700 cursor-not-allowed" : "bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"} text-white px-10 py-3.5 rounded-full text-sm font-black shadow-[0_15px_40px_rgba(79,70,229,0.4)] active:scale-95 transition-all uppercase tracking-widest`}
          >
            {isExporting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Exporting...
              </>
            ) : (
              <>
                <Download size={20} /> Export CV
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex grow overflow-hidden">
        <div className="w-110 shrink-0 animate-in slide-in-from-left duration-700 ease-out z-10 border-r border-slate-800/20">
          <Editor
            data={data}
            template={template}
            onChange={setData}
            activePage={activePage}
            onPageChange={setActivePage}
          />
        </div>
        <div className="grow bg-[#050810] overflow-hidden flex justify-center custom-scrollbar">
          <Preview
            data={data}
            template={template}
            onChange={setData}
            activePage={activePage}
            onPageChange={setActivePage}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
