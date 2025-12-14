export function Background() {
  return (
    <>
      {/* Animated gradient background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(30, 30, 40, 1) 0%, rgba(10, 10, 15, 1) 100%)
          `,
        }}
      />
    </>
  );
}

