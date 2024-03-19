import $ from 'jquery'

const TimelineResolution = {
  DAY: "day",
  MONTH: "month",
  YEAR: "year"
}

class TimelineRepository {
  constructor() {
    this.target = import.meta.env.VITE_API_BASE + "/data/timeline"
  }

  getTimeline(/** @type TimelineResolution */ timelineResolution = TimelineResolution.YEAR, /** @type object */ deviceId, /** @type DateTime */ from, /** @type DateTime */ to) {
    const _deferred = $.Deferred()
    const _t = this.target

    if (deviceId) {
      if (Array.isArray(deviceId)) {
        deviceId = deviceId.join(',')
      }
    }

    $.ajax({
      url: _t,
      dataType: "json",
      data: {
        resolution: timelineResolution,
        devices: deviceId,
        from: (from ? from.toISODate() : undefined),
        to: (to ? to.toISODate() : undefined)
      },
      headers: {
        Accept: "application/json"
      }
    }).done(function (data) {
      _deferred.resolve(data)
    }).fail(function (err) {
      _deferred.reject(err)
    })

    return _deferred.promise()
  }
}

export { TimelineRepository, TimelineResolution }