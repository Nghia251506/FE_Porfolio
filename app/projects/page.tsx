"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchProjectsAction } from "@/store/slice/projectSlice";
import { fetchSeoByUrl } from "@/store/slice/seoSlice";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Globe,
  Search,
  Zap,
  Code2,
  Rocket,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { ProjectResponse } from "@/type/project";

export default function ProjectsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: projects, isLoading: projectsLoading } = useSelector(
    (state: RootState) => state.project,
  );
  const { currentSeo: seoData, isLoading: seoLoading } = useSelector(
    (state: RootState) => state.seo,
  );

  const [filteredProjects, setFilteredProjects] = useState<ProjectResponse[]>(
    [],
  );
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [mounted, setMounted] = useState(false);

  const categories = [
    "Tất cả",
    "Web App",
    "Mobile",
    "Hệ thống SEO",
    "Thương mại điện tử",
  ];

  useEffect(() => {
    setMounted(true);
    dispatch(fetchProjectsAction(false));
    dispatch(fetchSeoByUrl("/projects"));
  }, [dispatch]);

  useEffect(() => {
    const categoryMap: Record<string, string> = {
      "Tất cả": "All",
      "Web App": "Web App",
      Mobile: "Mobile",
      "Hệ thống SEO": "SEO System",
      "Thương mại điện tử": "E-commerce",
    };

    if (activeTab === "Tất cả") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((p: any) => p.category === categoryMap[activeTab]),
      );
    }
  }, [activeTab, projects]);

  if (!mounted) return <div className="min-h-screen bg-[#fafafa]" />;

  return (
    <div className="min-h-screen bg-[#fafafa] pt-28 pb-20 px-6 md:px-8 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-50/50 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* --- HEADER SECTION --- */}
        <div className="relative mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-widest mb-6">
                <Rocket size={12} className="fill-current" /> Sản phẩm thực
                chiến
              </div>

              {/* H1 THEO Ý ÔNG: Dự án (dòng 1) - Thực chiến (dòng 2 màu tím) */}
              <h1 className="text-5xl md:text-7xl font-[1000] tracking-tighter uppercase italic leading-[0.85] mb-8 text-slate-900">
                DỰ ÁN <br />
                <span className="text-indigo-600 not-italic">THỰC CHIẾN.</span>
              </h1>

              <p className="text-base md:text-lg text-slate-500 max-w-xl font-medium italic leading-relaxed border-l-4 border-indigo-600 pl-6 mb-10">
                "
                {seoData?.description ||
                  "Từ ý tưởng đến sản phẩm hoàn thiện. Mỗi dự án là một bài toán về hiệu năng và trải nghiệm người dùng."}
                "
              </p>

              <div className="flex gap-10 items-center">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Dự án hoàn tất
                  </p>
                  <p className="text-4xl font-[1000] text-slate-900 italic tracking-tighter">
                    {projects?.length || 0}+
                  </p>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Công nghệ sử dụng
                  </p>
                  <p className="text-4xl font-[1000] text-indigo-600 italic tracking-tighter">
                    15+
                  </p>
                </div>
              </div>
            </div>

            {/* DECOR DỰ ÁN - GIỮ NGUYÊN */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="relative w-full aspect-square flex items-center justify-center">
                <div className="absolute w-64 h-64 bg-indigo-50 rounded-[3rem] rotate-12 animate-pulse" />
                <div className="relative z-10 transform -rotate-12 hover:rotate-0 transition-all duration-700">
                  <div className="p-3 bg-slate-900 rounded-[2.5rem] shadow-2xl border-[6px] border-slate-800">
                    <img
                      src={
                        seoData?.ogImage ||
                        "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1000&auto=format&fit=crop"
                      }
                      alt="Project Showcase"
                      className="w-56 h-[350px] object-cover rounded-[1.8rem] grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>

                  <div className="absolute -top-4 -right-8 bg-white p-3 rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
                    <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                      <Code2 size={14} />
                    </div>
                    <span className="text-[8px] font-black uppercase">
                      Clean Code
                    </span>
                  </div>

                  <div className="absolute top-1/2 -left-12 bg-white p-3 rounded-xl shadow-xl flex items-center gap-2 animate-bounce delay-700">
                    <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                      <Zap size={14} />
                    </div>
                    <span className="text-[8px] font-black uppercase">
                      High Speed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- BỘ LỌC --- */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all duration-300 ${
                activeTab === cat
                  ? "bg-slate-900 text-white shadow-lg scale-105"
                  : "bg-white text-slate-400 hover:text-slate-900 border border-slate-50 shadow-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- GRID DỰ ÁN --- */}
        {projectsLoading || seoLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[450px] bg-white rounded-[3rem] animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project: any) => (
                <Card
                  key={project.id}
                  className="group relative overflow-hidden rounded-[3rem] border-none bg-white transition-all duration-500 hover:-translate-y-3 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 flex flex-col p-4"
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="block relative h-[240px] w-full overflow-hidden rounded-[2.2rem]"
                  >
                    <img
                      src={
                        project.thumbnail ||
                        "https://via.placeholder.com/800x600"
                      }
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                      <div className="bg-white text-slate-900 font-black text-[9px] uppercase px-6 py-2.5 rounded-full shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        Xem chi tiết
                      </div>
                    </div>
                    <Badge className="absolute top-4 left-4 bg-white/90 text-slate-900 border-none py-1.5 px-4 rounded-lg font-black uppercase text-[8px] tracking-wider z-10 shadow-sm">
                      {project.category}
                    </Badge>
                  </Link>

                  <div className="p-5 flex flex-col flex-grow">
                    <Link href={`/projects/${project.slug}`}>
                      <h3 className="text-xl font-[1000] italic uppercase tracking-tighter mb-3 group-hover:text-indigo-600 transition-colors line-clamp-1 leading-tight">
                        {project.title}
                      </h3>
                    </Link>

                    <p className="text-[12px] text-slate-500 font-medium mb-5 line-clamp-2 leading-relaxed">
                      {project.shortDescription || project.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-6 mt-auto">
                      {(
                        project.techStacks ||
                        project.tech_stack?.split(",") ||
                        []
                      )
                        .slice(0, 3)
                        .map((t: any) => {
                          const name =
                            typeof t === "string" ? t.trim() : t.name;
                          return (
                            <span
                              key={name}
                              className="text-[8px] font-black uppercase text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md"
                            >
                              #{name}
                            </span>
                          );
                        })}
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <Button
                        onClick={() =>
                          project.demoUrl &&
                          window.open(project.demoUrl, "_blank")
                        }
                        className="flex-[2] bg-slate-900 h-12 rounded-xl font-black text-[9px] tracking-widest gap-2 hover:bg-indigo-600 transition-all"
                      >
                        XEM THỰC TẾ <ArrowUpRight size={14} />
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() =>
                          project.githubUrl &&
                          window.open(project.githubUrl, "_blank")
                        }
                        className="flex-1 h-12 rounded-xl border-slate-100 hover:border-indigo-600 hover:text-indigo-600 transition-all"
                      >
                        <Github size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-24 bg-white rounded-[4rem] border border-dashed border-slate-100">
                <Search className="mx-auto mb-4 text-slate-100" size={80} />
                <p className="text-xl font-black text-slate-400 uppercase italic tracking-tighter">
                  Chưa tìm thấy dự án phù hợp
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
