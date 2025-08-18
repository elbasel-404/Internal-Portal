// import { RequestGeneralData } from "@components"
import { FormHeader } from "@components/form"
import type { ReactNode } from "react"
import { ButtonLink } from "./components"
import { paths } from "@lib"

export const metadata = {
  title: "Ticket",
  description: "Ticket Data",
}
interface TicketLayoutProps {
  children: ReactNode
}
const CreateTicketLayout = ({ children }: TicketLayoutProps) => {
  return (
    <>
      <main className="space-y-4">
        <div className="bg-white rounded-tr-md rounded-tl-md px-4">
          <FormHeader label="إنشاء تذكرة جديدة" path={paths.tickets.href} />
          <div className="space-y-8 mt-4">
            <div className="space-y-2">
              <h2>الرجاء اختيار نوع التذكرة</h2>
              <div className="flex gap-2">
                <ButtonLink
                  activeUrls={[
                    "/request/ticket/new/technical/report-problem",
                    "/request/ticket/new/technical/service-request",
                  ]}
                  href="/request/ticket/new/technical/report-problem"
                >
                  تقنية
                </ButtonLink>
                <ButtonLink
                  activeUrls={["/request/ticket/new/non-technical"]}
                  href="/request/ticket/new/non-technical"
                >
                  غير تقني
                </ButtonLink>
              </div>
            </div>
            <div className="space-y-2">
              <h2>الرجاء اختيار نوع تذكرة التقنية</h2>
              <div className="flex gap-2">
                <ButtonLink
                  activeUrls={["/request/ticket/new/technical/report-problem"]}
                  href="/request/ticket/new/technical/report-problem"
                >
                  الابلاغ عن مشكلة
                </ButtonLink>
                <ButtonLink
                  activeUrls={["/request/ticket/new/technical/service-request"]}
                  href="/request/ticket/new/technical/service-request"
                >
                  طلب خدمة
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </main>
      {children}
    </>
  )
}

export default CreateTicketLayout
