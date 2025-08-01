import { ArrowUp } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 px-4 bg-card relative border-t border-border mt-12 pt-8 flex flex-col items-center justify-center gap-4">
      {" "}
      <p className="text-base text-muted-foreground text-center">
        {" "}
        &copy; {new Date().getFullYear()} Aditya Kumar Singh | All rights reserved.
      </p>
      <a
        href="#hero"
        className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
      >
        <ArrowUp size={10} />
      </a>
    </footer>
  );
};
