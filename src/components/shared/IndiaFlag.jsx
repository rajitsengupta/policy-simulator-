// Circular Indian flag — tricolour with simplified Ashoka Chakra
export default function IndiaFlag({ size = 36 }) {
  const r = size / 2
  const spoke = r * 0.28

  // 24 Ashoka Chakra spokes
  const spokes = Array.from({ length: 24 }, (_, i) => {
    const angle = (i * 360) / 24
    const rad = (angle * Math.PI) / 180
    return {
      x1: r + Math.cos(rad) * r * 0.12,
      y1: r + Math.sin(rad) * r * 0.12,
      x2: r + Math.cos(rad) * spoke,
      y2: r + Math.sin(rad) * spoke,
    }
  })

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Flag of India">
      <clipPath id="flag-circle">
        <circle cx={r} cy={r} r={r} />
      </clipPath>
      <g clipPath="url(#flag-circle)">
        {/* Saffron top third */}
        <rect x="0" y="0" width={size} height={size / 3} fill="#FF9933" />
        {/* White middle third */}
        <rect x="0" y={size / 3} width={size} height={size / 3} fill="#FFFFFF" />
        {/* Green bottom third */}
        <rect x="0" y={(size / 3) * 2} width={size} height={size / 3} fill="#138808" />
      </g>
      {/* Ashoka Chakra */}
      <circle cx={r} cy={r} r={r * 0.3} fill="none" stroke="#000080" strokeWidth={size * 0.025} />
      {spokes.map((s, i) => (
        <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
          stroke="#000080" strokeWidth={size * 0.018} />
      ))}
      <circle cx={r} cy={r} r={r * 0.065} fill="#000080" />
      {/* Border circle */}
      <circle cx={r} cy={r} r={r - 0.5} fill="none" stroke="#e5e7eb" strokeWidth="1" />
    </svg>
  )
}
