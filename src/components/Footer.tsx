import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Twitch } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/30 backdrop-blur-md border-t border-s3m-red/20 mt-auto py-8 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-4 group transition-transform duration-300">
              <img
                src="/lovable-uploads/876694d5-ec41-469d-9b93-b1c067364893.png"
                alt="S3M E-Sports"
                className="h-10 w-auto transition-all duration-300 group-hover:brightness-110"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-s3m-red to-red-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-red-500 group-hover:to-s3m-red">
                S3M E-Sports
              </span>
            </Link>
            <p className="text-white/70 text-sm mb-4">
              منصة رياضات إلكترونية متخصصة تهدف إلى تطوير المواهب العربية وتنظيم البطولات الاحترافية.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-s3m-red font-bold text-lg mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/70 hover:text-s3m-red transition-colors duration-200">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/News" className="text-white/70 hover:text-s3m-red transition-colors duration-200">
                   الاخبار  
                </Link>
              </li>
              <li>
                <Link to="/Tournaments" className="text-white/70 hover:text-s3m-red transition-colors duration-200">
                  البطولات
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-s3m-red transition-colors duration-200">
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-white/70 hover:text-s3m-red transition-colors duration-200">
                  المتصدرين
                </Link>
              </li>
              <li>
                <Link to="/join-us" className="text-white/70 hover:text-s3m-red transition-colors duration-200">
                  انضم إلينا
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h3 className="text-s3m-red font-bold text-lg mb-4">قانوني</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-white/70 hover:text-s3m-red transition-colors duration-200">
                  الشروط والأحكام
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white/70 hover:text-s3m-red transition-colors duration-200">
                  سياسة الخصوصية
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-span-1">
            <h3 className="text-s3m-red font-bold text-lg mb-4">تواصل معنا</h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/s3m_esports?igsh=N2lsOWF3YmlzY2Rr" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-s3m-red transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-s3m-red/10 mt-8 pt-6 text-center text-white/50 text-sm">
          <p>© {currentYear} S3M E-Sports. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;