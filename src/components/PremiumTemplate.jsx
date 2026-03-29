const PremiumTemplate = ({ data, pageIndex = 0 }) => {
  if (!data) return null;

  const fullName = data.fullName || "";
  const initials =
    fullName
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "AM";

  return (
    <div className="bg-white min-h-[297mm] relative overflow-visible font-['Inter'] text-[#1a1a1a]">
      {/* 
        PIXEL-PERFECT REPLICA v9
        Abdelrahman Mohamed Design.
      */}

      {/* 1. The Floating Spacer (Page 1 Sidebar Area only) */}
      {pageIndex === 0 && (
        <div
          className="float-left pointer-events-none"
          style={{ width: "280px", height: "296.8mm" }}
          aria-hidden="true"
        ></div>
      )}

      {/* 2. The Visual Sidebar (Fixed Position overlay for Page 0) */}
      {pageIndex === 0 && (
        <aside className="absolute left-0 top-0 w-65 h-[297mm] bg-[#0f172a] text-white p-4 flex flex-col z-20 overflow-hidden no-print">
          {/* TOP: Image Squircle */}
          <div className="text-center mb-4 relative z-10">
            <div className="w-36 h-36 bg-[#6366f1] rounded-[30px] mx-auto flex items-center justify-center text-5xl font-bold text-white mb-4 shadow-xl overflow-hidden">
              {data.image ? (
                <img
                  src={data.image}
                  alt={fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
          </div>

          {/* PROGRAMMING SKILLS */}
          <div className="mb-4 relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[13px] font-black text-[#6366f1] tracking-[2px] uppercase whitespace-nowrap">
                {data.sections?.skills ?? "PROGRAMMING SKILLS"}
              </span>
              <div className="h-px bg-slate-700 w-full opacity-50"></div>
            </div>
            <ul className="space-y-2 pl-2">
              {(data.skills || []).map((skill, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-[13px] font-medium text-slate-300"
                >
                  <span className="w-1 h-1 bg-white rounded-full shrink-0"></span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="mt-auto relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[13px] font-black text-[#6366f1] tracking-[2px] uppercase whitespace-nowrap">
                CONTACT
              </span>
              <div className="h-px bg-slate-700 w-full opacity-50"></div>
            </div>
            <div className="space-y-4 pl-2">
              <div>
                <label className="block text-slate-500 text-[9px] mb-1 font-black tracking-[1px] uppercase">
                  MOBILE
                </label>
                <span className="text-slate-100 font-bold text-[13px] block">
                  {data.contact?.phone}
                </span>
              </div>
              <div>
                <label className="block text-slate-500 text-[9px] mb-1 font-black tracking-[1px] uppercase">
                  EMAIL
                </label>
                <span className="text-slate-100 font-bold text-[13px] block break-all leading-tight">
                  {data.contact?.email}
                </span>
              </div>
              <div>
                <label className="block text-slate-500 text-[9px] mb-1 font-black tracking-[1px] uppercase">
                  ADDRESS
                </label>
                <span className="text-slate-100 font-bold text-[13px] block">
                  {data.contact?.address}
                </span>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* 3. The Flowing Content Container */}
      <div className="pt-4 relative z-10 h-full flex flex-col">
        {/* Header - Page 1 only */}
        {pageIndex === 0 && (
          <header className="mb-6 flex flex-col items-center">
            <h1 className="text-[34px] font-black text-[#1e293b] tracking-tight uppercase leading-tight">
              {data.fullName}
            </h1>
            <div className="text-[#6366f1] text-[18px] font-bold tracking-[2px] uppercase mb-6">
              {data.jobTitle}
            </div>
            <div className="w-full h-px bg-slate-200 opacity-50"></div>
          </header>
        )}

        {/* Continuation Branding for Page 2+ */}
        {pageIndex > 0 && (
          <header className="mb-4 pb-2 px-2 border-b border-slate-100 flex justify-between items-end no-print">
            <div>
              <h1 className="text-[18px] font-black text-[#1e293b] tracking-tighter uppercase leading-none">
                {data.fullName}
              </h1>
              <div className="text-[#6366f1] text-[10px] font-bold tracking-[1px] uppercase mt-1">
                {data.jobTitle}
              </div>
            </div>
            <div className="text-[10px] font-black text-slate-300 uppercase tracking-[4px]">
              Professional CV • Page 0{pageIndex + 1}
            </div>
          </header>
        )}

        {/* PAGE 1 CONTENT */}
        {pageIndex === 0 && (
          <>
            {/* ABOUT */}
            <section className="mb-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-8 bg-slate-100 rounded-sm"></div>
                <h2 className="text-[24px] font-black text-[#334155] tracking-tight uppercase">
                  {data.sections?.about ?? "ABOUT"}
                </h2>
              </div>
              <p className="text-[#475569] text-[16px] leading-[1.6] font-medium pr-4">
                {data.summary}
              </p>
            </section>

            {/* PROFESSIONAL PROJECTS (Primary) */}
            <section className="mb-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-8 bg-slate-100 rounded-sm"></div>
                <h2 className="text-[24px] font-black text-[#334155] tracking-tight uppercase">
                  {data.sections?.experience ?? "PROFESSIONAL PROJECTS"}
                </h2>
              </div>
              <div className="space-y-8">
                {(data.experience || []).map((exp, i) => (
                  <div key={i} className="break-inside-avoid px-2">
                    <h3 className="text-[17px] font-black text-[#1e293b] mb-1 uppercase">
                      {exp.company}
                    </h3>
                    <div className="text-[#6366f1] font-bold text-[14px] mb-3">
                      {exp.role}
                    </div>
                    <div className="text-[11px] font-black text-slate-500 uppercase tracking-[1px] mb-4">
                      DETAILS & RESPONSIBILITIES
                    </div>
                    <ul className="space-y-4">
                      {(exp.tasks || []).map((task, j) => (
                        <li
                          key={j}
                          className="text-[14px] text-[#475569] leading-[1.4] font-medium flex gap-4"
                        >
                          <span className="text-[#6366f1] font-black shrink-0 text-[18px] leading-tight -mt-0.5">
                            →
                          </span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Technical Skills */}
            <section className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-6 bg-slate-100 rounded-sm"></div>
                <h2 className="text-[22px] font-black text-[#334155] tracking-tight uppercase">
                  {data.sections?.ComputerScienceTools ?? "TECHNICAL SKILLS"}
                </h2>
              </div>
              <div className="flex flex-wrap gap-4 px-1">
                {(data.ComputerScienceTools || []).map((skill, i) => (
                  <div
                    key={i}
                    className="bg-[#f5f3ff] text-[#6366f1] px-2 py-1 rounded-xl text-[12px] font-black tracking-tight whitespace-nowrap "
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* PAGE 2+ CONTENT */}
        {pageIndex > 0 && (
          <div className="space-y-6">
            {/* Row 1: Education & Languages */}
            <div className="grid grid-cols-2 gap-90">
              {/* EDUCATION */}
              <section>
                <div className="flex items-center gap-2 mb-2 ml-4">
                  <div className="w-2 h-8 bg-slate-100 rounded-sm"></div>
                  <h2 className="text-[22px] font-black text-[#334155] tracking-tight uppercase">
                    {data.sections?.education ?? "EDUCATION"}
                  </h2>
                </div>
                <div className="space-y-6 px-2 ml-4">
                  {(data.education || []).map((edu, i) => (
                    <div key={i}>
                      <h3 className="text-[16px] font-black text-[#1e293b]">
                        {edu.institution}
                      </h3>
                      <div className="text-[#6366f1] font-bold text-[13px]">
                        {edu.degree}
                      </div>
                      <div className="text-slate-400 text-[11px] font-black uppercase mt-1 tracking-wider">
                        {edu.date}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* LANGUAGES */}
              <section>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-8 bg-slate-100 rounded-sm"></div>
                  <h2 className="text-[22px] font-black text-[#334155] tracking-tight uppercase">
                    {data.sections?.languages ?? "LANGUAGE"}
                  </h2>
                </div>
                <div className="space-y-3 px-2">
                  {(data.languages || []).map((lang, i) => (
                    <div key={i} className="flex items-center gap-3 group">
                      <div className="w-1.5 h-1.5 bg-[#6366f1] rounded-full"></div>
                      <span className="text-[#475569] text-[15px] font-bold">
                        {lang}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Row 2: LINKS */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-8 bg-slate-100 rounded-sm"></div>
                <h2 className="text-[22px] font-black text-[#334155] tracking-tight uppercase">
                  {data.sections?.links ?? "LINKS"}
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4 px-2">
                {(data.links || []).map((link, i) => (
                  <div
                    key={i}
                    className="flex flex-col p-4 bg-slate-50 border border-slate-100 rounded-2xl"
                  >
                    <span className="text-[10px] font-black text-[#6366f1] uppercase tracking-widest mb-1">
                      {link.name}
                    </span>
                    <span className="text-[#1e293b] font-bold text-[14px] break-all">
                      {link.url}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Row 3: SECONDARY PROJECTS */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-8 bg-slate-100 rounded-sm"></div>
                <h2 className="text-[22px] font-black text-[#334155] tracking-tight uppercase">
                  {data.sections?.projects ??
                    "PROFESSIONAL PROJECTS (CONTINUED)"}
                </h2>
              </div>
              <div className="grid gap-8 ml-4">
                {(data.secondaryProjects || []).map((exp, i) => (
                  <div key={i} className="px-2">
                    <h3 className="text-[17px] font-black text-[#1e293b] mb-1">
                      {exp.company}
                    </h3>
                    <div className="text-[#6366f1] font-bold text-[14px] mb-3">
                      {exp.role}
                    </div>
                    <ul className="space-y-3">
                      {(exp.tasks || []).map((task, j) => (
                        <li
                          key={j}
                          className="text-[13px] text-[#475569] leading-tight font-medium flex gap-3"
                        >
                          <span className="text-[#6366f1] font-black shrink-0 text-[16px]">
                            →
                          </span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* PERSONAL SKILLS */}
            <section className="mb-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-8 bg-slate-100 rounded-sm"></div>
                <h2 className="text-[24px] font-black text-[#334155] tracking-tight uppercase">
                  {data.sections?.personalSkills ?? "PERSONAL SKILLS"}
                </h2>
              </div>
              <div className="flex flex-wrap gap-3 px-2">
                {(data.personalSkills || []).map((skill, i) => (
                  <div
                    key={i}
                    className="bg-[#f5f3ff] text-[#6366f1] px-5 py-2 rounded-xl text-[12px] font-black tracking-tight whitespace-nowrap uppercase"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* PAGE INDICATOR (Bottom Right) */}
        <div className="mt-auto pt-10 flex justify-end">
          <div className="text-[10px] font-black text-slate-300 uppercase tracking-[2px] opacity-40">
            PAGE 0{pageIndex + 1}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumTemplate;
