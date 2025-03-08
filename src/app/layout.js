import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Flexmood | Master Productivity with Premium Ebooks & Smart Resources",
  description:
    "Discover Flexmood, the ultimate productivity store offering ebooks, digital content, and resources for teens and ambitious individuals.",
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Flexmood",
    url: "https://flexmood.store/",
    logo: "https://flexmood.store/logo.png",
    description:
      "Flexmood offers premium ebooks and tools to help people master productivity.",
    sameAs: ["https://www.instagram.com/flexmood.pro/"],
  };

  return (
    <html lang="en" dir="ltr">
      <head>
        <meta
          name="google-site-verification"
          content="Dibu5YjA3RGtBImMW0z-No4vAdfHxHdRNS3EsHAnuLM"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9072691055279641"
          crossorigin="anonymous"
        ></Script>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-8FBVT2MFT3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-8FBVT2MFT3');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
