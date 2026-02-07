'use client';

import { Button } from '@/components/ui/button';
import { Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  // Tự động lấy năm hiện tại
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-[#0f172a] text-white pt-24 pb-12 px-8 rounded-t-[4rem] md:rounded-t-[6rem]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-24">
          {/* Cột Trái: Thông điệp (Co nhỏ text lại cho sang) */}
          <div>
            <h2 className="text-5xl md:text-7xl font-[1000] italic uppercase tracking-tighter leading-[0.9] mb-8">
              Cùng nhau <br/> 
              <span className="text-indigo-500 not-italic">NÂNG TẦM</span> <br/> 
              dự án.
            </h2>
            <p className="text-slate-400 font-medium text-sm md:text-base max-w-sm italic opacity-80">
              Sẵn sàng biến những ý tưởng phức tạp thành những trải nghiệm số mượt mà và hiệu quả.
            </p>
          </div>

          {/* Cột Phải: Action Button */}
          <div className="flex lg:justify-end">
            <Button className="h-16 md:h-20 px-10 bg-indigo-600 hover:bg-white hover:text-indigo-600 rounded-[2rem] font-black text-base md:text-lg uppercase shadow-2xl group transition-all duration-500">
              TUYỂN DỤNG NGAY 
              <Mail className="ml-3 group-hover:scale-110 transition-transform" size={20} />
            </Button>
          </div>
        </div>

        {/* Thông tin thêm (Tùy chọn thêm để footer đầy đặn hơn) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-t border-white/5 pt-12">
            <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Mạng xã hội</p>
                <div className="flex flex-col gap-2 font-bold text-sm">
                    <a href="https://www.linkedin.com/in/tr%E1%BB%8Dng-ngh%C4%A9a-nguy%E1%BB%85n-2b0375398/" className="hover:text-indigo-400 flex items-center gap-1 transition-colors">LinkedIn <ArrowUpRight size={12}/></a>
                    <a href="https://github.com/Nghia251506" className="hover:text-indigo-400 flex items-center gap-1 transition-colors">Github <ArrowUpRight size={12}/></a>
                </div>
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Liên hệ</p>
                <p className="font-bold text-sm">ntn8530@gmail.com</p>
            </div>
        </div>
        
        {/* Copyright với Năm tự động đổi */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.3em]">
            © {currentYear} NGHIAFULLSTACK. THIẾT KẾ VỚI TÂM HUYẾT TẠI VIỆT NAM.
          </p>
          <div className="flex gap-6 text-slate-500 text-[9px] font-black uppercase tracking-widest">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}