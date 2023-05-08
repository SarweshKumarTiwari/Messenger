export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-screen bg-cyan-100">
            <div className="grid gap-2">
                <div className="flex items-center justify-center space-x-2 animate-pulse">
                    <div className="w-8 h-8 animate-pulse bg-cyan-500 rounded-full"></div>
                    <div className="w-8 h-8 animate-pulse bg-cyan-500 rounded-full"></div>
                    <div className="w-8 h-8 animate-pulse bg-cyan-500 rounded-full"></div>
                </div>
            </div>
        </div>
  )
}
