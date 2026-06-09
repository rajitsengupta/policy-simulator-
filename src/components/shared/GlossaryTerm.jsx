import { useState, useRef } from 'react'
import { GLOSSARY } from '../../data/glossary'

export default function GlossaryTerm({ term, children }) {
  const [open, setOpen] = useState(false)
  const entry = GLOSSARY[term]
  if (!entry) return <>{children || term}</>
  return (
    <span className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        aria-label={`${term}: ${entry.full}. ${entry.def}`}
        aria-describedby={`glossary-${term}`}
        className="border-b border-dotted border-current cursor-help focus:outline-none focus:ring-1 focus:ring-brand-400 rounded"
      >
        {children || term}
      </button>
      {open && (
        <div
          id={`glossary-${term}`}
          role="tooltip"
          className="absolute z-50 bottom-full left-0 mb-2 w-64 bg-gray-900 text-white text-xs rounded-xl p-3 shadow-xl pointer-events-none"
        >
          <p className="font-bold mb-1">{term} — {entry.full}</p>
          <p className="opacity-80 leading-relaxed">{entry.def}</p>
        </div>
      )}
    </span>
  )
}
