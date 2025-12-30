import logo from "@/assets/socialabs-logo.png"
import socia from "@/assets/socia.png";

import { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router";
import { Instagram, Mail, MapPin, Music2, Phone, Twitter, ChevronLeft, ChevronRight, Sparkles,
  Brain,
  ShieldCheck,
  Users,
  TrendingUp,
  Target, } from "lucide-react";

const timelines = [
  {
    year: "2023",
    title: "Socialabs is founded",
    desc: "Built from the need to understand social media noise using AI-driven insights."
  },
  {
    year: "2024",
    title: "AI analytics launch",
    desc: "Released our first AI-powered trend analysis and sentiment detection engine."
  },
  {
    year: "2025",
    title: "Platform expansion",
    desc: "Expanded into multi-platform monitoring with enterprise-ready analytics."
  },
  {
    year: "2025",
    title: "Platform expansion",
    desc: "Expanded into multi-platform monitoring with enterprise-ready analytics."
  },
];

const values = [
  {
    title: "Insight over noise",
    desc: "We focus on transforming massive social media data into clear, actionable insights that truly matter.",
    icon: Sparkles,
  },
  {
    title: "AI-driven innovation",
    desc: "We continuously build and refine AI-powered models to uncover trends, patterns, and signals at scale.",
    icon: Brain,
  },
  {
    title: "Data integrity",
    desc: "We prioritize ethical data practices, transparency, and responsible interpretation of social data.",
    icon: ShieldCheck,
  },
  {
    title: "Collaboration",
    desc: "Socialabs is designed for teams, enabling collaboration across marketers, researchers, and decision-makers.",
    icon: Users,
  },
  {
    title: "Scalability",
    desc: "From individual creators to enterprise teams, our platform grows with your needs.",
    icon: TrendingUp,
  },
  {
    title: "User-centric decisions",
    desc: "Every insight we deliver is built to support real decisions, not just dashboards.",
    icon: Target,
  },
];


const AboutPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
         const [scrolled, setScrolled] = useState(false);

         const scroll = (direction: "left" | "right") => {
            if (!containerRef.current) return;

            const scrollAmount = 360;
            containerRef.current.scrollBy({
            left: direction === "right" ? scrollAmount : -scrollAmount,
            behavior: "smooth",
            });
        };
    
         useEffect(() => {
            const handleScroll = () => {
                setScrolled(window.scrollY > 0);
            }
    
            window.addEventListener('scroll', handleScroll, {passive: true});
    
            return () => {
                window.removeEventListener("scroll", handleScroll)
            }
         }, [])
  return (
    <div className="overflow-hidden bg-neutral-50 relative">
        <nav className={`w-full h-14 p-2.5 px-6 fixed z-50 my-4 rounded-full left-1/2 -translate-x-1/2 flex items-center justify-between border transition-[max-width, background] duration-500  ${scrolled ? "max-w-5xl border-gray-200 bg-white/70 backdrop-blur-xl shadow-md" : "border-none max-w-7xl border-transparent "}`}>
            <div className="flex items-center gap-1.5">
                <img src={logo} alt="" className="w-7 h-7" />
                <div className="text-2xl font-semibold tracking-wider">Socialabs</div>
            </div>

            <ul className="flex gap-6 items-center">
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/feature'}>Feature</NavLink>
                <NavLink to={'/pricing'}>Pricing</NavLink>
                <NavLink to={'/about'}>About</NavLink>
            </ul>

            <NavLink to={'/login'} className="flex items-center bg-red-500 hover:bg-red-600 cursor-pointer rounded-full h-10 text-white px-4">
                Get Started
            </NavLink>
        </nav>

        <div className="relative p-88">

            <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                alt="Analytics dashboard"
                className="absolute left-62 top-30 w-72 rounded-2xl shadow-sm"
            />

            <img
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd"
                alt="Team analyzing data"
                className="absolute right-60 top-48 w-64 rounded-2xl shadow-sm"
            />

            <img
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786"
                alt="Social media trends"
                className="absolute left-30 bottom-28 w-80 rounded-2xl shadow-sm"
            />

            <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                alt="Creator workspace"
                className="absolute right-34 bottom-42 w-72 rounded-2xl shadow-sm"
            />


           <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
                <p className="text-sm tracking-widest text-gray-500 mb-4">
                    THE SOCIALABS STORY
                </p>

                <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
                Our mission is to make{" "}
                <span className="text-red-500">social data</span>{" "}
                meaningful
                </h2>

                <p className="mt-6 text-lg text-gray-600">
                Socialabs is an AI-powered social media analytics platform that helps
                teams understand conversations, detect trends, and turn social noise
                into actionable insights.
                </p>
      </div>
        </div>

        <div className="mt-2 max-w-6xl mx-auto ">
            <h2 className="text-3xl font-semibold mb-2">A brief history</h2>
            <p className="text-gray-600">
            Discover how Socialabs evolved into an AI-powered platform
            for understanding social media conversations and trends.
          </p>

        {/* Timeline */}
        <div className="relative mt-12">

          {/* Line */}
          <div className="absolute top-6 left-0 right-0 h-px bg-gray-400" />

          <div
            ref={containerRef}
            style={{
                scrollbarWidth: "none",     // Firefox
                msOverflowStyle: "none",    // IE & Edge
            }}
            className="flex gap-16 overflow-x-auto scroll-smooth no-scrollbar pb-4"
          >
            {timelines.map((item) => (
              <div
                key={item.year}
                className="min-w-[320px]"
              >
                {/* Dot + Year */}
                <div className="flex mt-4 flex-col gap-3 mb-6">
                  <span className="relative z-10 w-4 h-4 rounded-full bg-red-500" />
                  <span className="text-3xl font-semibold text-red-500">
                    {item.year}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        </div>

        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold mb-2">Our Value</h2>
            <p className="text-gray-600">
                The principles that guide how we build Socialabs and deliver
                meaningful social media insights through AI.
            </p>

            <div className="grid grid-cols-3 gap-x-12 gap-y-10 mt-12">
                {values.map((item) => {
                    const Icon = item.icon;
                    return (
                    <div key={item.title} className="border border-gray-300 rounded-xl bg-white p-5 hover:shadow-md">
                        <Icon className="w-7 h-7 text-red-500 mb-4" />
                        <h3 className="font-semibold text-gray-900 mb-2">
                        {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                        {item.desc}
                        </p>
                    </div>
                    );
                })}
            </div>

        </div>

        <footer className="w-full h-80 mt-16 bg-white">
            <div className="max-w-6xl mx-auto pt-16 pb-8 flex gap-12 border-b border-b-gray-300">  
                <div>
                    <img src={socia} alt="" className="pb-2" />
                    <p className="text-sm text-gray-600 whitespace-nowrap">
                        Social media analytics tools to extract
                    </p>
                    <p className="text-sm font-semibold ">
                        trend topic with context.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">CONTACT</h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                        <MapPin size={20} className="mt-0.5" />
                        <span>
                            Jl.Ir. H.Djuanda No.162, Lebakgede, Coblong. Kota Bandung, Jawa Barat 40132
                        </span>
                        </li>
                        <li className="flex items-center gap-2">
                        <Phone size={20} />
                        <span>+62 812 3456 7890</span>
                        </li>
                        <li className="flex items-center gap-2">
                        <Mail size={20} />
                        <span>support@socialabs.com</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">COMPANY</h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li>About us</li>
                        <li>Privacy Policy</li>
                        <li className="whitespace-nowrap">Terms and Conditions</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-2 whitespace-nowrap">SOCIAL MEDIA</h3>
                    <ul className="space-y-3 text-sm text-gray-700">
                        <li className="flex items-center gap-2">
                        <Instagram size={20} className="text-red-500"/>
                        <span>@socialabs</span>
                        </li>
                        <li className="flex items-center gap-2">
                        <Twitter size={20} className="text-red-500"/>
                        <span>@socialabs</span>
                        </li>
                        <li className="flex items-center gap-2">
                        <Music2 size={20} className="text-red-500"/>
                        <span>@socialabs</span>
                        </li>
                    </ul>
                </div>
            </div>
            <p className="font-light text-gray-600 text-center mt-8">© 2025 Socialabs. All rights reserved.</p>
        </footer>
    </div>
  )
}

export default AboutPage
