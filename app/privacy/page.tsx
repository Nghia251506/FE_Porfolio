'use client';

import { ShieldCheck, Lock, EyeOff, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] pt-40 pb-20 px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-xs uppercase tracking-widest mb-12 transition-colors">
          <ArrowLeft size={16} /> Quay lại trang chủ
        </Link>

        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-[1000] italic uppercase tracking-tighter mb-6">Privacy <br/><span className="text-indigo-600 not-italic">Policy</span></h1>
          <p className="text-slate-500 font-medium italic text-lg leading-relaxed border-l-4 border-indigo-600 pl-6">
            Sự riêng tư của bạn là ưu tiên hàng đầu trong mọi giải pháp công nghệ của tôi.
          </p>
        </div>

        <div className="grid gap-6">
          <div className="p-10 bg-white rounded-[3rem] shadow-sm border border-slate-50">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <Lock size={24} />
            </div>
            <h2 className="font-black uppercase tracking-widest text-sm mb-4">Thu thập dữ liệu</h2>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Tôi chỉ thu thập các thông tin cá nhân (Tên, Email) mà bạn chủ động cung cấp thông qua Form liên hệ. Những dữ liệu này chỉ được sử dụng để phản hồi các yêu cầu công việc và trao đổi dự án.
            </p>
          </div>

          <div className="p-10 bg-white rounded-[3rem] shadow-sm border border-slate-50">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck size={24} />
            </div>
            <h2 className="font-black uppercase tracking-widest text-sm mb-4">Cam kết bảo mật</h2>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Thông tin của bạn sẽ được lưu trữ an toàn và **tuyệt đối không** chia sẻ, bán hoặc cung cấp cho bất kỳ bên thứ ba nào vì mục đích thương mại.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}