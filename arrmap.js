const BaseUndev = require('./baseundev')
/* eslint-disable require-jsdoc */

module.exports = class ArrMap extends BaseUndev {
  /**
   * build index on array elements by property
   * @function
   * @param {Array} arr source array of objects
   * @param {String} property property for index
   * @param {Object} [opts] options
   * @param {String} opts.emptyProp group by emptyProp if no property
   * @param {Function} opts.getValue extract function -> (el, property) => { }
   * @return {Object}
   */
  static indexby(arr, property, opts = {}) {
    if (!Array.isArray(arr)) {
      throw new Error(`groupby arr must be Array`)
    }
    const acc = {}
    arr.forEach((el) => {
      let prop
      if (typeof opts.getValue === 'function') {
        prop = opts.getValue(el, property)
      } else {
        prop = el[property]
      }
      if (prop) {
        acc[prop] = el
      } else {
        if (opts.emptyProp) {
          acc[opts.emptyProp] = acc[opts.emptyProp] || []
          acc[opts.emptyProp].push(el)
        }
      }
    })
    return acc
  }
  /*
  * @param {Array} arr source array of objects
  * @param {String} property property for grouping
  * @param {Object} [opts] options
  * @param {String} opts.defProp group by defProp if no property
  * @param {Function} opts.getValue extract function -> (el, property) => { }
  * @return {Object}
  */
  static groupby(arr, property, opts = {}) {
    if (!Array.isArray(arr)) {
      throw new Error(`groupby arr must be Array`)
    }
    const acc = {}
    arr.forEach((el) => {
      let prop
      if (typeof opts.getValue === 'function') {
        prop = opts.getValue(el, property)
      } else {
        prop = el[property] || opts.defProp
      }
      if (prop) {
        acc[prop] = acc[prop] || []
        acc[prop].push(el)
      }
    })
    return acc
  }

  static filterMap(operand, handler) {
    return operand.reduce((acc, el, idx) => {
      const val = handler(el, idx)
      val && acc.push(val)
      return acc
    }, [])
  }


  group(...args) {
    this.operand = ArrMap.groupby(this.operand, ...args)
    return this
  }

  index(...args) {
    this.operand = ArrMap.indexby(this.operand, ...args)
    return this
  }

  filtermap(handler) {
    this.operand = ArrMap.filterMap(this.operand, handler)
    return this
  }
}
