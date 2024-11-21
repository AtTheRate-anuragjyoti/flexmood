
import "./globals.css";



export const metadata = {
  title: "Flexmood",
  description: "the productivity store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
