export default function Toast({ message }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-4 py-2 rounded-full shadow-lg z-50 animate-pulse">
      {message}
    </div>
  )
}
