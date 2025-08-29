export default function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-neutral-100 border border-neutral-200">
      {children}
    </span>
  );
}
