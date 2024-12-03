'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import TopBar from "@/components/ui/top_bar";
import BottomBar from "@/components/ui/bottom_bar";
import Script from "next/script";

const PurchasePage = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await fetch("/api/v1/get-product-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ serial: params.serial }),
        });
        const data = await res.json();
        setProduct(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [params.serial]);

  const handleFreeDownload = async (fileName) => {
    try {
      const downloadRes = await fetch("/api/v1/get-download-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName }),
      });

      const downloadData = await downloadRes.json();
      if (downloadData?.url) {
        setDownloadUrl(downloadData.url);
        triggerDownload(downloadData.url, fileName);
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      setErrorMessage("Error downloading file. Please try again.");
    }
  };

  const triggerDownload = async (url, fileName) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName || "download.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading file:", error);
      setErrorMessage("Error downloading file. Please try again.");
    }
  };

  const handleBuyNow = async () => {
    try {
      setIsProcessing(true);
      setIsFailed(false);
      setErrorMessage("");

      const res = await fetch("/api/v1/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: params.region === "india" ? product?.price?.INR : product?.price?.USD,
          currency: params.region === "india" ? "INR" : "USD",
          name: product?.title,
        }),
      });
      const data = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: data.amount * 100,
        currency: data.currency,
        order_id: data.id,
        name: "Flexmood",
        description: product?.title,
        image: "/logo.png",
        handler: async function (response) {
          const downloadRes = await fetch("/api/v1/get-download-url", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fileName: product?.fileName }),
          });

          const downloadData = await downloadRes.json();
          if (downloadData?.url) {
            setDownloadUrl(downloadData.url);
          }
          setIsProcessing(false);
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#3b82f6",
        },
      };

      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();

      razorpayInstance.on("payment.failed", function (response) {
        setIsProcessing(false);
        setIsFailed(true);
        setErrorMessage("Payment failed. Please try again.");
        setTimeout(() => setIsFailed(false), 3000);
      });
    } catch (error) {
      setIsProcessing(false);
      setIsFailed(true);
      setErrorMessage("An error occurred. Please try again.");
      setTimeout(() => setIsFailed(false), 3000);
    }
  };

  const price =
    params.region === "india"
      ? `₹${product?.price?.INR?.toFixed(2) || "N/A"}`
      : `$${product?.price?.USD?.toFixed(2) || "N/A"}`;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <TopBar />
      <main className="flex-grow flex flex-col md:flex-row border-t border-gray-700">
        <div className="w-full md:w-[60%] border-r border-gray-700 p-8 flex flex-col items-center justify-center">
          {isLoading ? (
            <div className="w-48 h-72 bg-gray-700 animate-pulse rounded-lg"></div>
          ) : product ? (
            <>
              <Image
                src={product.cover_img}
                alt={`Book: ${product.title}`}
                width={240}
                height={360}
                className="rounded-lg shadow-xl mb-6"
              />
              <h1 className="text-2xl font-bold mb-2 text-center">{product.title}</h1>
              <p className="text-gray-400 text-sm mb-4">by {product.author}</p>
              <p className="text-xl font-semibold">{price}</p>
            </>
          ) : (
            <p className="text-gray-500">Product not found.</p>
          )}
        </div>

        <div className="w-full md:w-[40%] p-6 flex flex-col justify-center items-center">
          <h2 className="text-lg font-semibold mb-6 text-center">
            Complete Your Purchase
          </h2>
          {!downloadUrl ? (
            product?.price?.INR === 0 || product?.price?.USD === 0 ? (
              <button
                onClick={() => handleFreeDownload(product.fileName)}
                className="w-full max-w-sm py-3 font-medium rounded-md transition-colors duration-200 bg-green-600 hover:bg-green-700"
              >
                Download for Free
              </button>
            ) : (
              <button
                onClick={handleBuyNow}
                disabled={isLoading || !product || isProcessing}
                className={`w-full max-w-sm py-3 font-medium rounded-md transition-colors duration-200 flex items-center justify-center gap-2 ${
                  isLoading || !product || isProcessing
                    ? "bg-gray-700 cursor-not-allowed"
                    : isFailed
                    ? "bg-red-600"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  `Buy Now - ${price}`
                )}
              </button>
            )
          ) : (
            <button
              onClick={() => triggerDownload(downloadUrl, product?.fileName)}
              className="w-full max-w-sm py-3 font-medium rounded-md transition-colors duration-200 bg-green-600 hover:bg-green-700"
            >
              Download eBook
            </button>
          )}
          {isFailed && (
            <p className="text-red-500 text-sm mt-3">{errorMessage}</p>
          )}
        </div>
      </main>
      <BottomBar />

      <Script
        strategy="afterInteractive"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
    </div>
  );
};

export default PurchasePage;
