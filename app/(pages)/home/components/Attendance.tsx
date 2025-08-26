import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
  CircleCheckIcon,
  ExportIcon,
  ImportIcon,
} from "@icons"
import { colors } from "@lib"
import { AreaChartGrad, Button } from "@ui"

// TODO: Move data to an api call, and add props to the component
export const Attendance = () => {
  const primaryColor = colors.light.primary

  // TODO: Move this to an api call
  const areaChartData = [
    { month: "January", attendance: 0 },
    { month: "February", attendance: 240 },
    { month: "March", attendance: 100 },
    { month: "April", attendance: 73 },
    { month: "May", attendance: 180 },
    { month: "June", attendance: 120 },
  ]

  // TODO: Move to ./config.ts
  const areaChartConfig = {
    attendance: {
      label: "Attendance",
      color: primaryColor,
    },
  }

  return (
    <div className="flex flex-col bg-white text-right w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
        <div className=" ">
          {/* Weekly/Monthly Tabs */}
          <div className="flex justify-around mb-4 gap-3">
            <Button
              variant="outline"
              className="rounded-full shadow-none bg-white text-lg w-full text-foreground border-2 border-[#007C9E24] hover:bg-primary-opacity hover:border-none h-12"
            >
              الشهري
            </Button>
            <Button
              variant="outline"
              className="rounded-full shadow-none bg-white border-2 w-full text-lg border-[#007C9E24] hover:bg-primary-opacity hover:border-none text-foreground h-12"
            >
              الأسبوعي
            </Button>
          </div>

          {/* Percentages */}
          <div className="flex gap-8 justify-center mt-4 mb-8 text-primary font-bold text-lg">
            <div className="flex items-center gap-2">
              <span>% 24.8</span>
              <span className="bg-oceanBlue-opacity bg-opacity-10 py-[5px] px-1.5 rounded-full">
                <ArrowDownIcon className="fill-primary" />
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>% 75.2</span>
              <span className="bg-oceanBlue-opacity bg-opacity-10 py-[5px] px-1.5 rounded-full">
                <ArrowUpIcon />
              </span>
            </div>
          </div>

          {/* Line Chart */}
          <div className="mr-8">
            <AreaChartGrad
              chartData={areaChartData}
              chartConfig={areaChartConfig}
            />
          </div>
        </div>

        <div className="mt-5 space-y-6 border border-cloudGray rounded-xl">
          {/* Entry and Exit Times */}
          <h3 className="text-foreground font-semibold text-xl mb-4 leading-5 text-center rounded-t-xl bg-cloudGray p-6">
            بيانات الحضور والانصراف
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4">
            <div className="bg-cloudGray p-4 w-full rounded-base flex justify-center items-center gap-3 text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-white p-4 rounded-lg w-fit border-2 border-[#E2F3F7]">
                  <ImportIcon />
                </div>
                <span className="text-foreground font-semibold text-lg">
                  الدخول
                </span>
                <span className="text-primary text-2xl">06:20:27PM</span>
              </div>
            </div>
            <div className="bg-cloudGray p-4 w-full rounded-base flex justify-center items-center gap-3 text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-white p-4 rounded-lg w-fit border-2 border-[#E2F3F7]">
                  <ExportIcon />
                </div>
                <span className="text-foreground font-semibold text-lg">
                  الخروج
                </span>
                <span className="text-primary text-2xl">06:20:27PM</span>
              </div>
            </div>
          </div>

          {/* Employee Status */}
          <div className="bg-cloudGray p-4 rounded-base text-start flex justify-between gap-2.5 mx-4">
            <span className="text-foreground font-bold text-lg">
              حالة الموظف:
            </span>
            <div className="flex items-center gap-2">
              <CircleCheckIcon />
              <span className="font-normal text-foreground text-lg">
                على رأس العمل
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 px-4 pb-4">
            <Button className="bg-primary rounded-full shadow-none hover:bg-primary px-4 py-6 w-full text-lg text-white font-normal">
              حضور الموظفين
              <p className="p-2 rounded-full bg-white">
                <ArrowLeftIcon className="fill-primary" />
              </p>
            </Button>
            <Button className="bg-grey-700 rounded-full shadow-none hover:bg-grey-700 px-4 py-6 w-full text-lg text-black font-normal">
              الحضور و الإنصراف
              <p className="p-2 rounded-full bg-white">
                <ArrowLeftIcon className="fill-primary" />
              </p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
