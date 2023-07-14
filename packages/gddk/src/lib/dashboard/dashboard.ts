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
enum GraphTooltip {
  INDEPENDENT,
  CROSSHAIR,
  CROSSHAIR_AND_TOOLTIP,
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

type TimeZone = 'utc' | 'browser'

interface TimePickerOptions {
  refresh_intervals?: Array<ShorthandTime>
  collapse?: boolean
  enable?: boolean
  notice?: boolean
  now?: boolean
}

interface TimeWindow {
  from: string
  to: string
}

type ShorthandTime = `${number}${'s' | 'm' | 'h' | 'd'}` | ''

interface DashboardProps {
  /** */
  description?: string
  /** */
  editable?: boolean
  /** */
  fiscalMonth?: FiscalYearOption
  /** */
  graphTooltip?: GraphTooltip
  /** */
  style?: Style
  /** */
  tags?: Array<string>
  /** */
  timepicker?: TimePickerOptions
  /** */
  timeWindow?: TimeWindow
  /** */
  timezone?: TimeZone
  /** */
  title: string
  /** */
  uid?: string
  /** */
  refresh?: ShorthandTime
  /** */
  version?: number
  /** */
  weekStart?: WeekStart
}

export class Dashboard {
  #uid?: string
  #id = null
  #title: string
  #description: string
  #editable: boolean
  // #annotations: Array<Annotation>
  #fiscalYearStartMonth: FiscalYear
  #graphTooltip: GraphTooltip
  // #links: Array<Link>
  #liveNow = false
  // #panels: Array<Panel|Row>
  #refresh: ShorthandTime
  #schemaVersion = 38 as const
  #style: Style
  #tags: Array<string>
  // #templating
  #time: TimeWindow
  #timepicker: TimePickerOptions
  #timezone: TimeZone
  #version: number
  #weekStart: WeekStart

  constructor({
    title,
    description = '',
    editable = true,
    fiscalMonth = 'January',
    graphTooltip = GraphTooltip.CROSSHAIR,
    refresh = '',
    style = 'dark',
    tags = [],
    timepicker = {
      collapse: false,
      enable: true,
      refresh_intervals: ['1m', '10m', '30m'],
    },
    timeWindow = { from: 'now-7d', to: 'now' },
    timezone = 'browser',
    uid = undefined,
    version = 1,
    weekStart = 'monday',
  }: DashboardProps) {
    if (!title) {
      throw new Error('A Dashboard must always have an title')
    }
    this.#title = title
    this.#description = description
    this.#editable = editable
    this.#tags = tags
    this.#fiscalYearStartMonth = FiscalYearMap[fiscalMonth]
    this.#graphTooltip = graphTooltip
    this.#refresh = refresh
    this.#style = style
    this.#time = timeWindow
    this.#timepicker = timepicker
    this.#timezone = timezone
    this.#uid = uid
    this.#version = version
    this.#weekStart = weekStart
  }

  // addAnnotations(...annotations: Array<Annotation>) {
  //   this.#annotations.push(...annotations)
  // }

  // addLinks(...links: Array<Link>) {
  //   this.#links.push(...links)
  // }

  get uid() {
    return this.#uid
  }

  set uid(potentialValue: string) {
    if (this.#uid) {
      throw new Error('UID is already set, and once set can not be mutated')
    }
    this.#uid = potentialValue
  }

  toJSON() {
    return {
      title: this.#title,
      description: this.#description,
      // annotations:
      //    {
      //       list: this.#annotations,
      //     }
      // links: this.#links,
      tags: this.#tags,
      refresh: this.#refresh,
      editable: this.#editable,
      fiscalYearStartMonth: this.#fiscalYearStartMonth,
      graphTooltip: this.#graphTooltip,
      id: this.#id,
      liveNow: this.#liveNow,
      time: this.#time,
      timepicker: this.#timepicker,
      timezone: this.#timezone,
      style: this.#style,
      schemaVersion: this.#schemaVersion,
      uid: this.#uid,
      version: this.#version,
      weekStart: this.#weekStart,
    }
  }
}
