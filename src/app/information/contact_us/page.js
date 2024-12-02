import TopBar from "@/components/ui/top_bar";
import BottomBar from "@/components/ui/bottom_bar";
import { Mail, Clock, Info } from 'lucide-react';

const ContactUs = () => {
  return (
    <>
      <TopBar />
      <main className="bg-gray-100 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gray-900 py-20 text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto px-4">
            We're here to help and listen to your feedback
          </p>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                We're here to help! If you have any questions, concerns, or feedback, feel free to reach out to us. We typically respond within 1-2 business days.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-[#ED155D] mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">Email</h3>
                    <p className="text-gray-600">
                      <a href="mailto:contact.flexmood@gmail.com" className="hover:text-[#ED155D] transition-colors duration-300">
                        contact.flexmood@gmail.com
                      </a>
                    </p>
                  </div>
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

export default ContactUs;

