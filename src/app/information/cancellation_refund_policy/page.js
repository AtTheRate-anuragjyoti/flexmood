import TopBar from "@/components/ui/top_bar";
import BottomBar from "@/components/ui/bottom_bar";

const CancellationRefundPolicy = () => {
  return (
    <>
      <TopBar />
      <main className="bg-gray-100 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gray-900 py-20 text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">Cancellation and Refund Policy</h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto px-4">
            Please read our cancellation and refund policy carefully before making any purchase.
          </p>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Cancellation and Refund Policy for Flexmood</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                At **Flexmood**, we take pride in providing high-quality digital content. As all of our materials are digital products (eBooks, guides, and other resources), we have a strict no-refund policy.
              </p>

              <div className="space-y-8">
                {/* No Refund Policy */}
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Non-Refundable Materials</h3>
                  <p className="text-gray-600">
                    All purchases made on our website are final and non-refundable. Once a digital product is purchased, it cannot be returned, exchanged, or refunded due to the nature of digital content.
                  </p>
                  <p className="text-gray-600">
                    We strongly encourage you to review the product details and descriptions carefully before making a purchase to ensure that it meets your needs.
                  </p>
                </div>

                {/* Issues with Downloads or Access */}
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Issues with Downloads or Access</h3>
                  <p className="text-gray-600">
                    If you experience any issues with downloading or accessing your purchased materials, please contact our support team immediately at <a href="mailto:contact.flexmood@gmail.com" className="text-[#ED155D] font-semibold">contact.flexmood@gmail.com</a>. We will do our best to resolve the issue promptly.
                  </p>
                </div>

                {/* Exceptions */}
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Exceptions</h3>
                  <p className="text-gray-600">
                    In rare cases, such as an incorrect or faulty product, we may review your request and offer a resolution at our discretion. However, refunds will not be provided for general dissatisfaction with the digital content.
                  </p>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Contact Us</h3>
                  <p className="text-gray-600">
                    For any questions or concerns regarding our cancellation or refund policy, please feel free to reach out to us at <a href="mailto:contact.flexmood@gmail.com" className="text-[#ED155D] font-semibold">contact.flexmood@gmail.com</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gray-900 py-10 text-center">
          <p className="text-white text-lg mb-4">Need assistance with a recent purchase?</p>
          <a href="/information/contact_us" className="text-[#ED155D] font-semibold text-xl">Contact Us</a>
        </div>
      </main>
      <BottomBar />
    </>
  );
};

export default CancellationRefundPolicy;
