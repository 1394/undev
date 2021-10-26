module.exports = class Chain {
  constructor(operand) {
    this.operand = operand
    return this
  }

  if(...args) {
    // console.log('if.b', this.operand)
    if (typeof this.operand[args[0]] === 'function') {
      const method = args.shift()
      this.operand = this.operand[method](...args) ? this.operand : undefined
      return this
    }
    const [handler, falseHandler] = typeof args[0] === 'function' && args
    this.operand = handler(this.operand) ? this.operand :
      (typeof falseHandler === 'function' ? falseHandler(this.operand) : (falseHandler || undefined))
    // console.log('if.a', this.operand)
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
    // console.log('not.b', this.operand)
    this.operand = handler(this.operand) ? undefined : this.operand
    // console.log('not.a', this.operand)
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

  get(handler) {
    return typeof handler === 'function' ? handler(this.operand) : this.operand
  }
}
