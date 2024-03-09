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

  getTimeline(/** @type TimelineResolution */ timelineResolution = TimelineResolution.YEAR, /** @type string */ deviceId) {
    const _deferred = $.Deferred()
    const _t = this.target

    $.ajax({
      url: _t,
      dataType: "json",
      data: {
        resolution: timelineResolution,
        devices: deviceId
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