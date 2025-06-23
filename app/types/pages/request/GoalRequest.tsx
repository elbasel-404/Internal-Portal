export interface GoalRequest {
  id: string
  individualGoal: string
  indicators: {
    indicatorPerformance: string
    targetType: string
    targetValue: string
    indicatorScale: string
    achievementSteps: string
    indicatorWeight: string
  }[]
  goalWeight: string
  firstCorporateGoal: string
  secondStrategicGoal: string
  thirdStrategicGoal: string
}
