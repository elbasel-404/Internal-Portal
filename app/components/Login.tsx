"use client"

import { Button } from "@ui"
import { signIn } from "@server"
import { Download, Eye, EyeOff, LoaderIcon, Lock, User2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useActionState, useEffect, useState } from "react"
import { toast } from "sonner"

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

  // Effect to handle and display login errors
  useEffect(() => {
    if (state?.error) {
      toast.error(state.error, { id: "login-error" })
    } else {
      setTimeout(() => {
        toast.dismiss("login-error")
      }, 3000)
    }
  }, [state])

  return (
    <div className="flex h-screen overflow-hidden flex-col items-center justify-center bg-[#11274A] bg-[url(/login-background.svg)] bg-cover bg-center bg-no-repeat px-4 lg:flex-row lg:px-0">
      {/* Left Section: App promotion and download links */}
      <div className="hidden h-full w-full flex-col items-center justify-center rounded-bl-[60px] rounded-tr-[60px] bg-gradient-to-t from-[#007C9E] to-[#0D3C5F] p-10 shadow-lg lg:flex lg:w-2/5">
        <div className="flex h-full flex-col items-center">
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/app-login.svg"
              alt="login-app"
              width={300}
              height={300}
              className="h-auto w-full max-w-xs"
            />
            <div className="mt-8">
              <Image
                src="/app-download-section.svg"
                alt="app-download-section"
                width={250}
                height={100}
                className="h-auto w-full"
              />
              <div className="mt-4 flex items-center justify-center gap-3">
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
          <div className="mt-auto relative bottom-[200px] flex items-center justify-center gap-3">
            <Image
              src="/googleplay.svg"
              alt="googleplay button"
              width={150}
              height={60}
              className="h-auto w-full"
            />
            <Image
              src="/appstore.svg"
              alt="appstore button"
              width={150}
              height={60}
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>

      {/* Right Section: Login form */}
      <div className="flex w-full flex-col items-center justify-center px-4 py-8 lg:w-3/5 lg:px-14">
        <div className="w-full max-w-md rounded-lg bg-transparent px-6 py-8 md:bg-[#0F3256]">
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
              disabled={pending}
              icon={pending && <LoaderIcon className="animate-spin" />}
              type="submit"
              className="w-full rounded-full bg-[#007497] px-4 py-6 text-white shadow-none transition duration-200 hover:bg-cyan-700"
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
