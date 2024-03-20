import $ from 'jquery'

class WorkspaceRepository {
    constructor() {
      this.target = import.meta.env.VITE_API_BASE + "/workspace"
    }

    get(/** @type string */ id) {
      const _deferred = $.Deferred()
      const _t = this.target
  
      $.ajax({
        url: _t + '/' + id,
        contentType : 'application/json',
        dataType: "json",
        method: "get",
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
  
    requestWorkspace(/** @type object */ deviceId, /** @type DateTime */ from, /** @type DateTime */ to, /** @type string */ token) {
      const _deferred = $.Deferred()
      const _t = this.target
  
      if (deviceId) {
        if (Array.isArray(deviceId)) {
          deviceId = deviceId.join(',')
        }
      }
  
      $.ajax({
        url: _t,
        contentType : 'application/json',
        dataType: "json",
        method: "post",
        data: JSON.stringify({
          devices: deviceId,
          from: (from ? from.toISODate() : undefined),
          to: (to ? to.toISODate() : undefined),
          token: token
        }),
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
  
  export { WorkspaceRepository }