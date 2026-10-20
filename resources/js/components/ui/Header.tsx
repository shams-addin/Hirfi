import { ReactNode } from "react";

interface HeaderProps {
    title: string;
    desc: string;
    action?: ReactNode;
}

export default function Header({ title, desc, action }: HeaderProps) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">{title}</h1>
        <p className="mt-1 text-sm text-stone-500">{desc}</p>
      </div>
      {action}
    </div>
  )
}