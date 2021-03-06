function fuglify(WHAK) {
  function u(u) {
    return u = u.charCodeAt(0), u >= 48 && 57 >= u;
  }
  function n(n) {
    return u(n) || J.letter.test(n);
  }
  function e(n) {
    var e;
    return (e = "$" == n || "_" == n || J.letter.test(n)) || (e = J.non_spacing_mark.test(n) || J.space_combining_mark.test(n)), 
    e || u(n) || J.connector_punctuation.test(n) || "‌" == n || "‍" == n;
  }
  function t(u) {
    return X.test(u) ? parseInt(u.substr(2), 16) :K.test(u) ? parseInt(u.substr(1), 8) :Y.test(u) ? parseFloat(u) :void 0;
  }
  function r(u, n, e, t) {
    this.message = u, this.line = n, this.col = e, this.pos = t;
    try {
      ({})();
    } catch (r) {
      this.stack = r.stack;
    }
  }
  function i(u, n, e, t) {
    throw println(u + " | " + n + " | " + e + " | " + t), new r(u, n, e, t);
  }
  function o(u, n, e) {
    return u.type == n && (null == e || u.value == e);
  }
  function a(r) {
    function o() {
      return w.text.charAt(w.pos);
    }
    function a(u) {
      var n = w.text.charAt(w.pos++);
      if (u && !n) throw y;
      return "\n" == n ? (w.newline_before = !0, ++w.line, w.col = 0) :++w.col, n;
    }
    function c(u, n) {
      var e = w.text.indexOf(u, w.pos);
      if (n && -1 == e) throw y;
      return e;
    }
    function s(u, n, e) {
      return w.regex_allowed = "operator" == u && !C(O, n) || "keyword" == u && C(U, n) || "punc" == u && C(V, n), 
      u = {
        type:u,
        value:n,
        line:w.tokline,
        col:w.tokcol,
        pos:w.tokpos,
        nlb:w.newline_before
      }, e || (u.comments_before = w.comments_before, w.comments_before = []), w.newline_before = !1, 
      u;
    }
    function f(u) {
      for (var n = "", e = o(), t = 0; e && u(e, t++); ) n += a(), e = o();
      return n;
    }
    function l(u) {
      i(u, w.tokline, w.tokcol, w.tokpos);
    }
    function A(u) {
      var e, r = !1, i = !1, o = !1, a = "." == u, c = f(function(e, t) {
        return "x" == e || "X" == e ? o ? !1 :o = !0 :o || "E" != e && "e" != e ? "-" == e ? i || 0 == t && !u ? !0 :!1 :"+" == e ? i :(i = !1, 
        "." == e ? a || o ? !1 :a = !0 :n(e)) :r ? !1 :r = i = !0;
      });
      return u && (c = u + c), e = t(c), isNaN(e) ? (l("Invalid syntax: " + c), void 0) :s("num", e);
    }
    function p() {
      var u = a(!0);
      switch (u) {
       case "n":
        return "\n";

       case "r":
        return "\r";

       case "t":
        return "	";

       case "b":
        return "\b";

       case "v":
        return "";

       case "f":
        return "\f";

       case "0":
        return "\x00";

       case "x":
        return String.fromCharCode(h(2));

       case "u":
        return String.fromCharCode(h(4));

       default:
        return u;
      }
    }
    function h(u) {
      for (var n, e = 0; u > 0; --u) n = parseInt(a(!0), 16), isNaN(n) && l(""), e = e << 4 | n;
      return e;
    }
    function E() {
      return d("", function() {
        for (var u, n = a(), e = ""; ;) {
          if (u = a(!0), "\\" == u) u = p(); else if (u == n) break;
          e += u;
        }
        return s("string", e);
      });
    }
    function B() {
      a();
      var u, n = c("\n");
      return -1 == n ? (u = w.text.substr(w.pos), w.pos = w.text.length) :(u = w.text.substring(w.pos, n), 
      w.pos = n), s("comment1", u, !0);
    }
    function F() {
      return a(), d("", function() {
        var u = c("*/", !0), n = w.text.substring(w.pos, u), e = s("comment2", n, !0);
        return w.pos = u + 2, w.line += n.split("\n").length - 1, w.newline_before = 0 <= n.indexOf("\n"), 
        /^@cc_on/i.test(n) && (M(""), M('": ' + n), M("")), e;
      });
    }
    function _() {
      for (var u, n = !1, t = ""; null != (u = o()); ) if (n) "u" != u && l(""), u = p(), 
      e(u) || l(""), t += u, n = !1; else if ("\\" == u) n = !0, a(); else {
        if (!e(u)) break;
        t += a();
      }
      return t;
    }
    function D() {
      return d("", function() {
        for (var u, n, e = !1, t = "", r = !1; u = a(!0); ) if (e) t += "\\" + u, e = !1; else if ("[" == u) r = !0, 
        t += u; else if ("]" == u && r) r = !1, t += u; else {
          if ("/" == u && !r) break;
          "\\" == u ? e = !0 :t += u;
        }
        return n = _(), s("regexp", [ t, n ]);
      });
    }
    function v(u) {
      function n(u) {
        if (!o()) return u;
        var e = u + o();
        return C(z, e) ? (a(), n(e)) :u;
      }
      return s("operator", n(u || a()));
    }
    function g() {
      a();
      var u = w.regex_allowed;
      switch (o()) {
       case "/":
        return w.comments_before.push(B()), w.regex_allowed = u, m();

       case "*":
        return w.comments_before.push(F()), w.regex_allowed = u, m();
      }
      return w.regex_allowed ? D() :v("/");
    }
    function d(u, n) {
      try {
        return n();
      } catch (e) {
        if (e !== y) throw e;
        l(u);
      }
    }
    function m(n) {
      if (n) return D();
      for (;C(L, o()); ) a();
      return w.tokline = w.line, w.tokcol = w.col, w.tokpos = w.pos, (n = o()) ? u(n) ? n = A() :'"' == n || "'" == n ? n = E() :C(G, n) ? n = s("punc", a()) :"." == n ? (a(), 
      n = u(o()) ? A(".") :s("punc", ".")) :"/" == n ? n = g() :C(W, n) ? n = v() :"\\" == n || "$" == n || "_" == n || J.letter.test(n) ? (n = _(), 
      n = C(q, n) ? C(z, n) ? s("operator", n) :C($, n) ? s("atom", n) :s("keyword", n) :s("name", n)) :(l(""), 
      n = void 0) :n = s("eof"), n;
    }
    var w = {
      text:r.replace(/\r\n?|[\n\u2028\u2029]/g, "\n").replace(/^\uFEFF/, ""),
      pos:0,
      tokpos:0,
      line:0,
      tokline:0,
      col:0,
      tokcol:0,
      newline_before:!1,
      regex_allowed:!1,
      comments_before:[]
    };
    return m.context = function(u) {
      return u && (w = u), w;
    }, m;
  }
  function c(u, n, e) {
    this.name = u, this.start = n, this.end = e;
  }
  function s(u, n, e) {
    function t(u, n) {
      return o(G.token, u, n);
    }
    function r() {
      return G.prev = G.token, G.peeked ? (G.token = G.peeked, G.peeked = null) :G.token = G.input(), 
      G.token;
    }
    function s(u, n, e, t) {
      var r = G.input.context();
      i(u, null != n ? n :r.tokline, null != e ? e :r.tokcol, null != t ? t :r.tokpos);
    }
    function A(u) {
      null == u && (u = G.token), s("", u.line, u.col);
    }
    function E(u, n) {
      var e;
      return t(u, n) ? e = r() :(e = G.token, s("", e.line, e.col), e = void 0), e;
    }
    function B(u) {
      return E("punc", u);
    }
    function F() {
      return !n && (G.token.nlb || t("eof") || t("punc", "}"));
    }
    function _() {
      t("punc", ";") ? r() :F() || A();
    }
    function D() {
      return p(arguments);
    }
    function v() {
      B("(");
      var u = K();
      return B(")"), u;
    }
    function g(u, n, e) {
      return u instanceof c ? u :new c(u, n, e);
    }
    function d() {
      var u, e, i, a, c, f, p;
      switch (t("operator", "/") && (G.peeked = null, G.token = G.input(!0)), G.token.type) {
       case "num":
       case "string":
       case "regexp":
       case "operator":
       case "atom":
        return m();

       case "name":
        return o(G.peeked || (G.peeked = G.input()), "punc", ":") ? (u = l(G.token.value, r, r), 
        G.labels.push(u), e = G.token, i = z(), n && !C(R, i[0]) && A(e), G.labels.pop(), 
        u = D("label", u, i)) :u = m(), u;

       case "punc":
        switch (G.token.value) {
         case "{":
          return D("block", y());

         case "[":
         case "(":
          return m();

         case ";":
          return r(), D("block");

         default:
          A();
        }

       case "keyword":
        switch (l(G.token.value, r)) {
         case "break":
          return w("break");

         case "continue":
          return w("continue");

         case "debugger":
          return _(), D("debugger");

         case "do":
          return u = Y(z), E("keyword", "while"), D("do", l(v, _), u);

         case "for":
          return B("("), a = null, !t("punc", ";") && (a = t("keyword", "var") ? (r(), N(!0)) :K(!0, !0), 
          t("operator", "in")) ? (e = a, i = "var" == e[0] ? D("name", e[1][0]) :e, r(), u = K(), 
          B(")"), a = D("for-in", e, i, u, Y(z))) :(u = a, B(";"), e = t("punc", ";") ? null :K(), 
          B(";"), i = t("punc", ")") ? null :K(), B(")"), a = D("for", u, e, i, Y(z))), a;

         case "function":
          return L(!0);

         case "if":
          return u = v(), e = z(), t("keyword", "else") && (r(), a = z()), D("if", u, e, a);

         case "return":
          return 0 == G.in_function && s(""), D("return", t("punc", ";") ? (r(), null) :F() ? null :l(K, _));

         case "switch":
          return D("switch", v(), V());

         case "throw":
          return D("throw", l(K, _));

         case "try":
          return u = y(), t("keyword", "catch") && (r(), B("("), t("name") || s(""), p = G.token.value, 
          r(), B(")"), c = [ p, y() ]), t("keyword", "finally") && (r(), f = y()), c || f || s(""), 
          D("try", u, c, f);

         case "var":
          return l(N, _);

         case "const":
          return l(T, _);

         case "while":
          return D("while", v(), Y(z));

         case "with":
          return D("with", v(), z());

         default:
          A();
        }
      }
    }
    function m() {
      return D("stat", l(K, _));
    }
    function w(u) {
      var n = t("name") ? G.token.value :null;
      return null != n ? (r(), h(n, G.labels) || s("")) :0 == G.in_loop && s(""), _(), 
      D(u, n);
    }
    function b(u) {
      var n = t("name") ? l(G.token.value, r) :null;
      return u && !n && A(), B("("), D(u ? "defun" :"function", n, function(u, n) {
        for (;!t("punc", ")"); ) u ? u = !1 :B(","), t("name") || A(), n.push(G.token.value), 
        r();
        return r(), n;
      }(!0, []), function() {
        var u, n;
        return ++G.in_function, u = G.in_loop, G.in_loop = 0, n = y(), --G.in_function, 
        G.in_loop = u, n;
      }());
    }
    function y() {
      B("{");
      for (var u = []; !t("punc", "}"); ) t("eof") && A(), u.push(z());
      return r(), u;
    }
    function M(u) {
      for (var n, e = []; t("name") || A(), n = G.token.value, r(), t("operator", "=") ? (r(), 
      e.push([ n, K(!1, u) ])) :e.push([ n ]), t("punc", ","); ) r();
      return e;
    }
    function N(u) {
      return D("var", M(u));
    }
    function T() {
      return D("const", M());
    }
    function j(u) {
      var e, i, o, a, c;
      if (t("operator", "new")) return r(), u = j(!1), t("punc", "(") ? (r(), e = H(")")) :e = [], 
      q(D("new", u, e), !0);
      if (t("operator") && C(k, G.token.value)) return U("unary-prefix", l(G.token.value, r), j(u));
      if (t("punc")) {
        switch (G.token.value) {
         case "(":
          return r(), q(l(K, f(B, ")")), u);

         case "[":
          return r(), q(D("array", H("]", !n, !0)), u);

         case "{":
          for (r(), e = q, a = !0, c = []; !t("punc", "}") && (a ? a = !1 :B(","), n || !t("punc", "}")); ) {
            i = G.token.type;
            u:{
              switch (G.token.type) {
               case "num":
               case "string":
                o = l(G.token.value, r);
                break u;
              }
              o = I();
            }
            "name" != i || "get" != o && "set" != o || t("punc", ":") ? (B(":"), c.push([ o, K(!1) ])) :c.push([ I(), L(!1), o ]);
          }
          return r(), i = D("object", c), e(i, u);
        }
        A();
      }
      return t("keyword", "function") ? (r(), q(L(!1), u)) :C(S, G.token.type) ? (e = "regexp" == G.token.type ? D("regexp", G.token.value[0], G.token.value[1]) :D(G.token.type, G.token.value), 
      q(l(e, r), u)) :(A(), void 0);
    }
    function H(u, n, e) {
      for (var i = !0, o = []; !t("punc", u) && (i ? i = !1 :B(","), !n || !t("punc", u)); ) t("punc", ",") && e ? o.push([ "atom", "undefined" ]) :o.push(K(!1));
      return r(), o;
    }
    function I() {
      switch (G.token.type) {
       case "name":
       case "operator":
       case "keyword":
       case "atom":
        return l(G.token.value, r);

       default:
        A();
      }
    }
    function q(u, n) {
      return t("punc", ".") ? (r(), q(D("dot", u, I()), n)) :t("punc", "[") ? (r(), q(D("sub", u, l(K, f(B, "]"))), n)) :n && t("punc", "(") ? (r(), 
      q(D("call", u, H(")")), !0)) :n && t("operator") && C(O, G.token.value) ? l(f(U, "unary-postfix", G.token.value, u), r) :u;
    }
    function U(u, n, e) {
      return "++" != n && "--" != n || W(e) || s(""), D(u, n, e);
    }
    function $(u, n, e) {
      var i, o, a = t("operator") ? G.token.value :null;
      return a && "in" == a && e && (a = null), i = null != a ? x[a] :null, null != i && i > n ? (r(), 
      o = $(j(!0), i, e), $(D("binary", a, u, o), n, e)) :u;
    }
    function W(u) {
      if (!n) return !0;
      switch (u[0]) {
       case "dot":
       case "sub":
       case "new":
       case "call":
        return !0;

       case "name":
        return "this" != u[1];
      }
    }
    function X(u) {
      var n, e;
      if (n = $(j(!0), 0, u), n = t("operator", "?") ? (r(), e = K(!1), B(":"), D("conditional", n, e, K(!1, u))) :n, 
      e = G.token.value, t("operator") && C(P, e)) {
        if (W(n)) return r(), D("assign", P[e], n, X(u));
        s("");
      }
      return n;
    }
    function K(u, n) {
      0 == arguments.length && (u = !0);
      var e = X(n);
      return u && t("punc", ",") ? (r(), D("seq", e, K(!0, n))) :e;
    }
    function Y(u) {
      try {
        return ++G.in_loop, u();
      } finally {
        --G.in_loop;
      }
    }
    var z, L, V, G = {
      input:"string" == typeof u ? a(u, !0) :u,
      token:null,
      prev:null,
      peeked:null,
      in_function:0,
      in_loop:0,
      labels:[]
    };
    return G.token = r(), z = e ? function() {
      var u = G.token, n = d.apply(this, arguments);
      return n[0] = g(n[0], u, G.prev), n;
    } :d, L = e ? function() {
      var u = G.prev, n = b.apply(this, arguments);
      return n[0] = g(n[0], u, G.prev), n;
    } :b, V = f(Y, function() {
      B("{");
      for (var u = [], n = null; !t("punc", "}"); ) t("eof") && A(), t("keyword", "case") ? (r(), 
      n = [], u.push([ K(), n ]), B(":")) :t("keyword", "default") ? (r(), B(":"), n = [], 
      u.push([ null, n ])) :(n || A(), n.push(z()));
      return r(), u;
    }), D("toplevel", function(u) {
      for (;!t("eof"); ) u.push(z());
      return u;
    }([]));
  }
  function f(u) {
    var n = p(arguments, 1);
    return function() {
      return u.apply(this, n.concat(p(arguments)));
    };
  }
  function l(u) {
    u instanceof Function && (u = u());
    for (var n = 1, e = arguments.length; 0 < --e; ++n) arguments[n]();
    return u;
  }
  function A(u) {
    var n, e = {};
    for (n = 0; n < u.length; ++n) e[u[n]] = !0;
    return e;
  }
  function p(u, n) {
    return Array.prototype.slice.call(u, null == n ? 0 :n);
  }
  function h(u, n) {
    for (var e = n.length; 0 <= --e; ) if (n[e] === u) return !0;
    return !1;
  }
  function C(u, n) {
    return Object.prototype.hasOwnProperty.call(u, n);
  }
  function E() {
    function u(u) {
      return [ this[0], j(u, function(u) {
        var e = [ u[0] ];
        return 1 < u.length && (e[1] = n(u[1])), e;
      }) ];
    }
    function n(u) {
      var n, i, o;
      if (null == u) return null;
      try {
        return r.push(u), n = u[0], i = t[n], i && (o = i.apply(u, u.slice(1)), null != o) ? o :(i = e[n], 
        i.apply(u, u.slice(1)));
      } finally {
        r.pop();
      }
    }
    var e = {
      string:function(u) {
        return [ this[0], u ];
      },
      num:function(u) {
        return [ this[0], u ];
      },
      name:function(u) {
        return [ this[0], u ];
      },
      toplevel:function(u) {
        return [ this[0], j(u, n) ];
      },
      block:function(u) {
        var e = [ this[0] ];
        return null != u && e.push(j(u, n)), e;
      },
      "var":u,
      "const":u,
      "try":function(u, e, t) {
        return [ this[0], j(u, n), null != e ? [ e[0], j(e[1], n) ] :null, null != t ? j(t, n) :null ];
      },
      "throw":function(u) {
        return [ this[0], n(u) ];
      },
      "new":function(u, e) {
        return [ this[0], n(u), j(e, n) ];
      },
      "switch":function(u, e) {
        return [ this[0], n(u), j(e, function(u) {
          return [ u[0] ? n(u[0]) :null, j(u[1], n) ];
        }) ];
      },
      "break":function(u) {
        return [ this[0], u ];
      },
      "continue":function(u) {
        return [ this[0], u ];
      },
      conditional:function(u, e, t) {
        return [ this[0], n(u), n(e), n(t) ];
      },
      assign:function(u, e, t) {
        return [ this[0], u, n(e), n(t) ];
      },
      dot:function(u) {
        return [ this[0], n(u) ].concat(p(arguments, 1));
      },
      call:function(u, e) {
        return [ this[0], n(u), j(e, n) ];
      },
      "function":function(u, e, t) {
        return [ this[0], u, e.slice(), j(t, n) ];
      },
      defun:function(u, e, t) {
        return [ this[0], u, e.slice(), j(t, n) ];
      },
      "if":function(u, e, t) {
        return [ this[0], n(u), n(e), n(t) ];
      },
      "for":function(u, e, t, r) {
        return [ this[0], n(u), n(e), n(t), n(r) ];
      },
      "for-in":function(u, e, t, r) {
        return [ this[0], n(u), n(e), n(t), n(r) ];
      },
      "while":function(u, e) {
        return [ this[0], n(u), n(e) ];
      },
      "do":function(u, e) {
        return [ this[0], n(u), n(e) ];
      },
      "return":function(u) {
        return [ this[0], n(u) ];
      },
      binary:function(u, e, t) {
        return [ this[0], u, n(e), n(t) ];
      },
      "unary-prefix":function(u, e) {
        return [ this[0], u, n(e) ];
      },
      "unary-postfix":function(u, e) {
        return [ this[0], u, n(e) ];
      },
      sub:function(u, e) {
        return [ this[0], n(u), n(e) ];
      },
      object:function(u) {
        return [ this[0], j(u, function(u) {
          return 2 == u.length ? [ u[0], n(u[1]) ] :[ u[0], n(u[1]), u[2] ];
        }) ];
      },
      regexp:function(u, n) {
        return [ this[0], u, n ];
      },
      array:function(u) {
        return [ this[0], j(u, n) ];
      },
      stat:function(u) {
        return [ this[0], n(u) ];
      },
      seq:function() {
        return [ this[0] ].concat(j(p(arguments), n));
      },
      label:function(u, e) {
        return [ this[0], u, n(e) ];
      },
      "with":function(u, e) {
        return [ this[0], n(u), n(e) ];
      },
      atom:function(u) {
        return [ this[0], u ];
      }
    }, t = {}, r = [];
    return {
      walk:n,
      with_walkers:function(u, n) {
        var e, r, i = {};
        for (e in u) C(u, e) && (i[e] = t[e], t[e] = u[e]);
        r = n();
        for (e in i) C(i, e) && (i[e] ? t[e] = i[e] :delete t[e]);
        return r;
      },
      parent:function() {
        return r[r.length - 2];
      },
      stack:function() {
        return r;
      }
    };
  }
  function B(u) {
    this.names = {}, this.mangled = {}, this.rev_mangled = {}, this.cname = -1, this.refs = {}, 
    this.uses_eval = this.uses_with = !1, this.parent = u, this.children = [], u ? (this.level = u.level + 1, 
    u.children.push(this)) :this.level = 0;
  }
  function F(u) {
    function n(u) {
      return r = new B(r), u = r.body = u(), u.scope = r, r = r.parent, u;
    }
    function e(u) {
      return r.define(u);
    }
    function t(u, t, r) {
      return [ this[0], e(u), t, n(function() {
        return j(t, e), j(r, o);
      }) ];
    }
    var r = null, i = E(), o = i.walk, a = [];
    return n(function() {
      function n(u, e) {
        for (e = u.children.length; 0 <= --e; ) n(u.children[e]);
        for (e in u.refs) if (C(u.refs, e)) for (var t = u.has(e), r = u; r && (r.refs[e] = t, 
        r !== t); r = r.parent) ;
      }
      var c = i.with_walkers({
        "function":t,
        defun:t,
        "with":function() {
          for (var u = r; u; u = u.parent) u.uses_with = !0;
        },
        "var":function(u) {
          j(u, function(u) {
            e(u[0]);
          });
        },
        "const":function(u) {
          j(u, function(u) {
            e(u[0]);
          });
        },
        "try":function(u, n, t) {
          return null != n ? [ this[0], j(u, o), [ e(n[0]), j(n[1], o) ], null != t ? j(t, o) :null ] :void 0;
        },
        name:function(u) {
          "eval" == u && a.push(r), r.refs[u] = !0;
        }
      }, function() {
        return o(u);
      });
      return j(a, function(u) {
        if (!u.has("eval")) for (;u; ) u.uses_eval = !0, u = u.parent;
      }), n(r), c;
    });
  }
  function _(u) {
    return "unary-prefix" == u[0] && h(u[1], [ "!", "delete" ]) || "binary" == u[0] && h(u[1], "in instanceof == != === !== < <= >= >".split(" ")) || "binary" == u[0] && h(u[1], [ "&&", "||" ]) && _(u[2]) && _(u[3]) || "conditional" == u[0] && _(u[2]) && _(u[3]) || "assign" == u[0] && !0 === u[1] && _(u[3]) || "seq" == u[0] && _(u[u.length - 1]);
  }
  function D(u) {
    return !u || "block" == u[0] && (!u[1] || 0 == u[1].length);
  }
  function v(u) {
    return "string" == u[0] || "unary-prefix" == u[0] && "typeof" == u[1] || "binary" == u[0] && "+" == u[1] && (v(u[2]) || v(u[3]));
  }
  function g(u, n) {
    var e = 0, t = 0;
    return u = u.replace(/[\\\b\f\n\r\t\x22\x27]/g, function(u) {
      switch (u) {
       case "\\":
        return "\\\\";

       case "\b":
        return "\\b";

       case "\f":
        return "\\f";

       case "\n":
        return "\\n";

       case "\r":
        return "\\r";

       case "	":
        return "\\t";

       case '"':
        return ++e, '"';

       case "'":
        return ++t, "'";
      }
      return u;
    }), n && (u = d(u)), e > t ? "'" + u.replace(/\x27/g, "\\'") + "'" :'"' + u.replace(/\x22/g, '\\"') + '"';
  }
  function d(u) {
    return u.replace(/[\u0080-\uffff]/g, function(u) {
      for (u = u.charCodeAt(0).toString(16); 4 > u.length; ) u = "0" + u;
      return "\\u" + u;
    });
  }
  function m(u, n) {
    if (0 >= n) return "";
    if (1 == n) return u;
    var e = m(u, n >> 1);
    return e += e, 1 & n && (e += u), e;
  }
  function w(u, n) {
    var e, t = {};
    !0 === u && (u = {});
    for (e in n) C(n, e) && (t[e] = u && C(u, e) ? u[e] :n[e]);
    return t;
  }
  function b(u) {
    return /^[a-z_$][a-z0-9_$]*$/i.test(u) && "this" != u && !C(N.KEYWORDS_ATOM, u) && !C(N.RESERVED_WORDS, u) && !C(N.KEYWORDS, u);
  }
  function C(u, n) {
    return Object.prototype.hasOwnProperty.call(u, n);
  }
  var y, k, O, P, x, R, S, M, N, T, j, H, q = A("break case catch const continue default delete do else finally for function if in instanceof new return switch throw try typeof var void while with".split(" ")), I = A("abstract boolean byte char class debugger double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile".split(" ")), U = A("return new delete throw else case".split(" ")), $ = A([ "false", "null", "true", "undefined" ]), W = A("+-*&%=<>!?|~^".split("")), X = /^0x[0-9a-f]+$/i, K = /^0[0-7]+$/, Y = /^\d*\.?\d*(?:e[+-]?\d*(?:\d\.?|\.?\d)\d*)?$/i, z = A("in instanceof typeof new void delete ++ -- + - ! ~ & | ^ * / % >> << >>> < > <= >= == === != !== ? = += -= /= *= %= >>= <<= >>>= %= |= ^= &= && ||".split(" ")), L = A([ " ", "\n", "\r", "	", "​" ]), V = A("[{}(,.;:".split("")), G = A("[]{}(),;:".split("")), J = (A([ "g", "m", "s", "i", "y" ]), 
  {
    letter:RegExp("[A-Za-zªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԣԱ-Ֆՙա-ևא-תװ-ײء-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺऄ-हऽॐक़-ॡॱॲॻ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡഅ-ഌഎ-ഐഒ-നപ-ഹഽൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜໝༀཀ-ཇཉ-ཬྈ-ྋက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-Ⴥა-ჺჼᄀ-ᅙᅟ-ᆢᆨ-ᇹሀ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙶᚁ-ᚚᚠ-ᛪᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦩᧁ-ᧇᨀ-ᨖᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᰀ-ᰣᱍ-ᱏᱚ-ᱽᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₔℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-Ɐⱱ-ⱽⲀ-ⳤⴀ-ⴥⴰ-ⵥⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆷㇰ-ㇿ㐀䶵一鿃ꀀ-ꒌꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙟꙢ-ꙮꙿ-ꚗꜗ-ꜟꜢ-ꞈꞋꞌꟻ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꤊ-ꤥꤰ-ꥆꨀ-ꨨꩀ-ꩂꩄ-ꩋ가힣豈-鶴侮-頻並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]"),
    non_spacing_mark:RegExp("[̀-ͯ҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-ٰٞۖ-ۜ۟-۪ۤۧۨ-ܑۭܰ-݊ަ-ް߫-߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࠭ऀ-ं़ु-ै्॑-ॕॢॣঁ়ু-ৄ্ৢৣਁਂ਼ੁੂੇੈੋ-੍ੑੰੱੵઁં઼ુ-ૅેૈ્ૢૣଁ଼ିୁ-ୄ୍ୖୢୣஂீ்ా-ీె-ైొ-్ౕౖౢౣ಼ಿೆೌ್ೢೣു-ൄ്ൢൣ්ි-ුූัิ-ฺ็-๎ັິ-ູົຼ່-ໍཱ༹༘༙༵༷-ཾྀ-྄྆྇ྐ-ྗྙ-ྼ࿆ိ-ူဲ-့္်ွှၘၙၞ-ၠၱ-ၴႂႅႆႍႝ፟ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳិ-ួំ៉-៓៝᠋-᠍ᢩᤠ-ᤢᤧᤨᤲ᤹-᤻ᨘᨗᩖᩘ-ᩞ᩠ᩢᩥ-ᩬᩳ-᩿᩼ᬀ-ᬃ᬴ᬶ-ᬺᬼᭂ᭫-᭳ᮀᮁᮢ-ᮥᮨᮩᰬ-ᰳᰶ᰷᳐-᳔᳒-᳢᳠-᳨᳭᷀-᷽ᷦ-᷿⃐-⃥⃜⃡-⃰⳯-⳱ⷠ-〪ⷿ-゙゚〯꙯꙼꙽꛰꛱ꠂ꠆ꠋꠥꠦ꣄꣠-꣱ꤦ-꤭ꥇ-ꥑꦀ-ꦂ꦳ꦶ-ꦹꦼꨩ-ꨮꨱꨲꨵꨶꩃꩌꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꯥꯨ꯭ﬞ︀-️︠-︦]"),
    space_combining_mark:RegExp("[ःा-ीॉ-ौॎংঃা-ীেৈোৌৗਃਾ-ੀઃા-ીૉોૌଂଃାୀେୈୋୌୗாிுூெ-ைொ-ௌௗఁ-ఃు-ౄಂಃಾೀ-ೄೇೈೊೋೕೖംഃാ-ീെ-ൈൊ-ൌൗංඃා-ෑෘ-ෟෲෳ༾༿ཿါာေးျြၖၗၢ-ၤၧ-ၭႃႄႇ-ႌႏႚ-ႜាើ-ៅះៈᤣ-ᤦᤩ-ᤫᤰᤱᤳ-ᤸᦰ-ᧀᧈᧉᨙ-ᨛᩕᩗᩡᩣᩤᩭ-ᩲᬄᬵᬻᬽ-ᭁᭃ᭄ᮂᮡᮦᮧ᮪ᰤ-ᰫᰴᰵ᳡ᳲꠣꠤꠧꢀꢁꢴ-ꣃꥒ꥓ꦃꦴꦵꦺꦻꦽ-꧀ꨯꨰꨳꨴꩍꩻꯣꯤꯦꯧꯩꯪ꯬]"),
    connector_punctuation:RegExp("[_‿⁀⁔︳︴﹍-﹏＿]")
  });
  r.prototype.toString = function() {
    return this.message + " (line: " + this.line + ", col: " + this.col + ", pos: " + this.pos + ")\n\n" + this.stack;
  }, y = {}, k = A("typeof void delete -- ++ ! ~ - +".split(" ")), O = A([ "--", "++" ]), 
  P = function(u, n, e) {
    for (;e < u.length; ) n[u[e]] = u[e].substr(0, u[e].length - 1), e++;
    return n;
  }("+= -= /= *= %= >>= <<= >>>= |= ^= &=".split(" "), {
    "=":!0
  }, 0), x = function(u, n) {
    var e, t, r, i;
    for (e = 0, t = 1; e < u.length; ++e, ++t) for (r = u[e], i = 0; i < r.length; ++i) n[r[i]] = t;
    return n;
  }([ [ "||" ], [ "&&" ], [ "|" ], [ "^" ], [ "&" ], [ "==", "===", "!=", "!==" ], "< > <= >= in instanceof".split(" "), [ ">>", "<<", ">>>" ], [ "+", "-" ], [ "*", "/", "%" ] ], {}), 
  R = A([ "for", "do", "while", "switch" ]), S = A([ "atom", "num", "string", "regexp", "name" ]), 
  c.prototype.toString = function() {
    return this.name;
  }, M = function() {}, N = {}, N.tokenizer = a, N.parse = s, N.slice = p, N.curry = f, 
  N.member = h, N.array_to_hash = A, N.PRECEDENCE = x, N.KEYWORDS_ATOM = $, N.RESERVED_WORDS = I, 
  N.KEYWORDS = q, N.ATOMIC_START_TOKEN = S, N.OPERATORS = z, N.is_alphanumeric_char = n, 
  N.set_logger = function(u) {
    M = u;
  }, p = N.slice, h = N.member, x = N.PRECEDENCE, z = N.OPERATORS, H = function() {
    return function(u) {
      var n = "";
      do n = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_".charAt(u % 54) + n, 
      u = Math.floor(u / 54); while (u > 0);
      return n;
    };
  }(), B.prototype = {
    has:function(u) {
      for (var n = this; n; n = n.parent) if (C(n.names, u)) return n;
    },
    has_mangled:function(u) {
      for (var n = this; n; n = n.parent) if (C(n.rev_mangled, u)) return n;
    },
    toJSON:function() {
      return {
        names:this.names,
        uses_eval:this.uses_eval,
        uses_with:this.uses_with
      };
    },
    next_mangled:function() {
      for (;;) {
        var u, n = H(++this.cname);
        if (u = this.has_mangled(n), !(u && this.refs[u.rev_mangled[n]] === u || (u = this.has(n), 
        u && u !== this && this.refs[n] === u && !u.has_mangled(n) || C(this.refs, n) && null == this.refs[n] || !b(n)))) return n;
      }
    },
    get_mangled:function(u, n) {
      var e, t;
      return this.uses_eval || this.uses_with ? u :(e = this.has(u)) ? C(e.mangled, u) ? e.mangled[u] :n ? (t = e.next_mangled(), 
      e.rev_mangled[t] = u, e.mangled[u] = t) :u :u;
    },
    define:function(u) {
      return null != u ? this.names[u] = u :void 0;
    }
  }, M = function() {}, function() {
    function u(e) {
      switch (e[0]) {
       case "string":
       case "num":
        return e[1];

       case "name":
       case "atom":
        switch (e[1]) {
         case "true":
          return !0;

         case "false":
          return !1;
        }
        break;

       case "unary-prefix":
        switch (e[1]) {
         case "!":
          return !u(e[2]);

         case "typeof":
          return typeof u(e[2]);

         case "~":
          return ~u(e[2]);

         case "-":
          return -u(e[2]);

         case "+":
          return +u(e[2]);
        }
        break;

       case "binary":
        var t = e[2], r = e[3];
        switch (e[1]) {
         case "&&":
          return u(t) && u(r);

         case "||":
          return u(t) || u(r);

         case "|":
          return u(t) | u(r);

         case "&":
          return u(t) & u(r);

         case "^":
          return u(t) ^ u(r);

         case "+":
          return u(t) + u(r);

         case "*":
          return u(t) * u(r);

         case "/":
          return u(t) / u(r);

         case "-":
          return u(t) - u(r);

         case "<<":
          return u(t) << u(r);

         case ">>":
          return u(t) >> u(r);

         case ">>>":
          return u(t) >>> u(r);

         case "==":
          return u(t) == u(r);

         case "===":
          return u(t) === u(r);

         case "!=":
          return u(t) != u(r);

         case "!==":
          return u(t) !== u(r);

         case "<":
          return u(t) < u(r);

         case "<=":
          return u(t) <= u(r);

         case ">":
          return u(t) > u(r);

         case ">=":
          return u(t) >= u(r);

         case "in":
          return u(t) in u(r);

         case "instanceof":
          return u(t) instanceof u(r);
        }
      }
      throw n;
    }
    var n = {};
    return function(e, t, r) {
      try {
        var i, o = u(e);
        switch (typeof o) {
         case "string":
          i = [ "string", o ];
          break;

         case "number":
          i = [ "num", o ];
          break;

         case "boolean":
          i = [ "name", o + "" ];
          break;

         default:
          throw Error("");
        }
        return t.call(e, i, o);
      } catch (a) {
        if (a === n) return "binary" != e[0] || "===" != e[1] && "!==" != e[1] || !(v(e[2]) && v(e[3]) || _(e[2]) && _(e[3])) || (e[1] = e[1].substr(0, 2)), 
        r ? r.call(e, e) :null;
        throw a;
      }
    };
  }(), T = N.array_to_hash("name array string dot sub call regexp".split(" ")), function() {
    function u(u) {
      this.v = u;
    }
    j = function(n, e, t) {
      var r, i, o = [];
      for (r = 0; r < n.length; ++r) i = e.call(t, n[r], r), i instanceof u ? o.unshift(i.v) :o.push(i);
      return o;
    }, j.at_top = function(n) {
      return new u(n);
    };
  }(), p = N.slice, h = N.member, x = N.PRECEDENCE, z = N.OPERATORS, I = s(WHAK), 
  I = function(u, n) {
    function e(u, e) {
      return n.toplevel || o.parent ? n.except && h(u, n.except) ? u :o.get_mangled(u, e) :u;
    }
    function t(u, n, t) {
      return u && (u = e(u)), t = r(t.scope, function() {
        return n = j(n, function(u) {
          return e(u);
        }), j(t, c);
      }), [ this[0], u, n, t ];
    }
    function r(u, n) {
      var t, r, i = o;
      o = u;
      for (t in u.names) C(u.names, t) && e(t, !0);
      return r = n(), r.scope = u, o = i, r;
    }
    function i(u) {
      return [ this[0], j(u, function(u) {
        return [ e(u[0]), c(u[1]) ];
      }) ];
    }
    var o, a = E(), c = a.walk;
    return n = n || {}, a.with_walkers({
      "function":t,
      defun:function() {
        var u = t.apply(this, arguments);
        switch (a.parent()[0]) {
         case "toplevel":
         case "function":
         case "defun":
          return j.at_top(u);
        }
        return u;
      },
      "var":i,
      "const":i,
      name:function(u) {
        return [ this[0], e(u) ];
      },
      "try":function(u, n, t) {
        return [ this[0], j(u, c), null != n ? [ e(n[0]), j(n[1], c) ] :null, null != t ? j(t, c) :null ];
      },
      toplevel:function(u) {
        var n = this;
        return r(n.scope, function() {
          return [ n[0], j(u, c) ];
        });
      }
    }, function() {
      return c(F(u));
    });
  }(I, ""), I = function(u, n) {
    function e(u) {
      return g(u, n.ascii_only);
    }
    function t(u) {
      return u = "" + u, n.ascii_only && (u = d(u)), u;
    }
    function r(u) {
      return null == u && (u = ""), k && (u = m(" ", n.indent_start + O * n.indent_level) + u), 
      u;
    }
    function i(u, n) {
      null == n && (n = 1), O += n;
      try {
        return u.apply(null, p(arguments, 1));
      } finally {
        O -= n;
      }
    }
    function o(u) {
      var n, e, t;
      if (k) return u.join(" ");
      for (n = [], e = 0; e < u.length; ++e) t = u[e + 1], n.push(u[e]), t && (/[a-z0-9_\x24]$/i.test("" + u[e]) && /^[a-z0-9_\x24]/i.test("" + t) || /[\+\-]$/.test("" + u[e]) && /^[\+\-]/.test("" + t)) && n.push(" ");
      return n.join("");
    }
    function a(u) {
      return u.join("," + R);
    }
    function c(u) {
      var n, e, t = y(u);
      for (n = 1; n < arguments.length; ++n) if (e = arguments[n], e instanceof Function && e(u) || u[0] == e) return "(" + t + ")";
      return t;
    }
    function s(u) {
      if (1 == u.length) return u[0];
      if (2 == u.length) {
        var n = u[1];
        return u = u[0], u.length > n.length ? n :u;
      }
      return s([ u[0], s(u.slice(1)) ]);
    }
    function f(u) {
      if ("function" == u[0]) for (var n = p(M), e = n.pop(), t = n.pop(); t; ) {
        if ("stat" == t[0]) return !0;
        if (!("seq" == t[0] && t[1] === e || "call" == t[0] && t[1] === e || "binary" == t[0] && t[2] === e)) return !1;
        e = t, t = n.pop();
      }
      return !C(T, u[0]);
    }
    function l(u) {
      var n, e = u.toString(10), t = [ e.replace(/^0\./, ".") ];
      return Math.floor(u) === u ? (t.push("0x" + u.toString(16).toLowerCase(), "0" + u.toString(8)), 
      (n = /^(.*?)(0+)$/.exec(u)) && t.push(n[1] + "e" + n[2].length)) :(n = /^0?\.(0+)(.*)$/.exec(u)) && t.push(n[2] + "e-" + (n[1].length + n[2].length), e.substr(e.indexOf("."))), 
      s(t);
    }
    function A(u, n, e, r) {
      return r = r || "function", u && (r += " " + t(u)), r += "(" + a(j(n, t)) + ")", 
      o([ r, _(e) ]);
    }
    function B(u) {
      var n, e, t, i, o;
      for (n = [], e = u.length - 1, t = 0; e >= t; ++t) i = u[t], o = y(i), ";" != o && (k || t != e || (o = "while" == i[0] && D(i[2]) || h(i[0], [ "for", "for-in" ]) && D(i[4]) || "if" == i[0] && D(i[2]) && !i[3] || "if" == i[0] && i[3] && D(i[3]) ? o.replace(/;*\s*$/, ";") :o.replace(/;+\s*$/, "")), 
      n.push(o));
      return j(n, r);
    }
    function F(u) {
      var n = u.length;
      return 0 == n ? "{}" :"{" + P + j(u, function(u, e) {
        var t = 0 < u[1].length, a = i(function() {
          return r(u[0] ? o([ "case", y(u[0]) + ":" ]) :"default:");
        }, .5) + (t ? P + i(function() {
          return B(u[1]).join(P);
        }) :"");
        return !k && t && n - 1 > e && (a += ";"), a;
      }).join(P) + P + r("}");
    }
    function _(u) {
      return u ? 0 == u.length ? "{}" :"{" + P + i(function() {
        return B(u).join(P);
      }) + P + r("}") :";";
    }
    function v(u) {
      var n = u[0];
      return u = u[1], null != u && (n = o([ t(n), "=", y(u) ])), n;
    }
    function y(u) {
      var n, e = u[0], t = S[e];
      if (!t) throw Error("");
      return M.push(u), n = t.apply(e, u.slice(1)), M.pop(), n;
    }
    var k, O, P, R, S, M;
    return n = w(n, {
      indent_start:0,
      indent_level:4,
      quote_keys:!1,
      space_colon:!1,
      beautify:!1,
      ascii_only:!1
    }), k = !!n.beautify, O = 0, P = k ? "\n" :"", R = k ? " " :"", S = {
      string:e,
      num:l,
      name:t,
      toplevel:function(u) {
        return B(u).join(P + P);
      },
      block:_,
      "var":function(u) {
        return "var " + a(j(u, v)) + ";";
      },
      "const":function(u) {
        return "const " + a(j(u, v)) + ";";
      },
      "try":function(u, n, e) {
        return u = [ "try", _(u) ], n && u.push("catch", "(" + n[0] + ")", _(n[1])), e && u.push("finally", _(e)), 
        o(u);
      },
      "throw":function(u) {
        return o([ "throw", y(u) ]) + ";";
      },
      "new":function(u, n) {
        return n = 0 < n.length ? "(" + a(j(n, y)) + ")" :"", o([ "new", c(u, "seq", "binary", "conditional", "assign", function(u) {
          var n = E(), e = {};
          try {
            n.with_walkers({
              call:function() {
                throw e;
              },
              "function":function() {
                return this;
              }
            }, function() {
              n.walk(u);
            });
          } catch (t) {
            if (t === e) return !0;
            throw t;
          }
        }) + n ]);
      },
      "switch":function(u, n) {
        return o([ "switch", "(" + y(u) + ")", F(n) ]);
      },
      "break":function(u) {
        var n = "break";
        return null != u && (n += " " + t(u)), n + ";";
      },
      "continue":function(u) {
        var n = "continue";
        return null != u && (n += " " + t(u)), n + ";";
      },
      conditional:function(u, n, e) {
        return o([ c(u, "assign", "seq", "conditional"), "?", c(n, "seq"), ":", c(e, "seq") ]);
      },
      assign:function(u, n, e) {
        return u && !0 !== u ? u += "=" :u = "=", o([ y(n), u, c(e, "seq") ]);
      },
      dot:function(u) {
        var n = y(u), e = 1;
        for ("num" == u[0] ? /\./.test(u[1]) || (n += ".") :f(u) && (n = "(" + n + ")"); e < arguments.length; ) n += "." + t(arguments[e++]);
        return n;
      },
      call:function(u, n) {
        var e = y(u);
        return f(u) && (e = "(" + e + ")"), e + "(" + a(j(n, function(u) {
          return c(u, "seq");
        })) + ")";
      },
      "function":A,
      defun:A,
      "if":function(u, n, e) {
        if (u = "(" + y(u) + ")", e) u:{
          var t, r;
          if ("do" == n[0]) n = y([ "block", [ n ] ]); else {
            for (t = n; ;) if (r = t[0], "if" == r) {
              if (!t[3]) {
                n = y([ "block", [ n ] ]);
                break u;
              }
              t = t[3];
            } else if ("while" == r || "do" == r) t = t[2]; else {
              if ("for" != r && "for-in" != r) break;
              t = t[4];
            }
            n = y(n);
          }
        } else n = y(n);
        return n = [ "if", u, n ], e && n.push("else", y(e)), o(n);
      },
      "for":function(u, n, e, t) {
        var r, i = [ "for" ];
        return u = (null != u ? y(u) :"").replace(/;*\s*$/, ";" + R), n = (null != n ? y(n) :"").replace(/;*\s*$/, ";" + R), 
        e = (null != e ? y(e) :"").replace(/;*\s*$/, ""), r = u + n + e, "; ; " == r && (r = ";;"), 
        i.push("(" + r + ")", y(t)), o(i);
      },
      "for-in":function(u, n, e, t) {
        return o([ "for", "(" + (u ? y(u).replace(/;+$/, "") :y(n)), "in", y(e) + ")", y(t) ]);
      },
      "while":function(u, n) {
        return o([ "while", "(" + y(u) + ")", y(n) ]);
      },
      "do":function(u, n) {
        return o([ "do", y(n), "while", "(" + y(u) + ")" ]) + ";";
      },
      "return":function(u) {
        var n = [ "return" ];
        return null != u && n.push(y(u)), o(n) + ";";
      },
      binary:function(u, n, e) {
        var t = y(n), r = y(e);
        return (h(n[0], [ "assign", "conditional", "seq" ]) || "binary" == n[0] && x[u] > x[n[1]]) && (t = "(" + t + ")"), 
        !h(e[0], [ "assign", "conditional", "seq" ]) && ("binary" != e[0] || x[u] < x[e[1]] || e[1] == u && h(u, [ "&&", "||", "*" ])) || (r = "(" + r + ")"), 
        o([ t, u, r ]);
      },
      "unary-prefix":function(u, n) {
        var e = y(n);
        return "num" != n[0] && ("unary-prefix" != n[0] || C(z, u + n[1])) && f(n) && (e = "(" + e + ")"), 
        u + (N.is_alphanumeric_char(u.charAt(0)) ? " " :"") + e;
      },
      "unary-postfix":function(u, n) {
        var e = y(n);
        return "num" != n[0] && ("unary-postfix" != n[0] || C(z, u + n[1])) && f(n) && (e = "(" + e + ")"), 
        e + u;
      },
      sub:function(u, n) {
        var e = y(u);
        return f(u) && (e = "(" + e + ")"), e + "[" + y(n) + "]";
      },
      object:function(u) {
        return 0 == u.length ? "{}" :"{" + P + i(function() {
          return j(u, function(u) {
            if (3 == u.length) return r(A(u[0], u[1][2], u[1][3], u[2]));
            var t = u[0];
            return u = y(u[1]), n.quote_keys ? t = e(t) :"number" != typeof t && (k || +t + "" != t) || 0 > parseFloat(t) ? b(t) || (t = e(t)) :t = l(+t), 
            r(o(k && n.space_colon ? [ t, ":", u ] :[ t + ":", u ]));
          }).join("," + P);
        }) + P + r("}");
      },
      regexp:function(u, n) {
        return "/" + u + "/" + n;
      },
      array:function(u) {
        return 0 == u.length ? "[]" :o([ "[", a(j(u, function(u) {
          return k || "atom" != u[0] || "undefined" != u[1] ? c(u, "seq") :"";
        })), "]" ]);
      },
      stat:function(u) {
        return y(u).replace(/;*\s*$/, ";");
      },
      seq:function() {
        return a(j(p(arguments), y));
      },
      label:function(u, n) {
        return o([ t(u), ":", y(n) ]);
      },
      "with":function(u, n) {
        return o([ "with", "(" + y(u) + ")", y(n) ]);
      },
      atom:function(u) {
        return t(u);
      }
    }, M = [], y(u);
  }(I, "");
  return I;
}
