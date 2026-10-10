export default function AdminControlTableLoadingSkeleton() {
  return (
    <div className="space-y-3">
      {["one", "two", "three", "four", "five"].map((row) => (
        <div
          key={row}
          className="h-16 animate-pulse rounded-xl bg-muted"
        />
      ))}
    </div>
  );
}
