module.exports = (function () {
  'use strict';
  var e = {
      248: function (e, n, t) {
        t.r(n),
          t.d(n, {
            Keyboard: function () {
              return p;
            },
          });
        var r = require('react'),
          o = t.n(r),
          i = require('prop-types'),
          c = t.n(i),
          a = require('styled-components'),
          u = t.n(a);
        function l() {
          var e = s([
            '\n  fill: white;\n  &.active {\n    fill: #ff72be;\n  }\n  &.active:hover {\n    fill: #ffb8de;\n  }\n  :not(.active):hover {\n    fill: #f0f0f0;\n  }\n',
          ]);
          return (
            (l = function () {
              return e;
            }),
            e
          );
        }
        function f() {
          var e = s([
            '\n  fill: black;\n  &.active {\n    fill: #6e329b;\n  }\n  &.active:hover {\n    fill: #9366b4;\n  }\n  :not(.active):hover {\n    fill: #404040;\n    stroke: #404040;\n  }\n',
          ]);
          return (
            (f = function () {
              return e;
            }),
            e
          );
        }
        function s(e, n) {
          return (
            n || (n = e.slice(0)),
            Object.freeze(
              Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
            )
          );
        }
        var v = ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
          d = [
            { note: 'C#', x: 23.333333333333336 },
            { note: 'D#', x: 71.66666666666667 },
            { note: 'F#', x: 143.33333333333334 },
            { note: 'G#', x: 187.5 },
            { note: 'A#', x: 231.66666666666666 },
          ],
          y = u().rect(f()),
          b = u().rect(l());
        function p(e) {
          var n = e.baseOctave,
            t = void 0 === n ? 4 : n,
            i = e.inverted,
            c = void 0 !== i && i,
            a = e.notes,
            u = e.octaves,
            l = void 0 === u ? 2 : u,
            f = e.onKeydown,
            s = e.onKeyup,
            p = e.style,
            h = void 0 === p ? {} : p,
            m = e.width,
            w = void 0 === m ? '50vw' : m,
            x = 280 * l + 40,
            k = (0, r.useMemo)(
              function () {
                return new Array(8 * l - 1).fill(0);
              },
              [l]
            ),
            g = (0, r.useMemo)(
              function () {
                return new Array(5 * l).fill(0);
              },
              [l]
            ),
            O = c ? y : b,
            j = c ? b : y;
          return o().createElement(
            'div',
            { style: h },
            o().createElement(
              'svg',
              {
                viewBox: '0 0 '.concat(x, ' ').concat(180),
                style: { width: w },
              },
              o().createElement(
                'g',
                { id: 'white-keys' },
                k.map(function (e, n) {
                  var r = ''
                      .concat(v[n % 7].toLowerCase())
                      .concat(t + Math.floor(n / 7)),
                    i = a.includes(r);
                  return o().createElement(O, {
                    className: i ? 'active' : void 0,
                    fill: c ? 'black' : 'white',
                    height: 180,
                    key: ''.concat(v[n % 7], '-').concat(n),
                    onClick: i
                      ? function () {
                          return s(r);
                        }
                      : function () {
                          return f(r);
                        },
                    rx: 2,
                    ry: 2,
                    stroke: c ? 'white' : 'black',
                    width: 40,
                    x: 40 * n,
                    y: 0,
                  });
                })
              ),
              o().createElement(
                'g',
                { id: 'black-keys' },
                g.map(function (e, n) {
                  var r = ''
                      .concat(d[n % 5].note.toLowerCase())
                      .concat(t + Math.floor(n / 5)),
                    i = a.includes(r);
                  return o().createElement(j, {
                    className: i ? 'active' : void 0,
                    fill: c ? 'white' : 'black',
                    height: 108,
                    key: ''.concat(d[n % 5].note, '-').concat(n),
                    onClick: i
                      ? function () {
                          return s(r);
                        }
                      : function () {
                          return f(r);
                        },
                    rx: 2,
                    ry: 2,
                    stroke: c ? 'white' : 'black',
                    width: 25,
                    x: d[n % 5].x + 280 * Math.floor(n / 5),
                    y: 0,
                  });
                })
              )
            )
          );
        }
        p.propTypes = {
          activeColor: c().string,
          baseOctave: c().number,
          inverted: c().bool,
          octaves: c().number,
          onKeydown: c().func.isRequired,
          onKeyup: c().func.isRequired,
          notes: c().arrayOf(c().string).isRequired,
          style: c().object,
          width: c().oneOfType([c().number, c().string]),
        };
      },
    },
    n = {};
  function t(r) {
    if (n[r]) return n[r].exports;
    var o = (n[r] = { exports: {} });
    return e[r](o, o.exports, t), o.exports;
  }
  return (
    (t.n = function (e) {
      var n =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return t.d(n, { a: n }), n;
    }),
    (t.d = function (e, n) {
      for (var r in n)
        t.o(n, r) &&
          !t.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: n[r] });
    }),
    (t.o = function (e, n) {
      return Object.prototype.hasOwnProperty.call(e, n);
    }),
    (t.r = function (e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    t(248)
  );
})();
