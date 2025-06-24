export interface GoalFlowRequest {
  id: string
  individualGoal: string
  goalWeight: string
  progressStatus: string
  notes: string
  firstCorporateGoal: string
  secondStrategicGoal: string
  thirdStrategicGoal: string
  activities: string
  activityStatus: string
  activityDate: string
  indicators: {
    indicatorPerformance: string
    targetType: string
    targetValue: string
    indicatorScale: string
    achievementSteps: string
    indicatorWeight: string
  }[]
}
