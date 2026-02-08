"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppRedux";
import { fetchAllCertificates } from "@/store/slice/certificateSlice";
import { fetchSeoByUrl } from "@/store/slice/seoSlice";
import {
  Calendar,
  ShieldCheck,
  Zap,
  Award,
  ArrowUpRight,
  Search,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CertificateResponse } from "@/type/certificate";

export default function CertificatesPage() {
  const dispatch = useAppDispatch();
  const { items: certificates, isLoading: certLoading } = useAppSelector(
    (state) => state.certificate,
  );
  const { currentSeo: seoData, isLoading: seoLoading } = useAppSelector(
    (state) => state.seo,
  );

  const [filteredCerts, setFilteredCerts] = useState<CertificateResponse[]>([]);
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [mounted, setMounted] = useState(false);

  // Chuyển danh sách tổ chức sang Tiếng Việt
  const organizations = [
    "Tất cả",
    "Google",
    "Meta",
    "Amazon",
    "Udemy",
    "Coursera",
    "FPT",
  ];

  useEffect(() => {
    setMounted(true);
    dispatch(fetchAllCertificates());
    dispatch(fetchSeoByUrl("/certificates"));
  }, [dispatch]);

  useEffect(() => {
    if (activeTab === "Tất cả") {
      setFilteredCerts(certificates);
    } else {
      setFilteredCerts(
        certificates.filter((cert) => cert.organization === activeTab),
      );
    }
  }, [activeTab, certificates]);

  if (!mounted) return <div className="min-h-screen bg-[#fafafa]" />;

  return (
    <div className="min-h-screen bg-[#fafafa] pt-28 pb-20 px-6 md:px-8 overflow-hidden relative">
      {/* Nền mờ nghệ thuật */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* --- TIÊU ĐỀ TRANG (ĐÃ THU NHỎ) --- */}
        <div className="relative mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Cột trái: Nội dung chữ đã thu gọn */}
            <div className="lg:col-span-7 z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-[0.2em] mb-6">
                <Zap size={12} className="fill-current" /> Học tập suốt đời
              </div>

              <h1 className="text-5xl md:text-7xl font-[1000] tracking-tighter uppercase italic leading-[0.9] mb-8 text-slate-900">
                {seoData?.h1Override?.split(" ")[0] || "Bằng cấp"} <br />
                <span className="text-indigo-600 not-italic">
                  {seoData?.h1Override?.split(" ").slice(1).join(" ") ||
                    "& Chứng chỉ"}
                </span>
              </h1>

              <p className="text-slate-500 max-w-lg font-medium text-base md:text-lg leading-relaxed italic border-l-4 border-indigo-600 pl-6 mb-10">
                "
                {seoData?.description ||
                  "Minh chứng cho quá trình rèn luyện và làm chủ các công nghệ hiện đại theo tiêu chuẩn quốc tế."}
                "
              </p>

              <div className="flex gap-8 items-center pt-4">
                <div className="flex flex-col">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Tổng số lượng
                  </p>
                  <p className="text-4xl font-[1000] text-slate-900 italic tracking-tighter">
                    {certificates?.length || 0}
                  </p>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex flex-col">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Tổ chức quốc tế
                  </p>
                  <p className="text-4xl font-[1000] text-indigo-600 italic tracking-tighter">
                    {organizations.length - 1}
                  </p>
                </div>
              </div>
            </div>

            {/* CỘT PHẢI: ẢNH DECOR ĐÃ QUAY TRỞ LẠI */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="relative w-full aspect-square flex items-center justify-center">
                {/* Quầng sáng phía sau tạo độ sâu */}
                <div className="absolute w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" />

                {/* Ảnh chính xoay nhẹ nghệ thuật */}
                <div className="relative z-20 transform -rotate-3 hover:rotate-0 transition-all duration-700 ease-out group">
                  <div className="p-3 bg-white rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] border border-white">
                    <img
                      src="https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=1000&auto=format&fit=crop"
                      alt="Minh họa chứng chỉ"
                      className="w-72 h-auto rounded-[2.2rem] grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>

                  {/* Badge Award bay lơ lửng */}
                  <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white p-5 rounded-[1.8rem] shadow-2xl animate-bounce duration-[4000ms]">
                    <Award size={32} className="text-yellow-400" />
                  </div>
                </div>

                {/* Ảnh bóng mờ trang trí phía sau */}
                <div className="absolute top-10 right-0 z-10 transform rotate-12 opacity-10 blur-[1px]">
                  <div className="p-2 bg-white rounded-[1.5rem] shadow-xl border border-slate-50">
                    <div className="w-40 h-28 bg-slate-100 rounded-[1.2rem]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- BỘ LỌC TỐI GIẢN --- */}
        <div className="sticky top-24 z-40 mb-12">
          <div className="inline-flex p-1.5 bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-100 shadow-sm flex-wrap gap-1">
            {organizations.map((org) => (
              <button
                key={org}
                onClick={() => setActiveTab(org)}
                className={`px-6 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-[0.1em] transition-all duration-300 ${
                  activeTab === org
                    ? "bg-slate-900 text-white shadow-md scale-105"
                    : "bg-transparent text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {org}
              </button>
            ))}
          </div>
        </div>

        {/* --- LƯỚI CHỨNG CHỈ --- */}
        {certLoading || seoLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[450px] bg-slate-100 rounded-[3rem] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCerts.map((cert) => (
              <div key={cert.id} className="group">
                <Card className="h-full border border-slate-50 bg-white overflow-hidden rounded-[3rem] transition-all duration-500 hover:-translate-y-3 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 flex flex-col p-4">
                  {/* Ảnh thu nhỏ */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[2.2rem] bg-slate-50">
                    <img
                      src={cert.imageUrl || ""}
                      alt={cert.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-6">
                      <Button
                        onClick={() =>
                          cert.credentialUrl &&
                          window.open(cert.credentialUrl, "_blank")
                        }
                        className="w-full bg-white text-slate-900 rounded-xl font-black text-[10px] tracking-widest h-12 hover:bg-indigo-600 hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0"
                      >
                        XÁC THỰC CHỨNG CHỈ{" "}
                        <ArrowUpRight size={14} className="ml-2" />
                      </Button>
                    </div>

                    <div className="absolute top-3 left-3">
                      <span className="text-[8px] font-black uppercase text-white bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full tracking-widest">
                        {cert.organization}
                      </span>
                    </div>
                  </div>

                  {/* Nội dung */}
                  <div className="px-4 pt-6 pb-2 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-slate-400 text-[9px] font-black mb-3 uppercase tracking-widest">
                      <Calendar size={12} className="text-indigo-400" /> Ngày
                      cấp: {cert.issueDate}
                    </div>

                    <h3 className="text-xl font-[1000] text-slate-900 leading-[1.2] mb-6 uppercase italic tracking-tighter group-hover:text-indigo-600 transition-colors">
                      {cert.name}
                    </h3>

                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                        <ShieldCheck size={14} className="fill-emerald-50" /> Đã
                        xác minh
                      </div>
                      <Award
                        size={18}
                        className="text-slate-200 group-hover:text-indigo-200 transition-colors"
                      />
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}

        {/* Thông báo khi không có dữ liệu */}
        {!certLoading && filteredCerts.length === 0 && (
          <div className="text-center py-24 bg-white rounded-[4rem] border border-dashed border-slate-200 group">
            <div className="relative inline-block mb-6">
              <Award
                className="mx-auto text-slate-100 group-hover:text-indigo-100 transition-colors duration-500"
                size={80}
                strokeWidth={1}
              />
              <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full" />
            </div>

            <h3 className="text-2xl md:text-3xl font-[1000] text-slate-900 italic uppercase tracking-tighter mb-4">
              Hành trình <span className="text-indigo-600">chưa dừng lại</span>
            </h3>

            <p className="text-slate-400 font-bold text-xs md:text-sm uppercase tracking-[0.2em] max-w-md mx-auto leading-relaxed">
              Tôi vẫn đang tiếp tục chinh phục những cột mốc mới. <br />
              Các chứng chỉ chuyên sâu sẽ sớm được cập nhật tại đây.
            </p>

            <div className="mt-8 flex justify-center">
              <div className="h-1 w-12 bg-indigo-600 rounded-full animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
