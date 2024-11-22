'use client';

import { useState, useEffect } from "react";
import userRegion from "@/utils/region";
import Link from "next/link";
import Image from "next/image";
import TopBar from "@/components/ui/top_bar";
import BottomBar from "@/components/ui/bottom_bar";

const ProductPage = ({ params }) => {
  const [product, setProduct] = useState(null); // Default to null to avoid undefined issues
  const region = userRegion((state) => state.region);

  useEffect(() => {
    const getProductData = async () => {
      try {
        const res = await fetch('/api/v1/get-product-data/', {
          method: 'POST',
          body: JSON.stringify({ serial: params.serial }),
        });
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.log("An error occurred", error);
      }
    };

    getProductData();
  }, [params.serial]);

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
                    {region === "India" 
                      ? `₹${product?.price?.INR?.toFixed(2) || "N/A"}` 
                      : `$${product?.price?.USD?.toFixed(2) || "N/A"}`}
                  </p>
                </div>
                <div className="flex flex-col space-y-3 sm:space-y-4">
                  <Link 
                    href={region === "India" ? product.purchase_link.ind : product.purchase_link.int} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <button className="w-full text-sm sm:text-base rounded-md bg-gray-800 py-3 text-white transition-colors duration-300 hover:bg-gray-700 flex flex-row items-center justify-center">
                      <span>Own it</span>
                    </button>
                  </Link>
                  <button 
                    onClick={handleShare} 
                    className="w-full text-sm sm:text-base rounded-md border border-gray-700 py-3 text-white transition-colors duration-300 hover:bg-gray-800 flex flex-row items-center justify-center"
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">Loading product...</div>
          )}
        </div>
      </main>
      <BottomBar />
    </div>
  );
};

export default ProductPage;
