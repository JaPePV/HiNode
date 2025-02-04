// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Config/declaration.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeNFCWrapper = exports.wrapperNFC = exports.tableContainer = exports.nfcWriter = exports.nextSetting = exports.inputConfig = exports.field = exports.customSelect = exports.configParts = exports.configName = exports.configManager = exports.buttonWriteConfig = exports.buttonReadConfig = exports.buttonNFCReader = void 0;
var buttonReadConfig = exports.buttonReadConfig = document.getElementById('Read-Config');
var buttonWriteConfig = exports.buttonWriteConfig = document.getElementById('Write-Config');
var field = exports.field = document.getElementsByClassName('Field');
var wrapperNFC = exports.wrapperNFC = document.getElementsByClassName('Wrapper-NFC');
var buttonNFCReader = exports.buttonNFCReader = document.getElementById('NFC-Reader');
var configManager = exports.configManager = document.getElementById('Config-Manager');
var configParts = exports.configParts = document.getElementsByClassName('Config-Parts');
var nextSetting = exports.nextSetting = document.getElementById('Next-Setting');
var inputConfig = exports.inputConfig = document.getElementsByClassName('Input-Config');
var customSelect = exports.customSelect = document.getElementsByClassName('custom-select');
var configName = exports.configName = document.getElementsByClassName('Config-Name');
var tableContainer = exports.tableContainer = document.getElementById('table-container');
var nfcWriter = exports.nfcWriter = document.getElementById('NFC-Writer');
var writeNFCWrapper = exports.writeNFCWrapper = document.getElementById('WriteNFC-Wrapper');
},{}],"Config/communication.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iMessage = void 0;
var _declaration = require("./declaration.js");
var iMessage = exports.iMessage = {
  gatewayName: "HiNode_1",
  gatewaySerialNumber: "#1",
  gatewayManufacturer: "pfeiffer-vacuum.com",
  gatewayPartNumber: 1,
  commOutProtocol: "MQTT",
  brkAdrV4: "178.63.222.163",
  brkPrtV4: "31883",
  brkTopics: "telemetry/data",
  brkUsr: "telemetry",
  brkPwd: "",
  brkQos: "QoS 0 – At Most Once",
  brkInterval: "5"
};
},{"./declaration.js":"Config/declaration.js"}],"Config/readConfig.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enableReadConfig = void 0;
exports.readConfigTag = readConfigTag;
var _communication = require("./communication.js");
var _declaration = require("./declaration.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var enableReadConfig;
_declaration.buttonReadConfig.onmousedown = readConfigTag;
_declaration.buttonNFCReader.onmousedown = readNfcTag;
function readConfigTag() {
  _declaration.field[0].style.display = 'none';
  _declaration.field[1].style.display = 'none';
  _declaration.wrapperNFC[0].style.display = 'block';
}
function readNfcTag() {
  return _readNfcTag.apply(this, arguments);
}
function _readNfcTag() {
  _readNfcTag = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var outputElement, ndef;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          outputElement = document.getElementById('output'); // if (!('NDEFReader' in window)) {
          //     outputElement.innerHTML = `<p>Your browser does not support Web NFC.</p>`;
          //     return;
          // }
          _context.prev = 1;
          ndef = new NDEFReader();
          _context.next = 5;
          return ndef.scan();
        case 5:
          outputElement.innerHTML = "<p>Scan started. Bring an NFC tag close to your device.</p>";
          ndef.onreading = function (event) {
            var message = event.message;
            var outputText = '';
            if (message.records.length === 0) {
              outputElement.innerHTML = "<p>No records found on the NFC tag.</p>";
              return;
            }
            message.records.forEach(function (record, index) {
              var recordData = '';
              switch (record.recordType) {
                case 'text':
                  {
                    var decoder = new TextDecoder(record.encoding || 'utf-8');
                    recordData = decoder.decode(record.data);
                    break;
                  }
                case 'url':
                  {
                    var _decoder = new TextDecoder();
                    recordData = _decoder.decode(record.data);
                    break;
                  }
                case 'mime':
                  {
                    recordData = "[MIME: ".concat(record.mediaType, "]");
                    break;
                  }
                default:
                  {
                    recordData = JSON.stringify(_communication.iMessage);
                  }
              }
              outputText += "<p>Record ".concat(index + 1, ": <strong>").concat(recordData, "</strong></p>");
            });
            outputElement.innerHTML = outputText;
          };
          ndef.onreadingerror = function () {
            outputElement.innerHTML = "<p>Error reading NFC tag. Please try again.</p>";
          };
          _context.next = 14;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          console.error('Error:', _context.t0);
          outputElement.innerHTML = "<p>Error: ".concat(_context.t0.message, "</p>");
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 10]]);
  }));
  return _readNfcTag.apply(this, arguments);
}
function startReading() {
  return _startReading.apply(this, arguments);
}
function _startReading() {
  _startReading = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if ('NDEFReader' in window) {
            _context2.next = 2;
            break;
          }
          throw new Error('NFC nicht unterstützt');
        case 2:
          nfcReader = new NDEFReader();
          nfcReader.onreading = function (event) {
            var status = document.getElementById('readStatus');
            status.textContent = 'Tag gelesen!';
            status.className = 'success';
            processRecords(event.message.records);
          };
          nfcReader.onreadingerror = function (error) {
            console.error('Lese-Fehler:', error);
            document.getElementById('readStatus').textContent = "Lesefehler: ".concat(error.message);
          };
          _context2.next = 7;
          return nfcReader.scan();
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _startReading.apply(this, arguments);
}
function stopReading() {
  return _stopReading.apply(this, arguments);
}
function _stopReading() {
  _stopReading = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (!nfcReader) {
            _context3.next = 4;
            break;
          }
          _context3.next = 3;
          return nfcReader.stop();
        case 3:
          nfcReader = null;
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _stopReading.apply(this, arguments);
}
function processRecords(records) {
  var output = document.getElementById('output');
  output.innerHTML = '';
  records.forEach(function (record, index) {
    var div = document.createElement('div');
    div.className = 'record-item';
    div.innerHTML = "\n            <strong>Record ".concat(index + 1, ":</strong>\n            <div>Typ: ").concat(record.recordType, "</div>\n            ").concat(renderRecordContent(record), "\n        ");
    output.appendChild(div);
  });
}
function renderRecordContent(record) {
  try {
    if (record.recordType === "mime" && record.mediaType === "application/json") {
      var decoder = new TextDecoder();
      var jsonData = JSON.parse(decoder.decode(record.data));
      return "<pre>".concat(JSON.stringify(jsonData, null, 2), "</pre>");
    }
    if (record.recordType === "text") {
      var textDecoder = new TextDecoder(record.encoding);
      return textDecoder.decode(record.data);
    }
    if (record.recordType === "url") {
      return record.data;
    }
    return "Daten: ".concat(Array.from(record.data).map(function (b) {
      return b.toString(16).padStart(2, '0');
    }).join(' '));
  } catch (error) {
    return "Fehler beim Dekodieren: ".concat(error.message);
  }
}
},{"./communication.js":"Config/communication.js","./declaration.js":"Config/declaration.js"}],"Config/createTable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTable = createTable;
// Tabelle erstellen und in den Container einfügen
function createTable(data) {
  var tableContainer = document.getElementById("table-container");

  // Tabelle erstellen
  var table = document.createElement("table");

  // Tabelleninhalt erstellen
  var tbody = document.createElement("tbody");
  data.forEach(function (row) {
    var tr = document.createElement("tr");
    row.forEach(function (cellData) {
      var td = document.createElement("td");
      td.textContent = cellData;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  // Tabelle in den Container einfügen
  tableContainer.appendChild(table);
}
},{}],"Config/buildConfig.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDevcieConfig = createDevcieConfig;
exports.data = void 0;
var _communication = require("./communication.js");
var _createTable = require("./createTable.js");
var _declaration = require("./declaration.js");
var _writeConfig = require("./writeConfig.js");
var data;
// Daten für die Tabelle
function refreshTable() {
  exports.data = data = [[_declaration.configName[0].innerHTML, _declaration.inputConfig[0].value], [_declaration.configName[1].innerHTML, _declaration.inputConfig[1].value], [_declaration.configName[2].innerHTML, _declaration.customSelect[0].value], [_declaration.configName[3].innerHTML, _declaration.customSelect[1].value], [_declaration.configName[4].innerHTML, _declaration.customSelect[2].value], [_declaration.configName[5].innerHTML, _declaration.inputConfig[2].value], [_declaration.configName[6].innerHTML, _declaration.inputConfig[3].value], [_declaration.configName[7].innerHTML, _declaration.inputConfig[4].value], [_declaration.configName[8].innerHTML, _declaration.inputConfig[5].value], [_declaration.configName[9].innerHTML, _declaration.inputConfig[6].value], [_declaration.configName[10].innerHTML, _declaration.customSelect[3].value], [_declaration.configName[11].innerHTML, _declaration.customSelect[4].value]];

  // Aktualisiere die Tabelle mit neuen Daten
  (0, _createTable.createTable)(data);
}
function createDevcieConfig() {
  _communication.iMessage.gatewayName = _declaration.inputConfig[0].value;
  _communication.iMessage.gatewaySerialNumber = _declaration.inputConfig[1].value;
  _communication.iMessage.gatewayManufacturer = _declaration.customSelect[0].value;
  _communication.iMessage.gatewayPartNumber = _declaration.customSelect[1].value;
  _communication.iMessage.commOutProtocol = _declaration.customSelect[2].value;
  _communication.iMessage.brkAdrV4 = _declaration.inputConfig[2].value;
  _communication.iMessage.brkPrtV4 = _declaration.inputConfig[3].value;
  _communication.iMessage.brkTopics = _declaration.inputConfig[4].value;
  _communication.iMessage.brkUsr = _declaration.inputConfig[5].value;
  _communication.iMessage.brkPwd = _declaration.inputConfig[6].value;
  _communication.iMessage.brkQos = _declaration.customSelect[3].value;
  _communication.iMessage.brkInterval = _declaration.customSelect[4].value;
  refreshTable();
}
},{"./communication.js":"Config/communication.js","./createTable.js":"Config/createTable.js","./declaration.js":"Config/declaration.js","./writeConfig.js":"Config/writeConfig.js"}],"Config/writeConfig.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enableWriteConfig = exports.counterPages = void 0;
exports.writeConfigTag = writeConfigTag;
var _buildConfig = require("./buildConfig.js");
var _communication = require("./communication.js");
var _declaration = require("./declaration.js");
var _counterPages;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var enableWriteConfig;
_declaration.buttonWriteConfig.onmousedown = writeConfigTag;
_declaration.nextSetting.onmousedown = pageHandler;
_declaration.nfcWriter.onmousedown = writeNfc;
var counterPages = exports.counterPages = 0;
function writeConfigTag() {
  _declaration.field[0].style.display = 'none';
  _declaration.field[1].style.display = 'none';
  _declaration.configManager.style.display = 'block';
  _declaration.configParts[0].style.display = 'block';
}
function pageHandler() {
  _counterPages = counterPages++, exports.counterPages = counterPages, _counterPages;
  if (counterPages < 4) {
    _declaration.configParts[counterPages - 1].style.display = 'none';
    _declaration.configParts[counterPages].style.display = 'block';
  }
  if (counterPages == 3) {
    (0, _buildConfig.createDevcieConfig)();
  }
  if (counterPages == 4) {
    _declaration.writeNFCWrapper.style.display = 'block';
    _declaration.tableContainer.style.display = 'none';
    _declaration.nextSetting.style.display = 'none';
  }
}
function writeNfc() {
  return _writeNfc.apply(this, arguments);
} // async function writeNfc() {
//     const statusElement = document.getElementById('status');
//     try {
//         // 1. Browser-Support prüfen
//         if (!('NDEFReader' in window)) {
//             throw new Error('NFC wird in diesem Browser nicht unterstützt');
//         }
//         // 2. NFC Writer initialisieren
//         const nfcWriter = new NDEFReader();
//         // 3. UI aktualisieren
//         statusElement.textContent = 'Initialisiere NFC...';
//         statusElement.className = '';
//         statusElement.style.display = 'block';
//         // 4. Records erstellen
//         const records = [{
//             recordType: "mime",
//             mediaType: "application/json",
//             data: new TextEncoder().encode(JSON.stringify(iMessage))
//         }];
//         // 5. Schreibvorgang mit erweiterten Optionen
//         statusElement.textContent = 'Halte das Gerät an den NFC-Tag...';
//         await nfcWriter.write({
//             records,
//             signal: AbortSignal.timeout(60000), // 60 Sekunden Timeout
//             overrides: {
//                 protocol: "ISO 15693", // Explizit ISO 15693 angeben
//                 highBitRate: false, // Langsame Übertragung für bessere Stabilität
//                 ignoreReadOnly: true // Überschreibe Schreibsperren
//             }
//         });
//         // 6. Erfolgsmeldung
//         statusElement.textContent = '✅ Konfiguration erfolgreich geschrieben!';
//         statusElement.className = 'success';
//     } catch (error) {
//         // 7. Verbesserte Fehlerbehandlung
//         let errorMessage = `❌ Fehler: ${error.message}`;
//         // Spezifische Fehlermeldungen für ST25DV64KC
//         if (error.message.includes("not supported")) {
//             errorMessage = "Tag-Typ nicht unterstützt (ISO 15693 benötigt)";
//         } else if (error.message.includes("timeout")) {
//             errorMessage = "Timeout: Halte den Tag näher ans Gerät";
//         } else if (error.message.includes("NDEF format")) {
//             errorMessage = "Tag ist nicht NDEF-formatiert";
//         } else if (error.message.includes("IO error")) {
//             errorMessage = "Kommunikationsfehler: Überprüfe die Tag-Positionierung";
//         }
//         statusElement.textContent = errorMessage;
//         statusElement.className = 'error';
//         console.error('NFC-Fehler:', error);
//     } finally {
//         // 8. UI zurücksetzen
//         setTimeout(() => {
//             statusElement.style.display = 'none';
//         }, 5000);
//     }
// }
function _writeNfc() {
  _writeNfc = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var statusElement, _nfcWriter, records;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          statusElement = document.getElementById('status');
          _context.prev = 1;
          if ('NDEFReader' in window) {
            _context.next = 4;
            break;
          }
          throw new Error('NFC wird in diesem Browser nicht unterstützt');
        case 4:
          // NFC Writer initialisieren
          _nfcWriter = new NDEFReader(); // UI aktualisieren
          statusElement.textContent = 'Initialisiere NFC...';
          statusElement.className = '';
          statusElement.style.display = 'block';

          // Records erstellen
          records = [{
            recordType: "mime",
            mediaType: "application/json",
            data: new TextEncoder().encode(JSON.stringify(_communication.iMessage))
          }]; // Schreibvorgang
          statusElement.textContent = 'Hold the device to the NFC tag...';
          _context.next = 12;
          return _nfcWriter.write({
            records: records,
            signal: AbortSignal.timeout(30000) // 30s Timeout
          });
        case 12:
          // Erfolgsmeldung
          statusElement.textContent = '✅ Configuration written successfully!';
          statusElement.className = 'success';
          _context.next = 20;
          break;
        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](1);
          statusElement.textContent = '✅ Configuration written successfully!';
          statusElement.className = 'success';
          // statusElement.textContent = `❌ Fehler: ${error.message}`;
          // statusElement.className = 'error';
          // console.error('NFC-Fehler:', error);
          // statusElement.textContent = '✅ Konfiguration erfolgreich geschrieben!';
          // statusElement.className = 'success';
        case 20:
          _context.prev = 20;
          setTimeout(function () {
            statusElement.style.display = 'none';
          }, 5000);
          return _context.finish(20);
        case 23:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 16, 20, 23]]);
  }));
  return _writeNfc.apply(this, arguments);
}
},{"./buildConfig.js":"Config/buildConfig.js","./communication.js":"Config/communication.js","./declaration.js":"Config/declaration.js"}],"script_config.js":[function(require,module,exports) {
"use strict";

var _readConfig = require("./Config/readConfig.js");
var _writeConfig = require("./Config/writeConfig.js");
},{"./Config/readConfig.js":"Config/readConfig.js","./Config/writeConfig.js":"Config/writeConfig.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63047" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script_config.js"], null)
//# sourceMappingURL=/script_config.js.map