import React from "react";
import { motion } from "framer-motion";
import {
  Shirt,
  Crown,
  Heart,
  Sparkles,
  Scissors,
  Leaf,
  Globe,
  Target,
  TreePine,
  Factory,
  Heart as HeartIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  const handleClick = (productId) => {
    navigate(`/product`);
  };

  const handleClick2 = (productId) => {
    navigate(`/contact`);
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="min-h-screen font-lora">
      <div className="relative min-h-screen bg-gradient-to-t from-sky-600 via-sky-300 to-gray-100 text-gray-800 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h1
              variants={itemVariants}
              className="text-8xl font-extrabold mb-8 mt-16 tracking-wide text-black  bg-clip-text bg-gradient-to-r from-sky-900 to-blue-600 drop-shadow-lg"
            >
              STYLE CRAFT
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-2xl max-w-3xl mx-auto leading-relaxed text-gray-700 font-medium tracking-wide backdrop-blur-sm bg-white/10 p-6 rounded-xl"
            >
              Discover your individuality with our bespoke clothing, crafted
              with precision and designed for your unique taste. Elevate your
              wardrobe with timeless elegance and unparalleled quality.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-12 flex flex-wrap justify-center gap-6"
            >
              <motion.button
                onClick={handleClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-sky-900/90 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-sky-800 transition-all duration-300 border border-white/20"
              >
                Explore Collections
              </motion.button>
              <motion.button
                onClick={handleClick2}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="backdrop-blur-md border-2 border-sky-900/50 px-8 py-4 rounded-full font-semibold text-sky-900 shadow-lg hover:shadow-xl hover:bg-sky-900/10 transition-all duration-300"
              >
                Contact Us
              </motion.button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                "Bespoke Tailoring",
                "Seasonal Collections",
                "Personal Styling",
              ].map((title, index) => (
                <motion.div
                  key={title}
                  whileHover={{ y: -10 }}
                  className="group bg-white/80 backdrop-blur-md shadow-lg rounded-xl p-8 transition-all duration-300 hover:shadow-2xl border border-white/50"
                >
                  <div className="mb-4 flex justify-center">
                    <Scissors className="w-8 h-8 text-sky-900 group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-sky-900 mb-4">
                    {title}
                  </h3>
                  <p className="text-gray-700">
                    Experience the art of custom clothing with designs tailored
                    exclusively for you.
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "Happy Customers" },
              { number: "100+", label: "Retail Locations" },
              { number: "30+", label: "Countries Served" },
              { number: "1M+", label: "Products Sold" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="text-center"
              >
                <h3 className="text-4xl font-bold text-indigo-600 mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-gray-900">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed text-justify">
                To revolutionize the fashion industry by creating sustainable,
                innovative designs that empower individuals to express their
                unique identity while minimizing environmental impact. We
                believe in making premium fashion accessible to everyone while
                maintaining the highest standards of ethical production.
              </p>
            </motion.div>
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-gray-900">Our Vision</h2>
              <p className="text-lg text-gray-600 leading-relaxed text-justify">
                To become the global leader in sustainable fashion, setting new
                standards for industry practices while fostering a community
                that celebrates individuality and conscious consumption. We
                envision a future where style and sustainability coexist
                seamlessly.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="py-24 ">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-indigo-600">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide every decision we make and every product we
              create.
            </p>
          </motion.div>
          <div className="grid gap-8 lg:grid-cols-4">
            {[
              {
                icon: (
                  <Crown className="text-indigo-600 w-12 h-12 mx-auto mb-4" />
                ),
                title: "Premium Quality",
                desc: "Uncompromising commitment to excellence in materials, craftsmanship, and finish.",
              },
              {
                icon: (
                  <Leaf className="text-indigo-600 w-12 h-12 mx-auto mb-4" />
                ),
                title: "Sustainability",
                desc: "Leading the way in eco-friendly fashion with responsible sourcing and production.",
              },
              {
                icon: (
                  <Sparkles className="text-indigo-600 w-12 h-12 mx-auto mb-4" />
                ),
                title: "Innovation",
                desc: "Pushing boundaries with cutting-edge designs and revolutionary manufacturing.",
              },
              {
                icon: (
                  <Heart className="text-indigo-600 w-12 h-12 mx-auto mb-4" />
                ),
                title: "Community",
                desc: "Building lasting relationships with our customers, partners, and the planet.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {value.icon}
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-slate-50 to-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-extrabold text-indigo-800 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              From humble beginnings to industry leadership, our story is one of
              passion, resilience, and innovation.
            </p>
          </motion.div>

          <div className="space-y-12">
            {[
              {
                year: "2015",
                title: "The Beginning",
                desc: "Founded with a vision to revolutionize sustainable fashion.",
                icon: "🌱",
              },
              {
                year: "2018",
                title: "Global Expansion",
                desc: "Expanded to 15 countries with 50+ retail locations.",
                icon: "🌍",
              },
              {
                year: "2021",
                title: "Sustainability Award",
                desc: "Recognized as an industry leader in sustainable practices.",
                icon: "🏆",
              },
              {
                year: "2024",
                title: "Innovation Hub",
                desc: "Launched our first innovation center for sustainable fashion.",
                icon: "💡",
              },
              {
                year: "2025",
                title: "Digital Transformation",
                desc: "Introduced AI-driven solutions for personalized experiences.",
                icon: "🤖",
              },
            ].map((milestone, index) => (
              <motion.div
                key={index}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? "flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-32 text-4xl font-bold text-indigo-600 flex-shrink-0">
                  {milestone.icon}
                </div>
                <div className="flex-1 bg-white p-8 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-indigo-800">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-600">
                      {milestone.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">{milestone.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-16 text-center"
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-indigo-700">
              And the Journey Continues...
            </h3>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto ">
              Join us as we push boundaries, embrace innovation, and strive to
              make the world a better place through sustainable practices and
              cutting-edge solutions.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-sky-500 via-sky-300 to-gray-100 text-gray-600 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold mb-6 text-black">
              ✨ Our Global Impact ✨
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-16 text-gray-700">
              Making a difference in the fashion industry and beyond through
              sustainable practices and community engagement.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TreePine className="w-12 h-12 mb-6 text-green-700" />
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Environmental Impact
              </h3>
              <ul className="space-y-4 text-left">
                <li className="flex items-start gap-3">
                  <span className="text-green-700">•</span>
                  <span className="text-gray-600">
                    50% reduction in carbon footprint since 2020
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-700">•</span>
                  <span className="text-gray-600">
                    1M+ trees planted through our restoration program
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-700">•</span>
                  <span className="text-gray-600">
                    100% recyclable packaging implementation
                  </span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Factory className="w-12 h-12 mb-6 text-blue-600" />
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Sustainable Production
              </h3>
              <ul className="space-y-4 text-left">
                <li className="flex items-start gap-3">
                  <span className="text-blue-700">•</span>
                  <span className="text-gray-600">
                    80% renewable energy in manufacturing
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-700">•</span>
                  <span className="text-gray-600">
                    Zero-waste design implementation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-700">•</span>
                  <span className="text-gray-600">
                    Ethical labor practices certification
                  </span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <HeartIcon className="w-12 h-12 mb-6 text-pink-600" />
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Community Initiatives
              </h3>
              <ul className="space-y-4 text-left">
                <li className="flex items-start gap-3">
                  <span className="text-pink-700">•</span>
                  <span className="text-gray-600">
                    $2M+ donated to fashion education
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-700">•</span>
                  <span className="text-gray-600">
                    25 community workshops established
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-700">•</span>
                  <span className="text-gray-600">
                    5000+ artisans supported globally
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            className="mt-20 bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold mb-6 text-center text-black">
              🎗️ Vision for 2026 🎗️
            </h3>
            <div className="grid lg:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <h4 className="text-2xl font-bold mb-2 text-gray-600">100%</h4>
                <p className="text-lg text-gray-700">Sustainable Materials</p>
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-bold mb-2 text-gray-600">200+</h4>
                <p className="text-lg text-gray-700">Global Locations</p>
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-bold mb-2 text-gray-600">Zero</h4>
                <p className="text-lg text-gray-700">Carbon Footprint</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mt-16 text-center"
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold mb-4 text-black">
              Join Us in Shaping the Future of Fashion
            </h3>
            <p className="text-xl text-gray-600">
              Experience the perfect blend of style, sustainability, and
              innovation.
            </p>
            <motion.button
              onClick={handleClick}
              whileHover={{ scale: 1.05 }}
              className="mt-8 bg-indigo-600 text-sky-100 font-bold py-4 px-12 rounded-full hover:scale-110"
            >
              Explore Our Collections
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
