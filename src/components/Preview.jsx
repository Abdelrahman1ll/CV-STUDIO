import PremiumTemplate from "./PremiumTemplate";
import BasicTemplate from "./BasicTemplate";
import { ChevronDown, Plus, Trash2, MousePointer2 } from "lucide-react";

const Preview = ({ data, template, onChange, activePage, onPageChange }) => {
  const pageCount = data.pageCount || 1;

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
    <div className="relative bg-[#020617] overflow-y-auto w-full h-full p-10 md:p-20 flex flex-col items-center custom-scrollbar scroll-smooth">
      <div className="relative z-10 flex flex-col items-center w-full max-w-[210mm]">
        {/* Elite Status Bar */}
        <div className="mb-14 flex items-center justify-between w-full no-print">
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

        {/* The Realistic Paper Stack */}
        <div
          id="cv-preview"
          className="flex flex-col gap-16 items-center w-full relative"
        >
          {Array.from({ length: pageCount }).map((_, i) => (
            <div
              key={i}
              onClick={() => onPageChange(i)}
              className={`relative group animate-in zoom-in-95 duration-700 cursor-pointer transition-all ${
                activePage === i
                  ? "ring-4 ring-indigo-500/50 ring-offset-8 ring-offset-[#020617] scale-[1.01]"
                  : "hover:scale-[1.005]"
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
                  className="absolute -right-16 top-0 p-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all no-print group/del"
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
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full flex flex-col items-center gap-3 no-print">
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
          ))}

          {/* Add Page Button */}
          <button
            onClick={handleAddPage}
            className="group mt-8 mb-20 px-10 py-5 bg-indigo-600/10 border-2 border-dashed border-indigo-500/30 rounded-[30px] text-indigo-400 font-black text-sm uppercase tracking-[5px] flex items-center gap-4 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all active:scale-95 no-print shadow-2xl"
          >
            <Plus
              size={24}
              className="group-hover:rotate-90 transition-transform"
            />{" "}
            Add New Industrial Page
          </button>
        </div>

        <div className="mt-10 mb-20 text-slate-800 text-[10px] font-black uppercase tracking-[25px] no-print opacity-20 text-center animate-pulse">
          INDUSTRIAL v9.0
        </div>
      </div>
    </div>
  );
};

export default Preview;
