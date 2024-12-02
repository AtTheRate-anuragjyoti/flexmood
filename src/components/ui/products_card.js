'use client';

import Link from 'next/link';
import Image from 'next/image';
import userRegion from '@/utils/region';
import localFont from 'next/font/local';
import { ShoppingCart } from 'lucide-react'; // Importing the desired icon

const spaceGrotesk = localFont({ src: './spaceGrotesk.ttf' });

const ProductCard = ({ coverImage, title, price, purchaseLink, serial }) => {
  const region = userRegion((state) => state.region);

  const truncateTitle = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="w-full bg-white shadow-lg border border-gray-700 rounded-lg overflow-hidden">
      <div className="bg-gray-900 flex items-center justify-center">
        <Image
          src={coverImage}
          alt={`Cover of ${title} by Flexmood`}
          width={150}
          height={200}
        />
      </div>
      <div className="p-4">
        <Link href={`/${region === 'India' ? 'india' : 'international'}/${serial}`} passHref>
          <h2 className="text-lg font-bold text-gray-800 mb-2 hover:text-[#334247] transition-all">
            {truncateTitle(title, 30)}
          </h2>
        </Link>
        <div className="text-md font-semibold text-gray-700 mb-4">
          {region === 'India' ? '₹' : '$'}
          {price}
        </div>
        <Link
          href={region === 'India' ? `/purchase/india/${serial}` : `/purchase/international/${serial}`}
        >

          <button className="w-full flex items-center justify-center gap-2 rounded-md bg-gray-800 py-3 text-white transition-transform duration-300 hover:bg-gray-700">
            {/* Lucide Icon */}
            <ShoppingCart className="w-5 h-5" />
            <span className={`${spaceGrotesk.className} text-[16px] font-medium`}>
              Buy Now
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
