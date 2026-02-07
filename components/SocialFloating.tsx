'use client';

import { Facebook, Mail, Linkedin, MessageCircle } from 'lucide-react';

const socials = [
  {
    name: 'Facebook',
    icon: <Facebook size={20} />,
    link: 'https://www.facebook.com/profile.php?id=61576706315692',
    color: 'hover:bg-[#1877F2]',
    glow: 'group-hover:shadow-[#1877F2]/50',
  },
  {
    name: 'Zalo',
    icon: <MessageCircle size={20} />, // Zalo không có icon chính thức trong Lucide, dùng MessageCircle thay thế
    link: 'https://zalo.me/0356589821',
    color: 'hover:bg-[#0068FF]',
    glow: 'group-hover:shadow-[#0068FF]/50',
  },
  {
    name: 'Linkedin',
    icon: <Linkedin size={20} />,
    link: 'https://www.linkedin.com/in/tr%E1%BB%8Dng-ngh%C4%A9a-nguy%E1%BB%85n-2b0375398/',
    color: 'hover:bg-[#0A66C2]',
    glow: 'group-hover:shadow-[#0A66C2]/50',
  },
  {
    name: 'Email',
    icon: <Mail size={20} />,
    link: 'mailto:ntn8530@gmail.com',
    color: 'hover:bg-[#EA4335]',
    glow: 'group-hover:shadow-[#EA4335]/50',
  },
];

export default function SocialFloating() {
  return (
    <div className="fixed bottom-10 right-10 z-[100] flex flex-col gap-4">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
        >
          {/* Label hiện ra khi hover */}
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            {social.name}
          </span>

          {/* Icon Circle */}
          <div className={`
            w-14 h-14 bg-white border border-slate-100 rounded-2xl 
            flex items-center justify-center text-slate-600 
            transition-all duration-500 
            group-hover:-translate-y-2 group-hover:text-white
            ${social.color} 
            shadow-[0_0_20px_rgba(0,0,0,0.05)]
            group-hover:shadow-[0_15px_30px_-5px] ${social.glow}
          `}>
            {social.icon}
          </div>

          {/* Aura tỏa sáng liên tục (Pulse effect) */}
          <div className={`
            absolute inset-0 rounded-2xl -z-10 animate-ping opacity-20 
            group-hover:block hidden
            ${social.color.replace('hover:bg-', 'bg-')}
          `}></div>
        </a>
      ))}
    </div>
  );
}