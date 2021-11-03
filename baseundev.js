/* eslint-disable require-jsdoc */
module.exports = class BaseUndev {
  constructor(operand) {
    this.operand = operand
    return this
  }

  static from(operand) {
    return new this(operand)
  }

  get(handler) {
    return typeof handler === 'function' ? handler(this.operand) : this.operand
  }
}
