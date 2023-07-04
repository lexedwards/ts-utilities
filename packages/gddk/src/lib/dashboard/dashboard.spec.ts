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

      test('method is fully compatible with JSON.stringify', () => {
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
            "graphTooltip": 1,
            "liveNow": false,
            "time": {
              "from": "now-7d",
              "to": "now"
            },
            "timepicker": {
              "collapse": false,
              "enable": true,
              "refresh_intervals": [
                "1m",
                "10m",
                "30m"
              ]
            },
            "timezone": "browser",
            "style": "dark",
            "version": 1,
            "weekStart": "monday"
          }"
        `)
      })
    })
    // describe('addAnnotations', () => {})
    // describe('addLinks', () => {})
    // describe('[static] fromJSON', () => {})
  })
  describe('uid', () => {
    test('returning "uid" of a new dashboard panel', () => {
      const dashboard = new Dashboard({ title: 'hello world' })
      expect(dashboard.uid).toBe(undefined)
    })
    test('setting the uid when not initially set', () => {
      const dashboard = new Dashboard({ title: 'hello world' })
      dashboard.uid = 'some-value'
      expect(dashboard.uid).toBe('some-value')
    })
    test('protected if set in contructor', () => {
      const dashboard = new Dashboard({
        title: 'hello world',
        uid: 'some-value',
      })
      expect(() => (dashboard.uid = 'some-other-value')).toThrow()
    })
    test('once set, uid is protected from being set once again', () => {
      const dashboard = new Dashboard({ title: 'hello world' })
      dashboard.uid = 'some-value'
      expect(() => (dashboard.uid = 'some-other-value')).toThrow()
    })
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
    test('default description property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
      }).toJSON()
      expect(dashboardJSON.description).toMatchInlineSnapshot(`""`)
    })
    test('setting the description property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
        description: 'here is a description',
      }).toJSON()
      expect(dashboardJSON.description).toEqual('here is a description')
    })
  })

  describe('tags', () => {
    test('default tags property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
      }).toJSON()
      expect(dashboardJSON.tags).toMatchInlineSnapshot(`[]`)
    })
    test('setting the tag property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
        tags: ['tag1', 'tag2', 'tag3'],
      }).toJSON()
      expect(dashboardJSON.tags).toStrictEqual(['tag1', 'tag2', 'tag3'])
    })
  })

  describe('editable', () => {
    test('default editable property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
      }).toJSON()
      expect(dashboardJSON.editable).toMatchInlineSnapshot(`true`)
    })
    test('setting the editable property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
        editable: false,
      }).toJSON()
      expect(dashboardJSON.editable).toBe(false)
    })
  })

  describe('fiscalMonth', () => {
    test('default fiscalYearStartMonth property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
      }).toJSON()
      expect(dashboardJSON.fiscalYearStartMonth).toMatchInlineSnapshot(`0`)
    })
    test('setting the fiscaleYearStartMonth property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
        fiscalMonth: 'April',
      }).toJSON()
      expect(dashboardJSON.fiscalYearStartMonth).toBe(3)
    })
  })

  describe('graphTooltip', () => {
    test('default graphToolTip property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
      }).toJSON()
      expect(dashboardJSON.graphTooltip).toMatchInlineSnapshot(`1`)
    })
    test('setting the graphTooltip property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
        graphTooltip: 1,
      }).toJSON()
      expect(dashboardJSON.graphTooltip).toBe(1)
    })
  })

  describe('version', () => {
    test('default version property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
      }).toJSON()
      expect(dashboardJSON.version).toMatchInlineSnapshot(`1`)
    })
    test('setting the revision property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
        version: 1234,
      }).toJSON()
      expect(dashboardJSON.version).toBe(1234)
    })
  })

  describe('style', () => {
    test('default style property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
      }).toJSON()
      expect(dashboardJSON.style).toMatchInlineSnapshot(`"dark"`)
    })
    test('setting the style property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
        style: 'light',
      }).toJSON()
      expect(dashboardJSON.style).toBe('light')
    })
  })

  describe('timepicker options', () => {
    test('default options for the timepicker property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
      }).toJSON()
      expect(dashboardJSON.timepicker).toMatchInlineSnapshot(`
        {
          "collapse": false,
          "enable": true,
          "refresh_intervals": [
            "1m",
            "10m",
            "30m",
          ],
        }
      `)
    })
    test('setting the timepicker refresh invervals in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
        timepicker: { refresh_intervals: ['1m', '1h', '1d'] },
      }).toJSON()
      expect(dashboardJSON.timepicker.refresh_intervals).toStrictEqual([
        '1m',
        '1h',
        '1d',
      ])
    })
  })

  describe('timeWindow', () => {
    test('default time property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
      }).toJSON()
      expect(dashboardJSON.time).toMatchInlineSnapshot(`
        {
          "from": "now-7d",
          "to": "now",
        }
      `)
    })
    test('setting the time property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
        timeWindow: { from: 'now-1d', to: 'now' },
      }).toJSON()
      expect(dashboardJSON.time).toStrictEqual({ from: 'now-1d', to: 'now' })
    })
  })

  describe('timezone', () => {
    test('default timezone property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
      }).toJSON()
      expect(dashboardJSON.timezone).toMatchInlineSnapshot(`"browser"`)
    })
    test('setting the timezone property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
        timezone: 'browser',
      }).toJSON()
      expect(dashboardJSON.timezone).toStrictEqual('browser')
    })
  })

  describe('weekStart', () => {
    test('default weekStart property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
      }).toJSON()
      expect(dashboardJSON.weekStart).toMatchInlineSnapshot(`"monday"`)
    })
    test('setting the weekStart property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
        weekStart: 'thursday',
      }).toJSON()
      expect(dashboardJSON.weekStart).toBe('thursday')
    })
  })

  describe('refresh', () => {
    test('default refresh property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
      }).toJSON()
      expect(dashboardJSON.refresh).toMatchInlineSnapshot(`""`)
    })
    test('setting the refresh property in JSON', () => {
      const dashboardJSON = new Dashboard({
        title: 'hello world',
        refresh: '30d',
      }).toJSON()
      expect(dashboardJSON.refresh).toBe('30d')
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
