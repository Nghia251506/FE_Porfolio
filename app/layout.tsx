import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReduxProvider } from "./Provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialFloating from "@/components/SocialFloating";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

// 1. Hàm generateMetadata để lấy dữ liệu SEO động từ API của ông
export async function generateMetadata(): Promise<Metadata> {
  try {
    // Gọi đến API SEO mà ông đã cấu hình (Pathname cho trang chủ là "/")
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/seo?url=/`,
      {
        cache: "no-store", // Ép Next.js luôn lấy data mới nhất khi ông sửa ở Dashboard
      },
    );

    const seoData = await response.json();

    // 2. Trả về metadata khớp với các trường trong Dashboard của ông
    return {
      title: seoData?.title || "Nguyễn Trọng Nghĩa | Portfolio",
      description:
        seoData?.description || "Lập trình viên Fullstack chuyên nghiệp",
      keywords: seoData?.keywords || "nghĩa fullstack, web developer, portfolio, reactjs, nextjs",
      alternates: {
        canonical: seoData?.canonicalUrl || "https://yourdomain.com",
      },
      openGraph: {
        title: seoData?.siteTitle,
        description: seoData?.metaDescription,
        url: seoData?.canonicalUrl,
        images: [
          {
            url: seoData?.ogImage || "https://bolt.new/static/og_default.png",
          },
        ],
      },
      // Nếu Dashboard của ông có thêm trường nào thì tống hết vào đây
    };
  } catch (error) {
    // Nếu API lỗi thì trả về cái title chống cháy
    return {
      title: "Nguyễn Trọng Nghĩa | Fullstack Developer",
    };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        {/* 2. Gắn script Google Analytics vào đây */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CG26SFBGYE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-CG26SFBGYE');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ReduxProvider>
          <Header />
          {children}
          <SocialFloating />
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
