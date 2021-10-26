/* eslint-disable require-jsdoc */


module.exports = class ObjMap {
  constructor(obj) {
    this.obj = obj
  }

  only(...fields) {
    if (fields.length === 1 && Array.isArray(fields[0])) {
      fields = fields[0]
    }
    if (typeof fields[0] === 'object' && fields[1] === undefined && Object.keys(fields[0]).length) {
      fields = Object.keys(fields[0])
    }
    this.obj = Object.fromEntries(Object.entries(this.obj).filter(([k]) => fields.includes(k)))
    return this
  }

  get(handler) {
    return typeof handler === 'function' ? handler(this.obj) : this.obj
  }
}
