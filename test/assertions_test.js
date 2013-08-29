var assert = require("assert")
var Must = require("..")

function mustThrowAssertionError(test, props) {
  describe("AssertionError", function() {
    it("must be thrown", function() {
      assert.throws(test, Must.AssertionError)
    })

    it("must have properties", function() {
      try { test() }
      catch (ex) {
        assert.deepEqual(ex, props)
      }
    })

    it("must have stack trace", function() {
      try { test() }
      catch (ex) {
        var stack = ex.stack.split("\n")
        assert(stack[0].match(/AssertionError/, "must include AssertionError"))
        assert(stack[1].match(/\/test\//), "must have test at top")
      }
    })
  })
}

describe("Must.prototype.be", function() {
  it("must return an instance of Must", function() {
    assert(true.must.be instanceof Must)
  })

  it("must carry over the current state", function() {
    assert.doesNotThrow(function() { (42).must.be.equal(42) })
  })

  it("must be like Must.prototype.equal", function() {
    assert.doesNotThrow(function() { false.must.be(false) })
    assert.throws(function() { true.must.be(false) })

    assert.doesNotThrow(function() { (42).must.be(42) })
    assert.throws(function() { (42).must.be(1337) })

    assert.doesNotThrow(function() { var obj = {}; obj.must.be(obj) })
    assert.throws(function() { ({}).must.be({}) })
  })

  mustThrowAssertionError(function() { true.must.be(42) }, {
    actual: true,
    expected: 42,
    message: "true must equal 42"
  })
})

function mustPassTrue(name, truthy) {
  var pass = truthy ? "pass" : "fail"
  var fail = truthy ? "fail" : "pass"
  var throws = truthy ? assert.throws : assert.doesNotThrow
  var doesNotThrow = truthy ? assert.doesNotThrow : assert.throws
  
  it("must "+pass+" given true literal", function() {
    doesNotThrow(function() { Must(true).be[name]() })
  })

  it("must "+pass+" when called on true literal", function() {
    doesNotThrow(function() { true.must.be[name]() })
  })

  it("must fail given true object", function() {
    assert.throws(function() { Must(new Boolean(true)).be[name]() })
  })

  it("must "+fail+" given false literal", function() {
    throws(function() { Must(false).be[name]() })
  })

  it("must "+fail+" when called on false literal", function() {
    throws(function() { false.must.be[name]() })
  })

  it("must fail given false object", function() {
    assert.throws(function() { Must(new Boolean(false)).be[name]() })
  })

  it("must fail given zero number literal", function() {
    assert.throws(function() { Must(0).be[name]() })
  })

  it("must fail when called on zero number literal", function() {
    assert.throws(function() { (0).must.be[name]() })
  })

  it("must not do anything when not called as a function", function() {
    assert.doesNotThrow(function() { Must(!truthy).be[name] })
  })

  mustThrowAssertionError(function() { (!truthy).must.be[name]() }, {
    actual: !truthy,
    expected: truthy,
    message: !truthy + " must be " + truthy
  })
}

describe("Must.prototype.true", function() {
  mustPassTrue("true", true)
})

describe("Must.prototype.false", function() {
  mustPassTrue("false", false)
})

describe("Must.prototype.null", function() {
  it("must pass given null", function() {
    assert.doesNotThrow(function() { Must(null).be.null() })
  })

  it("must not pass given true literal", function() {
    assert.throws(function() { Must(true).be.null() })
  })

  it("must not pass given false literal", function() {
    assert.throws(function() { Must(false).be.null() })
  })

  it("must not pass given undefined", function() {
    assert.throws(function() { Must(undefined).be.null() })
  })

  it("must not pass given empty string", function() {
    assert.throws(function() { Must("").be.null() })
  })

  it("must not do anything when not called as a function", function() {
    assert.doesNotThrow(function() { Must(null).be.null })
  })

  mustThrowAssertionError(function() { true.must.be.null() }, {
    actual: true,
    expected: null,
    message: "true must be null"
  })
})

describe("Must.prototype.undefined", function() {
  it("must pass given undefined", function() {
    assert.doesNotThrow(function() { Must(undefined).be.undefined() })
  })

  it("must not pass given true literal", function() {
    assert.throws(function() { Must(true).be.undefined() })
  })

  it("must not pass given false literal", function() {
    assert.throws(function() { Must(false).be.undefined() })
  })

  it("must not pass given null", function() {
    assert.throws(function() { Must(null).be.undefined() })
  })

  it("must not pass given empty string", function() {
    assert.throws(function() { Must("").be.undefined() })
  })

  it("must not do anything when not called as a function", function() {
    assert.doesNotThrow(function() { Must(undefined).be.undefined })
  })

  mustThrowAssertionError(function() { true.must.be.undefined() }, {
    actual: true,
    expected: undefined,
    message: "true must be undefined"
  })
})

function mustPassTruthy(name, truthy) {
  var pass = truthy ? "pass" : "fail"
  var fail = truthy ? "fail" : "pass"
  var throws = truthy ? assert.throws : assert.doesNotThrow
  var doesNotThrow = truthy ? assert.doesNotThrow : assert.throws

  it("must "+pass+" given true literal", function() {
    doesNotThrow(function() { Must(true).be[name]() })
  })

  it("must "+pass+" when called on true literal", function() {
    doesNotThrow(function() { true.must.be[name]() })
  })

  it("must "+pass+" given true object", function() {
    doesNotThrow(function() { Must(new Boolean(true)).be[name]() })
  })

  it("must "+fail+" given false literal", function() {
    throws(function() { Must(false).be[name]() })
  })

  it("must "+fail+" when called on false literal", function() {
    throws(function() { false.must.be[name]() })
  })

  it("must "+pass+" given false object", function() {
    doesNotThrow(function() { Must(new Boolean(false)).be[name]() })
  })

  it("must "+pass+" given string literal", function() {
    doesNotThrow(function() { Must("truthy").be[name]() })
  })

  it("must "+pass+" when called on string literal", function() {
    doesNotThrow(function() { "truthy".must.be[name]() })
  })

  it("must "+pass+" given string object", function() {
    doesNotThrow(function() { Must(new String("truthy")).be[name]() })
  })

  it("must "+pass+" given zero string literal", function() {
    doesNotThrow(function() { Must("0").be[name]() })
  })

  it("must "+pass+" when called on zero string literal", function() {
    doesNotThrow(function() { "0".must.be[name]() })
  })

  it("must "+pass+" given zero string object", function() {
    doesNotThrow(function() { Must(new String("0")).be[name]() })
  })

  it("must "+fail+" given empty string literal", function() {
    throws(function() { Must("").be[name]() })
  })

  it("must "+fail+" when called on empty string literal", function() {
    throws(function() { "".must.be[name]() })
  })

  it("must "+pass+" given empty string object", function() {
    doesNotThrow(function() { Must(new String("")).be[name]() })
  })

  it("must "+pass+" given number literal", function() {
    doesNotThrow(function() { Must(1).be[name]() })
  })

  it("must "+pass+" when called on number literal", function() {
    doesNotThrow(function() { (1).must.be[name]() })
  })

  it("must "+pass+" given number object", function() {
    doesNotThrow(function() { Must(new Number(1)).be[name]() })
  })

  it("must "+fail+" given zero number literal", function() {
    throws(function() { Must(0).be[name]() })
  })

  it("must "+fail+" when called on zero number literal", function() {
    throws(function() { (0).must.be[name]() })
  })

  it("must "+pass+" given zero number object", function() {
    doesNotThrow(function() { Must(new Number(0)).be[name]() })
  })

  it("must "+fail+" given null", function() {
    throws(function() { Must(null).be[name]() })
  })

  it("must "+fail+" given undefined", function() {
    throws(function() { Must(undefined).be[name]() })
  })

  it("must "+pass+" given empty array literal", function() {
    doesNotThrow(function() { Must([]).be[name]() })
  })

  it("must "+pass+" when called on empty array literal", function() {
    doesNotThrow(function() { [].must.be[name]() })
  })

  it("must "+pass+" given empty array object", function() {
    doesNotThrow(function() { Must(new Array).be[name]() })
  })

  it("must "+pass+" given empty object literal", function() {
    doesNotThrow(function() { Must({}).be[name]() })
  })

  it("must "+pass+" when called on empty object literal", function() {
    doesNotThrow(function() { ({}).must.be[name]() })
  })

  it("must "+pass+" given empty object", function() {
    doesNotThrow(function() { Must(new Object).be[name]() })
  })

  it("must "+pass+" when called on zero date", function() {
    doesNotThrow(function() { new Date(0).must.be[name]() })
  })

  it("must not do anything when not called as a function", function() {
    assert.doesNotThrow(function() { Must(!truthy).be[name] })
  })

  mustThrowAssertionError(function() { (!truthy).must.be[name]() }, {
    actual: !truthy,
    message: !truthy + " must be " + name
  })
}

describe("Must.prototype.truthy", function() {
  mustPassTruthy("truthy", true)
})

describe("Must.prototype.ok", function() {
  it("must be an alias of Must.prototype.truthy", function() {
    assert.strictEqual(Must.prototype.ok, Must.prototype.truthy)
  })
})

describe("Must.prototype.falsy", function() {
  mustPassTruthy("falsy", false)
})

describe("Must.prototype.equal", function() {
  /**
   * Booleans
   */
  function mustPassTrueEqual(bool) {
    it("must pass given "+bool+" literals", function() {
      assert.doesNotThrow(function() { Must(bool).be.equal(bool) })
    })

    it("must pass given "+bool+" literals when calling on", function() {
      assert.doesNotThrow(function() { bool.must.be.equal(bool) })
    })

    it("must fail given "+bool+" literal to object", function() {
      assert.throws(function() { Must(bool).be.equal(new Boolean(bool)) })
    })

    it("must fail given "+bool+" object to literal", function() {
      assert.throws(function() { Must(new Boolean(bool)).be.equal(bool) })
    })

    it("must fail given "+bool+" literal with "+!bool, function() {
      assert.throws(function() { Must(bool).be.equal(!bool) })
    })
  }

  mustPassTrueEqual(true)
  mustPassTrueEqual(false)

  /**
   * Numbers
   */
  it("must pass given equivalent number literals", function() {
    assert.doesNotThrow(function() { Must(42).be.equal(42) })
  })

  it("must pass given equivalent number literals when calling on", function() {
    assert.doesNotThrow(function() { (42).must.be.equal(42) })
  })

  it("must fail given equivalent number literal to object", function() {
    assert.throws(function() { Must(42).be.equal(new Number(42)) })
  })

  it("must fail given equivalent number object to literal", function() {
    assert.throws(function() { Must(new Number(42)).be.equal(42) })
  })

  it("must fail given unequivalent number literals", function() {
    assert.throws(function() { Must(42).be.equal(1337) })
  })

  it("must fail given unequivalent number literal when calling on", function() {
    assert.throws(function() { (42).must.be.equal(1337) })
  })

  /**
   * Strings
   */
  it("must pass given equivalent string literals", function() {
    assert.doesNotThrow(function() { Must("ok").be.equal("ok") })
  })

  it("must pass given equivalent string literals when calling on", function() {
    assert.doesNotThrow(function() { "ok".must.be.equal("ok") })
  })

  it("must fail given equivalent string literal to object", function() {
    assert.throws(function() { Must("ok").be.equal(new String("ok")) })
  })

  it("must fail given equivalent string object to literal", function() {
    assert.throws(function() { Must(new String("ok")).be.equal("ok") })
  })

  it("must fail given unequivalent string literals", function() {
    assert.throws(function() { Must("ok").be.equal("nok") })
  })

  it("must fail given unequivalent string literals when calling on",
    function() {
    assert.throws(function() { "ok".must.be.equal("nok") })
  })

  /**
   * Dates
   */
  it("must pass given identical date objects", function() {
    var now = new Date
    assert.doesNotThrow(function() { Must(now).be.equal(now) })
  })

  it("must pass given identical date objects when calling on", function() {
    var now = new Date
    assert.doesNotThrow(function() { now.must.be.equal(now) })
  })

  it("must fail given unidentical date objects", function() {
    assert.throws(function() { Must(new Date()).be.equal(new Date) })
  })

  it("must fail given unidentical date objects when calling on", function() {
    assert.throws(function() { new Date().must.be.equal(new Date) })
  })

  /**
   * Regexps
   */
  it("must fail given equivalent regexp literals", function() {
    assert.throws(function() { Must(/a/).be.equal(/a/) })
  })

  it("must fail given equivalent regexp literals when calling on", function() {
    assert.throws(function() { /a/.must.be.equal(/a/) })
  })

  it("must pass given identical regexp objects", function() {
    var regexp = new RegExp
    assert.doesNotThrow(function() { Must(regexp).be.equal(regexp) })
  })

  it("must pass given identical regexp objects when calling on", function() {
    var regexp = new RegExp
    assert.doesNotThrow(function() { regexp.must.be.equal(regexp) })
  })

  it("must fail given unidentical regexp objects", function() {
    assert.throws(function() { Must(new RegExp).be.equal(new RegExp) })
  })

  it("must fail given unidentical regexp objects when calling on", function() {
    assert.throws(function() { new RegExp().must.be.equal(new RegExp) })
  })

  /**
   * Arrays
   */
  it("must fail given equivalent array literals", function() {
    assert.throws(function() { Must([1]).be.equal([1]) })
  })

  it("must fail given equivalent array literals when calling on", function() {
    assert.throws(function() { [1].must.be.equal([1]) })
  })

  it("must pass given identical array objects", function() {
    var array = new Array
    assert.doesNotThrow(function() { Must(array).be.equal(array) })
  })

  it("must pass given identical array objects when calling on", function() {
    var array = new Array
    assert.doesNotThrow(function() { array.must.be.equal(array) })
  })

  it("must fail given unidentical array objects", function() {
    assert.throws(function() { Must(new Array()).be.equal(new Array) })
  })

  it("must fail given unidentical array objects when calling on", function() {
    assert.throws(function() { new Array().must.be.equal(new Array) })
  })

  mustThrowAssertionError(function() { "secret".must.equal(42) }, {
    actual: "secret",
    expected: 42,
    message: "\"secret\" must equal 42"
  })
})