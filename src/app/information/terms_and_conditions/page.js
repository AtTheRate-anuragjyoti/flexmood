import TopBar from "@/components/ui/top_bar";
import BottomBar from "@/components/ui/bottom_bar";

const TermsAndConditions = () => {
  return (
    <>
      <TopBar />
      <main className="bg-gray-100 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gray-900 py-20 text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">Terms and Conditions</h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto px-4">
            Please read these Terms and Conditions carefully before using our website.
          </p>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Terms and Conditions for Flexmood</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                For the purpose of these Terms and Conditions, the term "we", "us", "our" used anywhere on this page shall mean **Flexmood**. "You", “your”, "user", and “visitor” shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.
              </p>

              <div className="space-y-8">
                {/* Use of Website */}
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Use of Website</h3>
                  <p className="text-gray-600">
                    Your use of the website and/or purchase from us are governed by the following Terms and Conditions:
                  </p>
                  <div className="pl-6">
                    <ul className="list-disc">
                      <li>The content of the pages of this website is subject to change without notice.</li>
                      <li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</li>
                      <li>Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through our website and/or product pages meet your specific requirements.</li>
                    </ul>
                  </div>
                </div>

                {/* Copyright and Trademarks */}
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Copyright and Trademarks</h3>
                  <p className="text-gray-600">
                    Our website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
                  </p>
                  <p className="text-gray-600">
                    All trademarks reproduced on our website which are not the property of, or licensed to, the operator are acknowledged on the website.
                  </p>
                </div>

                {/* Unauthorized Use */}
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Unauthorized Use</h3>
                  <p className="text-gray-600">
                    Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.
                  </p>
                </div>

                {/* Links to Other Websites */}
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Links to Other Websites</h3>
                  <p className="text-gray-600">
                    From time to time, our website may also include links to other websites. These links are provided for your convenience to provide further information. We are not responsible for the content or privacy practices of any third-party sites.
                  </p>
                </div>

                {/* Linking to Our Website */}
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Linking to Our Website</h3>
                  <p className="text-gray-600">
                    You may not create a link to our website from another website or document without **Flexmood’s** prior written consent.
                  </p>
                </div>

                {/* Governing Law */}
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Governing Law</h3>
                  <p className="text-gray-600">
                    Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India.
                  </p>
                </div>

                {/* Liability Disclaimer */}
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Liability Disclaimer</h3>
                  <p className="text-gray-600">
                    We shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gray-900 py-10 text-center">
          <p className="text-white text-lg mb-4">Need further clarification on our Terms and Conditions?</p>
          <a href="/information/contact_us" className="text-[#ED155D] font-semibold text-xl">Contact Us</a>
        </div>
      </main>
      <BottomBar />
    </>
  );
};

export default TermsAndConditions;
