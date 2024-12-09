"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import TopBar from "@/components/ui/top_bar";
import BottomBar from "@/components/ui/bottom_bar";
import Script from "next/script";
import localFont from "next/font/local";
import { useRouter } from "next/navigation";

const onest = localFont({src: './Onest.ttf'});
const funnelDisplay = localFont({ src: './funnelDisplay.ttf' });

const PurchasePage = ({ params }) => {
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadAvailable, setDownloadAvailable] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Invalid email";
    return errors;
  };

  const isFormValid = Object.keys(validateForm()).length === 0;
  
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await fetch("/api/v1/get-product-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ serial: params.serial }),
        });
  
        if (!res.ok) {
          router.push("/404");
          return;
        }
  
        const data = await res.json();
        setProduct(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setIsLoading(false);
        setErrorMessage("Failed to load product data. Please try again.");
      }
    };
  
    fetchProductData();
  }, [params.serial, router]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const saveUserToDatabase = async () => {
    try {
      await fetch("/api/v1/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          booksPurchased: [
            {
              title: product.title,
              price: params.region === "india" ? product.price.INR : product.price.USD,
              currency: params.region === "india" ? "INR" : "USD",
            },
          ],
        }),
      });

    } catch (error) {
      console.error("Error saving user data:", error);
      setErrorMessage("Failed to save user data. Please contact support if you don't receive your eBook.");
    }
  };

  const triggerDownload = async () => {
    try {
      const downloadRes = await fetch("/api/v1/get-download-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: product?.fileName }),
      });
  
      const downloadData = await downloadRes.json();

  
      if (!downloadRes.ok || !downloadData.url) {
        throw new Error(
          downloadData.error || "Failed to retrieve download link."
        );
      }
  
      // Fetch the file content
      const response = await fetch(downloadData.url);
  

  
      if (!response.ok) {
        throw new Error("Failed to download the file.");
      }
  
      // Log content type and length

  
      const blob = await response.blob();

  
      // Create a temporary URL for downloading the file
      const blobUrl = window.URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${product.fileName}.pdf`; 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      // Clean up the blob URL
      window.URL.revokeObjectURL(blobUrl);

      // Set download availability
      await saveUserToDatabase();
      setDownloadAvailable(true);
    } catch (error) {
      console.error("Detailed Download Error:", error);
      console.error("Error Stack:", error.stack);
      setErrorMessage(
        `Download failed: ${error.message}. Please check the console for details.`
      );
    }
  };
  
  const handleBuyNow = async () => {
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsProcessing(true);
    setErrorMessage("");

    // If product is free or download is available
    if (downloadAvailable || (params.region === "india" ? product?.price?.INR : product?.price?.USD) === 0) {
      await triggerDownload();
      setIsProcessing(false);
      return;
    }

    try {
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
          if (response.razorpay_payment_id) {
            await saveUserToDatabase();
            setDownloadAvailable(true);
          } else {
            setErrorMessage("Payment was not successful. Please try again to complete the purchase.");
          }
          setIsProcessing(false);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
        },
        theme: { color: "#10B981" },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
            setErrorMessage("Payment was cancelled. Please complete the purchase to download.");
          }
        }
      };

      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();

      razorpayInstance.on("payment.failed", function (response) {
        setIsProcessing(false);
        setErrorMessage("Payment failed. Please try again to complete the purchase.");
      });
    } catch (error) {
      setIsProcessing(false);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const price =
    params.region === "india"
      ? product?.price?.INR
      : product?.price?.USD;

  const isFree = price === 0;

  const buttonText = isProcessing
    ? "Processing..."
    : downloadAvailable
    ? "Download Now"
    : isFree
    ? "Download for Free"
    : `Buy for ${params.region === "india" ? `₹${price}` : `$${price}`}`;

  const buttonStyles = isProcessing
    ? "bg-gray-400 cursor-not-allowed"
    : downloadAvailable || (isFree && isFormValid)
    ? "bg-green-500 hover:bg-green-600"
    : isFormValid
    ? "bg-blue-600 hover:bg-blue-700"
    : "bg-gray-400 cursor-not-allowed";

  // Rest of the component remains the same
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <TopBar />
        <main className="flex-grow flex justify-center items-center">
          <div className="text-center">
            <span className="text-gray-500 inline-block animate-pulse">
              Loading Product...
            </span>
          </div>
        </main>
        <BottomBar />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <TopBar />
      <main className="flex-grow flex flex-col md:flex-row border-t border-gray-700">
        <div className="w-full md:w-[60%] p-8 flex flex-col items-center justify-center">
          {product && (
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
              <p className="text-xl font-semibold">
                {isFree ? "Free" : params.region === "india" ? `₹${price}` : `$${price}`}
              </p>
            </>
          )}
        </div>
        <div className="w-full md:w-[40%] p-6 flex flex-col justify-center items-center">
          <form className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg space-y-6">
            <h2 className={`text-2xl font-semibold text-center mb-2 ${funnelDisplay.className}`}>Complete Your Purchase</h2>
            <p className="text-center text-sm text-gray-400 mb-4">
              {isFree
                ? "Please fill out the form below to download your free eBook."
                : "Please fill out the form below to complete your purchase and download the eBook."}
            </p>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full h-12 px-4 text-gray-900 rounded-md bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-150 ease-in-out ${onest.className} font-medium`}
                  placeholder="Enter your name"
                />
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full h-12 px-4 text-gray-900 rounded-md bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-150 ease-in-out ${onest.className} font-medium`}
                  placeholder="Enter your email"
                />
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
              </div>
            </div>
            <button
              onClick={handleBuyNow}
              disabled={!isFormValid && !downloadAvailable || isProcessing}
              className={`w-full h-12 rounded-md flex items-center justify-center mt-6 font-medium text-white transition duration-150 ease-in-out ${buttonStyles}`}
            >
              {isProcessing && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {buttonText}
            </button>
          </form>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-4 text-center max-w-md">{errorMessage}</p>
          )}
        </div>
      </main>
      <BottomBar />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </div>
  );
};

export default PurchasePage;