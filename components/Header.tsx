'use client';

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ArrowRight, Github, Linkedin, Mail } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Ngăn scroll khi menu đang mở
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleNavClick = (item: { id: string; path: string }) => {
    setIsOpen(false);
    if (pathname === item.path) {
      const element = document.getElementById(item.id);
      if (element) {
        window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      router.push(item.path);
    }
  };

  const menuItems = [
    { name: "Giới thiệu", id: "about", path: "/" },
    { name: "Kỹ năng", id: "skills", path: "/" },
    { name: "Chứng chỉ", id: "certificates", path: "/certificates" },
    { name: "Dự án", id: "projects", path: "/projects" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[70] transition-all duration-500 ${
          scrolled || isOpen
            ? "py-3 bg-white/80 backdrop-blur-xl border-b border-slate-100"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
          {/* LOGO */}
          <div
            className="flex items-center gap-2.5 cursor-pointer group z-[80]"
            onClick={() => { router.push("/"); setIsOpen(false); }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden transition-transform group-hover:rotate-12 bg-slate-900 shadow-lg">
              <img src="/icon.ico" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm md:text-base font-[1000] tracking-tighter uppercase italic text-slate-900">
              NGHIA NGUYEN <span className="text-indigo-600 not-italic font-black"> - PORTFOLIO</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-50/50 p-1 rounded-2xl border border-slate-100/50">
              {menuItems.map((item) => {
                const isActive = (pathname === "/" && item.path === "/") ? activeSection === item.id : pathname === item.path;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`px-5 py-2 text-[9px] font-black uppercase tracking-[0.2em] rounded-xl transition-all duration-300 ${
                      isActive ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>

            {/* HAMBURGER BUTTON */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 text-white transition-all shadow-lg z-[80]"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY - TRƯỢT TỪ PHẢI SANG */}
      <div className={`fixed inset-0 z-[65] transition-all duration-500 ${
        isOpen ? "visible" : "invisible"
      }`}>
        {/* Backdrop mờ */}
        <div 
          className={`absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-500 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Nội dung Menu */}
        <div className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0,0.07,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="h-full flex flex-col p-8 pt-32">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-10">Menu điều hướng</p>
            
            <div className="flex flex-col gap-4">
              {menuItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className="group flex items-center justify-between py-4 border-b border-slate-50 text-left"
                >
                  <span className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {item.name}
                  </span>
                  <ArrowRight size={20} className="text-indigo-600 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </button>
              ))}
            </div>

            {/* Social Link chân Menu cho đầy đặn */}
            <div className="mt-auto space-y-8">
              <Link 
                href="/contact" 
                className="flex items-center justify-center w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-colors"
              >
                Liên hệ ngay
              </Link>
              
              <div className="flex justify-center gap-6 text-slate-400">
                <Github size={18} />
                <Linkedin size={18} />
                <Mail size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}