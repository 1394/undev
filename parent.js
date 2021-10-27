/* eslint-disable require-jsdoc */
module.exports = class Parent {
  constructor(operand) {
    this.operand = operand
    return this
  }

  get(handler) {
    return typeof handler === 'function' ? handler(this.operand) : this.operand
  }
}
