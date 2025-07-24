import { cn } from "@/lib/utils";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isMenuOpen]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300 backdrop-blur-md",
        isScrolled
          ? "py-3 bg-background/95 shadow-sm dark:bg-background/90 dark:shadow-white/5"
          : "py-5 bg-background/70 dark:bg-background/60"
      )}
    >
      <div className='flex justify-between items-center px-4 sm:px-20 xl:px-32'>

        <a className="text-xl font-bold text-primary flex items-center" href="#hero">
          <span className="relative z-10">
            <span className="text-glow text-foreground">My </span>Portfolio
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300 dark:text-foreground/70 dark:hover:text-primary"
            >
              {item.name}
            </a>
          ))}
          {/* Desktop Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-foreground dark:text-foreground/90 rounded-lg hover:bg-background/50 transition-colors duration-300 md:hidden"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div className="flex items-center md:hidden">
          {/* Hamburger */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 text-foreground z-50 dark:text-foreground/90"
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Full-Screen Mobile Menu */}
        <div
          className={cn(
            "fixed top-0 left-0 w-full bg-[rgba(41,40,42,0.95)] z-40 flex flex-col items-center justify-center transition-all duration-300 ease-in-out h-screen opacity-100 pointer-events-auto",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="self-end p-15 text-white"
            aria-label="Close Menu"
          >
            <X size={28} />
          </button>

          <div className="flex flex-col items-center justify-center flex-grow space-y-8">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="text-2xl text-white font-medium hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}

            {/* Theme Toggle inside mobile menu */}
            <button
              onClick={() => {
                toggleTheme();
                setIsMenuOpen(false);
              }}
              className="flex items-center space-x-3 text-xl text-white hover:text-primary transition-colors duration-300 mt-6"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
              <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
