'use client';

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import TopBar from "@/components/ui/top_bar";
import BottomBar from "@/components/ui/bottom_bar";
import localFont from 'next/font/local';
import { ShoppingBag, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import {Outfit} from 'next/font/google';

const spaceGrotesk = localFont({ src: './spaceGrotesk.ttf' });
const outfit = Outfit({ subsets: ['latin'] });

const ProductPage = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);
  const region = params.region;

  useEffect(() => {
    const getProductData = async () => {
      try {
        const res = await fetch('/api/v1/get-product-data/', {
          method: 'POST',
          body: JSON.stringify({ serial: params.serial }),
        });
        
        if (!res.ok) {
          setError(true);
          return;
        }
        
        const data = await res.json();
        
        if (!data || Object.keys(data).length === 0) {
          setError(true);
          return;
        }
        
        setProduct(data);
      } catch (error) {
        console.log("An error occurred", error);
        setError(true);
      }
    };

    getProductData();
  }, [params.serial]);

  useEffect(() => {
    if (error) {
      notFound();
    }
  }, [error]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.title || "Product",
        text: `Check out this product: ${product?.title} by ${product?.author}`,
        url: window.location.href,
      });
    } else {
      alert("Sharing is not supported on this device");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <TopBar />

      <main className="flex-grow p-4 sm:p-6 md:p-8 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          {product ? (
            <div className="flex flex-col space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Image Section */}
                <div className="w-full h-auto flex items-center justify-center bg-gray-800 rounded-lg overflow-hidden">
                  <Image
                    src={product.cover_img}
                    alt={`Book by Flexmood: ${product.title}`}
                    width={250}
                    height={350}
                    className="transition-transform duration-300 hover:scale-105 rounded-sm my-3"
                  />
                </div>

                {/* Product Details Section */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">{product.title}</h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-4">by {product.author}</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-semibold mb-6">
                      {region === "india" 
                        ? `₹${product?.price?.INR?.toFixed(2) || "N/A"}` 
                        : `$${product?.price?.USD?.toFixed(2) || "N/A"}`}
                    </p>
                    
                    {/* Mobile: Description and Contents sections */}
                    <div className="md:hidden">
                      <div className="mb-6">
                        <h3 className={`text-lg font-semibold mb-2 ${outfit.className} text-[#b78727]`}>DESCRIPTION</h3>
                        <div className="text-gray-200">
                          <ReactMarkdown>{product.description}</ReactMarkdown>
                        </div>
                      </div>
                      <div className="mb-6">
                        <h3 className={`text-lg font-semibold mb-2 ${outfit.className} text-[#b78727]`}>CONTENTS</h3>
                        <div className="text-gray-400 prose">
                          <ReactMarkdown>{product.contents}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-3 sm:space-y-4">
                    <Link
                      href={region === 'india' ? `/purchase/india/${params.serial}` : `/purchase/international/${params.serial}`}
                    >
                      <button className="w-full text-sm sm:text-base rounded-md bg-gray-800 py-3 text-white transition-colors duration-300 hover:bg-gray-700 flex flex-row items-center justify-center gap-2">
                        <ShoppingBag size={20} />
                        <span className={`${spaceGrotesk.className}`}>Own it</span>
                      </button>
                    </Link>
                    <button 
                      onClick={handleShare} 
                      className="w-full text-sm sm:text-base rounded-md border border-gray-700 py-3 text-white transition-colors duration-300 hover:bg-gray-800 flex flex-row items-center justify-center gap-2"
                    >
                      <Share2 size={20} />
                      <span className={`${spaceGrotesk.className}`}>Share</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Desktop: Description and Contents sections */}
              <div className="hidden md:block">
                <div className="grid grid-cols-1 gap-8">
                  <div>
                    <h3 className={`text-xl font-semibold mb-5 ${outfit.className} text-[#b78727]`}>DESCRIPTION</h3>
                    <div className="text-gray-200">
                      <ReactMarkdown>{product.description}</ReactMarkdown>
                    </div>
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold mb-3 ${outfit.className} text-[#b78727]`}>CONTENTS</h3>
                    <div className="text-gray-400 prose">
                      <ReactMarkdown>{product.contents}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[400px]">
              <span className="text-gray-500 inline-block animate-pulse">
                Loading product...
              </span>
            </div>
          )}
        </div>
      </main>
      <BottomBar />
    </div>
  );
};

export default ProductPage;