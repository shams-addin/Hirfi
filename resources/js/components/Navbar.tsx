import { Link } from '@inertiajs/react';
import { LogOut, User } from 'lucide-react';
import React from 'react';

interface NavbarProps {
    children: React.ReactNode;
    action: string;
}

export default function Navbar({ children, action }: NavbarProps) {
    return (
        <header className="bg-card border-border sticky top-0 z-10 border-b shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-6">
                    {/* <h1 className="text-2xl font-bold text-primary font-display tracking-tight">حر<span className="text-foreground">في</span></h1> */}
                    <button className="border-border block h-8 w-8 overflow-hidden rounded-full border">
                        <Link href="/profile">
                            <User className="border-muted bg-muted h-full w-full shrink-0 cursor-pointer overflow-hidden rounded-full border-2" />
                        </Link>
                    </button>
                    <nav className="items-center gap-2 md:flex">{children}</nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-border mx-2 h-6 w-px"></div>

                    <form method="POST" action={action}>
                        <button
                            type="submit"
                            className="text-destructive-foreground hover:bg-destructive-foreground/10 flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors"
                        >
                            <LogOut />
                            <span className="hidden sm:inline">
                                تسجيل الخروج
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </header>
    );
}
