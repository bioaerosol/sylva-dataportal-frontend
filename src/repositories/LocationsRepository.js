import $ from 'jquery'

class LocationsRepository {
  constructor() {
    this.target = import.meta.env.VITE_API_BASE
  }

  getAll() {
    const _deferred = $.Deferred()
    const _t = this.target + '/location'

    $.ajax({
      url: _t,
      dataType: "json",
      headers: {
        Accept: "application/json"
      }
    }).done(function (locations) {
      _deferred.resolve(locations)
    }).fail(function (err) {
      _deferred.reject(err)
    })

    return _deferred.promise()
  }
}

export default LocationsRepository