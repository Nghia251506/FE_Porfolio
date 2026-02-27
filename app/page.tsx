"use client";

import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchSeoByUrl } from "@/store/slice/seoSlice";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Terminal,
  Award,
  Zap,
  Cpu,
  History,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  User2,
  Mail,
  MapPin,
  Code2,
  Globe,
  Github,
} from "lucide-react";
import Link from "next/link";

export default function Portfolio() {
  const dispatch = useDispatch<AppDispatch>();
  const { currentSeo } = useSelector((state: RootState) => state.seo);
  const [certCount, setCertCount] = useState(0);
  const [techStacks, setTechStacks] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [certRes, techRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/certificates`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/tech-stacks`),
        ]);
        const certData = await certRes.json();
        const techData = await techRes.json();
        setCertCount(certData.length || 0);
        setTechStacks(techData || []);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };
    fetchData();
    dispatch(fetchSeoByUrl("/"));
  }, [dispatch]);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  const displayStacks = useMemo(
    () => [...techStacks, ...techStacks],
    [techStacks],
  );

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 selection:bg-indigo-100 selection:text-indigo-700 font-sans pb-20 overflow-x-hidden">
      {/* --- HERO SECTION: TINH CHỈNH TYPOGRAPHY --- */}
      <section className="relative pt-24 pb-12 px-6 md:px-8 overflow-hidden">
        {/* Decor background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 text-left relative z-10">
            <Badge
              variant="outline"
              className="mb-6 border-indigo-200 text-indigo-600 px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-[9px] bg-white shadow-sm"
            >
              <Sparkles size={12} className="mr-2 fill-current" /> Sẵn sàng cho
              các dự án mới
            </Badge>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-[1000] mb-6 tracking-tighter leading-[0.95] uppercase italic text-slate-900">
              {currentSeo?.h1Override?.split(" ")[0] || "Lập trình"} <br />
              <span className="text-indigo-600 not-italic relative">
                {currentSeo?.h1Override?.split(" ").slice(1).join(" ") ||
                  "Fullstack"}
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate-500 max-w-lg mb-10 font-medium leading-relaxed border-l-4 border-indigo-600 pl-6 italic">
              "
              {currentSeo?.description ||
                "Xây dựng trải nghiệm số kết hợp giữa kỹ thuật chuẩn xác và thẩm mỹ đỉnh cao."}
              "
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/projects">
                <Button
                  size="lg"
                  className="h-14 px-8 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white font-black shadow-xl transition-all group tracking-widest text-[11px]"
                >
                  XEM DỰ ÁN{" "}
                  <ArrowRight
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={16}
                  />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="ghost"
                  className="h-14 px-6 rounded-2xl font-black text-[11px] tracking-widest uppercase hover:bg-white"
                >
                  Liên hệ
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative aspect-video w-full overflow-hidden rounded-[3rem] shadow-2xl border-[10px] border-white bg-white">
              {slides.map((s, i) => (
                <img
                  key={i}
                  src={s}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${i === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
                  alt="Portfolio Showcase"
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Slider Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all ${i === currentSlide ? "w-6 bg-white" : "w-1.5 bg-white/40"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION: ABOUT ME (BIO & IMAGE) --- */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-white p-10 md:p-16 rounded-[4rem] shadow-[0_10px_50px_-15px_rgba(0,0,0,0.03)] border border-slate-50">
            {/* Ảnh chân dung (Cần thay ảnh thật) */}
            <div className="relative group mx-auto lg:mx-0">
              <div className="w-64 h-80 md:w-80 md:h-[420px] rounded-[3.5rem] overflow-hidden rotate-2 group-hover:rotate-0 transition-transform duration-500 shadow-2xl relative z-10 border-4 border-white">
                <img
                  src="https://res.cloudinary.com/degpcodf3/image/upload/v1772154795/501051972_122105995460890210_8548643736104128576_n_ggyxzi.jpg"
                  alt="Nghĩa Fullstack"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 w-64 h-80 md:w-80 md:h-[420px] border-2 border-dashed border-indigo-200 rounded-[3.5rem] -rotate-2 -z-0" />
            </div>

            {/* Nội dung Bio */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-[1000] tracking-tighter uppercase italic leading-none">
                  Xin chào, Tôi là{" "}
                  <span className="text-indigo-600 not-italic">
                    Trọng Nghĩa
                  </span>
                </h2>
                <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl">
                  Một Fullstack Developer thực chiến với tư duy tối ưu hiệu năng
                  và trải nghiệm người dùng. Tôi tập trung vào việc tạo ra các
                  sản phẩm web bền vững, từ kiến trúc hệ thống đến giao diện
                  tinh tế.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                <div className="flex items-center justify-center lg:justify-start gap-3 text-slate-600 font-bold text-xs uppercase tracking-widest">
                  <User2 className="text-indigo-600" size={16} /> Freelancer /
                  Fullstack
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-slate-600 font-bold text-xs uppercase tracking-widest">
                  <MapPin className="text-indigo-600" size={16} /> Hà Nội, Việt
                  Nam
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-slate-600 font-bold text-xs uppercase tracking-widest">
                  <Mail className="text-indigo-600" size={16} />{" "}
                  ntn8530@gmail.com
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-slate-600 font-bold text-xs uppercase tracking-widest">
                  <Github className="text-indigo-600" size={16} /> @Nghia251506
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BENTO GRID: KỸ NĂNG --- */}
      <section className="py-10 px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8">
          <Card className="md:col-span-2 lg:col-span-3 p-10 bg-white rounded-[4rem] shadow-sm border-none flex flex-col justify-between hover:shadow-xl transition-all group overflow-hidden">
            <div className="space-y-6 relative z-10">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                <Code2 size={28} />
              </div>
              <h3 className="text-4xl md:text-5xl font-[1000] tracking-tighter uppercase italic leading-none text-slate-900">
                Thực chiến <br />
                <span className="text-indigo-600">Sản phẩm</span>
              </h3>
              <p className="text-slate-700 font-bold text-sm leading-relaxed max-w-sm">
                Không bằng cấp hào nhoáng, tôi tập trung vào việc tạo ra các sản
                phẩm chạy tốt, code sạch và mang lại giá trị thực tế cho người
                dùng.
              </p>
            </div>
          </Card>

          <Card className="md:col-span-2 lg:col-span-3 p-10 bg-white rounded-[4rem] shadow-sm border-none hover:shadow-xl transition-all relative overflow-hidden">
            <div className="flex items-center gap-3 mb-8">
              <History className="text-indigo-600" size={20} />
              <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-slate-700">
                Lộ trình phát triển
              </h4>
            </div>
            <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-50">
              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white border-4 border-indigo-600 z-10 shadow-sm" />
                <span className="text-[10px] font-black text-indigo-600 uppercase mb-1 block">
                  2024 - 2026
                </span>
                <h5 className="font-extrabold text-base uppercase italic">
                  Freelance Developer
                </h5>
              </div>
              <div className="relative pl-10 opacity-50">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white border-4 border-slate-200 z-10" />
                <span className="text-[10px] font-black text-slate-400 uppercase mb-1 block">
                  2022 - 2023
                </span>
                <h5 className="font-extrabold text-base uppercase italic">
                  Trưởng phòng kỹ thuật máy tính
                </h5>
              </div>
            </div>
          </Card>

          <Card className="md:col-span-2 lg:col-span-2 p-10 bg-indigo-600 text-white rounded-[4rem] shadow-lg flex flex-col items-center justify-center text-center group cursor-pointer overflow-hidden">
            <Award className="mb-4 opacity-40" size={40} />
            <h4 className="text-6xl font-[1000] mb-2 italic tracking-tighter">
              {certCount}+
            </h4>
            <p className="font-black uppercase tracking-[0.2em] text-[10px] opacity-80">
              Chứng chỉ quốc tế
            </p>
          </Card>

          <Card className="md:col-span-2 lg:col-span-4 p-10 bg-slate-900 text-white rounded-[4rem] shadow-lg flex flex-col justify-between overflow-hidden relative group">
            <div className="relative z-10">
              <h4 className="text-4xl md:text-5xl font-[1000] italic uppercase tracking-tighter leading-none mb-6">
                Tối ưu <br />{" "}
                <span className="text-indigo-400">Từng dòng code.</span>
              </h4>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-blue-400 backdrop-blur-sm border border-white/5">
                <Zap size={16} fill="currentColor" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Kỷ luật & Tỉ mỉ
                </span>
              </div>
              <p className="mt-6 text-slate-400 font-bold text-sm leading-relaxed max-w-xs">
                Tôi không chấp nhận sự "vừa đủ". Mỗi sản phẩm đều được soi xét
                kỹ lưỡng từ cấu trúc dữ liệu đến trải nghiệm người dùng cuối.
              </p>
            </div>
            <Cpu
              className="absolute -right-12 -bottom-12 text-white/[0.03] transition-transform group-hover:scale-110 duration-1000 rotate-12"
              size={250}
            />
          </Card>
        </div>
      </section>

      {/* --- TECH STACK SLIDER --- */}
      <section id="skills" className="py-20 bg-white overflow-hidden mt-10">
        <div className="max-w-7xl mx-auto px-8 mb-12">
          <h3 className="text-4xl md:text-6xl font-[1000] tracking-tighter italic uppercase leading-[0.9] text-slate-900">
            Hệ sinh thái <br />{" "}
            <span className="text-indigo-600 not-italic">Công nghệ.</span>
          </h3>
          <p className="mt-4 text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
            Những công cụ tôi sử dụng để hiện thực hóa ý tưởng
          </p>
        </div>

        <div className="relative flex overflow-hidden group">
          <div className="flex animate-infinite-scroll gap-8 py-10">
            {displayStacks.map((tech: any, i: number) => (
              <div
                key={i}
                className="w-[240px] flex-shrink-0 p-8 bg-[#fafafa] border border-slate-50 rounded-[2.5rem] transition-all text-center flex flex-col items-center gap-5 hover:bg-white hover:shadow-xl hover:border-indigo-100 group/item"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white shadow-sm group-hover/item:scale-110 transition-transform">
                  {/* Ghi chú: Để fix điểm PageSpeed đỏ, ông NÊN thay <img> bằng <Image /> của Next.js
               Nhưng tôi giữ nguyên cấu trúc <img> theo ý ông muốn giữ UI/UX 
            */}
                  <img
                    src={tech.iconUrl}
                    className="w-7 h-7 object-contain grayscale group-hover/item:grayscale-0 transition-all"
                    alt={tech.name}
                  />
                </div>
                <div>
                  <span className="font-black text-xs uppercase tracking-widest block mb-1 text-slate-700">
                    {tech.name}
                  </span>
                  <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider">
                    {tech.proficiency || "Thành thạo"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
