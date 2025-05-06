
import React from 'react';
import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

const Logo = ({ size = 'md', className, showText = true }: LogoProps) => {
  const sizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl',
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <BookOpen
          className={cn(
            "text-quickstudy-purple animate-pulse-light", 
            size === 'sm' && "w-5 h-5",
            size === 'md' && "w-7 h-7",
            size === 'lg' && "w-10 h-10",
            size === 'xl' && "w-16 h-16"
          )}
        />
      </div>
      {showText && (
        <span className={cn("font-bold gradient-text", sizes[size])}>
          QuickStudy
        </span>
      )}
    </div>
  );
};

export default Logo;
