import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          About Aidd-Tools
        </h1>
        <p className="text-lg text-gray-600">
          We are a dynamic E-Commerce platform offering a wide range of high-quality tools to meet all your construction and maintenance needs.
        </p>
      </div>

      <section className="bg-white shadow-md rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-600">
          Aidd-Tools aims to provide easy access to essential tools, from cement to plumbing supplies, backed by excellent service and customer satisfaction.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Quality</h3>
          <p className="text-lg text-gray-600">
            We focus on providing high-quality products that last, ensuring our customers get the best value.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Customer Centric</h3>
          <p className="text-lg text-gray-600">
            We prioritize our customers, delivering exceptional service and a seamless shopping experience.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Innovation</h3>
          <p className="text-lg text-gray-600">
            We embrace technology and innovation to continuously improve our platform and services.
          </p>
        </div>
      </section>

      {/* Meet The Team */}


      {/* Contact Section */}
      <section className="text-center bg-gray-200 py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get In Touch</h2>
        <p className="text-lg text-gray-600 mb-6">
          Have any questions or need support? Reach out to us today!
        </p>
        <Link to="/contact" className="bg-red-600 text-white py-2 px-6 rounded-[10px] text-lg">Contact Us</Link>
      </section>
    </div>
  );
};

export default AboutUs;
