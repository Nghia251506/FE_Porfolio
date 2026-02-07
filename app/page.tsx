"use client";

import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchSeoByUrl } from "@/store/slice/seoSlice";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import * as LucideIcons from "lucide-react";
import {
  ArrowRight,
  Terminal,
  Award,
  Zap,
  Cpu,
  History,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Portfolio() {
  const dispatch = useDispatch<AppDispatch>();
  const { currentSeo } = useSelector((state: RootState) => state.seo);
  const [certCount, setCertCount] = useState(0);
  const [techStacks, setTechStacks] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Danh sách ảnh Banner - Ông thay link ảnh thật vào đây nhé
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
    }, 5000); // 5000ms = 5s

    // Clear interval khi component unmount để tránh rò rỉ bộ nhớ
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  const displayStacks = useMemo(
    () => [...techStacks, ...techStacks],
    [techStacks],
  );

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 selection:bg-indigo-100 selection:text-indigo-700 font-sans pb-20">
      {/* HERO SECTION - RESTRUCTURED: TEXT LEFT | SLIDER RIGHT */}
      <section className="relative pt-32 pb-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT: Text Content (Co nhỏ lại để cân bằng) */}
          <div className="lg:col-span-5 text-left">
            <Badge className="mb-6 bg-indigo-50 text-indigo-600 border-none px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px]">
              SẴN SÀNG CHO CÁC DỰ ÁN MỚI
            </Badge>
            <h1 className="text-5xl md:text-7xl font-[1000] mb-6 tracking-tighter leading-[0.9] uppercase italic">
              {currentSeo?.h1Override?.split(" ")[0] || "Lập trình"} <br />
              <span className="text-indigo-600 not-italic">
                {currentSeo?.h1Override?.split(" ").slice(1).join(" ") ||
                  "Fullstack"}
              </span>
            </h1>
            <p className="text-lg text-slate-500 max-w-md mb-10 font-medium leading-relaxed italic border-l-2 border-indigo-600 pl-4">
              "
              {currentSeo?.description ||
                "Xây dựng trải nghiệm số kết hợp giữa kỹ thuật chuẩn xác và thẩm mỹ đỉnh cao."}
              "
            </p>
            <Button
              size="lg"
              className="h-14 px-8 rounded-2xl bg-indigo-600 font-black shadow-xl hover:bg-indigo-700 transition-all group text-white"
            >
              XEM CÁC DỰ ÁN
              <ArrowRight
                className="ml-2 group-hover:translate-x-1 transition-transform"
                size={18}
              />
            </Button>
          </div>

          {/* RIGHT: Image Slider (Banner style) */}
          <div className="lg:col-span-7 relative group">
            <div className="relative h-[400px] md:h-[550px] w-full overflow-hidden rounded-[3rem] shadow-2xl bg-slate-200">
              {slides.map((s, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out transform ${
                    i === currentSlide
                      ? "opacity-100 scale-100 z-10"
                      : "opacity-0 scale-105 z-0"
                  }`}
                >
                  <img
                    src={s}
                    alt="Banner Portfolio"
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay làm ảnh trông deep hơn */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                </div>
              ))}

              {/* Slider Indicators (Các dấu gạch nhỏ bên dưới cho biết đang ở slide nào) */}
              <div className="absolute bottom-8 left-8 flex gap-2 z-20">
                {slides.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === currentSlide
                        ? "w-8 bg-indigo-500"
                        : "w-2 bg-white/40"
                    }`}
                  />
                ))}
              </div>

              {/* Controls - Giữ nguyên nhưng thêm hover effect xịn hơn */}
              <div className="absolute bottom-8 right-8 flex gap-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-indigo-600 transition-all shadow-2xl"
                  onClick={() =>
                    setCurrentSlide((prev) =>
                      prev === 0 ? slides.length - 1 : prev - 1,
                    )
                  }
                >
                  <ChevronLeft size={20} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-indigo-600 transition-all shadow-2xl"
                  onClick={() =>
                    setCurrentSlide((prev) =>
                      prev === slides.length - 1 ? 0 : prev + 1,
                    )
                  }
                >
                  <ChevronRight size={20} />
                </Button>
              </div>
            </div>

            {/* Decor: Thêm cái bóng mờ Indigo phía sau cho ảo diệu */}
            <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 bg-indigo-200/30 blur-[100px] rounded-full"></div>
          </div>
        </div>
      </section>

      {/* BENTO GRID: Kỹ năng & Lộ trình */}
      <section id="about" className="py-10 px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {/* CARD: Kiến trúc sư (Giữ nguyên text nhưng chỉnh padding) */}
          <Card className="md:col-span-2 lg:col-span-3 p-10 bg-white rounded-[3rem] shadow-sm border-none flex flex-col justify-between hover:shadow-xl transition-all group">
            <div className="space-y-6">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 transition-transform group-hover:scale-110">
                <Terminal size={28} />
              </div>
              <h3 className="text-4xl md:text-5xl font-[1000] tracking-tighter uppercase italic leading-none">
                Kiến trúc sư <br /> Công nghệ
              </h3>
              <p className="text-slate-500 font-bold text-base md:text-lg leading-relaxed">
                Tôi xây dựng giải pháp dựa trên cấu trúc hệ thống sạch và khả
                năng SEO vượt trội.
              </p>
            </div>
          </Card>

          {/* CARD: LỘ TRÌNH PHÁT TRIỂN (TIMELINE) - NEW MÀ ÔNG MUỐN */}
          <Card className="md:col-span-2 lg:col-span-3 p-10 bg-white rounded-[3rem] shadow-sm border-none hover:shadow-xl transition-all overflow-hidden relative">
            <div className="flex items-center gap-3 mb-8">
              <History className="text-indigo-600" size={24} />
              <h4 className="font-black uppercase tracking-[0.2em] text-[10px]">
                Lộ trình phát triển
              </h4>
            </div>
            <div className="space-y-10 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
              {/* Item 1 */}
              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white border-4 border-indigo-600 z-10 shadow-sm"></div>
                <span className="text-[10px] font-black text-indigo-600 uppercase mb-1 block tracking-widest">
                  2024 - 2026
                </span>
                <h5 className="font-extrabold text-lg uppercase italic leading-none mb-2">
                  Freelancer Developer
                </h5>
                <p className="text-xs md:text-sm text-slate-400 font-bold leading-relaxed">
                  Rời khỏi vị trí quản lý để chinh phục thế giới Freelance, gặt
                  hái thành công qua các dự án thực chiến đa dạng.
                </p>
              </div>
              {/* Item 2 */}
              <div className="relative pl-10 opacity-60">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white border-4 border-slate-300 z-10"></div>
                <span className="text-[10px] font-black text-slate-400 uppercase mb-1 block tracking-widest">
                  2022 - 2023
                </span>
                <h5 className="font-extrabold text-lg uppercase italic leading-none mb-2">
                  Trưởng phòng kỹ thuật
                </h5>
                <p className="text-xs md:text-sm text-slate-400 font-bold leading-relaxed tracking-tight">
                  CÔNG TY TNHH TM&DV MÁY TÍNH LAPTOP HÀ NỘI. Quản lý hệ thống và
                  đội ngũ kỹ thuật chuyên nghiệp.
                </p>
              </div>
            </div>
          </Card>

          {/* CARD: Certificates (Co lại) */}
          <Card className="md:col-span-1 lg:col-span-2 p-10 bg-indigo-600 text-white rounded-[3rem] shadow-lg flex flex-col items-center justify-center text-center group cursor-pointer relative overflow-hidden">
            <div className="relative z-10">
              <Award className="mb-4 opacity-50 mx-auto" size={40} />
              <h4 className="text-6xl font-[1000] mb-2 italic tracking-tighter">
                {certCount}+
              </h4>
              <p className="font-black uppercase tracking-[0.2em] text-[10px] opacity-80">
                Chứng chỉ Quốc tế
              </p>
            </div>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </Card>

          {/* CARD: Performance */}
          <Card className="md:col-span-3 lg:col-span-4 p-10 bg-slate-900 text-white rounded-[3rem] shadow-lg flex flex-col justify-between overflow-hidden relative group">
            <div className="relative z-10">
              <h4 className="text-4xl md:text-5xl font-[1000] italic uppercase tracking-tighter leading-none mb-4">
                Hiệu năng <br /> dẫn đầu.
              </h4>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-yellow-400 backdrop-blur-sm">
                <Zap size={18} fill="currentColor" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Điểm Mobile 99+
                </span>
              </div>
            </div>
            <Cpu
              className="absolute -right-8 -bottom-8 text-white/5 transition-transform group-hover:scale-110 duration-700"
              size={220}
            />
          </Card>
        </div>
      </section>

      {/* TECH STACK (Giữ nguyên logic slider của ông nhưng bọc lại cho gọn) */}
      <section id="skills" className="py-24 bg-white overflow-hidden mt-10">
        <div className="max-w-7xl mx-auto px-8 mb-16">
          <h3 className="text-5xl md:text-7xl font-[1000] tracking-tighter italic uppercase leading-none">
            Kho vũ khí <br />{" "}
            <span className="text-indigo-600 not-italic">Kỹ thuật</span>
          </h3>
        </div>
        <div className="relative flex overflow-hidden group">
          <div className="flex animate-infinite-scroll gap-8 py-10">
            {displayStacks.map((tech: any, i: number) => (
              <div
                key={i}
                className="w-[280px] flex-shrink-0 p-8 bg-white border border-slate-50 rounded-[2.5rem] transition-all text-center flex flex-col items-center gap-5 shadow-sm hover:shadow-xl"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-slate-50 overflow-hidden">
                  <img
                    src={tech.iconUrl}
                    className="w-8 h-8 object-contain"
                    alt={tech.name}
                  />
                </div>
                <div>
                  <span className="font-black text-xs uppercase tracking-widest block mb-1">
                    {tech.name}
                  </span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase">
                    {tech.proficiency || "Chuyên gia"}
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
