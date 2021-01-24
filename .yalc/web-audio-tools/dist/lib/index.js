module.exports = (function () {
  'use strict';
  var e = {
      477: function (e, r, t) {
        t.r(r),
          t.d(r, {
            Oscilloscope: function () {
              return w;
            },
            OscilloscopeWorker: function () {
              return c;
            },
          });
        var n = require('react'),
          o = t.n(n),
          i = require('prop-types'),
          a = t.n(i);
        require('xstate').actions.log;
        var u = t(72),
          s = t.n(u);
        function c() {
          return s()(
            '!function(){var t,e,n="ghostwhite",i="black";onmessage=function(l){var a=l.data;if(null!=a&&a.canvas&&(t=a.canvas,e=a.canvas.getContext("2d")),null!=a&&a.workerOptions){var o=a.workerOptions;null!=o&&o.bg&&(n=o.bg),null!=o&&o.stroke&&(i=o.stroke)}null!=a&&a.timeDomainData&&function(l){e.clearRect(0,0,t.width,t.height),e.fillStyle=n,e.fillRect(0,0,t.width,t.height),e.lineWidth=1,e.strokeStyle=i,e.beginPath();for(var a=1*t.width/l.length,o=0,h=0;h<l.length;++h){var r=l[h]/128*t.height/2;0===h?e.moveTo(o,r):e.lineTo(o,r),o+=a}e.lineTo(t.width,t.height/2),e.stroke()}(new Uint8Array(null==a?void 0:a.timeDomainData))}}();',
            'Worker',
            void 0,
            void 0
          );
        }
        function l(e, r) {
          var t = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            r &&
              (n = n.filter(function (r) {
                return Object.getOwnPropertyDescriptor(e, r).enumerable;
              })),
              t.push.apply(t, n);
          }
          return t;
        }
        function f(e) {
          for (var r = 1; r < arguments.length; r++) {
            var t = null != arguments[r] ? arguments[r] : {};
            r % 2
              ? l(Object(t), !0).forEach(function (r) {
                  p(e, r, t[r]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
              : l(Object(t)).forEach(function (r) {
                  Object.defineProperty(
                    e,
                    r,
                    Object.getOwnPropertyDescriptor(t, r)
                  );
                });
          }
          return e;
        }
        function p(e, r, t) {
          return (
            r in e
              ? Object.defineProperty(e, r, {
                  value: t,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[r] = t),
            e
          );
        }
        function b(e) {
          return (
            (function (e) {
              var r = e.analyser,
                t = e.canvasRef,
                o = e.Worker,
                i = e.workerOptions,
                a = (0, n.useRef)(),
                u = (0, n.useRef)();
              function s() {
                return u.current || (u.current = new o()), u.current;
              }
              function c() {
                a.current = requestAnimationFrame(c);
                var e = new ArrayBuffer(r.frequencyBinCount),
                  t = new Uint8Array(e);
                r.getByteTimeDomainData(t),
                  s().postMessage({ timeDomainData: e }, [e]);
              }
              (0, n.useEffect)(function () {
                if (null != t && t.current) {
                  console.log('transfer canvas to Worker + start rAF loop');
                  var e = s(),
                    r = t.current.transferControlToOffscreen();
                  e.postMessage({ canvas: r }, [r]), c();
                  var n = a.current;
                  return function () {
                    cancelAnimationFrame(n);
                  };
                }
              }, []),
                (0, n.useEffect)(
                  function () {
                    s().postMessage({ workerOptions: i });
                  },
                  [i]
                );
            })({
              analyser: e.analyser,
              canvasRef: e.canvasRef,
              Worker: c,
              workerOptions: e.workerOptions,
            }),
            null
          );
        }
        function d(e) {
          var r = e.absolute,
            t = e.analyser,
            i = e.bg,
            a = e.height,
            u = void 0 === a ? 180 : a,
            s = e.position,
            c = e.stroke,
            l = e.width,
            p = void 0 === l ? 320 : l,
            d = (0, n.useRef)(),
            w = (0, n.useMemo)(
              function () {
                return { bg: i, stroke: c };
              },
              [i, c]
            );
          return o().createElement(
            n.Fragment,
            null,
            o().createElement('canvas', {
              height: u,
              ref: d,
              width: p,
              style: f(
                {
                  maxHeight: u,
                  maxWidth: p,
                  position: r ? 'absolute' : 'relative',
                },
                s
              ),
            }),
            o().createElement(b, {
              analyser: t,
              canvasRef: d,
              workerOptions: w,
            })
          );
        }
        (b.propTypes = {
          analyser: a().object.isRequired,
          canvasRef: a().shape({ current: a().instanceOf(Element) }),
          workerOptions: a().shape({
            bg: a().string.isRequired,
            stroke: a().string.isRequired,
          }).isRequired,
        }),
          (d.defaultProps = { absolute: !0, bg: 'AliceBlue', stroke: 'Grey' }),
          (d.propTypes = {
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
        var w = d;
      },
      72: function (e) {
        e.exports = function (e, r, t, n) {
          try {
            try {
              var o;
              try {
                o = new window.Blob([e]);
              } catch (r) {
                (o = new (window.BlobBuilder ||
                  window.WebKitBlobBuilder ||
                  window.MozBlobBuilder ||
                  window.MSBlobBuilder)()).append(e),
                  (o = o.getBlob());
              }
              var i = window.URL || window.webkitURL,
                a = i.createObjectURL(o),
                u = new window[r](a, t);
              return i.revokeObjectURL(a), u;
            } catch (n) {
              return new window[r](
                'data:application/javascript,'.concat(encodeURIComponent(e)),
                t
              );
            }
          } catch (e) {
            if (!n) throw Error('Inline worker is not supported');
            return new window[r](n, t);
          }
        };
      },
    },
    r = {};
  function t(n) {
    if (r[n]) return r[n].exports;
    var o = (r[n] = { exports: {} });
    return e[n](o, o.exports, t), o.exports;
  }
  return (
    (t.n = function (e) {
      var r =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return t.d(r, { a: r }), r;
    }),
    (t.d = function (e, r) {
      for (var n in r)
        t.o(r, n) &&
          !t.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: r[n] });
    }),
    (t.o = function (e, r) {
      return Object.prototype.hasOwnProperty.call(e, r);
    }),
    (t.r = function (e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    t(477)
  );
})();
