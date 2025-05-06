
import React from 'react';
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cn("w-full py-4 text-center text-sm text-gray-500", className)}>
      <p>© {new Date().getFullYear()} QuickStudy. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
