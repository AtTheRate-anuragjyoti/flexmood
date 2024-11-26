'use client';

import Link from 'next/link';
import localFont from 'next/font/local';

const funnelDisplay = localFont({ src: './funnelDisplay.ttf' })

const TopBar = () => {
    return(
        <header className="bg-gray-900 w-full p-3 border-b border-gray-700 flex items-center min-h-[60px]">
        <Link href='/'><h1 className={`${funnelDisplay.className} text-[1.6rem] sm:text-xl md:text-2xl font-bold text-[#ED155D] ml-4 sm:ml-6`}>FlexMood</h1></Link>
        </header>
    )
};

export default TopBar;