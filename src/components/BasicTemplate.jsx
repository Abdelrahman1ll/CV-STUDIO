const BasicTemplate = ({ data, pageIndex = 0 }) => {
  if (!data) return null;

  return (
    <div className="bg-white min-h-[297mm] p-10 font-sans text-black">
      {/* 
        ATS-Friendly Basic Template
        Standard margins, standard fonts, linear structure, minimal graphics.
      */}

      {/* 1. Header (Page 1 Only) */}
      {pageIndex === 0 && (
        <header className="mb-6 text-center border-b-[1.5px] border-black pb-4">
          <h1 className="text-4xl font-bold uppercase mb-2">{data.fullName}</h1>
          <div className="text-xl mb-3 font-semibold text-gray-800">{data.jobTitle}</div>
          <div className="text-sm flex flex-wrap justify-center gap-x-2">
            {data.contact?.phone && <span>{data.contact.phone}</span>}
            {data.contact?.phone && data.contact?.email && <span>|</span>}
            {data.contact?.email && <span>{data.contact.email}</span>}
            {data.contact?.email && data.contact?.address && <span>|</span>}
            {data.contact?.address && <span>{data.contact.address}</span>}
          </div>
        </header>
      )}

      {/* Continuation Header  */}
      {pageIndex > 0 && (
        <header className="mb-6 flex justify-between items-end border-b border-black pb-2 text-sm no-print">
          <div className="font-bold">{data.fullName}</div>
          <div>Page {pageIndex + 1}</div>
        </header>
      )}

      <div className="space-y-6">
        {/* ABOUT */}
        {pageIndex === 0 && data.summary && (
          <section>
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">
              {data.sections?.about ?? "Summary"}
            </h2>
            <p className="text-sm text-justify leading-relaxed">
              {data.summary}
            </p>
          </section>
        )}

        {/* EXPERIENCE / PROFESSIONAL PROJECTS */}
        {pageIndex === 0 && data.experience && data.experience.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">
              {data.sections?.experience ?? "Professional Experience"}
            </h2>
            <div className="space-y-5">
              {data.experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between font-bold text-base mb-1">
                    <span>{exp.role}</span>
                    <span className="font-semibold text-gray-800">{exp.company}</span>
                  </div>
                  <ul className="list-disc list-outside ml-5 space-y-1.5 mt-2">
                    {(exp.tasks || []).map((task, j) => (
                      <li key={j} className="text-sm leading-relaxed">
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS */}
        {pageIndex === 0 && ((data.skills && data.skills.length > 0) || (data.ComputerScienceTools && data.ComputerScienceTools.length > 0)) && (
          <section>
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">
              {data.sections?.skills ?? "Skills"}
            </h2>
            <div className="text-sm space-y-2">
              {data.skills && data.skills.length > 0 && (
                <div><strong className="font-semibold">Programming:</strong> {data.skills.join(", ")}</div>
              )}
              {data.ComputerScienceTools && data.ComputerScienceTools.length > 0 && (
                <div><strong className="font-semibold">Tools & Technologies:</strong> {data.ComputerScienceTools.join(", ")}</div>
              )}
            </div>
          </section>
        )}

         {/* PERSONAL SKILLS */}
            {pageIndex === 0 && data.personalSkills && data.personalSkills.length > 0 && (
              <section>
                <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">
                  {data.sections?.personalSkills ?? "Personal Skills"}
                </h2>
                <div className="text-sm">
                  {data.personalSkills.join(", ")}
                </div>
              </section>
            )}

        {/* PAGE 2+ NEW LAYOUT */}
        {pageIndex > 0 && (
          <>
            {/* EDUCATION */}
            {data.education && data.education.length > 0 && (
              <section>
                <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">
                  {data.sections?.education ?? "Education"}
                </h2>
                <div className="space-y-4">
                  {data.education.map((edu, i) => (
                    <div key={i} className="text-sm">
                      <div className="flex justify-between font-bold mb-1">
                        <span>{edu.degree}</span>
                        <span>{edu.date}</span>
                      </div>
                      <div className="font-semibold text-gray-800">{edu.institution}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* LANGUAGES */}
            {data.languages && data.languages.length > 0 && (
              <section>
                <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">
                  {data.sections?.languages ?? "Languages"}
                </h2>
                <div className="text-sm">
                  {data.languages.join(", ")}
                </div>
              </section>
            )}

            {/* LINKS */}
            {data.links && data.links.length > 0 && (
              <section>
                <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">
                  {data.sections?.links ?? "Links"}
                </h2>
                <ul className="list-none text-sm space-y-2">
                  {data.links.map((link, i) => (
                    <li key={i}>
                      <strong className="font-semibold">{link.name}:</strong> <a href={link.url} className="text-black hover:underline">{link.url}</a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* PROJECTS CONTINUED */}
            {data.secondaryProjects && data.secondaryProjects.length > 0 && (
              <section>
                <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">
                  {data.sections?.projects ?? "Projects"}
                </h2>
                <div className="space-y-5">
                  {data.secondaryProjects.map((exp, i) => (
                    <div key={i}>
                      <div className="flex justify-between font-bold text-base mb-1">
                        <span>{exp.role}</span>
                        <span className="font-semibold text-gray-800">{exp.company}</span>
                      </div>
                      <ul className="list-disc list-outside ml-5 space-y-1.5 mt-2">
                        {(exp.tasks || []).map((task, j) => (
                          <li key={j} className="text-sm leading-relaxed">
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

           
          </>
        )}
      </div>
    </div>
  );
};

export default BasicTemplate;
