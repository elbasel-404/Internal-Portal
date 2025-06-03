import { WrappedImage } from "@components"
import { DownloadIcon } from "@icons"
import Link from "next/link"

const EmployeeApplicationPage = () => {
  const apps = [
    {
      image: "app-1.svg",
      buttonText: "لمتجر Apple سعودي",
      url: "/",
    },
    {
      image: "app-2.svg",
      buttonText: "لمتجر Apple غير سعودي",
      url: "/",
    },
    {
      image: "app-3.svg",
      buttonText: "لمتجر Google Play",
      url: "/",
    },
  ]

  return (
    <div className="rounded-xl py-4 w-full bg-white">
      <div className="p-4 border-b border-light">
        <h1 className="text-2xl font-bold text-foreground text-right">
          تحميل تطبيق الموظفين
        </h1>
      </div>
      <div className="p-4 flex flex-col flex-wrap sm:flex-row justify-center items-center gap-4 lg:gap-10 mt-2">
        {apps.map((app, index) => (
          <div key={index} className="">
            <div className="relative flex flex-col justify-center items-center rounded-2xl">
              <WrappedImage
                width={300}
                height={500}
                src={app.image}
                alt="app image"
              />
              <Link
                href={{ pathname: app.url }}
                className="absolute bottom-6 flex items-center gap-1 bg-primary text-white p-4 rounded-xl text-xl font-bold transition"
              >
                {app.buttonText}
                <DownloadIcon />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmployeeApplicationPage
