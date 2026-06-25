import { Link } from 'react-router';
import logo from '@/assets/socialabs-logo.png';

export default function BrandLogo() {
  return (
    <div className="flex items-center justify-center h-16 border-b border-slate-100 w-full shrink-0">
      <Link to="/" className="flex items-center gap-2.5">
        <img src={logo} alt="" className="w-7 h-7" />
        <div className="text-2xl font-semibold tracking-wider">Socialabs</div>
      </Link>
    </div>
  );
}
