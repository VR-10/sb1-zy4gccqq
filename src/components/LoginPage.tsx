import React, { useState } from 'react';
import { LogIn, Eye, EyeOff } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-md border border-yellow-500 transform transition-all duration-300 shadow-lg hover:shadow-2xl">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <img
            src="https://www.mohre.gov.ae/content/siteimages/logo.png"
            alt="UAE Ministry Logo"
            className="mx-auto mb-4 transform transition-transform duration-300 hover:scale-105"
          />
          <h1 className="text-yellow-600 text-xl font-bold m-auto transform transition-all duration-300 hover:text-yellow-700">
            TAWJEEH TRAINING APP
          </h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="transform transition-all duration-300 ease-in-out">
            <label
              htmlFor="email"
              className={`block text-sm font-medium mb-1 transition-colors duration-200 ${
                focusedInput === 'email' ? 'text-yellow-600' : 'text-gray-600'
              }`}
            >
              Username or email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              className={`block w-full px-3 py-2 border rounded-md transition-all duration-200 ease-in-out transform
                ${focusedInput === 'email' ? 'border-yellow-600 scale-[1.02] shadow-sm' : 'border-yellow-600'}
                focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500
                hover:border-yellow-700`}
              required
            />
          </div>

          <div className="transform transition-all duration-300 ease-in-out">
            <label
              htmlFor="password"
              className={`block text-sm font-medium mb-1 transition-colors duration-200 ${
                focusedInput === 'password' ? 'text-yellow-600' : 'text-gray-600'
              }`}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
                className={`block w-full px-3 py-2 border rounded-md pr-10 transition-all duration-200 ease-in-out transform
                  ${focusedInput === 'password' ? 'border-yellow-600 scale-[1.02] shadow-sm' : 'border-yellow-600'}
                  focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500
                  hover:border-yellow-700`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 transition-transform duration-200 hover:scale-110"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-yellow-600 transition-colors duration-200" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-yellow-600 transition-colors duration-200" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-700 text-white py-2 px-4 rounded-md transform transition-all duration-200 
              hover:bg-yellow-800 hover:scale-[1.02] hover:shadow-md
              focus:outline-none focus:ring-2 focus:ring-yellow-900 focus:ring-offset-2 
              active:scale-95
              disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}