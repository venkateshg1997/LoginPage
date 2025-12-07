import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-6">
    
      <div className="text-4xl font-bold text-red-600 mb-8">Netflix</div>

   
      <div className="bg-zinc-900 p-10 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-semibold mb-4">Account Created!</h1>
        <p className="text-zinc-300 mb-8 text-lg">
          Your account has been successfully created. You can now sign in and start watching.
        </p>

        <Link
          to="/"
          className="w-full block bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-lg text-lg font-semibold"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}