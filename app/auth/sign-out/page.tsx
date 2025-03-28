import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SignOutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001A4D] to-[#002366] flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-white mb-6">Sign Out</h1>
        <p className="text-gray-300 mb-8">
          Are you sure you want to sign out from your account?
        </p>

        <div className="flex flex-col gap-4">
          <SignOutButton>
            <button className="w-full py-3 px-4 bg-[#D4AF37] hover:bg-[#C09A27] text-[#002366] font-bold rounded-lg transition-colors">
              Sign Out
            </button>
          </SignOutButton>

          <Link href="/dashboard">
            <button className="w-full py-3 px-4 bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Return to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
