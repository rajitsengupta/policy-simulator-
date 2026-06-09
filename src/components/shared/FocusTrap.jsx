import { useEffect, useRef } from 'react'

const FOCUSABLE = 'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])'

export default function FocusTrap({ active, children }) {
  const ref = useRef(null)
  const previousFocus = useRef(null)

  useEffect(() => {
    if (!active) return
    previousFocus.current = document.activeElement
    const first = ref.current?.querySelectorAll(FOCUSABLE)[0]
    first?.focus()
    return () => { previousFocus.current?.focus() }
  }, [active])

  function handleKeyDown(e) {
    if (!active || e.key !== 'Tab') return
    const focusable = [...(ref.current?.querySelectorAll(FOCUSABLE) || [])]
    if (!focusable.length) return
    const first = focusable[0], last = focusable[focusable.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus() }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  }

  return (
    <div ref={ref} onKeyDown={handleKeyDown}>
      {children}
    </div>
  )
}
