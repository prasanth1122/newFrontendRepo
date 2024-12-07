export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  isLoading,
  errorMessage,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full lg:w-1/2 flex flex-col items-center gap-6 mt-8 bg-terinary rounded-xl px-8 py-4"
    >
      <p className="text-2xl font-bold text-important_text">Login</p>

      {/* Email Input */}
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="email" className="text-lg font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      {/* Password Input */}
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="password" className="text-lg font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      {/* Forgot Password */}
      <div className="w-full text-right">
        <a
          href="/forgot-password"
          className="text-sm text-important_text hover:underline"
        >
          Forgot Password?
        </a>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-secondary text-white rounded-md shadow-gray-600"
        disabled={isLoading}
      >
        {isLoading ? "Logging In..." : "Login"}
      </button>

      {/* Sign Up Link */}
      <p className="text-sm">
        Don&apos;t have an account?{" "}
        <a
          href="/signup"
          className="text-important_text font-medium hover:underline"
        >
          Sign Up
        </a>
      </p>
    </form>
  );
}
