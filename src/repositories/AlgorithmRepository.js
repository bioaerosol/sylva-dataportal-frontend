import $ from 'jquery'

class AlgorithmRepository {
    constructor() {
      this.target = import.meta.env.VITE_ALGORITHM_API_BASE
    }

    getRunOrders() {
        const _deferred = $.Deferred()
        const _t = this.target + "/runOrders"
    
        $.ajax({
          url: _t,
          dataType: "json",
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

      getRuns(runOrderId) {
        const _deferred = $.Deferred()
        const _t = this.target + "/runOrders/" + runOrderId + "/runs"
    
        $.ajax({
          url: _t,
          dataType: "json",
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

      getRun(runOrderId, runId) {
        const _deferred = $.Deferred()
        const _t = this.target + "/runOrders/" + runOrderId + "/runs/" + runId
    
        $.ajax({
          url: _t,
          dataType: "json",
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

export { AlgorithmRepository }