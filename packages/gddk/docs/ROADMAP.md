# Roadmap

- [Constructs](#constructs)
  - [Dashboard](#dashboard)
    - [Root Properties](#root-properties)
    - [Instance Methods](#instance-methods)
    - [Static Methods](#static-methods)
  - [Annotations](#annotations)
    - [Root Properties](#root-properties-1)
    - [Instance Methods](#instance-methods-1)
    - [Static Methods](#static-methods-1)
  - [Links](#links)
    - [Root Properties](#root-properties-2)
    - [Instance Methods](#instance-methods-2)
    - [Static Methods](#static-methods-2)
  - [Alerts](#alerts)
    - [Root Properties](#root-properties-3)
    - [Instance Methods](#instance-methods-3)
    - [Static Methods](#static-methods-3)
  - [Variables / Templating](#variables--templating)
    - [Root Properties](#root-properties-4)
    - [Instance Methods](#instance-methods-4)
    - [Static Methods](#static-methods-4)
  - [Data Sources](#data-sources)
    - [Root Properties](#root-properties-5)
    - [Instance Methods](#instance-methods-5)
    - [Static Methods](#static-methods-5)
  - [Panels](#panels)
    - [Root Properties](#root-properties-6)
    - [Instance Methods](#instance-methods-6)
    - [Static Methods](#static-methods-6)
  - [Rows](#rows)
    - [Root Properties](#root-properties-7)
    - [Instance Methods](#instance-methods-7)
    - [Static Methods](#static-methods-7)
- [HTTP Client](#http-client)
  - [Constructs](#constructs-1)
  - [Authentication / Authorisation](#authentication--authorisation)
  - [Get Dashboard by UID](#get-dashboard-by-uid)
  - [Download Dashboard JSON](#download-dashboard-json)
  - [Update Dashboard](#update-dashboard)

## Constructs

### Dashboard

#### Root Properties

- [ ] `annotations` - See [Annotations](#annotations)
- [x] `title`
- [x] `description`
- [x] `editable`
- [x] `fiscalYearStartMonth`
- [x] `graphTooltip`
- [ ] `id`
- [ ] `links` - See [Links](#links)
- [x] `liveNow`
- [ ] `panels` - See [Panels](#panels) and [Rows](#rows)
- [ ] `schemaVersion`
- [x] `style`
- [x] `tags`
- [ ] `templating` - See [Variables / Templating](#variables--templating)
- [x] `time`
- [x] `timepicker`
- [x] `timezone`
- [x] `refresh`
- [x] `revision`
- [x] `weekStart`
- [x] `uid`

#### Instance Methods

- [ ] `addAnnotations`
- [ ] `addLinks`
- [ ] `addVariables`
- [x] `toJSON`

#### Static Methods

- [ ] `fromJSON`

### Annotations

#### Root Properties

#### Instance Methods

- [x] `toJSON`

#### Static Methods

- [ ] `fromJSON`
- [ ] `default`

### Links

#### Root Properties

#### Instance Methods

- [x] `toJSON`

#### Static Methods

- [ ] `fromJSON`

### Alerts

#### Root Properties

#### Instance Methods

- [x] `toJSON`

#### Static Methods

- [ ] `fromJSON`

### Variables / Templating

#### Root Properties

#### Instance Methods

- [x] `toJSON`

#### Static Methods

- [ ] `fromJSON`

### Data Sources

#### Root Properties

#### Instance Methods

- [x] `toJSON`

#### Static Methods

- [ ] `fromJSON`

### Panels

#### Root Properties

#### Instance Methods

- [x] `toJSON`

#### Static Methods

- [ ] `fromJSON`

### Rows

#### Root Properties

#### Instance Methods

- [x] `toJSON`

#### Static Methods

- [ ] `fromJSON`

## HTTP Client

### Constructs

### Authentication / Authorisation

### Get Dashboard by UID

### Download Dashboard JSON

### Update Dashboard
