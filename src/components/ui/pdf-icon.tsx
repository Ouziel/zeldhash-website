type PdfIconProps = {
  className?: string;
};

export function PdfIcon({ className = "w-6 h-6" }: PdfIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      {/* Document shape */}
      <path
        d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6Z"
        fill="currentColor"
        fillOpacity={0.1}
        stroke="currentColor"
        strokeWidth={1.2}
      />
      {/* Folded corner */}
      <path d="M14 2v4a2 2 0 0 0 2 2h4" stroke="currentColor" strokeWidth={1.2} />
      {/* Red PDF badge */}
      <rect x="3" y="11" width="18" height="8" rx="1.5" fill="#DC2626" />
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fontSize="5.5"
        fontWeight="bold"
        fill="white"
        fontFamily="system-ui, sans-serif"
      >
        PDF
      </text>
    </svg>
  );
}

