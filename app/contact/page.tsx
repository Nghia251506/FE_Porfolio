"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Linkedin,
  Github,
  Facebook,
  ChevronDown,
  FileCheck,
  Code2,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Thiết kế Website",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdyRWebqbQ9lz0y9Fl4TiQQLUZgM1rhP9PN0ow7dxaGVMPp1A/formResponse";
    const formBody = new URLSearchParams();

    formBody.append("entry.220540692", formData.name);    
    formBody.append("entry.593241985", formData.email);   
    formBody.append("entry.1481180295", formData.phone);  
    formBody.append("entry.1282091042", formData.subject);
    formBody.append("entry.453793289", formData.message);

    try {
      await fetch(GOOGLE_FORM_URL, { method: "POST", mode: "no-cors", body: formBody });
      toast.success("Cảm ơn bạn! Tin nhắn đã được gửi thành công.");
      setFormData({ name: "", email: "", phone: "", subject: "Thiết kế Website", message: "" });
    } catch (error) {
      toast.error("Gửi tin nhắn thất bại, vui lòng kiểm tra lại kết nối!");
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 md:pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
      {/* DECOR NỀN: CÁC BIỂU TƯỢNG MỜ ẨN */}
      <div className="absolute top-40 right-10 opacity-[0.03] pointer-events-none hidden lg:block">
        <FileCheck size={400} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* TIÊU ĐỀ: ĐÃ HẠ SIZE TRÊN DESKTOP + DECOR KÝ KẾT */}
        <div className="mb-16 md:mb-24 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-900 text-[9px] font-black uppercase tracking-[0.3em] mb-6">
            <Sparkles size={10} className="text-indigo-600" /> Hợp tác & Phát triển
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-12">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-[1000] tracking-[ -0.05em] uppercase italic leading-[1] text-slate-900">
              KHỞI ĐẦU <br />
              <span className="text-indigo-600 not-italic">Ý TƯỞNG</span> <br />
              CỦA BẠN.
            </h1>

            {/* DECOR CẠNH TITLE: BIỂU TƯỢNG LIÊN QUAN ĐẾN HỢP ĐỒNG & CODE */}
            <div className="hidden lg:flex flex-col gap-4 border-l border-slate-200 pl-8 mb-4">
              <div className="flex items-center gap-3 text-slate-400">
                <FileCheck size={20} className="text-indigo-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Quy trình làm việc minh bạch</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Code2 size={20} className="text-indigo-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Cam kết chất lượng mã nguồn</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Send size={20} className="text-indigo-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Hỗ trợ vận hành 24/7</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* THÔNG TIN CHI TIẾT */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
               <p className="text-slate-500 font-medium text-lg italic leading-relaxed max-w-sm">
                Mọi dự án vĩ đại đều bắt đầu từ một cuộc trò chuyện đơn giản. Hãy để tôi giúp bạn hiện thực hóa nó.
              </p>
              <div className="h-1 w-20 bg-indigo-600/20 rounded-full" />
            </div>

            <div className="grid grid-cols-1 gap-10">
              {[
                { icon: <Mail size={22}/>, label: "Hộp thư trực tiếp", value: "ntn8530@gmail.com", href: "mailto:ntn8530@gmail.com" },
                { icon: <Phone size={22}/>, label: "Đường dây nóng", value: "0356 589 821", href: "tel:+84356589821" },
              ].map((item, idx) => (
                <div key={idx} className="group flex items-start gap-6">
                  <div className="mt-1 text-indigo-600 transition-all group-hover:scale-110">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-1">{item.label}</p>
                    <a href={item.href} className="text-xl font-bold text-slate-900 hover:text-indigo-600 transition-all tracking-tight block">
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* MẠNG XÃ HỘI - LÀM NHỎ LẠI CHO TINH TẾ */}
            <div className="flex gap-3 pt-6">
              {[<Linkedin key="li" size={18}/>, <Github key="gh" size={18}/>, <Facebook key="fb" size={18}/>].map((icon, i) => (
                <button key={i} className="w-12 h-12 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* FORM NHẬP LIỆU - NỀN ĐEN ĐẶC TRƯNG */}
          <div className="lg:col-span-7 bg-[#0a0f1c] p-8 md:p-14 rounded-[3rem] md:rounded-[4rem] shadow-2xl relative overflow-hidden group/form">
            {/* Hiệu ứng ánh sáng góc form */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/10 blur-[80px] rounded-full" />
            
            <h2 className="text-white text-3xl font-[1000] uppercase italic tracking-tighter mb-10 flex items-center gap-4">
              Gửi yêu cầu hợp tác <FileCheck size={24} className="text-indigo-500 opacity-50" />
            </h2>

            <form onSubmit={handleSubmit} className="space-y-7 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-2">Tên của bạn</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nguyễn Văn Nghĩa"
                    className="h-14 rounded-xl border-none bg-white/5 text-white focus:ring-1 focus:ring-indigo-500 transition-all px-6 placeholder:text-slate-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-2">Địa chỉ Email</label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@nghia.com"
                    className="h-14 rounded-xl border-none bg-white/5 text-white focus:ring-1 focus:ring-indigo-500 transition-all px-6 placeholder:text-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-2">Số điện thoại</label>
                  <Input
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="03xx xxx xxx"
                    className="h-14 rounded-xl border-none bg-white/5 text-white focus:ring-1 focus:ring-indigo-500 transition-all px-6 placeholder:text-slate-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-2">Loại hình hợp tác</label>
                  <div className="relative">
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full h-14 rounded-xl border-none bg-white/5 text-white px-6 appearance-none focus:ring-1 focus:ring-indigo-500 transition-all outline-none font-bold text-[12px]"
                    >
                      <option value="Thiết kế Website" className="bg-slate-900">Thiết kế Website & Web App</option>
                      <option value="Phát triển App Mobile" className="bg-slate-900">Phát triển Mobile Application</option>
                      <option value="Hợp tác tuyển dụng" className="bg-slate-900">Hợp tác Tuyển dụng / Outsourcing</option>
                      <option value="Khác" className="bg-slate-900">Yêu cầu khác</option>
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-2">Mô tả dự án hoặc vị trí công việc</label>
                <Textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hãy chia sẻ chi tiết về mong muốn của bạn để tôi có thể hỗ trợ tốt nhất..."
                  className="min-h-[140px] rounded-2xl border-none bg-white/5 text-white focus:ring-1 focus:ring-indigo-500 p-6 transition-all text-sm leading-relaxed placeholder:text-slate-700"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-16 md:h-20 bg-white hover:bg-indigo-600 hover:text-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 group mt-4"
              >
                GỬI THÔNG TIN HỢP TÁC <Send size={16} className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}