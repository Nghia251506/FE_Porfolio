"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Github,
  ArrowLeft,
  Cpu,
  Lightbulb,
  PlayCircle,
  ExternalLink,
  ShieldCheck,
  Layout,
  Server,
  Database,
} from "lucide-react";
import Link from "next/link";

export default function ProjectDetail() {
  const { slug } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/${slug}`,
        );
        if (!res.ok) throw new Error("Dự án không tồn tại");
        const data = await res.json();
        setProject(data);
      } catch (error) {
        console.error("Lỗi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [slug]);

  // Hàm lọc tech stack theo category
  const getTechByCategory = (category: string) => {
    return (
      project?.techStacks?.filter((t: any) => t.category === category) || []
    );
  };

  const renderVideo = (url: string) => {
    if (!url) return null;
    const isYoutube = url.includes("youtube.com") || url.includes("youtu.be");
    if (isYoutube) {
      const videoId = url.includes("v=")
        ? url.split("v=")[1]?.split("&")[0]
        : url.split("/").pop();
      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          className="w-full h-full border-none"
          allowFullScreen
        />
      );
    }
    return (
      <video controls className="w-full h-full object-cover">
        <source src={url} type="video/mp4" />
      </video>
    );
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!project)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa]">
        <Button
          onClick={() => router.push("/projects")}
          variant="ghost"
          className="mb-4 gap-2"
        >
          <ArrowLeft size={16} /> Quay lại
        </Button>
        <h1 className="text-slate-400 font-medium">
          Không tìm thấy nội dung dự án.
        </h1>
      </div>
    );

  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100">
      <main className="pt-20 pb-40">
        <div className="max-w-5xl mx-auto px-6">
          {/* BACK BUTTON - SÁT TRÁI */}
          {/* <div className="relative z-50 flex justify-start mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-600 transition-all group py-2" // Thêm py-2 để tăng diện tích click
            >
              <ArrowLeft
                size={14}
                className="transform group-hover:-translate-x-1 transition-transform duration-300"
              />
              <span>Back to Projects</span>
            </Link>
          </div> */}

          {/* HEADER: CENTERED */}
          <header className="text-center mb-16 space-y-6 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
              <ShieldCheck size={12} className="text-indigo-500" /> PROD READY
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto">
              {project.title}
            </h1>

            <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto italic">
              "{project.shortDescription}"
            </p>
          </header>

          {/* MAIN IMAGE */}
          <section className="mb-20">
            <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 group">
              <img
                src={project.thumbnail}
                className="w-full h-full object-cover"
                alt={project.title}
              />
              {/* <div className="absolute inset-x-0 bottom-6 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {project.demoUrl && (
                  <Button 
                    onClick={() => window.open(project.demoUrl, '_blank')}
                    className="h-10 px-6 rounded-full bg-slate-900 text-white font-bold text-[10px] tracking-widest gap-2 hover:bg-indigo-600"
                  >
                    <Globe size={14} /> LIVE DEMO
                  </Button>
                )}
              </div> */}
            </div>
          </section>

          {/* TWO COLUMNS CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
            {/* LEFT: THE STORY & VIDEO */}
            <div className="lg:col-span-2 space-y-20">
              <article>
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 uppercase tracking-tighter">
                  <Lightbulb size={20} className="text-indigo-500" /> Story &
                  Solutions
                </h2>
                <div
                  className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-sm md:text-base"
                  dangerouslySetInnerHTML={{ __html: project.content }}
                />
              </article>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 uppercase tracking-tighter">
                  <PlayCircle className="text-indigo-500" size={20} /> Product
                  Walkthrough
                </h3>
                <div className="relative aspect-video rounded-[1.5rem] overflow-hidden shadow-lg bg-slate-50 border border-slate-100">
                  {project.video_url ? (
                    renderVideo(project.video_url)
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-300 gap-2">
                      <PlayCircle size={32} className="opacity-20" />
                      <p className="text-[10px] font-bold uppercase tracking-widest italic">
                        Wait for Demo
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT: QUICK INFO SIDEBAR */}
            <aside className="space-y-8">
              <div className="p-8 bg-slate-900 rounded-[2rem] text-white space-y-6">
                <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-black uppercase tracking-widest border-b border-white/10 pb-4">
                  <Cpu size={14} /> Meta Data
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] text-slate-500 font-bold uppercase">
                      Role
                    </span>
                    <span className="text-sm font-bold">Fullstack Lead</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] text-slate-500 font-bold uppercase">
                      GitHub
                    </span>
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      className="text-sm font-bold hover:text-indigo-400 flex items-center gap-2 transition-colors"
                    >
                      Source Code <Github size={14} />
                    </Link>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] text-slate-500 font-bold uppercase">
                      Live URL
                    </span>
                    <Link
                      href={project.demoUrl}
                      target="_blank"
                      className="text-sm font-bold hover:text-indigo-400 flex items-center gap-2 transition-colors"
                    >
                      Preview Link <ExternalLink size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* NEW SECTION: TECH STACK ARCHITECTURE - DƯỚI VIDEO */}
          <section className="pt-20 border-t border-slate-100">
            <div className="text-center mb-16">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-2">
                KIẾN TRÚC HỆ THỐNG
              </h2>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">
                CÔNG NGHỆ ĐƯỢC SỬ DỤNG TRONG DỰ ÁN NÀY
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Frontend */}
              <div className="p-8 bg-slate-50 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100 group">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Layout size={24} />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
                  Frontend Frameworks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {getTechByCategory("FRONTEND").map((t: any) => (
                    <span
                      key={t.id}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div className="p-8 bg-slate-50 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100 group">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Server size={24} />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
                  Backend & APIs
                </h4>
                <div className="flex flex-wrap gap-2">
                  {getTechByCategory("BACKEND").map((t: any) => (
                    <span
                      key={t.id}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Database */}
              <div className="p-8 bg-slate-50 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100 group">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Database size={24} />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
                  Database & Storage
                </h4>
                <div className="flex flex-wrap gap-2">
                  {getTechByCategory("DATABASE").map((t: any) => (
                    <span
                      key={t.id}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
