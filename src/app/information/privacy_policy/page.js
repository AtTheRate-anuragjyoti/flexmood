import TopBar from "@/components/ui/top_bar";
import BottomBar from "@/components/ui/bottom_bar";

const PrivacyPolicy = () => {
  return (
    <>
      <TopBar />
      <main className="bg-gray-100 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gray-900 py-20 text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto px-4">
            Your privacy is important to us. Learn how we protect your data.
          </p>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Privacy Policy for Flexmood</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                At Flexmood, we are committed to protecting your privacy. This privacy policy outlines how we collect, use, and protect your personal information when you visit our website and/or make purchases. By using this website, you agree to the terms outlined in this privacy policy.
              </p>

              <div className="space-y-8">
                {/* Information We Collect */}
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Information We Collect</h3>
                  <p className="text-gray-600">
                    We may collect the following personal information:
                  </p>
                  <div className="pl-6">
                    <ul className="list-disc">
                      <li>Name</li>
                      <li>Contact details, including email address</li>
                      <li>Demographic information such as postcode, preferences, and interests</li>
                      <li>Other information relevant to customer surveys and offers</li>
                    </ul>
                  </div>
                </div>

                {/* How We Use the Information */}
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">How We Use the Information We Collect</h3>
                  <p className="text-gray-600">
                    We use the collected information for the following purposes:
                  </p>
                  <div className="pl-6">
                    <ul className="list-disc">
                      <li>To understand your needs and provide better service</li>
                      <li>To improve our products and services</li>
                      <li>To send promotional emails about new products, special offers, or other information we think you may find interesting</li>
                      <li>To contact you for market research purposes via email, phone, fax, or mail</li>
                      <li>To customize our website to better match your preferences and interests</li>
                    </ul>
                  </div>
                </div>

                {/* Data Security */}
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Data Security</h3>
                  <p className="text-gray-600">
                    We are committed to ensuring that your information is secure. To prevent unauthorized access or disclosure, we have implemented appropriate measures.
                  </p>
                </div>

                {/* Cookies */}
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Cookies</h3>
                  <p className="text-gray-600">
                    Our website uses cookies, which are small files placed on your device to help analyze web traffic and provide you with a more personalized experience. Cookies allow us to remember your preferences and tailor our website to better suit your needs.
                  </p>
                  <p className="text-gray-600">
                    You can accept or decline cookies. Most web browsers automatically accept cookies, but you can modify your browser settings to decline cookies if you prefer. Note that declining cookies may affect your experience on our website.
                  </p>
                </div>

                {/* Controlling Personal Information */}
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Controlling Your Personal Information</h3>
                  <p className="text-gray-600">
                    You have the right to restrict the collection or use of your personal information. You can:
                  </p>
                  <div className="pl-6">
                    <ul className="list-disc">
                      <li>Opt out of receiving direct marketing communications by checking the relevant box when filling out forms on the website.</li>
                      <li>Withdraw consent to receive marketing materials at any time by emailing us at [email address].</li>
                    </ul>
                  </div>
                  <p className="text-gray-600">
                    We will not sell, distribute, or lease your personal information to third parties unless we have your consent or are required by law to do so. We may share your information with third parties for promotional purposes, but only if you have given us explicit consent.
                  </p>
                </div>

                {/* Accessing and Updating Information */}
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Accessing and Updating Your Information</h3>
                  <p className="text-gray-600">
                    If you believe that any information we hold about you is incorrect or incomplete, please contact us as soon as possible. We will promptly correct any inaccuracies.
                  </p>
                </div>

                {/* Policy Updates */}
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Policy Updates</h3>
                  <p className="text-gray-600">
                    We may update this privacy policy from time to time. Any changes will be posted on this page, and we encourage you to review this policy periodically to stay informed about how we are protecting your information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gray-900 py-10 text-center">
          <p className="text-white text-lg mb-4">Need further clarification on our privacy practices?</p>
          <a href="/information/contact_us" className="text-[#ED155D] font-semibold text-xl">Contact Us</a>
        </div>
      </main>
      <BottomBar />
    </>
  );
};

export default PrivacyPolicy;
