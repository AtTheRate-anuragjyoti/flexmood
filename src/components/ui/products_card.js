'use client';

import Link from 'next/link';
import Image from 'next/image';
import userRegion from '@/utils/region';

const ProductCard = ({ coverImage, title, price, purchaseLink, serial }) => {
  const region = userRegion((state) => state.region);

  // Helper function to trim the title
  const truncateTitle = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="w-full max-w-[380px] sm:w-[320px] lg:w-[360px] overflow-hidden rounded-lg bg-white shadow-lg border border-gray-700">
      {/* Image Section */}
      <div className="relative w-full bg-gray-900 flex items-center justify-center">
        <Image
          src={coverImage}
          alt={`Cover of ${title}`}
          layout="intrinsic"
          className="object-cover"
          width={150} // Reduced width for smartphones
          height={200} // Reduced height to keep proportion
          sizes="(max-width: 640px) 150px, 180px" // Image size scales for mobile
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <Link href={`/${region === 'India' ? 'india' : 'international'}/${serial}`} passHref>
          <h2 className="text-lg font-bold text-gray-800 mb-2 hover:text-blue-950 transition-all">
            {truncateTitle(title, 26)} {/* Trimmed title */}
          </h2>
        </Link>

        {/* Price */}
        <div className="text-md font-semibold text-gray-700 mb-4">
          {region === 'India' ? '₹' : '$'}
          {price}
        </div>

        {/* Purchase Button */}
        <Link
          href={region === 'India' ? purchaseLink.ind : purchaseLink.int}
          target="_blank"
          rel="noopener noreferrer"
          passHref
        >
          <button className="w-full rounded-md bg-gray-800 py-3 text-sm lg:text-md text-white transition-colors duration-300 hover:bg-gray-700 flex items-center justify-center gap-2">
            <span>Own it</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
