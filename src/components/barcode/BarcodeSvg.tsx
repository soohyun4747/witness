'use client';

type Props = { value: string; height?: number };

export default function BarcodeSvg({ value, height = 60 }: Props) {
  // Lightweight fallback SVG (Code128 lib can replace this later with JsBarcode).
  return (
    <svg width="100%" height={height + 20} role="img" aria-label={value}>
      <rect x="0" y="0" width="100%" height={height} fill="white" stroke="black" />
      {value.split('').map((_, i) => (
        <rect key={`${value}-${i}`} x={i * 3 + 8} y={4} width={i % 2 === 0 ? 2 : 1} height={height - 8} fill="black" />
      ))}
      <text x="50%" y={height + 14} textAnchor="middle" fontSize="12">{value}</text>
    </svg>
  );
}
