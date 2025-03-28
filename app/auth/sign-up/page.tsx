import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001A4D] to-[#002366] flex items-center justify-center p-4">
      <div className="absolute top-6 left-6">
        <Link href="/">
          <span className="text-2xl font-bold text-white">
            Ushuari<span className="text-[#D4AF37]">.</span>
          </span>
        </Link>
      </div>

      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Create an Account</h1>
          <p className="text-gray-300 mt-2">
            Join Ushuari for legal assistance
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl">
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-[#D4AF37] hover:bg-[#C09A27] text-[#002366] font-bold",
                card: "bg-transparent shadow-none",
                headerTitle: "text-white text-xl",
                headerSubtitle: "text-gray-300",
                formFieldLabel: "text-gray-300",
                formFieldInput:
                  "bg-white/20 border-white/30 text-white placeholder:text-gray-400",
                footerActionLink: "text-[#D4AF37] hover:text-[#C09A27]",
              },
            }}
            routing="path"
            path="/auth/sign-up"
            signInUrl="/auth/sign-in"
          />
        </div>
      </div>
    </div>
  );
}
