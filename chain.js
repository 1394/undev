/* eslint-disable require-jsdoc */
const Parent = require('./parent')

module.exports = class Chain extends Parent {
  if(...args) {
    if (typeof this.operand[args[0]] === 'function') {
      const method = args.shift()
      this.operand = this.operand[method](...args) ? this.operand : undefined
      return this
    }
    const [handler, falseHandler] = typeof args[0] === 'function' && args
    this.operand = handler(this.operand) ? this.operand :
      (typeof falseHandler === 'function' ? falseHandler(this.operand) : (falseHandler || undefined))
    return this
  }

  iftype(typename) {
    if (typename === 'array') {
      this.operand = Array.isArray(this.operand) ? this.operand : undefined
    } else {
      this.operand = typeof this.operand === typename ? this.operand : undefined
    }
    return this
  }

  subs(handler, val) {
    this.operand = handler(this.operand) ? val : this.operand
    return this
  }

  not(handler) {
    this.operand = handler(this.operand) ? undefined : this.operand
    return this
  }

  to(method, ...args) {
    if (typeof method === 'function') {
      this.operand = method(this.operand, ...args)
      return this
    }
    if (this.operand && typeof this.operand[method] === 'function') {
      this.operand = this.operand[method](...args)
      return this
    }
    return this
  }
}
