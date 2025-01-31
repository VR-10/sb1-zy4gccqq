import React, { useState } from 'react';
import { LogIn, Eye, EyeOff } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg w-full max-w-md border border-yellow-500 mx-auto shadow-lg">
        {/* Logo and Header */}
        <div className="text-center mb-6 md:mb-8">
          <img
            src="https://www.mohre.gov.ae/content/siteimages/logo.png"
            alt="UAE Ministry Logo"
            className="mx-auto mb-4 w-auto h-16 sm:h-20 md:h-24 object-contain"
          />
          <h1 className="text-yellow-600 text-lg sm:text-xl md:text-2xl font-bold m-auto">
            TAWJEEH TRAINING APP
          </h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm md:text-base font-medium text-gray-600 mb-1 md:mb-2"
            >
              Username or email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 md:py-2.5 border border-yellow-600 rounded-md
                focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500
                text-sm md:text-base
                placeholder:text-gray-400"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm md:text-base font-medium text-gray-600 mb-1 md:mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 md:py-2.5 border border-yellow-600 rounded-md
                  focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500
                  text-sm md:text-base pr-10
                  placeholder:text-gray-400"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 transition-all duration-200"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-yellow-600" />
                ) : (
                  <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-yellow-600" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-700 text-white py-2 md:py-2.5 px-4 rounded-md
              text-sm md:text-base font-medium
              hover:bg-yellow-800 hover:scale-[1.02]
              focus:outline-none focus:ring-2 focus:ring-yellow-900 focus:ring-offset-2
              transition-all duration-200
              disabled:bg-gray-300 disabled:cursor-not-allowed
              mt-6 sm:mt-8"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;