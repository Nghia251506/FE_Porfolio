"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppRedux";
import { fetchSeoByUrl } from "@/store/slice/seoSlice";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Link from "next/link";

export default function ContactPage() {
  const dispatch = useAppDispatch();
  const { currentSeo: seoData } = useAppSelector((state) => state.seo);

  // 1. Khai báo State để hứng dữ liệu từ Form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Web App", // Giá trị mặc định (phải khớp với 1 option trong Google Form)
    message: "",
  });

  useEffect(() => {
    dispatch(fetchSeoByUrl("/contact"));
  }, [dispatch]);

  // 2. Hàm xử lý gửi data "lậu" về Google Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // THAY LINK NÀY BẰNG LINK FORM CỦA ÔNG (Đuôi /formResponse)
    const GOOGLE_FORM_URL =
      "https://docs.google.com/forms/d/e/1FAIpQLSdyRWebqbQ9lz0y9Fl4TiQQLUZgM1rhP9PN0ow7dxaGVMPp1A/formResponse";

    const formBody = new URLSearchParams();

    // QUAN TRỌNG: Thay các entry.xxxx bằng ID thực tế ông lấy từ Inspect Google Form
    formBody.append("entry.220540692", formData.name);    
    formBody.append("entry.593241985", formData.email);   
    formBody.append("entry.1481180295", formData.phone);  
    formBody.append("entry.1282091042", formData.subject); // ID của Dropdown
    formBody.append("entry.453793289", formData.message);

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: formBody,
      });
      
      toast.success("Gửi tin nhắn thành công!");
      setFormData({ name: "", email: "", phone: "", subject: "Web App", message: "" });
    } catch (error) {
      toast.error("Lỗi gửi form, thử lại nhé bro!");
    }
  };

  const socialLinks = [
    { icon: <Linkedin size={18} />, href: "#", label: "LinkedIn" },
    { icon: <Github size={18} />, href: "#", label: "GitHub" },
    { icon: <Facebook size={18} />, href: "#", label: "Facebook" },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] pt-32 pb-20 px-6 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* CỘT TRÁI: THÔNG TIN LIÊN HỆ (Sáng) */}
          <div className="space-y-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-8">
                <MessageSquare size={12} fill="currentColor" /> LIÊN HỆ VỚI TÔI
              </div>

              <h1 className="text-6xl md:text-8xl lg:text-9xl font-[1000] tracking-tighter uppercase italic leading-[0.8] mb-10">
                {seoData?.h1Override?.split(" ")[0] || "KẾT NỐI VỚI NGHĨA."}
              </h1>

              <p className="text-slate-500 max-w-md font-medium text-lg italic leading-relaxed border-l-4 border-indigo-600 pl-6">
                {seoData?.description ||
                  "Sẵn sàng lắng nghe và biến những ý tưởng của bạn thành hiện thực với giải pháp công nghệ tối ưu nhất."}
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: <Mail />,
                  label: "Email",
                  value: "ntn8530@gmail.com",
                  href: "mailto:ntn8530@gmail.com",
                },
                {
                  icon: <Phone />,
                  label: "Phone",
                  value: "+84 (0) 356589821",
                  href: "tel:+84356589821",
                },
                {
                  icon: <MapPin />,
                  label: "Location",
                  value: "Hà Nội, Việt Nam",
                  href: "#",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-1">
                      {item.label}
                    </p>
                    <a
                      href={item.href}
                      className="text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors"
                    >
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* SOCIALS */}
            <div className="flex gap-4 pt-4">
              {socialLinks.map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* CỘT PHẢI: FORM ĐEN */}
          <div className="bg-[#0a0a0a] p-8 md:p-14 rounded-[4rem] shadow-2xl relative overflow-hidden">
            <h2 className="text-white text-3xl font-[1000] uppercase italic tracking-tighter mb-10">
              Gửi tin nhắn
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-500 ml-2 tracking-widest">
                    Họ và tên
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Nguyễn Văn A"
                    className="h-16 rounded-2xl border-none bg-white/5 text-white focus:bg-white/10"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-500 ml-2 tracking-widest">
                    Email
                  </label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="name@gmail.com"
                    className="h-16 rounded-2xl border-none bg-white/5 text-white focus:bg-white/10"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-500 ml-2 tracking-widest">
                  Số điện thoại
                </label>
                <Input
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="0356 xxx xxx"
                  className="h-16 rounded-2xl border-none bg-white/5 text-white focus:bg-white/10"
                />
              </div>

              {/* DROPDOWN CHỦ ĐỀ DỰ ÁN */}
              <div className="space-y-3 relative">
                <label className="text-[10px] font-black uppercase text-slate-500 ml-2 tracking-widest">
                  Chủ đề dự án
                </label>
                <div className="relative">
                  <select
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full h-16 rounded-2xl border-none bg-white/5 text-white px-6 appearance-none focus:bg-white/10 transition-all outline-none font-bold"
                  >
                    {/* QUAN TRỌNG: Các value này phải khớp 100% chữ trong Google Form của ông */}
                    <option value="Thiết kế Website" className="bg-slate-900">
                      Web App
                    </option>
                    <option
                      value="Phát triển App Mobile"
                      className="bg-slate-900"
                    >
                      Mobile App
                    </option>
                    <option value="Tư vấn hệ thống" className="bg-slate-900">
                      FullStack Web
                    </option>
                    <option value="Khác" className="bg-slate-900">
                      Khác
                    </option>
                  </select>
                  <ChevronDown
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-500 ml-2 tracking-widest">
                  Nội dung chi tiết
                </label>
                <Textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Chia sẻ ý tưởng..."
                  className="min-h-[120px] rounded-[2.5rem] border-none bg-white/5 text-white focus:bg-white/10 p-8"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-20 bg-white hover:bg-indigo-600 hover:text-white text-slate-900 rounded-[2rem] font-[1000] text-sm tracking-[0.2em] transition-all flex items-center justify-center gap-3"
              >
                GỬI TIN NHẮN <Send size={18} />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
