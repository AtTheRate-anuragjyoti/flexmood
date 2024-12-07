import Link from "next/link";
import localFont from "next/font/local";
import TopBar from "@/components/ui/top_bar";
import BottomBar from "@/components/ui/bottom_bar";

const onest = localFont({src: './Onest.ttf'});
const funnelDisplay = localFont({ src: './funnelDisplay.ttf' });

const NotFoundPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <TopBar />
      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-xl">
          <h1 className={`text-4xl font-bold mb-4 ${funnelDisplay.className}`}>
            Wandered Off Course?
          </h1>
          <p className={`text-base text-gray-300 mb-6 leading-relaxed ${onest.className}`}>
            Not all who wander are lost. Each unexpected turn is a chance to redefine your path and potential.
          </p>
          <Link 
            href="/" 
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-6 rounded-md transition duration-300 ease-in-out inline-block text-sm tracking-wider"
          >
            Find Your Way
          </Link>
        </div>
      </main>
      <BottomBar />
    </div>
  );
};

export default NotFoundPage;