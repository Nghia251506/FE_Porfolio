"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppRedux";
import { fetchAllCertificates } from "@/store/slice/certificateSlice";
import { fetchSeoByUrl } from "@/store/slice/seoSlice"; 
import {
  ExternalLink,
  Calendar,
  ShieldCheck,
  Zap,
  Award,
  ArrowUpRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {CertificateResponse} from "@/type/certificate"

export default function CertificatesPage() {
  const dispatch = useAppDispatch();
  const { items: certificates, isLoading: certLoading } = useAppSelector((state) => state.certificate);
  const { currentSeo: seoData, isLoading: seoLoading } = useAppSelector((state) => state.seo);

  const [filteredCerts, setFilteredCerts] = useState<CertificateResponse[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  
  // Xử lý Hydration cho Next.js
  const [mounted, setMounted] = useState(false);

  const organizations = ["All", "Google", "Meta", "Amazon", "Udemy", "Coursera", "FPT"];

  useEffect(() => {
    setMounted(true);
    dispatch(fetchAllCertificates());
    dispatch(fetchSeoByUrl('/certificates')); 
  }, [dispatch]);

  useEffect(() => {
    if (activeTab === "All") {
      setFilteredCerts(certificates);
    } else {
      setFilteredCerts(certificates.filter((cert) => cert.organization === activeTab));
    }
  }, [activeTab, certificates]);

  // Tránh lỗi Hydration Mismatch
  if (!mounted) {
    return <div className="min-h-screen bg-[#fafafa]" />;
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pt-32 pb-20 px-6 md:px-8 overflow-hidden relative">
      {/* Decor Background loang màu chuyên nghiệp */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-100/30 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-100/20 blur-[100px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="relative mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Cột trái: Nội dung chữ */}
            <div className="lg:col-span-7 z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-xl shadow-indigo-200/50">
                <Zap size={12} className="fill-yellow-400 text-yellow-400" /> PHÁT TRIỂN NGHỀ NGHIỆP
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-[105px] font-[1000] tracking-tighter uppercase italic leading-[0.8] mb-10 text-slate-900">
                {seoData?.h1Override?.split(' ')[0] || "CHỨNG"} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400 not-italic">
                   {seoData?.h1Override?.split(' ').slice(1).join(' ') || "CHỈ NĂNG LỰC"}
                </span>
              </h1>
              
              <p className="text-slate-500 max-w-xl font-medium text-lg leading-relaxed italic border-l-4 border-indigo-600 pl-6 mb-10">
                "{seoData?.description || "Minh chứng cho nỗ lực làm chủ công nghệ và quy trình phát triển phần mềm chuẩn quốc tế."}"
              </p>

              {/* Stats nhanh */}
              <div className="flex gap-10 items-center">
                 <div className="flex flex-col">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tổng tích lũy</p>
                    <p className="text-5xl font-[1000] text-slate-900 italic tracking-tighter">{certificates?.length || 0}+</p>
                 </div>
                 <div className="w-px h-12 bg-slate-200" />
                 <div className="flex flex-col">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tổ chức cấp</p>
                    <p className="text-5xl font-[1000] text-indigo-600 italic tracking-tighter">{organizations.length - 1}</p>
                 </div>
              </div>
            </div>

            {/* Cột phải: Ảnh Decor lấp khoảng trống */}
            <div className="lg:col-span-5 relative hidden lg:block">
               <div className="relative w-full aspect-square flex items-center justify-center">
                  {/* Quầng sáng phía sau */}
                  <div className="absolute w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
                  
                  {/* Ảnh chính xoay nhẹ */}
                  <div className="relative z-20 transform -rotate-6 hover:rotate-0 transition-all duration-700 ease-out group">
                     <div className="p-4 bg-white rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border border-white">
                        <img 
                           src="https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=1000&auto=format&fit=crop" 
                           alt="Certification Illustration"
                           className="w-80 h-auto rounded-[2.5rem] grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                     </div>
                     
                     {/* Badge bay lơ lửng */}
                     <div className="absolute -bottom-8 -right-8 bg-slate-900 text-white p-7 rounded-[2rem] shadow-2xl animate-bounce duration-[4000ms]">
                        <Award size={38} className="text-yellow-400" />
                     </div>
                  </div>

                  {/* Ảnh bóng mờ phía sau tạo chiều sâu */}
                  <div className="absolute top-10 right-0 z-10 transform rotate-12 opacity-20 blur-[2px]">
                      <div className="p-2 bg-white rounded-[2rem] shadow-xl border border-slate-50">
                         <div className="w-48 h-32 bg-slate-200 rounded-[1.5rem]" />
                      </div>
                  </div>
               </div>
            </div>

          </div>
        </div>

        {/* --- BỘ LỌC (Sticky) --- */}
        <div className="sticky top-24 z-40 mb-16 flex justify-center md:justify-start">
            <div className="inline-flex p-2 bg-white/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/50 shadow-2xl shadow-indigo-100/50 flex-wrap gap-1">
              {organizations.map((org) => (
                <button
                  key={org}
                  onClick={() => setActiveTab(org)}
                  className={`px-8 py-3.5 rounded-full font-black text-[10px] uppercase tracking-[0.15em] transition-all duration-500 ${
                    activeTab === org 
                      ? "bg-slate-900 text-white shadow-lg scale-105" 
                      : "bg-transparent text-slate-400 hover:text-slate-900"
                  }`}
                >
                  {org}
                </button>
              ))}
            </div>
        </div>

        {/* --- DANH SÁCH CHỨNG CHỈ --- */}
        {(certLoading || seoLoading) ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[500px] bg-slate-100 rounded-[3.5rem] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredCerts.map((cert) => (
              <div key={cert.id} className="group relative">
                <Card className="h-full border border-slate-100 bg-white overflow-hidden rounded-[3.5rem] transition-all duration-500 hover:-translate-y-4 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-20px_rgba(99,102,241,0.15)] flex flex-col p-5">
                  
                  {/* Preview ảnh chứng chỉ */}
                  <div className="relative aspect-[16/11] overflow-hidden rounded-[2.8rem] bg-slate-50 border border-slate-50">
                    <img
                      src={cert.imageUrl || ""}
                      alt={cert.name}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-8">
                        <Button
                          onClick={() => cert.credentialUrl && window.open(cert.credentialUrl, "_blank")}
                          className="w-full bg-white text-slate-900 rounded-2xl font-black text-[11px] tracking-widest h-14 hover:bg-indigo-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0"
                        >
                          XÁC MINH NGAY <ArrowUpRight size={16} className="ml-2" />
                        </Button>
                    </div>

                    <div className="absolute top-4 left-4">
                       <span className="text-[9px] font-black uppercase text-white bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full tracking-widest">
                          {cert.organization}
                       </span>
                    </div>
                  </div>

                  {/* Nội dung chi tiết */}
                  <div className="px-6 pt-8 pb-4 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-slate-400 text-[10px] font-bold mb-4 uppercase tracking-widest">
                       <Calendar size={14} className="text-indigo-400" /> Cấp ngày {cert.issueDate}
                    </div>

                    <h3 className="text-2xl font-[1000] text-slate-900 leading-[1.1] mb-6 uppercase italic tracking-tighter group-hover:text-indigo-600 transition-colors">
                      {cert.name}
                    </h3>

                    <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                       <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                          <ShieldCheck size={16} fill="currentColor" className="text-emerald-100" /> Verified
                       </div>
                       <Award size={20} className="text-slate-100 group-hover:text-indigo-100" />
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}

        {/* Trạng thái trống */}
        {!certLoading && filteredCerts.length === 0 && (
          <div className="text-center py-32 bg-white rounded-[5rem] border border-slate-100">
            <Award className="mx-auto text-slate-100 mb-6" size={100} strokeWidth={1} />
            <h3 className="text-3xl font-[1000] text-slate-900 italic uppercase tracking-tighter">
              Đang chờ chinh phục...
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}