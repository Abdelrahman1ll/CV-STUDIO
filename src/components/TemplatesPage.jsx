import PremiumTemplate from "./PremiumTemplate";
import BasicTemplate from "./BasicTemplate";
import { ArrowRight, Check } from "lucide-react";
import { abdoData } from "../data/cvData";

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
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 md:p-8 font-['Inter']">
      <div className="max-w-4xl w-full text-center mb-8 md:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-[-3px] md:tracking-[-5px] bg-linear-to-r from-white to-slate-500 bg-clip-text text-transparent uppercase leading-none">
          CV STUDIO
        </h1>
        <p className="text-indigo-500 text-sm md:text-xl uppercase tracking-[8px] md:tracking-[15px] font-black italic">
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
            <h3 className="text-2xl md:text-3xl font-black mb-3 text-left tracking-tight">
              {t.name}
            </h3>
            <p className="text-slate-500 text-left mb-6 md:mb-10 text-base md:text-lg leading-relaxed">
              {t.desc}
            </p>

            <div className="flex items-center gap-3 text-indigo-400 font-black uppercase tracking-[3px] text-[10px] md:text-xs group-hover:translate-x-2 transition-transform">
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
        className="mt-12 md:mt-16 group bg-white text-slate-950 px-8 py-4 md:px-14 md:py-6 rounded-3xl font-black text-xl md:text-2xl shadow-[0_25px_60px_rgba(255,255,255,0.1)] hover:bg-slate-50 active:scale-95 transition-all flex items-center gap-5"
      >
        ACCESS EDITOR{" "}
        <ArrowRight className="group-hover:translate-x-2 transition-transform" />
      </button>
    </div>
  );
};

export default TemplatesPage;
