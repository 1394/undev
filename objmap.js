/* eslint-disable require-jsdoc */
const BaseUndev = require('./baseundev')
const ArrMap = require('./arrmap')

module.exports = class ObjMap extends BaseUndev {
  static isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
  }
  static assemble(operand, handler) {
    return Object.fromEntries(
      new ArrMap(Object.entries(operand))
        .filtermap(([p, v]) => handler(p, v))
        .get(),
    )
  }

  useDefs(sample, defValues = [undefined, false]) {
    if (ObjMap.isObject(sample)) {
      this.operand = ObjMap.assemble(this.operand, (p, v) => {
        if (sample.hasOwnProperty(p)) {
          return defValues.some((el) => el === v) ? [p, sample[p]] : [p, v]
        } else {
          return [p, v]
        }
      })
    }
    return this
  }

  only(...fields) {
    let handler
    if (fields.length === 1 && Array.isArray(fields[0])) {
      fields = fields[0]
    }
    if (ObjMap.isObject(fields[0]) && fields[2] === undefined && Object.keys(fields[0]).length) {
      const [sample, opts = {}] = fields
      opts.useDefs = opts.useDefs ? (Array.isArray(opts.useDefs) ? opts.useDefs : [undefined]) : false
      handler = (p, v) => {
        if (sample.hasOwnProperty(p)) {
          return opts.useDefs && opts.useDefs.some((el) => el === v) ? [p, sample[p]] : [p, v]
        }
      }
    } else {
      handler = (p, v) => fields.includes(p) && [p, v]
    }
    this.operand = ObjMap.assemble(this.operand, handler)
    return this
  }

  assemble(handler) {
    this.operand = ObjMap.assemble(this.operand, handler)
    return this
  }

  withFields(fields, handler) {
    return this.assemble((p, v) => {
      if (fields.includes(p)) {
        return [p, handler(v, p)]
      } else {
        return [p, v]
      }
    })
  }

  get(handler) {
    return typeof handler === 'function' ? handler(this.operand) : this.operand
  }
}
