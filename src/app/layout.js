import "./globals.css";

export const metadata = {
  title: "Flexmood | Master Productivity with Premium Ebooks & Smart Resources",
  description: "Discover Flexmood, the ultimate productivity store offering ebooks, digital content, and resources for teens and ambitious individuals.",
};

export default function RootLayout({ children }) {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Flexmood",
    "url": "https://flexmood.vercel.app/",
    "logo": "https://flexmood.vercel.app/logo.png",
    "description": "Flexmood offers premium ebooks and tools to help people master productivity.",
    "sameAs": [
      "https://www.instagram.com/flexmood.pro/",
    ]
  };

  return (
    <html lang="en" dir="ltr">
      <head>
        <meta name="google-site-verification" content="Dibu5YjA3RGtBImMW0z-No4vAdfHxHdRNS3EsHAnuLM" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
