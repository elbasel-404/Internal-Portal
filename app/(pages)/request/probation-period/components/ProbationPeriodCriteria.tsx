import { cn } from "@utils"

interface Criteria {
  probationCriteriaData: {
    question: string
    answer: string
  }[]
}

export const ProbationPeriodCriteria = ({
  probationCriteriaData,
}: Criteria) => {
  const rows = []
  for (let i = 0; i < probationCriteriaData.length; i += 2) {
    rows.push(probationCriteriaData.slice(i, i + 2))
  }

  return (
    <>
      {probationCriteriaData && probationCriteriaData.length !== 0 && (
        <>
          <div className="bg-primary-opacity py-6 px-[18px] border-r-4 border-r-primary">
            <h2 className="text-primary font-bold text-xl">
              معايير تقييم فترة التجربة
            </h2>
          </div>
          <div>
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={cn(
                  "grid grid-cols-2",
                  rowIndex % 2 === 0 ? "bg-grey-50" : "",
                )}
              >
                {row.map(({ question, answer }, index) => (
                  <div key={index} className="py-[22px] md:flex">
                    <div className="mx-3 md:basis-1/4 md:flex-1 md:max-w-[30%]">
                      {question}
                    </div>
                    <div className="font-medium mx-3 text-darkBlue">
                      {answer}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}
