/* eslint-disable require-jsdoc */
class PromiseMap {
  constructor(promise) {
    this.promise = promise
  }

  from(promise) {
    return new PromiseMap(promise)
  }

  next(fn) {
    this.promise = this.promise.then(fn)
    return this
  }

  map(fn) {
    this.promise = this.promise.then((recs) => recs.map(fn))
    return this
  }

  mapPromise(fn) {
    this.promise = this.promise.then((recs) => Promise.all(recs.map(fn)))
    return this
  }

  forEach(fn) {
    this.promise = this.promise.then((recs) => recs.forEach(fn))
    return this
  }

  filter(fn) {
    this.promise = this.promise.then((recs) => recs.filter(fn))
    return this
  }

  find(fn) {
    this.promise = this.promise.then((recs) => recs.find(fn))
    return this
  }

  sort(fn) {
    this.promise = this.promise.then((recs) => recs.sort(fn))
    return this
  }

  slice(s, e) {
    this.promise = this.promise.then((recs) => recs.slice(s, e))
    return this
  }

  reduce(fn, acc) {
    this.promise = this.promise.then((recs) => recs.reduce(fn, acc))
    return this
  }

  reducePromise(fn) {
    this.promise = this.promise.then((recs) => Promise.all(recs.reduce(fn, [])))
    return this
  }

  get(debug) {
    if (debug) {
      return this.debug(debug)
    } else {
      return this.promise
    }
  }

  asObject() {
    this.promise = this.promise.then((r) => r && r[0])
    return this
  }

  first() {
    this.promise = this.promise.then((r) => r && r[0])
    return this
  }

  debug({suppress, title = 'PromiseMap error message: ', log}) {
    if (log) {
      this.promise = this.promise.then((r) => {
        console.log(title + ': ' + JSON.stringify(r))
        return r
      })
    }
    return this.promise.catch((error) => {
      console.error(title + ': ' + error.stack)
      if (!suppress) {
        throw error
      } else {
        return error
      }
    })
  }
}

module.exports = PromiseMap
