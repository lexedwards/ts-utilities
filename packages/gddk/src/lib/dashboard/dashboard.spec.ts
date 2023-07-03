import { describe, test, expect } from '@jest/globals'
import { Dashboard } from './dashboard'

describe('Dashboard Construction', () => {
  describe('class methods', () => {
    describe('toJSON', () => {
      test('returns JSON object', () => {
        const actualJSON = new Dashboard({
          title: 'title',
          description: 'description',
        }).toJSON()

        expect(actualJSON).toMatchObject({
          title: 'title',
          description: 'description',
        })
      })

      test('returns a method compatible with JSON.stringify', () => {
        const dashboard = new Dashboard({
          title: 'title',
          description: 'description',
        })
        const actualJSONString = JSON.stringify(dashboard, null, 2)
        expect(actualJSONString).toMatchInlineSnapshot(`
          "{
            "title": "title",
            "description": "description",
            "tags": [],
            "refresh": "",
            "editable": true,
            "fiscalYearStartMonth": 0,
            "liveNow": false,
            "revision": 1,
            "time": {
              "from": "now-7d",
              "to": "now"
            },
            "timepicker": {},
            "timezone": "",
            "weekStart": "monday",
            "style": "dark"
          }"
        `)
      })
    })
    // describe('addAnnotations', () => {})
    // describe('addLinks', () => {})
    // description('[static] fromJSON', () => {})
  })

  describe('title', () => {
    test('throwing an error when title is omitted', () => {
      // @ts-expect-error required arugment is missing
      expect(() => new Dashboard({})).toThrowError()
    })
    test('setting the title property in JSON', () => {
      const dashboard = new Dashboard({ title: 'hello world' })
      expect(dashboard.toJSON().title).toEqual('hello world')
    })
  })

  describe('description', () => {
    test('setting the description property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
        description: 'here is a description',
      }).toJSON()
      expect(dashboardJSON.description).toEqual('here is a description')
    })
  })

  describe('tags', () => {
    test('setting the tag property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
        tags: ['tag1', 'tag2', 'tag3'],
      }).toJSON()
      expect(dashboardJSON.tags).toStrictEqual(['tag1', 'tag2', 'tag3'])
    })
  })

  describe('editable', () => {
    test('setting the editable property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
        editable: false,
      }).toJSON()
      expect(dashboardJSON.editable).toBe(false)
    })
  })

  describe('fiscalMonth', () => {
    test('setting the fiscaleYearStartMonth property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
        fiscalMonth: 'April',
      }).toJSON()
      expect(dashboardJSON.fiscalYearStartMonth).toBe(3)
    })
  })

  describe('revision', () => {
    test('setting the revision property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
        revision: 1234,
      }).toJSON()
      expect(dashboardJSON.revision).toBe(1234)
    })
  })

  describe('style', () => {
    test('setting the style property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
        style: 'light',
      }).toJSON()
      expect(dashboardJSON.style).toBe('light')
    })
  })

  describe('timeWindow', () => {
    test('setting the time property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
        timeWindow: { from: 'now-1d', to: 'now' },
      }).toJSON()
      expect(dashboardJSON.time).toStrictEqual({ from: 'now-1d', to: 'now' })
    })
  })

  describe('weekStart', () => {
    test('setting the weekStart property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
        weekStart: 'thursday',
      }).toJSON()
      expect(dashboardJSON.weekStart).toBe('thursday')
    })
  })

  describe('refresh', () => {
    test('setting the refresh property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
        refresh: '30d',
      }).toJSON()
      expect(dashboardJSON.refresh).toBe('30d')
    })
  })

  describe('timepicker', () => {
    test('setting the timepicker refresh invervals in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
        timepicker: ['1m', '1h', '1d'],
      }).toJSON()
      expect(dashboardJSON.timepicker.refresh_intervals).toStrictEqual([
        '1m',
        '1h',
        '1d',
      ])
    })
  })

  // describe('liveNow', () => {})
  // describe('timeszone', () => {})
  // describe('annotations', () => {})
  // describe('links', () => {})
  // describe('panels', () => {})
  // describe('schemaVersion', () => {})
  // describe('templating', () => {})
  // describe('graphTooltip', () => {})
  // describe('uid', () => {})
  // describe('id', () => {})
})
