"use client"

import { clearCookies } from "@server"
import {
  AlertTriangle,
  FileText,
  Hash,
  RefreshCw,
  Info,
  AlertCircleIcon,
  TrashIcon,
} from "lucide-react"
import { useTransition, type FC } from "react"
import { toast, Toaster } from "sonner"

interface GlobalErrorProps {
  error: Error & {
    digest?: string
  }
}

// Error Message Mapping
const ERROR_MESSAGE_MAP: Record<string, string> = {
  // Network Errors
  "fetch failed":
    "Unable to connect to the server. Please check your VPN connection.",
}

const GlobalError: FC<GlobalErrorProps> = ({ error }) => {
  return (
    <html>
      <body className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-4 font-sans">
        <Toaster richColors position="top-center" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-4xl w-full bg-white rounded-xl shadow-2xl overflow-hidden">
            <ErrorHeader />
            <ErrorContent error={error} />
          </div>
        </div>
      </body>
    </html>
  )
}

// Main Components
const ErrorHeader = () => (
  <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-8 text-white">
    <div className="flex items-center space-x-3">
      <div className="bg-white/20 rounded-full p-3">
        <AlertCircleIcon />
      </div>
      <div>
        <h1 className="text-3xl font-bold">Something went wrong!</h1>
        <p className="text-red-100 mt-1">
          An unexpected error occurred while processing your request
        </p>
      </div>
    </div>
  </div>
)

interface ErrorCardProps {
  title: string
  content: string
  bgColor: string
  borderColor: string
  textColor: string
  icon: React.ReactNode
  className?: string
}

const ErrorCard: FC<ErrorCardProps> = ({
  title,
  content,
  bgColor,
  borderColor,
  textColor,
  icon,
  className = "",
}) => (
  <div
    className={`${bgColor} border ${borderColor} rounded-lg p-4 ${className}`}
  >
    <h2 className={`text-lg font-semibold ${textColor} mb-2 flex items-center`}>
      {icon}
      {title}
    </h2>
    <pre
      className={`text-sm ${textColor.replace("800", "700")} bg-white p-3 rounded border font-mono whitespace-pre-wrap overflow-x-auto`}
    >
      {content}
    </pre>
  </div>
)

const ErrorMessage: FC<{ message: string }> = ({ message }) => {
  const userFriendlyMessage = getUserFriendlyMessage(message)

  return (
    <div className="space-y-4">
      {/* User-friendly message */}
      {userFriendlyMessage && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-blue-800 mb-2 flex items-center">
            <Info className="w-5 h-5 mr-2" />
            What happened
          </h2>
          <p className="text-blue-700 leading-relaxed">{userFriendlyMessage}</p>
        </div>
      )}

      {/* Technical error message */}
      <ErrorCard
        title="Technical Details"
        content={message}
        bgColor="bg-red-50"
        borderColor="border-red-200"
        textColor="text-red-800"
        icon={<AlertTriangle className="w-5 h-5 mr-2" />}
      />
    </div>
  )
}

const ErrorType: FC<{ name: string }> = ({ name }) => (
  <ErrorCard
    title="Error Type"
    content={name}
    bgColor="bg-gray-50"
    borderColor="border-gray-200"
    textColor="text-gray-800"
    icon={<FileText className="w-5 h-5 mr-2" />}
  />
)

const ErrorDigest: FC<{ digest: string }> = ({ digest }) => (
  <ErrorCard
    title="Error ID"
    content={digest}
    bgColor="bg-blue-50"
    borderColor="border-blue-200"
    textColor="text-blue-800"
    icon={<Hash className="w-5 h-5 mr-2" />}
  />
)

const StackTrace: FC<{ stack: string }> = ({ stack }) => (
  <details className="bg-gray-50 border border-gray-200 rounded-lg">
    <summary className="p-4 cursor-pointer hover:bg-gray-100 transition-colors">
      <h2 className="text-lg font-semibold text-gray-800 inline-flex items-center">
        <Hash className="w-5 h-5 mr-2" />
        Stack Trace
        <span className="ml-2 text-sm text-gray-500">(click to expand)</span>
      </h2>
    </summary>
    <div className="px-4 pb-4">
      <pre className="text-xs text-gray-700 bg-white p-4 rounded border font-mono whitespace-pre-wrap overflow-x-auto max-h-64 overflow-y-auto">
        {stack}
      </pre>
    </div>
  </details>
)

const ActionButton: FC<{
  onClick: () => void
  className: string
  icon: React.ReactNode
  children: React.ReactNode
}> = ({ onClick, className, icon, children }) => (
  <button
    onClick={onClick}
    className={`flex-1 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 ${className}`}
  >
    {icon}
    <span>{children}</span>
  </button>
)

const ActionButtons = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition()
  const buttonAction = () => {
    startTransition(async () => {
      await clearCookies()
    })
    setTimeout(() => {
      toast.success("Cookies cleared successfully, reloading page...", {
        duration: 5000,
      })
    }, 1000)
    setTimeout(() => {
      window.location.reload()
    }, 3000)
  }
  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
      <ActionButton
        onClick={() => window.location.reload()}
        className="bg-gray-600 hover:bg-gray-700 text-white"
        icon={<RefreshCw className="w-5 h-5" />}
      >
        Retry
      </ActionButton>

      <ActionButton
        className="bg-red-600 hover:bg-red-700 text-white"
        icon={<TrashIcon className="w-5 h-5" />}
        onClick={buttonAction}
      >
        Clear Cookies
      </ActionButton>
    </div>
  )
}

const ErrorContent: FC<{ error: Error & { digest?: string } }> = ({
  error,
}) => {
  const { message, name, cause, digest, stack } = error

  // Console log the cause for debugging
  if (cause) {
    console.log("Error cause:", cause)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Primary Error Message */}
      <ActionButtons />

      <ErrorMessage message={message} />

      {/* Error Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ErrorType name={name} />
        {digest && <ErrorDigest digest={digest} />}
      </div>

      {/* Stack Trace */}
      {stack && <StackTrace stack={stack} />}

      {/* Action Buttons */}
    </div>
  )
}

export default GlobalError

const getUserFriendlyMessage = (errorMessage: string): string | null => {
  // Direct match
  if (ERROR_MESSAGE_MAP[errorMessage]) {
    return ERROR_MESSAGE_MAP[errorMessage]
  }

  // Partial match (case-insensitive)
  const lowerMessage = errorMessage.toLowerCase()
  for (const [key, value] of Object.entries(ERROR_MESSAGE_MAP)) {
    if (
      lowerMessage.includes(key.toLowerCase()) ||
      key.toLowerCase().includes(lowerMessage)
    ) {
      return value
    }
  }

  return null
}
