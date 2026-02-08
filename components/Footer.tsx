'use client';

import { Button } from '@/components/ui/button';
import { ArrowUpRight, Send } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-[#0a0f1c] text-white pt-16 pb-8 px-6 rounded-t-[2.5rem] md:rounded-t-[4rem] relative overflow-hidden">
      {/* Đường kẻ gradient mờ ảo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Cột Trái: Tiêu đề đã được "giải nén" */}
          <div>
            <h2 className="text-3xl md:text-5xl font-[1000] italic uppercase tracking-tight leading-[1.2] mb-6">
              SẴN SÀNG CHO <br/> 
              <span className="text-indigo-500 not-italic">THỬ THÁCH</span> MỚI.
            </h2>
            <p className="text-slate-400 font-medium text-xs md:text-sm max-w-sm italic border-l border-indigo-500/40 pl-4 opacity-80 leading-relaxed">
              Biến những bài toán kỹ thuật phức tạp thành sản phẩm thực tế vượt mong đợi.
            </p>
          </div>

          {/* Cột Phải: Nút bấm */}
          <div className="flex lg:justify-end">
            <Button 
              onClick={() => window.location.href = 'mailto:ntn8530@gmail.com'}
              className="h-12 md:h-14 px-8 bg-white text-slate-950 hover:bg-indigo-600 hover:text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl group transition-all duration-500"
            >
              Bắt đầu câu chuyện
              <Send className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={14} />
            </Button>
          </div>
        </div>

        {/* Thông tin chi tiết: Tăng spacing cho dễ đọc */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-10 border-t border-white/5 pt-10">
            <div className="col-span-2 md:col-span-1">
               <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white font-black italic text-[10px]">N</div>
                  <span className="text-[11px] font-black italic tracking-normal opacity-80 uppercase">Nghĩa Nguyễn</span>
               </div>
            </div>

            <div>
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em] mb-5">Kết nối</p>
                <div className="flex flex-col gap-3 font-bold text-[10px] uppercase tracking-[0.1em]">
                    <a href="https://www.linkedin.com/in/tr%E1%BB%8Dng-ngh%C4%A9a-nguy%E1%BB%85n-2b0375398/" className="hover:text-indigo-400 flex items-center gap-2 transition-colors">LinkedIn <ArrowUpRight size={10} className="opacity-40"/></a>
                    <a href="https://github.com/Nghia251506" className="hover:text-indigo-400 flex items-center gap-2 transition-colors">Github <ArrowUpRight size={10} className="opacity-40"/></a>
                </div>
            </div>

            <div>
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em] mb-5">Liên hệ trực tiếp</p>
                <a href="mailto:ntn8530@gmail.com" className="font-bold text-[10px] hover:text-indigo-400 transition-colors tracking-widest">ntn8530@gmail.com</a>
                <p className="mt-2 text-slate-500 text-[9px] font-medium italic opacity-60">Hà Nội, Việt Nam</p>
            </div>

            <div>
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em] mb-5">Triết lý làm nghề</p>
                <p className="text-[9px] text-slate-500 font-bold leading-relaxed uppercase tracking-normal">
                  Tối ưu là một hành trình, <br/> không phải đích đến.
                </p>
            </div>
        </div>
        
        {/* Copyright: Mảnh dẻ và thanh lịch */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-[8px] font-black uppercase tracking-[0.4em]">
            © {currentYear} NghiaFullstack. Thiết kế với sự kỷ luật.
          </p>
          <div className="text-slate-700 text-[8px] font-black uppercase tracking-[0.2em] hidden md:block">
            Sức mạnh từ Next.js & Tailwind
          </div>
        </div>
      </div>
    </footer>
  );
}