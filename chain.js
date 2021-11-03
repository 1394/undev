/* eslint-disable require-jsdoc */
const BaseUndev = require('./baseundev')

module.exports = class Chain extends BaseUndev {
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

  do(method, ...args) {
    if (typeof method === 'function') {
      this.operand = method(this.operand, ...args)
    }
    return this
  }

  _isPromise() {
    return this.operand instanceof Promise
  }

  static log(operand, depth = 5, text) {
    console.log(`\n -->>>--[logging.on] chain operand${text && `, "${text}"` || ''}`)
    console.dir(operand, {depth})
    console.log('  --<<<--[logging.off]\n')
  }

  log(depth, text) {
    if (this._isPromise()) {
      this.operand.then((operand) => Chain.log(operand, depth, text))
    } else {
      Chain.log(this.operand, depth, text)
    }
    return this
  }

  to(...args) {
    this.operand = Chain.to(this.operand, ...args)
    return this
  }

  static to(operand, method, ...args) {
    if (!operand) {
      return
    }
    if (operand instanceof Promise) {
      return operand.then((op) => {
        if (typeof method === 'function') {
          return method(op, ...args)
        }
        if (typeof op[method] === 'function') {
          return op[method](...args)
        }
        return op
      })
    } else {
      if (typeof method === 'function') {
        return method(operand, ...args)
      }
      if (typeof operand[method] === 'function') {
        return operand[method](...args)
      }
    }
    return operand
  }
}
