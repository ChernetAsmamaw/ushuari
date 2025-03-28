import React from "react";
import Link from "next/link";

const CallToAction = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container-custom">
        <div className="relative z-10 bg-white p-10 md:p-16 rounded-2xl shadow-xl max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="heading-lg text-gray-dark mb-6">
              Ready for <span className="gradient-text">Legal Guidance?</span>
            </h2>
            <p className="text-gray max-w-2xl mx-auto mb-10">
              Get started with Ushuari today and access professional legal
              advice through our innovative AI voice assistant. Simple,
              affordable, and available 24/7.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register" className="btn-primary">
                Create Free Account
              </Link>
              <Link href="/services" className="btn-outline">
                Learn About Our Services
              </Link>
            </div>
          </div>

          <div className="bg-gray-light p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-dark mb-3 text-center">
              How It Works
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                    1
                  </span>
                </div>
                <h4 className="font-medium text-gray-dark mb-1">Sign Up</h4>
                <p className="text-sm text-gray">
                  Create your account in just a few steps
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                    2
                  </span>
                </div>
                <h4 className="font-medium text-gray-dark mb-1">
                  Ask Questions
                </h4>
                <p className="text-sm text-gray">
                  Speak to our AI and get instant answers
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                    3
                  </span>
                </div>
                <h4 className="font-medium text-gray-dark mb-1">Get Advice</h4>
                <p className="text-sm text-gray">
                  Receive guidance and solutions to your legal issues
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
