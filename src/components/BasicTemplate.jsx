const BasicTemplate = ({ data, pageIndex = 0 }) => {
  if (!data) return null;

  return (
    <div className="bg-white min-h-[297mm] p-[4.4mm] font-['Inter'] text-[#1a1a1a] relative overflow-hidden">
      {/* 
        INDUSTRIAL BASIC v9
        Standard 1-inch margins. Centered Executive Header. Arrow Bullet Points.
      */}

      {/* 1. Centered Header (Page 1 Only) */}
      {pageIndex === 0 && (
        <header className="mb-4 border-b border-slate-200 pb-10 text-center">
          <h1 className="text-[44px] font-black text-[#1e293b] tracking-tight uppercase leading-tight mb-2">
            {data.fullName}
          </h1>
          <div className="text-[#6366f1] text-[18px] font-bold tracking-[2px] uppercase">
            {data.jobTitle}
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-x-10 gap-y-2 text-[14px] font-bold text-slate-500">
            <div>{data.contact?.phone}</div>
            <div>{data.contact?.email}</div>
            <div>{data.contact?.address}</div>
          </div>
        </header>
      )}

      {/* Continuation Header  */}
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

      <div className="space-y-6">
        {/* ABOUT */}
        {pageIndex === 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4 text-[#334155]">
              <div className="w-2 h-8 bg-slate-100 rounded-sm"></div>
              <h2 className="text-[24px] font-black tracking-tight uppercase">
                {data.sections?.about ?? "ABOUT"}
              </h2>
            </div>
            <p className="text-[16px] leading-[1.6] text-[#475569] font-medium text-justify">
              {data.summary}
            </p>
          </section>
        )}

        {/* Page 1 PROFESSIONAL PROJECTS */}
        {pageIndex === 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4 text-[#334155]">
              <div className="w-2 h-8 bg-slate-100 rounded-sm"></div>
              <h2 className="text-[24px] font-black tracking-tight uppercase">
                {data.sections?.experience ?? "PROFESSIONAL PROJECTS"}
              </h2>
            </div>
            <div className="space-y-10">
              {(data.experience || []).map((exp, i) => (
                <div key={i} className="break-inside-avoid">
                  <h3 className="text-[17px] font-black text-[#1e293b] mb-1 uppercase">
                    {exp.company}
                  </h3>
                  <div className="text-[#6366f1] font-bold text-[14px] mb-4 italic uppercase tracking-wider">
                    {exp.role}
                  </div>
                  <ul className="space-y-4">
                    {(exp.tasks || []).map((task, j) => (
                      <li
                        key={j}
                        className="text-[14px] text-[#475569] leading-[1.4] font-medium flex gap-4"
                      >
                        <span className="text-[#6366f1] font-black shrink-0 text-[18px] leading-tight mt-2px">
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
        )}

        {/* PROGRAMMING SKILLS (Page 1) */}
        {pageIndex === 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4 text-[#334155]">
              <div className="w-2 h-8 bg-slate-100 rounded-sm"></div>
              <h2 className="text-[24px] font-black tracking-tight uppercase">
                {data.sections?.skills ?? "PROGRAMMING SKILLS"}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {(data.skills || []).map((skill, i) => (
                <div
                  key={i}
                  className="bg-[#f5f3ff] text-[#6366f1] px-3 py-2 rounded-xl text-[12px] font-black tracking-tight"
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TECHNICAL SKILLS (Page 1) */}
        {pageIndex === 0 && (
          <section>
            <div className="flex flex-wrap gap-2">
              {(data.ComputerScienceTools || []).map((skill, i) => (
                <div
                  key={i}
                  className="bg-[#f5f3ff] text-[#6366f1] px-3 py-2 rounded-xl text-[12px] font-black tracking-tight"
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PAGE 2+ NEW LAYOUT */}
        {pageIndex > 0 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-90">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-8 bg-slate-100 rounded-sm"></div>
                  <h2 className="text-[22px] font-black text-[#334155] tracking-tight uppercase">
                    {data.sections?.education ?? "EDUCATION"}
                  </h2>
                </div>
                <div className="space-y-4 ml-4">
                  {(data.education || []).map((edu, i) => (
                    <div key={i}>
                      <div className="text-[15px] font-black text-[#1e293b] uppercase">
                        {edu.institution}
                      </div>
                      <div className="text-[#6366f1] text-[13px] font-bold">
                        {edu.degree}
                      </div>
                      <div className="text-slate-400 text-[11px] font-black uppercase mt-1">
                        {edu.date}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-8 bg-slate-100 rounded-sm"></div>
                  <h2 className="text-[22px] font-black text-[#334155] tracking-tight uppercase">
                    {data.sections?.languages ?? "LANGUAGE"}
                  </h2>
                </div>
                <div className="space-y-3">
                  {(data.languages || []).map((lang, i) => (
                    <div
                      key={i}
                      className="text-[15px] font-bold text-[#475569] flex items-center gap-3"
                    >
                      <div className="w-1.5 h-1.5 bg-[#6366f1] rounded-full"></div>
                      {lang}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* LINKS */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-8 bg-slate-100 rounded-sm"></div>
                <h2 className="text-[22px] font-black text-[#334155] tracking-tight uppercase">
                  {data.sections?.links ?? "LINKS"}
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {(data.links || []).map((link, i) => (
                  <div
                    key={i}
                    className="p-4 bg-slate-50 border border-slate-100 rounded-xl"
                  >
                    <div className="text-[#6366f1] text-[10px] font-black uppercase tracking-widest mb-1">
                      {link.name}
                    </div>
                    <div className="text-[#1e293b] font-bold text-[14px]">
                      {link.url}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* PROJECTS CONTINUED */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-8 bg-slate-100 rounded-sm"></div>
                <h2 className="text-[22px] font-black text-[#334155] tracking-tight uppercase">
                  {data.sections?.projects ??
                    "PROFESSIONAL PROJECTS (CONTINUED)"}
                </h2>
              </div>
              <div className="grid gap-10">
                {(data.secondaryProjects || []).map((exp, i) => (
                  <div key={i}>
                    <h3 className="text-[16px] font-black text-[#1e293b] mb-1 uppercase">
                      {exp.company}
                    </h3>
                    <div className="text-[#6366f1] font-bold text-[13px] mb-3 uppercase tracking-tighter">
                      {exp.role}
                    </div>
                    <ul className="space-y-3">
                      {(exp.tasks || []).map((task, j) => (
                        <li
                          key={j}
                          className="text-[13px] text-[#475569] leading-[1.3] font-medium flex gap-3"
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
      </div>

      {/* Subtle Bottom Branding */}
      <div className="absolute bottom-10 left-10 text-[10px] font-black text-slate-100 uppercase tracking-[15px] pointer-events-none">
        REPLICA v9.0
      </div>
    </div>
  );
};

export default BasicTemplate;
