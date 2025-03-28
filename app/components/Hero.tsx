import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mic, Shield, Scale, BookOpen } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001A4D] to-[#002366] text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37] rounded-full mix-blend-overlay filter blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 py-24 flex flex-col items-center text-center space-y-12">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6 max-w-4xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              AI-Powered Legal Assistance
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFF8DC] text-transparent bg-clip-text">
                {" "}
                At Your Voice Command
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Ushuari connects you with professional legal guidance through
              intuitive voice interactions
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/sign-up">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#D4AF37] hover:bg-[#C09A27] text-[#002366] font-bold rounded-lg flex items-center space-x-2 transition-all"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white/10 rounded-lg font-semibold transition-all"
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>

          {/* Voice Assistant Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="relative max-w-sm w-full h-32 md:h-36 bg-gradient-to-r from-[#001A4D]/80 to-[#002366]/80 backdrop-blur-sm p-4 rounded-2xl border border-white/20 flex items-center justify-center"
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#D4AF37] rounded-full p-3 shadow-lg">
              <Mic className="h-6 w-6 text-[#002366]" />
            </div>
            <p className="text-center text-gray-300">
              "Ushuari, I need advice on my employment contract termination."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFF8DC] text-transparent bg-clip-text">
                How Ushuari Works
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Cutting-edge AI technology meets legal expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-b from-[#001A4D] to-[#002366] p-8 rounded-xl border border-white/10 shadow-xl hover:shadow-2xl hover:border-[#D4AF37]/30 transition-all group"
            >
              <div className="p-4 bg-[#D4AF37]/10 rounded-lg inline-block mb-6 group-hover:bg-[#D4AF37]/20 transition-all">
                <Mic className="h-8 w-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Voice Interaction</h3>
              <p className="text-gray-300">
                Simply speak your legal questions and concerns. Our AI system
                processes natural language for a seamless experience.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-b from-[#001A4D] to-[#002366] p-8 rounded-xl border border-white/10 shadow-xl hover:shadow-2xl hover:border-[#D4AF37]/30 transition-all group"
            >
              <div className="p-4 bg-[#D4AF37]/10 rounded-lg inline-block mb-6 group-hover:bg-[#D4AF37]/20 transition-all">
                <Shield className="h-8 w-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Expert Assistance</h3>
              <p className="text-gray-300">
                Get connected with qualified legal organizations for
                professional advice tailored to your specific situation.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-b from-[#001A4D] to-[#002366] p-8 rounded-xl border border-white/10 shadow-xl hover:shadow-2xl hover:border-[#D4AF37]/30 transition-all group"
            >
              <div className="p-4 bg-[#D4AF37]/10 rounded-lg inline-block mb-6 group-hover:bg-[#D4AF37]/20 transition-all">
                <Scale className="h-8 w-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Case Prioritization</h3>
              <p className="text-gray-300">
                Our system assesses the urgency and complexity of your legal
                matters to ensure appropriate handling.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Legal Support Experience?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Join Ushuari today and experience the future of legal assistance
            </p>
            <Link href="/sign-up">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#D4AF37] hover:bg-[#C09A27] text-[#002366] font-bold rounded-lg flex items-center space-x-2 mx-auto"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
