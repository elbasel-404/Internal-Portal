"use client"
import { Loader } from "lucide-react"
import { useEffect, useState } from "react"
import { refreshSession } from "../server/refreshSession"

export const RefreshSession = () => {
  const [dots, setDots] = useState("")
  
  const init = async () => {
    refreshSession()
  }
  
  useEffect(() => {
    init()
  }, [])
  
  // Animated dots effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".")
    }, 500)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 text-center space-y-8 p-8">
        {/* Loading spinner with glow effect */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Loader className="w-16 h-16 text-blue-400 animate-spin drop-shadow-2xl" />
            <div className="absolute inset-0 w-16 h-16 bg-blue-400 rounded-full opacity-20 blur-xl animate-ping"></div>
          </div>
        </div>
        
        {/* Heading with gradient text */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent leading-tight">
            Refreshing Session
          </h1>
          <p className="text-xl text-gray-300 font-light">
            Please wait{dots}
          </p>
        </div>
        
        {/* Progress bar */}
        <div className="w-80 max-w-full mx-auto">
          <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Status indicator */}
        <div className="flex items-center justify-center space-x-3 text-gray-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Secure connection established</span>
        </div>
      </div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '50px 50px'
      }}></div>
    </div>
  )
}