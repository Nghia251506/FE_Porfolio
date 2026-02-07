'use client';

import { Copyright, Code2, Scale, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] pt-40 pb-20 px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-xs uppercase tracking-widest mb-12 transition-colors">
          <ArrowLeft size={16} /> Quay lại trang chủ
        </Link>

        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-[1000] italic uppercase tracking-tighter mb-6">Terms of <br/><span className="text-indigo-600 not-italic">Service</span></h1>
          <p className="text-slate-500 font-medium italic text-lg leading-relaxed border-l-4 border-indigo-600 pl-6">
            Sáng tạo có trách nhiệm và tôn trọng bản quyền sản phẩm số.
          </p>
        </div>

        <div className="grid gap-6">
          <div className="p-10 bg-white rounded-[3rem] shadow-sm border border-slate-50">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
              <Copyright size={24} />
            </div>
            <h2 className="font-black uppercase tracking-widest text-sm mb-4">Sở hữu trí tuệ</h2>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Tất cả các dự án, mã nguồn và thiết kế hiển thị trên trang web này đều thuộc bản quyền của **NghiaFullstack** hoặc đối tác liên quan. Vui lòng không sao chép khi chưa có sự đồng ý.
            </p>
          </div>

          <div className="p-10 bg-white rounded-[3rem] shadow-sm border border-slate-50">
            <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-6">
              <Code2 size={24} />
            </div>
            <h2 className="font-black uppercase tracking-widest text-sm mb-4">Sử dụng mã nguồn</h2>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Các đoạn code ví dụ hoặc thư viện mã nguồn mở được chia sẻ trên blog (nếu có) sẽ tuân theo giấy phép **MIT License**. Bạn có thể sử dụng chúng một cách tự do trong các dự án cá nhân.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}