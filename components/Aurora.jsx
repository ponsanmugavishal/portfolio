// Soft blue-violet aurora behind the whole site: drifting colour blobs,
// a faint grid and film grain. Pure CSS (transform-only animation).
export default function Aurora() {
  return (
    <div aria-hidden className="aurora pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
      <div className="aurora-blob aurora-blob-4" />
      <div className="aurora-grid absolute inset-0" />
      <div className="aurora-grain absolute inset-0" />
    </div>
  );
}
