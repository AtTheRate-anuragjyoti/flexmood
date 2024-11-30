import TopBar from "@/components/ui/top_bar";
import BottomBar from "@/components/ui/bottom_bar";
import { ShieldCheck, DollarSign, Tag } from 'lucide-react';

const PricingPolicy = () => {
  return (
    <>
      <TopBar />
      <main className="bg-gray-100 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gray-900 py-20 text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">Pricing Policy</h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto px-4">
            Transparent and fair pricing for all our products
          </p>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Pricing Commitment</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Flexmood provides transparent pricing for all our eBooks and resources. Each product is priced individually and displayed clearly on its respective page.
                Prices are subject to change, and any promotions or discounts will be reflected at checkout. We do not charge hidden fees, and all transactions are processed securely.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <DollarSign className="w-8 h-8 text-[#ED155D] mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">Individual Pricing</h3>
                    <p className="text-gray-600">
                      Each of our products is priced individually based on its content and value. You'll always see the exact price before making a purchase.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Tag className="w-8 h-8 text-[#ED155D] mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">Promotions and Discounts</h3>
                    <p className="text-gray-600">
                      We regularly offer promotions and discounts. These will be clearly displayed and automatically applied at checkout.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <ShieldCheck className="w-8 h-8 text-[#ED155D] mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">Secure Transactions</h3>
                    <p className="text-gray-600">
                      All transactions are processed securely. We use industry-standard encryption to protect your personal and financial information.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Are there any hidden fees?</h4>
                  <p className="text-gray-600">No, we do not charge any hidden fees. The price you see is the price you pay.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Can prices change?</h4>
                  <p className="text-gray-600">Yes, prices are subject to change. However, any changes will be clearly communicated and will not affect purchases already made.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Do you offer refunds?</h4>
                  <p className="text-gray-600">Please refer to our Cancellation/Refund Policy for detailed information about our refund process.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomBar />
    </>
  );
};

export default PricingPolicy;

