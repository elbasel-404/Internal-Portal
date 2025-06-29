import { Loader2 } from "lucide-react"

const Loading = () => {
  return (
    <div className="fixed inset-0 z-40 w-screen h-screen bg-white/60 m-0 overflow-hidden flex flex-col items-center justify-center">
      <div className="z-50">
        <Loader2 className="animate-spin w-16 h-16" />
      </div>
    </div>
  )
}

export default Loading
