import { SearchX } from 'lucide-react';
import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 font-sans bg-white">
      {/* Main Content Container */}
      <div className="flex flex-col items-center text-center max-w-[420px] w-full mt-10">
        <div className="relative flex items-center justify-center w-40 h-40 mb-8 rounded-full bg-gray-50">
          <SearchX className="w-16 h-16 text-gray-300" />

          {/* Badge 404 Floating */}
          <div className="absolute bottom-2 right-2 flex items-center justify-center px-4 py-2 bg-white border border-gray-100 rounded-full shadow-sm">
            <span className="text-sm font-extrabold text-[#d81b27]">404</span>
          </div>
        </div>

        <h2 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl">
          Oops! Page not found.
        </h2>
        <p className="mb-8 text-sm leading-relaxed text-gray-500 md:text-base">
          The page you're looking for might have been removed, had its name
          changed, or is temporarily unavailable. Let's get you back on track!
        </p>

        <Link
          to={'/'}
          className="w-full cursor-pointer sm:w-auto px-8 py-3.5 text-sm font-bold text-white transition-colors bg-[#d81b27] rounded-xl hover:bg-[#b3121d] focus:outline-none focus:ring-4 focus:ring-[#d81b27]/20"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
