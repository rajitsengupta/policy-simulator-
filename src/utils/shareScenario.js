export function serializeState(sliderValues) {
  const params = new URLSearchParams()
  Object.entries(sliderValues).forEach(([k, v]) => params.set(k, v))
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`
}

export function loadStateFromURL() {
  const params = new URLSearchParams(window.location.search)
  const values = {}
  for (const [k, v] of params.entries()) {
    const num = parseFloat(v)
    if (!isNaN(num)) values[k] = num
  }
  return Object.keys(values).length > 0 ? values : null
}
