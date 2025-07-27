import { WrappedImage } from "@components"
import { DownloadIcon } from "@icons"
// import Link from "next/link"

const EmployeeApplicationPage = () => {
  const apps = [
    {
      image: "app-1.svg",
      buttonText: "لمتجر Apple سعودي",
      url: "https://apps.apple.com/us/app/%D8%AA%D8%B7%D8%A8%D9%8A%D9%82-%D8%A7%D9%84%D9%85%D9%88%D8%B8%D9%81%D9%8A%D9%86-v2/id6742553893",
    },
    {
      image: "app-2.svg",
      buttonText: "لمتجر Apple غير سعودي",
      url: "/",
    },
    {
      image: "app-3.svg",
      buttonText: "لمتجر Google Play",
      url: "https://play.google.com/store/apps/details?id=com.monshaat.employeesapp",
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
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-6 flex items-center gap-1 bg-primary text-white p-4 rounded-xl text-xl font-bold transition"
              >
                {app.buttonText}
                <DownloadIcon />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmployeeApplicationPage
