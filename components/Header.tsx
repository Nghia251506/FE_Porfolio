"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(""); // Theo dõi section đang hiển thị
  const router = useRouter();
  const pathname = usePathname();

  // 1. Xử lý đổi màu nền Header khi cuộn
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Logic theo dõi Section trên trang Home bằng Intersection Observer
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(""); // Nếu không phải trang chủ thì reset
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Kích hoạt khi section nằm giữa màn hình
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Chỉ quan sát các section trên trang chủ
    const sections = ["about", "skills"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  const handleNavClick = (item: { id: string; path: string }) => {
    if (pathname === item.path) {
      const element = document.getElementById(item.id);
      if (element) {
        window.scrollTo({ top: element.offsetTop - 100, behavior: "smooth" });
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
    <nav
      className={`fixed top-0 w-full z-[60] transition-all duration-500 ${
        scrolled
          ? "py-4 bg-white/70 backdrop-blur-xl border-b shadow-sm"
          : "py-8 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        {/* LOGO */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black italic shadow-lg">
            N
          </div>
          <span className="text-2xl font-[1000] tracking-tighter uppercase italic text-slate-900">
            NGHĨA<span className="text-indigo-600 not-italic"> FULLSTACK</span>
          </span>
        </div>

        {/* NAVIGATION */}
        <div className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/50">
          {menuItems.map((item) => {
            // LOGIC ACTIVE MỚI:
            let isActive = false;
            
            if (pathname === "/" && item.path === "/") {
              // Nếu đang ở trang chủ, nút nào có ID trùng với section đang xem mới sáng
              isActive = activeSection === item.id;
            } else {
              // Nếu ở trang khác (/projects, /certificates), so khớp pathname
              isActive = pathname === item.path;
            }

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-white text-indigo-600 shadow-sm shadow-indigo-100/50 scale-105"
                    : "text-slate-400 hover:text-slate-900"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        {/* CONTACT BUTTON */}
        <Link
          href="/contact"
          className={`rounded-2xl px-8 h-12 font-bold transition-all flex items-center justify-center border-2 ${
            pathname === "/contact"
              ? "bg-indigo-600 border-indigo-600 text-white shadow-lg"
              : "bg-slate-900 border-slate-900 text-white hover:scale-105"
          }`}
        >
          <span>LIÊN HỆ NGAY</span>
        </Link>
      </div>
    </nav>
  );
}