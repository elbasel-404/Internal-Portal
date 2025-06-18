"use client"

import { DownloadIcon, LockIcon, User2Icon } from "@icons"
import { signIn } from "@server"
import { Button } from "@ui"
import { LoaderIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

export const rememberMeInputName = "rememberMe"
export const usernameInputName = "username"
export const passwordInputName = "password"

export type InitialState = {
  error: string | null
}

const initialState = {
  error: null,
}

export const Login = () => {
  const [state, formAction, pending] = useActionState(signIn, initialState)

  useEffect(() => {
    const { error } = state
    if (error) {
      toast.error(error, { id: "login-error" })
    } else {
      setTimeout(() => {
        toast.dismiss("login-error")
      }, 3000)
    }
  }, [pending, state])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#11274A] bg-[url(/login-background.svg)] bg-cover bg-no-repeat bg-center px-4 lg:px-0">
      <div className="hidden lg:block relative lg:w-1/3 w-fit bg-gradient-to-t from-[#007C9E] to-[#0D3C5F] rounded-tr-[60px] rounded-bl-[60px] shadow-lg py-28 2xl:py-36 px-10 md:px-20">
        <Image
          src="/app-login.svg"
          alt="login-app"
          width={200}
          height={200}
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-32 right-4">
          <Image
            src="/app-download-section.svg"
            alt="app-download-section"
            width={200}
            height={80}
            className="w-full h-full object-cover mt-8"
          />
          <div className="flex justify-center items-center mt-4 gap-3">
            <Button
              className="bg-[#88D0EC] shadow-none hover:bg-[#88D0EC]"
              size="icon"
              icon={<DownloadIcon />}
            />

            <p className="text-sm text-white font-light leading-6 text-center">
              حمل التطبيق الآن
            </p>
          </div>
        </div>
        <div className="absolute flex justify-center items-center mt-10 gap-3">
          <Image
            src="/googleplay.svg"
            alt="googleplay button"
            width={200}
            height={80}
            className="w-full h-full object-cover"
          />
          <Image
            src="/appstore.svg"
            alt="appstore button"
            width={200}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col items-start justify-start">
        <div className="bg-transparent md:bg-[#0F3256] w-full px-14 py-6 mt-8 rounded-r-[30px] flex flex-col items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-8 space-y-10">
              <div className="flex justify-center mb-4">
                <Image
                  src="/monshaat-logo.png"
                  alt="Monsha'at Logo"
                  width={120}
                  height={120}
                  className=" object-cover"
                />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-white">تسجيل الدخول</h2>
                <h3 className="text-white text-2xl font-semibold">
                  البوابة الداخلية
                </h3>
                <div className="border-2 border-[#007C9E] w-28 mt-2 md:hidden"></div>
              </div>
            </div>

            <form action={formAction} className="space-y-6">
              <div className="relative">
                <input
                  defaultValue="asaedi.uat"
                  name="username"
                  type="text"
                  id="username"
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:shadow-outline focus:border-[#007C9E] rounded-full text-right pr-12 placeholder:text-foreground"
                  placeholder="اسم المستخدم"
                  required
                />
                <div className="absolute top-0 right-0 h-full flex items-center justify-center w-12">
                  <User2Icon />
                </div>
              </div>

              <div className="relative">
                <input
                  defaultValue="@112"
                  name="password"
                  type="password"
                  id="password"
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:shadow-outline focus:border-[#007C9E] rounded-full text-right pr-12 placeholder:text-foreground"
                  placeholder="كلمة المرور"
                  required
                />
                <div className="absolute top-0 right-0 h-full flex items-center justify-center w-12 text-blue-800">
                  <LockIcon />
                </div>
              </div>

              <div className="flex items-center justify-end">
                <div className="flex items-center">
                  <label htmlFor="remember" className="mr-2 text-sm text-white">
                    تذكرني دائمًا
                  </label>
                  <input
                    name={rememberMeInputName}
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-blue-800 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
              </div>

              <Button
                disabled={pending}
                icon={pending && <LoaderIcon className="animate-spin" />}
                type="submit"
                className="w-full py-6 px-4 bg-[#007497] shadow-none hover:bg-cyan-700 text-white font-bold rounded-full transition duration-200"
              >
                سجل الدخول
              </Button>

              <div className="flex items-center justify-center">
                <Link
                  href={"/login"}
                  className="text-sm text-white hover:underline"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
