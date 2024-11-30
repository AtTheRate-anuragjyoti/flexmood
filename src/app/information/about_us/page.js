import TopBar from "@/components/ui/top_bar";
import BottomBar from "@/components/ui/bottom_bar";

const AboutUs = () => {
  return (
    <>
      <TopBar />
      <main className="bg-gray-100 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gray-900 py-20 text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto px-4">
            Empowering individuals to boost productivity and achieve their goals
          </p>
        </div>

        {/* Content Sections */}
        <div className="container mx-auto px-4 py-16 space-y-20">
          {/* About Flexmood */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed">
              Flexmood is a digital platform dedicated to empowering individuals with the tools and resources they need to boost their productivity. We offer practical eBooks and expert content on topics ranging from backend engineering to personal finance, all designed to help you achieve your goals. At Flexmood, we focus on providing clear, actionable insights that make complex topics simple and accessible, helping you work smarter and live better.
            </p>
          </section>

          {/* Mission and Vision */}
          <section className="bg-white shadow-lg rounded-lg p-8 border-l-4 border-[#ED155D]">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Mission & Vision</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#ED155D]">Mission</h3>
                <p className="text-gray-600">
                  To provide accessible, high-quality resources that empower individuals to enhance their skills, boost productivity, and achieve personal and professional growth.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#ED155D]">Vision</h3>
                <p className="text-gray-600">
                  To become the go-to platform for individuals seeking to unlock their full potential and lead more fulfilling, productive lives.
                </p>
              </div>
            </div>
          </section>

          {/* Core Values */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Core Values</h2>
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Empowerment', 'Accessibility', 'Quality', 'Innovation', 'Integrity', 'Community'].map((value) => (
                <li key={value} className="bg-white p-4 rounded-lg shadow-md border-t-2 border-[#ED155D]">
                  <h3 className="text-xl font-semibold mb-2 text-gray-700">{value}</h3>
                  <p className="text-gray-600">
                    We believe in {value.toLowerCase()} as a fundamental principle guiding our work and interactions.
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* What Sets Us Apart */}
          <section className="bg-gray-900 text-white p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">What Sets Us Apart</h2>
            <div className="space-y-4">
              <p>
                At Flexmood, we distinguish ourselves through our commitment to:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Curated, expert-driven content</li>
                <li>Practical, actionable insights</li>
                <li>A wide range of topics under one platform</li>
                <li>User-friendly interface and accessibility</li>
                <li>Continuous updates and improvements based on user feedback</li>
              </ul>
            </div>
          </section>

          {/* How We Help */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">How We Help</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Skill Enhancement', description: 'Our resources cover a wide range of topics to help you develop new skills or improve existing ones.' },
                { title: 'Productivity Boost', description: 'Learn techniques and strategies to maximize your efficiency and get more done in less time.' },
                { title: 'Personal Growth', description: 'Discover insights and tools for self-improvement and personal development.' },
                { title: 'Career Advancement', description: 'Access content tailored to help you progress in your professional life and achieve your career goals.' },
                { title: 'Financial Literacy', description: 'Gain knowledge and understanding of personal finance to make informed decisions about your money.' },
                { title: 'Continuous Learning', description: 'Stay updated with the latest trends and knowledge in various fields through our regularly updated content.' },
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-semibold mb-3 text-[#ED155D]">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <BottomBar />
    </>
  );
};

export default AboutUs;

