import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import Head from "next/head";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (email) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  async function signInWithTwitter() {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "twitter",
    });
  }

  return (
    <div className="flex w-screen h-screen space-y-3 bg-black text-white items-center justify-center flex-col text-lg">
      <Head>
        <title>Sign in</title>
      </Head>
      <h1 className="text-3xl font-semibold">Supabase + Next.js</h1>
      <p className="italic text-xl font-medium">
        Sign in via magic link with your email below
      </p>
      <div>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-gray-400 p-2 w-full rounded-lg outline-none focus:border-gray-600"
        />
      </div>
      <div>
        <div className="relative group mt-5">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-200 to-green-500 filter group-hover:opacity-100 rounded-lg blur opacity-75 backdrop-blur-lg animate-tilt"></div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin(email);
            }}
            disabled={loading}
            className="relative px-4 py-2 bg-black rounded-lg"
          >
            <span>{loading ? "Loading" : "Send magic link"}</span>
          </button>
        </div>
      </div>
      <div className="relative group !mt-10">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-700 filter group-hover:opacity-100 rounded-lg blur opacity-75 backdrop-blur-lg animate-tilt"></div>
        <button
          onClick={() => {
            signInWithTwitter();
          }}
          disabled={loading}
          className="relative px-4 py-2 bg-black rounded-lg"
        >
          <span>{loading ? "Loading" : "Twitter sign in"}</span>
        </button>
      </div>
    </div>
  );
}
