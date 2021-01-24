module.exports = (function () {
  'use strict';
  var e = {
      665: function (e, t, n) {
        n.r(t),
          n.d(t, {
            Keyboard: function () {
              return w;
            },
            Oscilloscope: function () {
              return x;
            },
            OscilloscopeWorker: function () {
              return g;
            },
          });
        var r = require('react'),
          o = n.n(r),
          i = require('prop-types'),
          a = n.n(i),
          c = require('styled-components'),
          u = n.n(c);
        function l() {
          var e = f([
            '\n  fill: white;\n  &.active {\n    fill: #ff72be;\n  }\n  &.active:hover {\n    fill: #ffb8de;\n  }\n  :not(.active):hover {\n    fill: #f0f0f0;\n  }\n',
          ]);
          return (
            (l = function () {
              return e;
            }),
            e
          );
        }
        function s() {
          var e = f([
            '\n  fill: black;\n  &.active {\n    fill: #6e329b;\n  }\n  &.active:hover {\n    fill: #9366b4;\n  }\n  :not(.active):hover {\n    fill: #404040;\n    stroke: #404040;\n  }\n',
          ]);
          return (
            (s = function () {
              return e;
            }),
            e
          );
        }
        function f(e, t) {
          return (
            t || (t = e.slice(0)),
            Object.freeze(
              Object.defineProperties(e, { raw: { value: Object.freeze(t) } })
            )
          );
        }
        var d = ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
          v = [
            { note: 'C#', x: 23.333333333333336 },
            { note: 'D#', x: 71.66666666666667 },
            { note: 'F#', x: 143.33333333333334 },
            { note: 'G#', x: 187.5 },
            { note: 'A#', x: 231.66666666666666 },
          ],
          p = u().rect(s()),
          b = u().rect(l());
        function w(e) {
          var t = e.baseOctave,
            n = void 0 === t ? 4 : t,
            i = e.inverted,
            a = void 0 !== i && i,
            c = e.notes,
            u = e.octaves,
            l = void 0 === u ? 2 : u,
            s = e.onKeydown,
            f = e.onKeyup,
            w = e.style,
            y = void 0 === w ? {} : w,
            h = e.width,
            g = void 0 === h ? '50vw' : h,
            m = 280 * l + 40,
            O = (0, r.useMemo)(
              function () {
                return new Array(8 * l - 1).fill(0);
              },
              [l]
            ),
            k = (0, r.useMemo)(
              function () {
                return new Array(5 * l).fill(0);
              },
              [l]
            ),
            R = a ? p : b,
            j = a ? b : p;
          return o().createElement(
            'div',
            { style: y },
            o().createElement(
              'svg',
              {
                viewBox: '0 0 '.concat(m, ' ').concat(180),
                style: { width: g },
              },
              o().createElement(
                'g',
                { id: 'white-keys' },
                O.map(function (e, t) {
                  var r = ''
                      .concat(d[t % 7].toLowerCase())
                      .concat(n + Math.floor(t / 7)),
                    i = c.includes(r);
                  return o().createElement(R, {
                    className: i ? 'active' : void 0,
                    fill: a ? 'black' : 'white',
                    height: 180,
                    key: ''.concat(d[t % 7], '-').concat(t),
                    onClick: i
                      ? function () {
                          return f(r);
                        }
                      : function () {
                          return s(r);
                        },
                    rx: 2,
                    ry: 2,
                    stroke: a ? 'white' : 'black',
                    width: 40,
                    x: 40 * t,
                    y: 0,
                  });
                })
              ),
              o().createElement(
                'g',
                { id: 'black-keys' },
                k.map(function (e, t) {
                  var r = ''
                      .concat(v[t % 5].note.toLowerCase())
                      .concat(n + Math.floor(t / 5)),
                    i = c.includes(r);
                  return o().createElement(j, {
                    className: i ? 'active' : void 0,
                    fill: a ? 'white' : 'black',
                    height: 108,
                    key: ''.concat(v[t % 5].note, '-').concat(t),
                    onClick: i
                      ? function () {
                          return f(r);
                        }
                      : function () {
                          return s(r);
                        },
                    rx: 2,
                    ry: 2,
                    stroke: a ? 'white' : 'black',
                    width: 25,
                    x: v[t % 5].x + 280 * Math.floor(t / 5),
                    y: 0,
                  });
                })
              )
            )
          );
        }
        (w.propTypes = {
          activeColor: a().string,
          baseOctave: a().number,
          inverted: a().bool,
          octaves: a().number,
          onKeydown: a().func.isRequired,
          onKeyup: a().func.isRequired,
          notes: a().arrayOf(a().string).isRequired,
          style: a().object,
          width: a().oneOfType([a().number, a().string]),
        }),
          require('xstate').actions.log;
        var y = n(477),
          h = n.n(y);
        function g() {
          return h()(
            '!function(){var t,e,n="ghostwhite",i="black";onmessage=function(l){var a=l.data;if(null!=a&&a.canvas&&(t=a.canvas,e=a.canvas.getContext("2d")),null!=a&&a.workerOptions){var o=a.workerOptions;null!=o&&o.bg&&(n=o.bg),null!=o&&o.stroke&&(i=o.stroke)}null!=a&&a.timeDomainData&&function(l){e.clearRect(0,0,t.width,t.height),e.fillStyle=n,e.fillRect(0,0,t.width,t.height),e.lineWidth=1,e.strokeStyle=i,e.beginPath();for(var a=1*t.width/l.length,o=0,h=0;h<l.length;++h){var r=l[h]/128*t.height/2;0===h?e.moveTo(o,r):e.lineTo(o,r),o+=a}e.lineTo(t.width,t.height/2),e.stroke()}(new Uint8Array(null==a?void 0:a.timeDomainData))}}();',
            'Worker',
            void 0,
            void 0
          );
        }
        function m(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r);
          }
          return n;
        }
        function O(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? m(Object(n), !0).forEach(function (t) {
                  k(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : m(Object(n)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(n, t)
                  );
                });
          }
          return e;
        }
        function k(e, t, n) {
          return (
            t in e
              ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = n),
            e
          );
        }
        function R(e) {
          return (
            (function (e) {
              var t = e.analyser,
                n = e.canvasRef,
                o = e.Worker,
                i = e.workerOptions;
              console.log(i);
              var a = (0, r.useRef)(),
                c = (0, r.useRef)();
              function u() {
                return c.current || (c.current = new o()), c.current;
              }
              function l() {
                a.current = requestAnimationFrame(l);
                var e = new ArrayBuffer(t.frequencyBinCount),
                  n = new Uint8Array(e);
                t.getByteTimeDomainData(n),
                  u().postMessage({ timeDomainData: e }, [e]);
              }
              (0, r.useEffect)(function () {
                if (null != n && n.current) {
                  console.log('transfer canvas to Worker + start rAF loop');
                  var e = u(),
                    t = n.current.transferControlToOffscreen();
                  e.postMessage({ canvas: t }, [t]), l();
                  var r = a.current;
                  return function () {
                    cancelAnimationFrame(r);
                  };
                }
              }, []),
                (0, r.useEffect)(
                  function () {
                    u().postMessage({ workerOptions: i });
                  },
                  [i]
                );
            })({
              analyser: e.analyser,
              canvasRef: e.canvasRef,
              Worker: g,
              workerOptions: e.workerOptions,
            }),
            null
          );
        }
        function j(e) {
          var t = e.absolute,
            n = e.analyser,
            i = e.bg,
            a = e.height,
            c = void 0 === a ? 180 : a,
            u = e.position,
            l = e.stroke,
            s = e.width,
            f = void 0 === s ? 320 : s,
            d = (0, r.useRef)(),
            v = (0, r.useMemo)(
              function () {
                return { bg: i, stroke: l };
              },
              [i, l]
            );
          return o().createElement(
            r.Fragment,
            null,
            o().createElement('canvas', {
              height: c,
              ref: d,
              width: f,
              style: O(
                {
                  maxHeight: c,
                  maxWidth: f,
                  position: t ? 'absolute' : 'relative',
                },
                u
              ),
            }),
            o().createElement(R, {
              analyser: n,
              canvasRef: d,
              workerOptions: v,
            })
          );
        }
        (R.propTypes = {
          analyser: a().object.isRequired,
          canvasRef: a().shape({ current: a().instanceOf(Element) }),
          workerOptions: a().shape({
            bg: a().string.isRequired,
            stroke: a().string.isRequired,
          }).isRequired,
        }),
          (j.defaultProps = { absolute: !0, bg: 'AliceBlue', stroke: 'Grey' }),
          (j.propTypes = {
            absolute: a().bool.isRequired,
            analyser: a().object.isRequired,
            bg: a().string.isRequired,
            height: a().number,
            position: a().shape({
              top: a().oneOfType([a().number, a().string]),
              right: a().oneOfType([a().number, a().string]),
              bottom: a().oneOfType([a().number, a().string]),
              left: a().oneOfType([a().number, a().string]),
            }),
            stroke: a().string.isRequired,
            width: a().number,
          });
        var x = j;
      },
      477: function (e) {
        e.exports = function (e, t, n, r) {
          try {
            try {
              var o;
              try {
                o = new window.Blob([e]);
              } catch (t) {
                (o = new (window.BlobBuilder ||
                  window.WebKitBlobBuilder ||
                  window.MozBlobBuilder ||
                  window.MSBlobBuilder)()).append(e),
                  (o = o.getBlob());
              }
              var i = window.URL || window.webkitURL,
                a = i.createObjectURL(o),
                c = new window[t](a, n);
              return i.revokeObjectURL(a), c;
            } catch (r) {
              return new window[t](
                'data:application/javascript,'.concat(encodeURIComponent(e)),
                n
              );
            }
          } catch (e) {
            if (!r) throw Error('Inline worker is not supported');
            return new window[t](r, n);
          }
        };
      },
    },
    t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var o = (t[r] = { exports: {} });
    return e[r](o, o.exports, n), o.exports;
  }
  return (
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, { a: t }), t;
    }),
    (n.d = function (e, t) {
      for (var r in t)
        n.o(t, r) &&
          !n.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.r = function (e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    n(665)
  );
})();
