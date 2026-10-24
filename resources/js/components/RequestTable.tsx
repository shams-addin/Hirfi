import React from 'react';

interface RequestTableProps {
    children: React.ReactNode;
}

export default function RequestTable({ children }: RequestTableProps) {
    return (
        <table className="w-full text-right text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
                {children}
            </thead>
        </table>
    );
}
