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
  History,
  Zap,
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
          <ArrowLeft size={16} /> Quay lại danh sách
        </Button>
        <h1 className="text-slate-400 font-bold uppercase tracking-tighter">
          Không tìm thấy dự án này
        </h1>
      </div>
    );

  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100">
      <main className="pt-24 pb-40">
        <div className="max-w-6xl mx-auto px-6">
          {/* NÚT QUAY LẠI */}
          <div className="mb-12">
            <button
              onClick={() => router.push("/projects")}
              className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-600 transition-all"
            >
              <ArrowLeft
                size={14}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Quay lại dự án
            </button>
          </div>

          {/* TIÊU ĐỀ CHÍNH */}
          <header className="mb-16 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-[0.2em]">
              <ShieldCheck size={12} className="fill-current" /> Sẵn sàng vận
              hành
            </div>

            <h1 className="text-4xl md:text-6xl font-[1000] text-slate-900 tracking-tighter leading-[0.9] uppercase italic">
              {project.title}
            </h1>

            <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-3xl italic border-l-4 border-indigo-600 pl-6">
              "{project.shortDescription}"
            </p>
          </header>

          {/* HÌNH ẢNH DỰ ÁN */}
          <section className="mb-24">
            <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100">
              <img
                src={project.thumbnail}
                className="w-full h-full object-cover"
                alt={project.title}
              />
            </div>
          </section>

          {/* NỘI DUNG CHI TIẾT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
            {/* CỘT TRÁI: CÂU CHUYỆN & GIẢI PHÁP */}
            <div className="lg:col-span-8 space-y-24">
              <article>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <History size={24} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-[1000] text-slate-900 uppercase tracking-tighter italic">
                    Bài toán &{" "}
                    <span className="text-indigo-600">Giải pháp</span>
                  </h2>
                </div>

                <div
                  className="prose prose-slate max-w-none 
                    prose-h2:text-xl prose-h2:font-black prose-h2:text-slate-900 prose-h2:uppercase prose-h2:tracking-tighter prose-h2:italic
                    prose-p:text-slate-600 prose-p:leading-relaxed prose-p:text-base prose-p:font-medium
                    prose-strong:text-slate-900 prose-strong:font-black
                    prose-ul:list-none prose-ul:pl-0
                    prose-li:relative prose-li:pl-8 prose-li:text-slate-600 prose-li:mb-4
                    before:prose-li:content-['◈'] before:prose-li:absolute before:prose-li:left-0 before:prose-li:text-indigo-600 before:prose-li:font-bold
                  "
                  dangerouslySetInnerHTML={{ __html: project.content }}
                />
              </article>

              {/* DEMO VIDEO */}
              <div className="space-y-8">
                <h3 className="text-xl font-[1000] text-slate-900 flex items-center gap-3 uppercase tracking-tighter italic">
                  <PlayCircle className="text-indigo-600" size={24} /> Trải
                  nghiệm thực tế
                </h3>
                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-xl bg-slate-50 border border-slate-100">
                  {project.video_url ? (
                    renderVideo(project.video_url)
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-300 gap-4">
                      <PlayCircle
                        size={48}
                        strokeWidth={1}
                        className="opacity-20"
                      />
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] italic">
                        Video đang cập nhật
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CỘT PHẢI: THÔNG TIN NHANH */}
            <aside className="lg:col-span-4 space-y-8">
              <div className="p-10 bg-slate-900 rounded-[3rem] text-white sticky top-32">
                <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/10 pb-6 mb-8">
                  <Cpu size={14} /> Thông tin hệ thống
                </div>

                <div className="space-y-8">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">
                      Vai trò
                    </span>
                    <span className="text-base font-bold italic tracking-tight">
                      Fullstack Developer
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">
                      Mã nguồn
                    </span>
                    <Link
                      href={project.githubUrl || "#"}
                      target="_blank"
                      className="text-base font-bold hover:text-indigo-400 flex items-center gap-2 transition-colors"
                    >
                      GitHub Repository <Github size={16} />
                    </Link>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">
                      Trực tuyến
                    </span>
                    <Link
                      href={project.demoUrl || "#"}
                      target="_blank"
                      className="text-base font-bold hover:text-indigo-400 flex items-center gap-2 transition-colors"
                    >
                      Bản Demo Trực Tiếp <ExternalLink size={16} />
                    </Link>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <Zap
                      size={20}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <span className="text-[10px] font-black uppercase tracking-tighter">
                      Tối ưu hiệu năng 99+
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* KIẾN TRÚC CÔNG NGHỆ */}
          <section className="pt-24 border-t border-slate-100">
            <div className="mb-16">
              <h2 className="text-3xl font-[1000] text-slate-900 uppercase tracking-tighter italic mb-2">
                Kiến trúc <span className="text-indigo-600">Công nghệ</span>
              </h2>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                Sơ đồ phân lớp các công cụ thực thi dự án
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Frontend */}
              <div className="p-10 bg-[#fafafa] rounded-[3rem] border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-2xl hover:shadow-indigo-100/50 transition-all group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <Layout size={28} />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
                  Giao diện (Frontend)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {getTechByCategory("FRONTEND").map((t: any) => (
                    <span
                      key={t.id}
                      className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-[11px] font-black text-slate-700 shadow-sm"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div className="p-10 bg-[#fafafa] rounded-[3rem] border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-2xl hover:shadow-indigo-100/50 transition-all group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <Server size={28} />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
                  Xử lý (Backend & APIs)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {getTechByCategory("BACKEND").map((t: any) => (
                    <span
                      key={t.id}
                      className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-[11px] font-black text-slate-700 shadow-sm"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Database */}
              <div className="p-10 bg-[#fafafa] rounded-[3rem] border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-2xl hover:shadow-indigo-100/50 transition-all group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <Database size={28} />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
                  Dữ liệu (Storage)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {getTechByCategory("DATABASE").map((t: any) => (
                    <span
                      key={t.id}
                      className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-[11px] font-black text-slate-700 shadow-sm"
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
