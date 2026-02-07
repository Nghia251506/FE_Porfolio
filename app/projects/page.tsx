'use client';

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchProjectsAction } from "@/store/slice/projectSlice";
import { fetchSeoByUrl } from "@/store/slice/seoSlice"; // Import action SEO
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Globe, Search, Zap, Code2, Rocket, Layers } from "lucide-react";
import Link from "next/link";
import {ProjectResponse} from "@/type/project"

export default function ProjectsPage() {
  const dispatch = useDispatch<AppDispatch>();
  
  // Lấy dữ liệu từ Redux Store
  const { items: projects, isLoading: projectsLoading } = useSelector((state: RootState) => state.project);
  const { currentSeo: seoData, isLoading: seoLoading } = useSelector((state: RootState) => state.seo);

  const [filteredProjects, setFilteredProjects] = useState<ProjectResponse[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Fetch đồng thời cả Projects và SEO
    dispatch(fetchProjectsAction(false));
    dispatch(fetchSeoByUrl('/projects')); 
  }, [dispatch]);

  useEffect(() => {
    if (activeTab === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((p: any) => p.category === activeTab)
      );
    }
  }, [activeTab, projects]);

  const categories = ["All", "Web App", "Mobile", "SEO System", "E-commerce"];

  // Tránh lỗi Hydration
  if (!mounted) return <div className="min-h-screen bg-[#fafafa]" />;

  return (
    <div className="min-h-screen bg-[#fafafa] pt-32 pb-20 px-6 md:px-8 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-50/50 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="relative mb-24 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Cột trái: Text Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-6">
                <Rocket size={12} fill="currentColor" /> Trưng bày dự án thực chiến
              </div>

              {/* Sử dụng h1Override từ SEO nếu có, không thì dùng mặc định */}
              <h1 className="text-6xl md:text-8xl lg:text-[105px] font-[1000] tracking-tighter uppercase italic leading-[0.8] mb-10 text-slate-900">
                {seoData?.h1Override?.split(' ')[0] || "DỰ ÁN"} <br />
                <span className="text-indigo-600 not-italic">
                  {seoData?.h1Override?.split(' ').slice(1).join(' ') || "THỰC CHIẾN."}
                </span>
              </h1>

              <div className="w-24 h-2.5 bg-indigo-600 rounded-full mb-10"></div>
              
              {/* Sử dụng description từ SEO nếu có */}
              <p className="text-xl text-slate-500 max-w-xl font-medium italic leading-relaxed border-l-4 border-slate-200 pl-6 mb-10">
                "{seoData?.description || "Từ ý tưởng đến sản phẩm hoàn thiện. Mỗi dự án là một bài toán về hiệu năng và trải nghiệm người dùng."}"
              </p>

              {/* Stats dự án */}
              <div className="flex gap-12 items-center">
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Đã hoàn thành</p>
                    <p className="text-5xl font-[1000] text-slate-900 italic">{projects?.length || 0}+</p>
                 </div>
                 <div className="w-px h-10 bg-slate-200" />
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Công nghệ</p>
                    <p className="text-5xl font-[1000] text-indigo-600 italic">15+</p>
                 </div>
              </div>
            </div>

            {/* Cột phải: Project Image Decor (Giữ nguyên UI) */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="relative w-full aspect-square flex items-center justify-center">
                <div className="absolute w-72 h-72 bg-indigo-100 rounded-[3rem] rotate-12 animate-pulse" />
                <div className="relative z-10 transform -rotate-12 hover:rotate-0 transition-all duration-700 ease-in-out">
                   <div className="p-3 bg-slate-900 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[6px] border-slate-800">
                      <img 
                        src={seoData?.ogImage || "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1000&auto=format&fit=crop"} 
                        alt="Project Showcase"
                        className="w-64 h-[400px] object-cover rounded-[1.8rem]"
                      />
                   </div>

                   <div className="absolute -top-6 -right-12 bg-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce duration-[3000ms]">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                        <Code2 size={18} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-tighter">Clean Code</span>
                   </div>

                   <div className="absolute top-1/2 -left-16 bg-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce duration-[4000ms] delay-700">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                        <Zap size={18} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-tighter">High Speed</span>
                   </div>

                   <div className="absolute -bottom-4 -left-8 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3">
                      <Layers size={18} className="text-indigo-400" />
                      <span className="text-[10px] font-black uppercase tracking-tighter">Fullstack Dev</span>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* --- BỘ LỌC (FILTER) --- */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-16 relative z-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-500 ${
                activeTab === cat
                  ? "bg-slate-900 text-white shadow-2xl shadow-indigo-200 scale-105"
                  : "bg-white text-slate-400 hover:text-slate-900 border border-slate-100 shadow-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- GRID DỰ ÁN --- */}
        {(projectsLoading || seoLoading) ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[500px] bg-white border border-slate-100 animate-pulse rounded-[3rem]"></div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProjects.map((project: any) => (
                <Card
                  key={project.id}
                  className="group relative overflow-hidden rounded-[3.5rem] border-none shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] bg-white transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_30px_60px_-20px_rgba(99,102,241,0.15)] flex flex-col p-4"
                >
                  <Link href={`/projects/${project.slug}`} className="cursor-pointer block relative h-[280px] w-full overflow-hidden rounded-[2.8rem]">
                    <img
                      src={project.thumbnail || "https://via.placeholder.com/800x600"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                        <div className="bg-white text-slate-900 font-[1000] text-[10px] uppercase px-8 py-3 rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                          CHI TIẾT DỰ ÁN
                        </div>
                    </div>
                    <Badge className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-slate-900 border-none py-2 px-5 rounded-xl font-black uppercase text-[9px] tracking-[0.1em] z-10 shadow-lg">
                      {project.category}
                    </Badge>
                  </Link>

                  <div className="p-6 flex flex-col flex-grow">
                    <Link href={`/projects/${project.slug}`}>
                      <h3 className="text-2xl font-[1000] italic uppercase tracking-tighter mb-4 group-hover:text-indigo-600 transition-colors line-clamp-1 leading-none">
                        {project.title}
                      </h3>
                    </Link>
                    
                    <p className="text-[13px] text-slate-500 font-medium mb-6 line-clamp-2 leading-relaxed">
                      {project.shortDescription || project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-8 mt-auto">
                      {(project.techStacks || project.tech_stack?.split(",") || []).map((t: any) => {
                         const name = typeof t === 'string' ? t.trim() : t.name;
                         return (
                           <span key={name} className="text-[9px] font-black uppercase text-slate-400 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg tracking-wider">
                             #{name}
                           </span>
                         )
                      })}
                    </div>

                    <div className="flex gap-3 mt-auto">
                      <Button
                        onClick={() => project.demoUrl && window.open(project.demoUrl, "_blank")}
                        className="flex-[2.5] bg-slate-900 h-14 rounded-2xl font-black text-[10px] tracking-widest gap-2 hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
                      >
                        <Globe size={16} /> LIVE PREVIEW
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => project.githubUrl && window.open(project.githubUrl, "_blank")}
                        className="flex-1 h-14 rounded-2xl border-2 border-slate-100 hover:border-indigo-600 hover:text-indigo-600 transition-all active:scale-95"
                      >
                        <Github size={18} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-40 bg-white rounded-[4rem] border-2 border-dashed border-slate-100">
                <Search className="mx-auto mb-6 text-slate-200" size={100} strokeWidth={1} />
                <h3 className="text-3xl font-[1000] text-slate-400 italic uppercase tracking-tighter">
                  Chưa tìm thấy dự án phù hợp!
                </h3>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}