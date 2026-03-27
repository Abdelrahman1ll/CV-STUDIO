import {
  User,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Plus,
  Trash2,
  Award,
  Briefcase,
  GraduationCap,
  Globe,
  Layers,
  Image as ImageIcon,
  Camera,
  Star,
  Link as LinkIcon,
  ChevronRight,
  Settings,
} from "lucide-react";

const Editor = ({ data, template, onChange, activePage, onPageChange }) => {
  const updateNestedState = (path, value) => {
    const newData = JSON.parse(JSON.stringify(data));
    const keys = path.split(".");
    let current = newData;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (i === keys.length - 1) {
        current[key] = value;
      } else {
        if (!current[key]) current[key] = {};
        current = current[key];
      }
    }
    onChange(newData);
  };

  const addItem = (path, item) => {
    const newData = JSON.parse(JSON.stringify(data));
    const keys = path.split(".");
    let current = newData;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (i === keys.length - 1) {
        if (!current[key]) current[key] = [];
        current[key].push(item);
      } else {
        if (!current[key]) current[key] = {};
        current = current[key];
      }
    }
    onChange(newData);
  };

  const removeItem = (path, index) => {
    const newData = JSON.parse(JSON.stringify(data));
    const keys = path.split(".");
    let current = newData;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (i === keys.length - 1) {
        current[key] = current[key].filter((_, i) => i !== index);
      } else {
        current = current[key];
      }
    }
    onChange(newData);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateNestedState("image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const inputClass =
    "w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400";
  const sectionClass =
    "mb-8 p-5 bg-white rounded-2xl shadow-sm border border-slate-200 animate-in fade-in duration-500";
  const labelClass =
    "text-[10px] font-black text-slate-400 uppercase tracking-[1.5px] mb-2 block";

  const renderSectionHeader = (key, icon, defaultTitle) => (
    <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-2 group/header">
      <div className="flex items-center gap-2 grow">
        {icon}
        <input
          className="bg-transparent border-none text-xs font-black text-slate-400 uppercase tracking-widest focus:ring-0 p-1 w-full hover:bg-slate-50 rounded transition-colors focus:text-indigo-600 focus:bg-indigo-50/50"
          value={data.sections?.[key] ?? defaultTitle}
          onChange={(e) =>
            updateNestedState(`sections.${key}`, e.target.value.toUpperCase())
          }
          placeholder={defaultTitle}
        />
      </div>
      <Settings
        size={12}
        className="text-slate-300 opacity-0 group-hover/header:opacity-100 transition-opacity"
      />
    </div>
  );

  return (
    <div className="h-full overflow-y-auto p-6 bg-slate-50 border-r border-slate-200 w-full lg:w-96 custom-scrollbar">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black text-slate-800 flex items-center gap-2 uppercase tracking-tighter">
          <Award className="text-indigo-600" /> CV EDITOR
        </h2>
        <div className="px-3 py-1 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
          PAGE {activePage + 1}
        </div>
      </div>

      {/* Page Selector */}
      <div className="flex gap-2 mb-8 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
        {Array.from({ length: data.pageCount || 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 flex items-center gap-2 ${
              activePage === i
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105"
                : "bg-slate-50 text-slate-400 hover:bg-slate-100"
            }`}
          >
            {i === 0 ? <User size={12} /> : <Briefcase size={12} />}
            PAGE {i + 1}
          </button>
        ))}
      </div>

      {activePage === 0 ? (
        <>
          {/* Basic Info */}
          <section className={sectionClass}>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <User size={16} className="text-indigo-500" /> Personal Details
            </h3>

            {/* Photo Upload */}
            {template === "premium" && (
              <div className="mb-6 flex flex-col items-center">
                <div className="relative group cursor-pointer w-24 h-24 mb-3">
                  <div className="w-full h-full rounded-3xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden transition-all group-hover:border-indigo-400 group-hover:bg-indigo-50 shadow-inner">
                    {data.image ? (
                      <img
                        src={data.image}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon
                        size={32}
                        className="text-slate-400 group-hover:text-indigo-500"
                      />
                    )}
                  </div>
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <div className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 rounded-lg text-white shadow-lg pointer-events-none group-hover:scale-110 transition-transform">
                    <Camera size={12} strokeWidth={3} />
                  </div>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
                  Profile Photo
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className={labelClass}>Full Name</label>
                <input
                  className={inputClass}
                  value={data.fullName}
                  onChange={(e) =>
                    updateNestedState("fullName", e.target.value)
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Job Title</label>
                <input
                  className={inputClass}
                  value={data.jobTitle}
                  onChange={(e) =>
                    updateNestedState("jobTitle", e.target.value)
                  }
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[1.5px] block">
                    Summary Title
                  </label>
                  <input
                    className="bg-transparent border-none text-[8px] font-black text-indigo-400 uppercase focus:ring-0 p-0 w-20"
                    value={data.sections?.about ?? "ABOUT"}
                    onChange={(e) =>
                      updateNestedState(
                        "sections.about",
                        e.target.value.toUpperCase(),
                      )
                    }
                  />
                </div>
                <textarea
                  className={`${inputClass} min-h-25 resize-none`}
                  value={data.summary}
                  onChange={(e) => updateNestedState("summary", e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Contact Info */}
          <section className={sectionClass}>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Mail size={16} className="text-indigo-500" /> Contact Details
            </h3>
            <div className="space-y-4">
              {[
                { key: "email", label: "Email", icon: <Mail size={14} /> },
                { key: "phone", label: "Phone", icon: <Phone size={14} /> },
                {
                  key: "address",
                  label: "Address",
                  icon: <MapPin size={14} />,
                },
              ].map((field) => (
                <div key={field.key}>
                  <label className={labelClass}>{field.label}</label>
                  <input
                    className={inputClass}
                    value={data.contact?.[field.key]}
                    onChange={(e) =>
                      updateNestedState(`contact.${field.key}`, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Programming Skills */}
          <section className={sectionClass}>
            {renderSectionHeader(
              "skills",
              <Layers size={16} className="text-indigo-500" />,
              "PROGRAMMING SKILLS",
            )}
            <div className="flex flex-wrap gap-2 mb-4">
              {(data.skills || []).map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-200 animate-in zoom-in duration-300"
                >
                  {skill}
                  <button
                    onClick={() => removeItem("skills", i)}
                    className="text-slate-400 hover:text-red-500 ml-1"
                  >
                    <Trash2 size={10} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                id="skill-input"
                className={inputClass}
                placeholder="Add skill..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value) {
                    addItem("skills", e.target.value);
                    e.target.value = "";
                  }
                }}
              />
              <button
                onClick={() => {
                  const input = document.getElementById("skill-input");
                  if (input.value) {
                    addItem("skills", input.value);
                    input.value = "";
                  }
                }}
                className="p-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-500"
              >
                <Plus size={18} />
              </button>
            </div>
          </section>

          {/* Page 1 Projects */}
          <section className={sectionClass}>
            {renderSectionHeader(
              "experience",
              <Briefcase size={16} className="text-indigo-500" />,
              "PROFESSIONAL PROJECTS",
            )}
            <div className="space-y-6">
              {(data.experience || []).map((exp, i) => (
                <div
                  key={i}
                  className="p-4 bg-slate-50 rounded-xl border border-slate-100 relative group animate-in slide-in-from-top-2 duration-300"
                >
                  <button
                    onClick={() => removeItem("experience", i)}
                    className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="space-y-3">
                    <input
                      className={inputClass}
                      placeholder="Project Name | Date"
                      value={exp.company}
                      onChange={(e) => {
                        let ne = [...data.experience];
                        ne[i].company = e.target.value;
                        updateNestedState("experience", ne);
                      }}
                    />
                    <input
                      className={inputClass}
                      placeholder="Role / Tech"
                      value={exp.role}
                      onChange={(e) => {
                        let ne = [...data.experience];
                        ne[i].role = e.target.value;
                        updateNestedState("experience", ne);
                      }}
                    />
                    <div className="pt-2">
                      <label className="text-[9px] font-bold text-slate-400 uppercase mb-2 block tracking-widest">
                        Details (Arrows)
                      </label>
                      <div className="space-y-2">
                        {(exp.tasks || []).map((task, j) => (
                          <div key={j} className="flex gap-2">
                            <input
                              className={`${inputClass} grow p-2!`}
                              value={task}
                              onChange={(e) => {
                                let ne = [...data.experience];
                                ne[i].tasks[j] = e.target.value;
                                updateNestedState("experience", ne);
                              }}
                            />
                            <button
                              onClick={() => {
                                let ne = [...data.experience];
                                ne[i].tasks = ne[i].tasks.filter(
                                  (_, k) => k !== j,
                                );
                                updateNestedState("experience", ne);
                              }}
                              className="text-slate-300 hover:text-red-500"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => {
                          let ne = [...data.experience];
                          if (!ne[i].tasks) ne[i].tasks = [];
                          ne[i].tasks.push("");
                          updateNestedState("experience", ne);
                        }}
                        className="mt-3 text-[10px] font-bold text-indigo-600 hover:underline"
                      >
                        + Add Detail
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() =>
                addItem("experience", { company: "", role: "", tasks: [""] })
              }
              className="w-full mt-4 p-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-[10px] font-black uppercase tracking-widest hover:border-indigo-300 hover:text-indigo-500 transition-all"
            >
              Add Project to Page 1
            </button>
          </section>

          {/* Technical Skills */}
          <section className={sectionClass}>
            {renderSectionHeader(
              "ComputerScienceTools",
              <Star size={16} className="text-indigo-500" />,
              "Technical Skills",
            )}
            <div className="flex flex-wrap gap-2 mb-4">
              {(data.ComputerScienceTools || []).map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-indigo-100 animate-in zoom-in duration-300 tracking-tight"
                >
                  {skill}
                  <button
                    onClick={() => removeItem("ComputerScienceTools", i)}
                    className="text-indigo-300 hover:text-red-500 ml-1"
                  >
                    <Trash2 size={10} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                id="pskill-input"
                className={inputClass}
                placeholder="Add skill..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value) {
                    addItem(
                      "ComputerScienceTools",
                      e.target.value.toUpperCase(),
                    );
                    e.target.value = "";
                  }
                }}
              />
              <button
                onClick={() => {
                  const input = document.getElementById("pskill-input");
                  if (input.value) {
                    addItem("ComputerScienceTools", input.value.toUpperCase());
                    input.value = "";
                  }
                }}
                className="p-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-500"
              >
                <Plus size={18} />
              </button>
            </div>
          </section>

          <button
            onClick={() => onPageChange(1)}
            className="w-full p-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[3px] flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl"
          >
            Next Page (Education/Links) <ChevronRight size={16} />
          </button>
        </>
      ) : (
        <>
          {/* Education */}
          <section className={sectionClass}>
            {renderSectionHeader(
              "education",
              <GraduationCap size={16} className="text-indigo-500" />,
              "EDUCATION",
            )}
            <div className="space-y-4">
              {(data.education || []).map((edu, i) => (
                <div
                  key={i}
                  className="p-4 bg-slate-50 rounded-xl border border-slate-100 relative group"
                >
                  <button
                    onClick={() => removeItem("education", i)}
                    className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={12} />
                  </button>
                  <div className="space-y-3">
                    <div>
                      <label className={labelClass}>Institution</label>
                      <input
                        className={inputClass}
                        value={edu.institution}
                        onChange={(e) => {
                          let ne = [...data.education];
                          ne[i].institution = e.target.value;
                          updateNestedState("education", ne);
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className={labelClass}>Degree</label>
                        <input
                          className={inputClass}
                          value={edu.degree}
                          onChange={(e) => {
                            let ne = [...data.education];
                            ne[i].degree = e.target.value;
                            updateNestedState("education", ne);
                          }}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Date</label>
                        <input
                          className={inputClass}
                          value={edu.date}
                          onChange={(e) => {
                            let ne = [...data.education];
                            ne[i].date = e.target.value;
                            updateNestedState("education", ne);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() =>
                addItem("education", { institution: "", degree: "", date: "" })
              }
              className="w-full mt-4 p-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-[10px] font-black uppercase tracking-widest hover:border-indigo-300 hover:text-indigo-500 transition-all"
            >
              Add Education
            </button>
          </section>

          {/* Languages */}
          <section className={sectionClass}>
            {renderSectionHeader(
              "languages",
              <Globe size={16} className="text-indigo-500" />,
              "LANGUAGE",
            )}
            <div className="space-y-3">
              {(data.languages || []).map((l, i) => (
                <div key={i} className="flex gap-2 group">
                  <input
                    className={inputClass}
                    value={l}
                    onChange={(e) => {
                      let nl = [...data.languages];
                      nl[i] = e.target.value;
                      updateNestedState("languages", nl);
                    }}
                  />
                  <button
                    onClick={() => removeItem("languages", i)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => addItem("languages", "")}
              className="w-full mt-4 p-2 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all"
            >
              Add Language
            </button>
          </section>

          {/* Links */}
          <section className={sectionClass}>
            {renderSectionHeader(
              "links",
              <LinkIcon size={16} className="text-indigo-500" />,
              "LINKS",
            )}
            <div className="space-y-4">
              {(data.links || []).map((link, i) => (
                <div
                  key={i}
                  className="p-3 bg-slate-50 rounded-xl relative group"
                >
                  <button
                    onClick={() => removeItem("links", i)}
                    className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={12} />
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      className={inputClass}
                      placeholder="Title (e.g. Portfolio)"
                      value={link.name}
                      onChange={(e) => {
                        let nl = [...data.links];
                        nl[i].name = e.target.value;
                        updateNestedState("links", nl);
                      }}
                    />
                    <input
                      className={inputClass}
                      placeholder="URL/Handle"
                      value={link.url}
                      onChange={(e) => {
                        let nl = [...data.links];
                        nl[i].url = e.target.value;
                        updateNestedState("links", nl);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => addItem("links", { name: "", url: "" })}
              className="w-full mt-4 p-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-[10px] font-black uppercase tracking-widest hover:border-indigo-300 hover:text-indigo-500 transition-all"
            >
              Add Link
            </button>
          </section>

          {/* Page 2 Projects */}
          <section className={sectionClass}>
            <div className="flex items-center gap-2 mb-2">
              <Briefcase size={16} className="text-indigo-500" />
              <input
                className="bg-transparent border-none text-xs font-black text-slate-400 uppercase tracking-widest focus:ring-0 p-1 w-full"
                value={
                  data.sections?.projects ?? "PROFESSIONAL PROJECTS (CONTINUED)"
                }
                onChange={(e) =>
                  updateNestedState(
                    "sections.projects",
                    e.target.value.toUpperCase(),
                  )
                }
              />
            </div>
            <div className="space-y-6">
              {(data.secondaryProjects || []).map((exp, i) => (
                <div
                  key={i}
                  className="p-4 bg-slate-50 rounded-xl border border-slate-100 relative group animate-in slide-in-from-top-2 duration-300"
                >
                  <button
                    onClick={() => removeItem("secondaryProjects", i)}
                    className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="space-y-3">
                    <input
                      className={inputClass}
                      placeholder="Project Name | Date"
                      value={exp.company}
                      onChange={(e) => {
                        let ne = [...data.secondaryProjects];
                        ne[i].company = e.target.value;
                        updateNestedState("secondaryProjects", ne);
                      }}
                    />
                    <input
                      className={inputClass}
                      placeholder="Role / Tech"
                      value={exp.role}
                      onChange={(e) => {
                        let ne = [...data.secondaryProjects];
                        ne[i].role = e.target.value;
                        updateNestedState("secondaryProjects", ne);
                      }}
                    />
                    <div className="pt-2">
                      <div className="space-y-2">
                        {(exp.tasks || []).map((task, j) => (
                          <div key={j} className="flex gap-2">
                            <input
                              className={`${inputClass} grow p-2!`}
                              value={task}
                              onChange={(e) => {
                                let ne = [...data.secondaryProjects];
                                ne[i].tasks[j] = e.target.value;
                                updateNestedState("secondaryProjects", ne);
                              }}
                            />
                            <button
                              onClick={() => {
                                let ne = [...data.secondaryProjects];
                                ne[i].tasks = ne[i].tasks.filter(
                                  (_, k) => k !== j,
                                );
                                updateNestedState("secondaryProjects", ne);
                              }}
                              className="text-slate-300 hover:text-red-500"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => {
                          let ne = [...data.secondaryProjects];
                          if (!ne[i].tasks) ne[i].tasks = [];
                          ne[i].tasks.push("");
                          updateNestedState("secondaryProjects", ne);
                        }}
                        className="mt-3 text-[10px] font-bold text-indigo-600 hover:underline"
                      >
                        + Add Detail
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() =>
                addItem("secondaryProjects", {
                  company: "",
                  role: "",
                  tasks: [""],
                })
              }
              className="w-full mt-4 p-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-[10px] font-black uppercase tracking-widest hover:border-indigo-300 hover:text-indigo-500 transition-all"
            >
              Add Project to Page 2
            </button>
          </section>

          {/* Personal Skills */}
          <section className={sectionClass}>
            {renderSectionHeader(
              "personalSkills",
              <Star size={16} className="text-indigo-500" />,
              "PERSONAL SKILLS",
            )}
            <div className="flex flex-wrap gap-2 mb-4">
              {(data.personalSkills || []).map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-indigo-100 animate-in zoom-in duration-300 uppercase tracking-tight"
                >
                  {skill}
                  <button
                    onClick={() => removeItem("personalSkills", i)}
                    className="text-indigo-300 hover:text-red-500 ml-1"
                  >
                    <Trash2 size={10} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                id="pskill-input"
                className={inputClass}
                placeholder="Add skill..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value) {
                    addItem("personalSkills", e.target.value.toUpperCase());
                    e.target.value = "";
                  }
                }}
              />
              <button
                onClick={() => {
                  const input = document.getElementById("pskill-input");
                  if (input.value) {
                    addItem("personalSkills", input.value.toUpperCase());
                    input.value = "";
                  }
                }}
                className="p-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-500"
              >
                <Plus size={18} />
              </button>
            </div>
          </section>

          <button
            onClick={() => onPageChange(0)}
            className="w-full p-4 bg-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-[3px] flex items-center justify-center gap-3 hover:bg-slate-300 transition-all"
          >
            Back to Page 1
          </button>
        </>
      )}

      <div className="py-10 text-center opacity-30 select-none">
        <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
          CV-RECT Replica Studio v9.0
        </p>
      </div>
    </div>
  );
};

export default Editor;
