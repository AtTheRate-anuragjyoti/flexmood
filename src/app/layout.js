import "./globals.css";

export const metadata = {
  title: "Flexmood - Your Productivity Hub",
  description: "Discover Flexmood, the ultimate productivity store offering ebooks, digital content, and resources for teens and ambitious individuals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
