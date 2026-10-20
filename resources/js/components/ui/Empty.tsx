export default function Empty({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50/60 px-6 py-12 text-center">
      <p className="font-semibold text-stone-700">{title}</p>
      <p className="mt-1 text-sm text-stone-500">{desc}</p>
    </div>
  )
}