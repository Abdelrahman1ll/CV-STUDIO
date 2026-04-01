import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import Preview from "./Preview";
import TemplatesPage from "./TemplatesPage";
import {
  Download,
  Layout as LayoutIcon,
  RotateCcw,
  X,
  Edit2,
} from "lucide-react";
import { toJpeg } from "html-to-image";
import jsPDF from "jspdf";
import { emptyData } from "../data/cvData";

function CVBuilder() {
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
  const [isEditorOpen, setIsEditorOpen] = useState(false);

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
      <header className="py-4 lg:h-20 bg-[#0b1221] border-b border-slate-800/50 flex flex-col md:flex-row items-center justify-between px-4 lg:px-10 shrink-0 z-20 shadow-2xl gap-4 md:gap-0">
        <div className="flex items-center gap-4 md:gap-8 w-full md:w-auto justify-between md:justify-start">
          <button
            onClick={() => setView("selection")}
            className="bg-white/5 p-3 rounded-2xl hover:bg-white/10 border border-white/10 transition-all group shadow-inner shrink-0"
            title="Change Template"
          >
            <LayoutIcon
              className="text-white group-hover:rotate-12 transition-transform"
              size={24}
            />
          </button>
          <div className="flex flex-col text-right md:text-left">
            <h1 className="text-2xl md:text-3xl font-black tracking-[-1px] md:tracking-[-2px] bg-linear-to-r from-white to-slate-500 bg-clip-text text-transparent uppercase leading-none">
              CV <span className="text-indigo-500">STUDIO</span>
            </h1>
            <span className="text-[10px] font-black text-slate-600 tracking-[3px] md:tracking-[5px] uppercase mt-1.5 opacity-60">
              Industrial Replica v9.0
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <button
            onClick={handleRestore}
            className="flex items-center justify-center gap-2 hover:text-white text-slate-500 px-3 md:px-4 py-2.5 rounded-xl text-[10px] md:text-xs font-black transition-all uppercase tracking-wider group grow md:grow-0"
          >
            <RotateCcw
              size={16}
              className="group-hover:-rotate-45 transition-transform"
            />{" "}
            <span className="hidden sm:inline">Restore Empty State</span>
            <span className="sm:hidden">Restore</span>
          </button>
          <button
            disabled={isExporting}
            onClick={handleDownload}
            className={`flex items-center justify-center gap-2 md:gap-3 ${isExporting ? "bg-slate-700 cursor-not-allowed" : "bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"} text-white px-6 md:px-10 py-3 rounded-full text-xs md:text-sm font-black shadow-[0_15px_40px_rgba(79,70,229,0.4)] active:scale-95 transition-all uppercase tracking-widest grow md:grow-0`}
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Exporting...
              </>
            ) : (
              <>
                <Download size={18} className="md:w-5 md:h-5" /> Export CV
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex grow overflow-hidden relative">
        {/* Mobile Floating Action Buttons (Top Left & Top Right) */}
        {!isEditorOpen && (
          <>
            {/* Refresh / Restore Button */}
            <button
              onClick={handleRestore}
              className="md:hidden absolute top-3 left-5 z-20 pointer-events-auto bg-[#0b1221]/90 backdrop-blur-md border border-slate-700/50 text-slate-400 p-3.5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:bg-slate-800 hover:text-white transition-all active:scale-95 flex items-center justify-center"
              title="Refresh / Restore"
            >
              <RotateCcw size={20} />
            </button>

            {/* Download Button */}
            <button
              disabled={isExporting}
              onClick={handleDownload}
              className={`md:hidden absolute top-3 right-5 z-20 pointer-events-auto flex items-center justify-center ${isExporting ? "bg-slate-700" : "bg-linear-to-r from-indigo-600 to-purple-600"} text-white p-3.5 rounded-2xl shadow-[0_15px_40px_rgba(79,70,229,0.4)] transition-all active:scale-95`}
              title="Download CV"
            >
              {isExporting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Download size={20} />
              )}
            </button>
          </>
        )}

        {/* Editor Drawer / Sidebar */}
        <div
          className={`absolute lg:static top-0 left-0 h-full w-[85vw] sm:w-[400px] shrink-0 bg-white lg:bg-transparent z-40 lg:z-10 transition-transform duration-500 ease-in-out border-r border-slate-800/20 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] lg:shadow-none ${isEditorOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        >
          <button
            onClick={() => setIsEditorOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-3 bg-red-100 text-red-500 rounded-xl hover:bg-red-200 z-50 transition-colors shadow-sm"
          >
            <X size={20} />
          </button>
          <Editor
            data={data}
            template={template}
            onChange={setData}
            activePage={activePage}
            onPageChange={setActivePage}
          />
        </div>

        {/* Overlay for mobile when editor is open */}
        {isEditorOpen && (
          <div
            className="lg:hidden absolute inset-0 bg-[#020617]/60 backdrop-blur-sm z-30 pointer-events-auto"
            onClick={() => setIsEditorOpen(false)}
          />
        )}

        <div className="w-full grow bg-[#050810] h-full overflow-hidden flex justify-center custom-scrollbar pb-20 lg:pb-0">
          <Preview
            data={data}
            template={template}
            onChange={setData}
            activePage={activePage}
            onPageChange={setActivePage}
          />
        </div>

        {/* Floating Action Button for Mobile */}
        <button
          onClick={() => setIsEditorOpen(true)}
          className={`lg:hidden fixed bottom-6 right-6 px-6 py-4 bg-indigo-600 text-white rounded-2xl shadow-[0_15px_40px_rgba(79,70,229,0.5)] z-20 flex items-center justify-center gap-3 font-black uppercase text-xs tracking-widest hover:bg-indigo-500 hover:-translate-y-1 active:scale-95 transition-all ${isEditorOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
          <Edit2 size={18} /> Edit Data
        </button>
      </main>
    </div>
  );
}

export default CVBuilder;
