import { Link } from "@inertiajs/react";
import { LogOut, User } from "lucide-react";
import React from "react";

interface NavbarProps {
    children: React.ReactNode
}

export default function Navbar({ children }: NavbarProps) {
    return (
        <header className="sticky top-0 z-10 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* <h1 className="text-2xl font-bold text-primary font-display tracking-tight">حر<span className="text-foreground">في</span></h1> */}
            <button 
              className="w-8 h-8 rounded-full overflow-hidden border border-border block"
            >              
              <Link href="/profile" >
                <User className="w-full h-full rounded-full overflow-hidden border-2 border-muted bg-muted shrink-0 cursor-pointer" />
              </Link>
            </button>
            <nav className="md:flex items-center gap-2">

              {children}
              
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-px h-6 bg-border mx-2"></div>
            
            <form method="POST" action="/logout">
              <button type="submit" className="flex items-center gap-2 text-sm font-medium text-destructive hover:bg-destructive/10 px-3 py-2 rounded-md transition-colors">
                <LogOut />
                <span className="hidden sm:inline">تسجيل الخروج</span>
              </button>
            </form>
            
          </div>
          
        </div>
      </header>
    );
}