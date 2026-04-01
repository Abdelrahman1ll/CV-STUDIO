import React, { useRef, useState, useEffect } from "react";
import PremiumTemplate from "./PremiumTemplate";
import BasicTemplate from "./BasicTemplate";
import { ChevronDown, Plus, Trash2, MousePointer2 } from "lucide-react";

const Preview = ({ data, template, onChange, activePage, onPageChange }) => {
  const pageCount = data.pageCount || 1;
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  
  // Milder scale for UI elements (Status bar, Add Page button) so they remain legible
  const uiScale = scale < 1 ? scale * 0.5 + 0.5 : 1;

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const availableWidth = entry.contentRect.width;
        const cvWidthPx = 794; // precise A4 width in pixels at standard DPI
        
        // Zoom out the CV just a slight bit
        let newScale = (availableWidth - 64) / cvWidthPx;
        if (newScale > 1) newScale = 1;
        if (newScale < 0.2) newScale = 0.2;
        
        setScale(newScale);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleAddPage = () => {
    onChange({ ...data, pageCount: pageCount + 1 });
    onPageChange(pageCount);
  };

  const handleDeletePage = (index) => {
    if (pageCount > 1) {
      onChange({ ...data, pageCount: pageCount - 1 });
      if (activePage >= pageCount - 1) {
        onPageChange(pageCount - 2);
      }
    }
  };

  return (
    <div className="relative bg-[#020617] overflow-y-auto w-full h-full p-2 sm:p-6 md:p-10 flex flex-col items-center custom-scrollbar scroll-smooth">
      <div className="relative z-10 flex flex-col items-center w-full max-w-[210mm]">
        {/* Elite Status Bar */}
        <div className="w-full flex justify-center transition-transform duration-500 z-10" style={{ transform: `scale(${uiScale})`, transformOrigin: 'top center' }}>
          <div className="mb-4 mt-6 flex items-center justify-center w-full no-print">
            <div className="flex items-center gap-4 px-8 py-3 bg-slate-900/50 border border-slate-800 rounded-2xl shadow-inner backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[4px] leading-none mb-1">
                  Industrial Engine
                </span>
                <span className="text-sm font-black text-white uppercase tracking-tighter">
                  {pageCount}{" "}
                  <span className="text-indigo-400">
                    Professional {pageCount === 1 ? "Page" : "Pages"}
                  </span>
                </span>
              </div>
            </div>
            <div className="hidden lg:block text-right">
              <div className="text-[10px] font-black text-slate-700 uppercase tracking-[8px] mb-1">
                A4 INDUSTRIAL STUDIO
              </div>
              <div className="text-[8px] font-black text-indigo-900 uppercase">
                Replica v9.0 Edition
              </div>
            </div>
          </div>
        </div>

        <div
          id="cv-preview"
          ref={containerRef}
          className="flex flex-col gap-16 items-center w-full relative"
        >
          {Array.from({ length: pageCount }).map((_, i) => (
            <div
              key={i}
              className="relative flex justify-center w-full"
              style={{
                height: `calc(297mm * ${scale})`,
              }}
            >
              <div
                onClick={() => onPageChange(i)}
                style={{
                  transform: `translateX(-50%) scale(${activePage === i ? scale * 1.01 : scale})`,
                  transformOrigin: "top center",
                  width: "210mm",
                  height: "297mm",
                }}
                className={`absolute top-0 left-1/2 group animate-in zoom-in-95 duration-700 cursor-pointer transition-all ${
                  activePage === i
                    ? "ring-4 ring-indigo-500/50 ring-offset-8 ring-offset-[#020617]"
                    : ""
                }`}
              >
                {/* Numerical Floating Sidebar Label */}
                <div className="absolute -left-28 top-0 h-full flex items-start pt-16 no-print">
                  <div className="flex flex-col items-center gap-4 group-hover:translate-x-4 transition-transform duration-500">
                    <span
                      className={`text-4xl font-black uppercase tracking-[-2px] transition-colors ${
                        activePage === i
                          ? "text-indigo-500"
                          : "text-indigo-500/10"
                      }`}
                    >
                      PAGE 0{i + 1}
                    </span>
                    <div className="w-0.5 h-20 bg-linear-to-b from-indigo-500/20 to-transparent"></div>
                  </div>
                </div>

                {/* Delete Button (Secondary Pages Only) */}
                {i > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePage(i);
                    }}
                    className="absolute -right-8 top-1 p-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all no-print group/del z-40"
                    title="Delete Page"
                  >
                    <Trash2 size={20} />
                  </button>
                )}

                {/* Active Indicator */}
                {activePage === i && (
                  <div className="absolute -top-10 left-0 flex items-center gap-2 text-indigo-400 font-black text-[10px] uppercase tracking-[3px] animate-bounce no-print">
                    <MousePointer2 size={12} /> Currently Editing This Page
                  </div>
                )}

                {/* A4 Paper Box */}
                <div
                  className="cv-a4-page bg-white shadow-[0_60px_100px_-20px_rgba(0,0,0,0.9),0_30px_60px_-30px_rgba(0,0,0,0.8)] relative overflow-hidden ring-1 ring-slate-100/50"
                  style={{ width: "210mm", height: "297mm" }}
                >
                  <div className="w-full h-full">
                    {template === "premium" ? (
                      <PremiumTemplate data={data} pageIndex={i} />
                    ) : (
                      <BasicTemplate data={data} pageIndex={i} />
                    )}
                  </div>

                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-[0.03] pointer-events-none"></div>
                </div>

                {/* Visual Break Label (Gaps) */}
                {i < pageCount - 1 && (
                  <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full flex flex-col items-center gap-3 no-print">
                    <div className="px-6 py-1 bg-slate-900 border border-slate-800 rounded-full text-[8px] font-black text-slate-500 uppercase tracking-[6px] shadow-2xl">
                      Page {i + 1} End • Seamless Transition
                    </div>
                    <ChevronDown
                      size={16}
                      className="text-indigo-900 animate-bounce pt-1"
                    />
                  </div>
                )}

                <div className="hidden print:block page-break-after-always"></div>
              </div>
            </div>
          ))}

          {/* Add Page Button */}
          <div className="mt-8 mb-20 flex justify-center w-full" style={{ transform: `scale(${uiScale})`, transformOrigin: 'top center' }}>
            <button
              onClick={handleAddPage}
              className="group px-6 md:px-10 py-4 md:py-5 bg-indigo-600/10 border-2 border-dashed border-indigo-500/30 rounded-[30px] text-indigo-400 font-black text-xs sm:text-sm uppercase tracking-[2px] sm:tracking-[5px] flex flex-row flex-nowrap items-center justify-center gap-2 sm:gap-4 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all active:scale-95 no-print shadow-2xl text-center whitespace-nowrap"
            >
              <Plus
                size={24}
                className="group-hover:rotate-90 transition-transform shrink-0"
              />
              <span>Add New Industrial Page</span>
            </button>
          </div>
        </div>

        <div className="mt-10 mb-20 text-slate-800 text-[10px] font-black uppercase tracking-[25px] no-print opacity-20 text-center animate-pulse">
          INDUSTRIAL v9.0
        </div>
      </div>
    </div>
  );
};

export default Preview;
