"use client"

import { Button } from "@ui"
import { clearCookies, signIn } from "@server"
import {
  Download,
  Eye,
  EyeOff,
  LoaderIcon,
  Lock,
  RefreshCwIcon,
  User2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useActionState, useEffect, useState, useTransition } from "react"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"
import { demoLogin } from "@auth"
import { sleep } from "@utils"

// Constants for input field names
export const rememberMeInputName = "rememberMe"
export const usernameInputName = "username"
export const passwordInputName = "password"

// Type for the initial state of the form
export type InitialState = {
  error: string | null
}

// Initial state for the form action
const initialState: InitialState = {
  error: null,
}

/**
 * Login component for the application.
 * Handles user authentication, form state, and UI rendering.
 */
export const Login = () => {
  const [state, formAction, pending] = useActionState(signIn, initialState)
  const [showPassword, setShowPassword] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, demoLoginFormAction, demoLoginPending] = useActionState(
    demoLogin,
    initialState,
  )
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [__, startTransition] = useTransition()

  // Don't enable signin button until the page has loaded.
  useEffect(() => {
    const handleLoad = () => {
      console.log("Window fully loaded")
      setButtonDisabled(false)
    }
    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
      return () => window.removeEventListener("load", handleLoad)
    }
  }, [])

  // Show toasts for login errors
  useEffect(() => {
    if (state?.error) {
      toast.error(state.error, {
        id: "login-error",
        duration: 5000,
      })

      toast("", {
        className: "p-0 border-0 w-fit bg-transparent",
        duration: 99999,
        action: (
          <Button
            className="p-0 w-[358px] bg-green-600 -ml-[5px] hover:bg-green-400 hover:text-black ring-2 ring-blue-400 animate-bounce"
            icon={<RefreshCwIcon />}
            // size="icon"
            // variant="outline"
            onClick={() => {
              toast.loading("Clearing cookies...")
              startTransition(async () => {
                await sleep(2)
                await clearCookies()
              })
            }}
          >
            Clear cookies and try again...
          </Button>
        ),
      })
    }
  }, [state])

  return (
    <div className="flex h-screen overflow-hidden flex-col items-center justify-center bg-[#11274A] bg-[url(/login-background.svg)] bg-cover bg-center bg-no-repeat px-4 lg:flex-row lg:px-0">
      {/* Demo Login */}
      <div className="fixed bottom-0 right-0 mr-4 mb-8">
        <form
          action={async (formData: FormData) => {
            toast.loading("Logging in as demo user...")
            await sleep(2)
            startTransition(() => {
              demoLoginFormAction(formData)
            })
          }}
        >
          <Button
            disabled={demoLoginPending}
            className="ring-2 ring-blue-400 drop-shadow-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border rounded-2xl px-10 py-5 text-xl font-semibold text-slate-200 shadow-lg active:scale-95 transition-all duration-300 ease-out tracking-wide backdrop-blur-sm"
            type="submit"
          >
            Demo Login
          </Button>
        </form>
      </div>
      {/* Left Section: App promotion and download links */}
      <div className="hidden flex-col items-center justify-center rounded-bl-[60px] rounded-tr-[60px] bg-gradient-to-t from-[#007C9E] to-[#0D3C5F] p-10 shadow-lg lg:flex lg:w-1/3 lg:-mr-4 z-50 min-h-[650px] min-w[600px] h-fit">
        <div className="flex h-full flex-col items-center">
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/app-login.svg"
              alt="login-app"
              width={300}
              height={300}
              className="h-4/5 min-h-[500px] min-w-[300px] w-4/5 max-w-lg"
              onLoad={() => console.log("app-login image loaded")}
            />
            <div className="-mt-44">
              <Image
                src="/app-download-section.svg"
                alt="app-download-section"
                width={250}
                height={100}
                className="h-auto w-full"
                onLoad={() => console.log("app-download-section image loaded")}
              />
              <div className="mt-8 flex items-center justify-center gap-3">
                <Button
                  className="bg-[#88D0EC] shadow-none hover:bg-[#88D0EC]"
                  size="icon"
                  icon={<Download />}
                />
                <p className="text-center text-sm font-light leading-6 text-white">
                  حمل التطبيق الآن
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12 relative flex items-center justify-center gap-3">
            <Image
              src="/appstore.svg"
              alt="appstore button"
              width={150}
              height={60}
              className="h-auto w-full"
              onLoad={() => console.log("appstore button loaded")}
            />
            <Image
              src="/googleplay.svg"
              alt="googleplay button"
              width={150}
              height={60}
              className="h-auto w-full"
              onLoad={() => console.log("googleplay button loaded")}
            />
          </div>
        </div>
      </div>

      {/* Right Section: Login form */}
      <div className="flex flex-col items-center justify-center py-8 w-11/12 max-w-md lg:w-1/3 h-[65dvh]">
        <div className="w-full max-w-md lg:max-w-xl rounded-lg bg-transparent px-6 lg:px-20 py-8 md:bg-[#0F3256]">
          <div className="mb-8 text-center">
            <Image
              src="/monshaat-logo.png"
              alt="Monsha'at Logo"
              width={120}
              height={120}
              className="mx-auto"
            />
            <h2 className="mt-4 text-white">تسجيل الدخول</h2>
            <h3 className="text-2xl font-semibold text-white">
              البوابة الداخلية
            </h3>
            <div className="border-2 border-[#007C9E] w-28 mt-2 mx-auto md:hidden"></div>
          </div>

          <form action={formAction} className="space-y-6">
            {/* Username Input */}
            <div className="relative">
              <input
                name={usernameInputName}
                type="text"
                id="username"
                className="w-full rounded-full border border-gray-300 p-3 pr-12 text-right placeholder:text-foreground focus:border-[#007C9E] focus:outline-none focus:shadow-outline"
                placeholder="اسم المستخدم"
                required
              />
              <div className="absolute inset-y-0 right-0 flex w-12 items-center justify-center">
                <User2 className="text-gray-400" />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                name={passwordInputName}
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full rounded-full border border-gray-300 p-3 pr-12 text-right placeholder:text-foreground focus:border-[#007C9E] focus:outline-none focus:shadow-outline"
                placeholder="كلمة المرور"
                required
              />
              <div className="absolute inset-y-0 right-0 flex w-12 items-center justify-center">
                <Lock className="text-blue-800" />
              </div>
              <button
                type="button"
                tabIndex={-1}
                className="absolute inset-y-0 left-0 flex w-12 items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={
                  showPassword ? "إخفاء كلمة المرور" : "عرض كلمة المرور"
                }
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-end">
              <label htmlFor="remember" className="mr-2 text-sm text-white">
                تذكرني دائمًا
              </label>
              <input
                name={rememberMeInputName}
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-300 text-blue-800 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}

            <Button
              disabled={pending || buttonDisabled}
              icon={pending && <LoaderIcon className="animate-spin" />}
              type="submit"
              className={twMerge(
                "w-full rounded-full bg-[#007497] px-4 py-6 text-white shadow-none transition duration-200 hover:bg-cyan-700",
                (pending || buttonDisabled) &&
                  "cursor-not-allowed opacity-60 hover:bg-[#007497]",
              )}
            >
              سجل الدخول
            </Button>

            {/* Forgot Password Link */}
            <div className="flex items-center justify-center">
              <Link
                href="/login"
                className="text-sm text-white hover:underline"
              >
                نسيت كلمة المرور؟
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
