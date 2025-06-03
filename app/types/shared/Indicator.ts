export interface Indicator {
  id: string
  name: string
  isChecked: boolean
  targetType: string
  targetValue: number | string
  indicatorScale: string
  achievementSteps: string
  indicatorWeight: number
}
