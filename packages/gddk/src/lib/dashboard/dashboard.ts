// import { Annotation } from './annotation'
// import { Link } from './link'
// import { Panel } from './panel'
// import { Row } from './row'

type FiscalYearOption =
  | 'January'
  | 'Febuary'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'
type FiscalYear = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
const FiscalYearMap: Record<FiscalYearOption, FiscalYear> = {
  January: 0,
  Febuary: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
}

type WeekStart =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

type Style = 'light' | 'dark'

interface TimeWindow {
  from: string
  to: string
}

interface DashboardProps {
  /** */
  description?: string
  /** */
  editable?: boolean
  /** */
  fiscalMonth?: FiscalYearOption
  /** */
  style?: Style
  /** */
  tags?: Array<string>
  /** */
  timepicker?: Array<ShorthandTime>
  /** */
  timeWindow?: TimeWindow
  /** */
  title: string
  /** */
  refresh?: ShorthandTime
  /** */
  revision?: number
  /** */
  weekStart?: WeekStart
}

type ShorthandTime = `${number}${'s' | 'm' | 'h' | 'd'}` | ''

export class Dashboard {
  // #uid: string
  // #id: number
  #title: string
  #description: string
  #editable: boolean
  // #annotations: Array<Annotation>
  #fiscalYearStartMonth: FiscalYear
  // #graphTooltip = 1
  // #links: Array<Link>
  #liveNow = false
  // #panels: Array<Panel|Row>
  #refresh: ShorthandTime
  #revision: number
  // #schemaVersion: number
  #style: Style
  #tags: Array<string>
  // #templating
  #time: TimeWindow
  #timepicker: Array<ShorthandTime>
  #timezone = ''
  #weekStart: WeekStart

  constructor({
    title,
    description = '',
    editable = true,
    fiscalMonth = 'January',
    style = 'dark',
    tags = [],
    timepicker = [],
    timeWindow = { from: 'now-7d', to: 'now' },
    refresh = '',
    revision = 1,
    weekStart = 'monday',
  }: DashboardProps) {
    if (!title) {
      throw new Error('A Dashboard must always have an title')
    }
    this.#title = title
    this.#description = description
    this.#tags = tags
    this.#fiscalYearStartMonth = FiscalYearMap[fiscalMonth]
    this.#time = timeWindow
    this.#timepicker = timepicker
    this.#editable = editable
    this.#refresh = refresh
    this.#revision = revision
    this.#style = style
    this.#weekStart = weekStart
  }

  // addAnnotations(...annotations: Array<Annotation>) {
  //   this.#annotations.push(...annotations)
  // }

  // addLinks(...links: Array<Link>) {
  //   this.#links.push(...links)
  // }

  toJSON() {
    return {
      title: this.#title,
      description: this.#description,
      // annotations: this.#annotations.length
      //   ? {
      //       list: this.#annotations,
      //     }
      //   : {},
      // links: this.#links,
      tags: this.#tags,
      refresh: this.#refresh,
      editable: this.#editable,
      fiscalYearStartMonth: this.#fiscalYearStartMonth,
      liveNow: this.#liveNow,
      revision: this.#revision,
      time: this.#time,
      timepicker: this.#timepicker.length
        ? {
            refresh_intervals: this.#timepicker,
          }
        : {},
      timezone: this.#timezone,
      weekStart: this.#weekStart,
      style: this.#style,
    }
  }
}
