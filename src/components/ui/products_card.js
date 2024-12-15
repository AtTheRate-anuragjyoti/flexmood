'use client';

import Link from 'next/link';
import Image from 'next/image';
import userRegion from '@/utils/region';
import localFont from 'next/font/local';
import { ShoppingCart, Star } from 'lucide-react';
import styles from './styles.module.css';

const spaceGrotesk = localFont({ src: './spaceGrotesk.ttf' });

const ProductCard = ({ coverImage, title, price, serial }) => {
  const region = userRegion((state) => state.region);

  const truncateTitle = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const renderPrice = () => {
    if (price === 0) {
      return (
        <div className="text-md font-bold text-gray-700 mb-4 relative z-10">
          Free
        </div>
      );
    }
    return (
      <div className="text-md font-semibold text-gray-700 mb-4 relative z-10">
        {region === 'India' ? '₹' : '$'}
        {price}
      </div>
    );
  };

  return (
    <div className={`w-full bg-white shadow-lg border border-gray-700 rounded-lg overflow-hidden relative ${price === 0 ? styles.freeProductShine : ''}`}>
      <div className={`bg-gray-900 flex items-center justify-center relative ${price === 0 ? styles.greyBackground : ''}`}>
        <Image
          src={coverImage}
          alt={`Cover of ${title} by Flexmood`}
          width={150}
          height={200}
          className="relative z-10 max-md:w-[203px] max-md:h-[270px] object-contain"
        />
      </div>
      <div className="p-4 relative z-10">
        <Link href={`/${region === 'India' ? 'india' : 'international'}/${serial}`} passHref>
          <h2 className="text-lg font-bold text-gray-800 mb-2 hover:text-[#334247] transition-all relative z-10">
            {truncateTitle(title, 30)}
          </h2>
        </Link>
        {renderPrice()}
        <Link 
          href={region === 'India' ? `/purchase/india/${serial}` : `/purchase/international/${serial}`}
        >
          <button className="w-full flex items-center justify-center gap-2 rounded-md bg-gradient-to-b from-slate-800 to-slate-900 py-3 text-white transition-transform duration-300 hover:bg-gray-700 relative z-10">
            {price === 0 ? (
              <Star className="w-5 h-5" />
            ) : (
              <ShoppingCart className="w-5 h-5" />
            )}
            <span className={`${spaceGrotesk.className} text-[16px] font-medium`}>
              {price === 0 ? 'Own It' : 'Buy Now'}
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;