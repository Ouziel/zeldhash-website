var u = /* @__PURE__ */ ((t) => (t.INVALID_ADDRESS = "INVALID_ADDRESS", t.UNSUPPORTED_ADDRESS_TYPE = "UNSUPPORTED_ADDRESS_TYPE", t.INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS", t.MULTIPLE_CHANGE_OUTPUTS = "MULTIPLE_CHANGE_OUTPUTS", t.INVALID_INPUT = "INVALID_INPUT", t.WEBGPU_NOT_AVAILABLE = "WEBGPU_NOT_AVAILABLE", t.WORKER_ERROR = "WORKER_ERROR", t.MINING_ABORTED = "MINING_ABORTED", t.DUST_OUTPUT = "DUST_OUTPUT", t))(u || {});
const N = (1n << 64n) - 1n, C = (t) => {
  if (t < 0n)
    throw new Error("nonce must be non-negative");
  if (t === 0n) return 1;
  let e = 0, n = t;
  for (; n > 0n; )
    e += 1, n >>= 8n;
  return e;
}, X = (t) => {
  if (t < 0n)
    throw new Error("nonce must be non-negative");
  if (t <= 23n) return 1;
  if (t <= 0xffn) return 2;
  if (t <= 0xffffn) return 3;
  if (t <= 0xffffffffn) return 5;
  if (t <= N) return 9;
  throw new Error("nonce range exceeds u64");
}, j = (t) => {
  if (!Number.isInteger(t) || t <= 0 || t > 8)
    throw new Error("nonceLength must be between 1 and 8");
  return (1n << BigInt(t * 8)) - 1n;
}, H = (t) => {
  switch (t) {
    case 1:
      return 23n;
    case 2:
      return 0xffn;
    case 3:
      return 0xffffn;
    case 5:
      return 0xffffffffn;
    case 9:
      return N;
    default:
      throw new Error("cbor nonceLength must be one of 1, 2, 3, 5, 9");
  }
}, Y = (t, e) => {
  if (t < 0n)
    throw new Error("startNonce must be non-negative");
  if (!Number.isInteger(e) || e <= 0)
    throw new Error("batchSize must be a positive integer");
  const n = t + BigInt(e - 1);
  if (n > N)
    throw new Error("nonce range exceeds u64");
  const r = [];
  let i = t;
  for (; i <= n; ) {
    const s = C(i), o = j(s), a = n < o ? n : o, l = a - i + 1n;
    if (l > BigInt(Number.MAX_SAFE_INTEGER))
      throw new Error("segment size exceeds safe integer range");
    if (r.push({
      start: i,
      size: Number(l),
      nonceLength: s
    }), a === n)
      break;
    i = a + 1n;
  }
  return r;
}, J = (t, e) => {
  if (t < 0n)
    throw new Error("startNonce must be non-negative");
  if (!Number.isInteger(e) || e <= 0)
    throw new Error("batchSize must be a positive integer");
  const n = t + BigInt(e - 1);
  if (n > N)
    throw new Error("nonce range exceeds u64");
  const r = [];
  let i = t;
  for (; i <= n; ) {
    const s = X(i), o = H(s), a = n < o ? n : o, l = a - i + 1n;
    if (l > BigInt(Number.MAX_SAFE_INTEGER))
      throw new Error("segment size exceeds safe integer range");
    if (r.push({
      start: i,
      size: Number(l),
      nonceLength: s
    }), a === n)
      break;
    i = a + 1n;
  }
  return r;
}, Q = {};
if (typeof globalThis.__ZELDMINER_WASM_BASE__ > "u")
  try {
    const t = typeof window < "u" && window.location?.origin ? window.location.origin : typeof self < "u" && self.location?.origin ? self.location.origin : "http://localhost";
    globalThis.__ZELDMINER_WASM_BASE__ = new URL("/zeldhash-miner/", t).href;
  } catch {
    globalThis.__ZELDMINER_WASM_BASE__ = "/zeldhash-miner/";
  }
let T = null, w = null, W = !1;
const Z = () => {
  if (W) return;
  W = !0;
  const t = globalThis.GPUAdapter?.prototype, e = t?.requestDevice;
  !t || typeof e != "function" || (t.requestDevice = function(r) {
    if (r?.requiredLimits && typeof this.limits == "object") {
      const i = r.requiredLimits, s = this.limits;
      for (const o of Object.keys(i))
        (!(o in s) || s[o] === void 0) && delete i[o];
    }
    return e.call(this, r);
  });
}, B = (t) => t.endsWith("/") ? t : `${t}/`, A = (t) => {
  const e = t.trim();
  return e && (typeof window < "u" && typeof window.location?.origin == "string" ? B(new URL(e, window.location.origin).href) : B(new URL(e, import.meta.url).href));
}, tt = () => {
  const t = globalThis.__ZELDMINER_WASM_BASE__;
  if (typeof t == "string" && t.trim())
    return A(t);
  const e = Q?.VITE_ZELDMINER_WASM_BASE;
  if (typeof e == "string" && e.trim())
    return A(e);
  const n = "/";
  return n.trim() ? A(`${B(n.trim())}zeldhash-miner/`) : A("/zeldhash-miner/");
}, x = tt(), z = `${x}zeldhash_miner_wasm.js`, et = `${x}zeldhash_miner_wasm_bg.wasm`, nt = async (t) => (0, eval)("s => import(s)")(t), O = (t) => t instanceof Error ? t.message : String(t), rt = async () => {
  Z();
  let t;
  try {
    t = await nt(
      /* @vite-ignore */
      z
    );
  } catch (r) {
    throw new Error(
      `Failed to import WASM bundle (${z}). Did you run ./scripts/build-wasm.sh? (${O(r)})`
    );
  }
  const e = t.default;
  if (typeof e != "function")
    throw new Error("WASM init function is missing from the bundle.");
  try {
    const r = new URL(et, import.meta.url);
    await e({ module_or_path: r });
  } catch (r) {
    throw new Error(
      `Failed to initialize WASM bundle: ${O(r)}`
    );
  }
  const n = t;
  try {
    n.init_panic_hook?.();
  } catch {
  }
  return n;
}, it = async () => T || (w || (w = rt().then((t) => (T = t, t)).catch((t) => {
  throw w = null, t;
})), w);
if (typeof globalThis.__ZELDMINER_WASM_BASE__ > "u")
  try {
    const t = typeof self < "u" && self.location?.origin ? self.location.origin : "http://localhost";
    globalThis.__ZELDMINER_WASM_BASE__ = new URL("/zeldhash-miner/", t).href;
  } catch {
    globalThis.__ZELDMINER_WASM_BASE__ = "/zeldhash-miner/";
  }
const U = self, ot = U.name ?? void 0, I = (t) => t instanceof Error ? t.message : String(t);
let R = "cpu", b = null;
const d = (t) => {
  U.postMessage({ ...t, workerId: ot });
}, h = (t, e = u.WORKER_ERROR, n) => {
  d({ type: "error", message: t, code: e, details: n });
}, st = (t) => typeof t == "object" && t !== null && "ok" in t, at = (t) => typeof t == "object" && t !== null && "nonce" in t && "txid" in t, ct = (t) => {
  const e = BigInt(Number.MAX_SAFE_INTEGER);
  return t > e ? Number.MAX_SAFE_INTEGER : t < -e ? -Number.MAX_SAFE_INTEGER : Number(t);
}, ut = (t) => ({
  nonceLength: t.nonceLength,
  prefix: new Uint8Array(t.prefix),
  suffix: new Uint8Array(t.suffix),
  useCborNonce: t.useCborNonce
}), F = (t, e) => {
  t.set(e.nonceLength, ut(e));
}, lt = async (t, e, n, r, i) => {
  const s = t.get(r.nonceLength);
  if (s)
    return s;
  const o = e.build_mining_template(
    n.inputs,
    n.outputs,
    i,
    BigInt(n.satsPerVbyte),
    r.start,
    r.size,
    n.distribution ?? null
  ), a = {
    ...o,
    nonceLength: r.nonceLength,
    useCborNonce: o.useCborNonce ?? n.useCborNonce
  };
  return F(t, a), a;
}, ft = async (t, e, n, r, i, s, o, a) => {
  if (e === "gpu") {
    if (!t.mine_batch_gpu)
      throw new Error("GPU mining requested but mine_batch_gpu is unavailable");
    return t.mine_batch_gpu(
      n,
      r,
      i,
      s,
      o,
      a
    );
  }
  return t.mine_batch_wasm(
    n,
    r,
    i,
    s,
    o,
    a
  );
}, _t = async (t, e) => {
  let n;
  try {
    if (n = await it(), R === "gpu") {
      if (!n.mine_batch_gpu) {
        h(
          "GPU mining requested but mine_batch_gpu is unavailable",
          u.WEBGPU_NOT_AVAILABLE
        );
        return;
      }
      n.init_gpu && await n.init_gpu();
    }
  } catch (g) {
    const m = I(g), E = R === "gpu" ? u.WEBGPU_NOT_AVAILABLE : u.WORKER_ERROR;
    h(`Failed to initialize WASM: ${m}`, E);
    return;
  }
  const r = /* @__PURE__ */ new Map(), i = t.template.useCborNonce ?? !!(t.distribution && t.distribution.length > 0);
  F(r, { ...t.template, useCborNonce: i });
  const s = t.nonceStep ?? BigInt(t.batchSize), o = t.network === "signet" ? "testnet" : t.network;
  let a = t.startNonce, l = 0n;
  const G = performance.now();
  for (; !e.signal.aborted; ) {
    const g = a;
    let m = t.batchSize, E = 0n;
    for (; m > 0 && !e.signal.aborted; ) {
      const D = g + E;
      let c;
      try {
        c = (i ? J(D, m) : Y(D, m))[0];
      } catch (_) {
        h(
          `Invalid nonce range: ${I(_)}`,
          u.INVALID_INPUT
        ), e.abort();
        return;
      }
      let S;
      try {
        S = await lt(
          r,
          n,
          {
            inputs: t.inputs,
            outputs: t.outputs,
            satsPerVbyte: t.satsPerVbyte,
            distribution: t.distribution,
            useCborNonce: i
          },
          c,
          o
        );
      } catch (_) {
        h(
          `Failed to build mining template: ${I(_)}`,
          u.WORKER_ERROR
        ), e.abort();
        return;
      }
      let f;
      const k = performance.now();
      try {
        f = await ft(
          n,
          R,
          S.prefix,
          S.suffix,
          c.start,
          c.size,
          t.targetZeros,
          i
        );
      } catch (_) {
        const p = I(_);
        h(
          `Batch mining failed: ${p}`,
          u.WORKER_ERROR
        ), e.abort();
        return;
      }
      const M = performance.now() - k;
      if (st(f)) {
        if (!f.ok) {
          h(
            f.error ?? "Validation failed",
            u.INVALID_INPUT
          ), e.abort();
          return;
        }
      } else if (at(f)) {
        const _ = l + E, p = BigInt(f.nonce) - c.start + 1n, L = _ + p, y = performance.now() - G, P = y > 0 ? ct(L) / (y / 1e3) : 0, q = c.start + p - 1n, K = {
          psbt: "",
          txid: f.txid,
          nonce: BigInt(f.nonce),
          attempts: L,
          duration: y,
          hashRate: P
        };
        d({
          type: "found",
          result: K,
          hashesProcessed: L,
          hashRate: P,
          lastNonce: q
        }), e.abort();
        return;
      }
      l += BigInt(c.size), E += BigInt(c.size), m -= c.size;
      const v = M > 0 ? c.size / (M / 1e3) : c.size, $ = c.start + BigInt(c.size) - 1n;
      d({ type: "progress", hashesProcessed: l, hashRate: v, lastNonce: $ });
    }
    if (e.signal.aborted)
      break;
    const V = g + BigInt(t.batchSize) - 1n;
    d({ type: "batch_complete", lastNonce: V }), a = g + s;
  }
}, ht = (t) => {
  const e = new AbortController();
  b?.abort(), b = e, _t(t, e).finally(() => {
    b === e && (b = null);
  });
};
U.addEventListener("message", (t) => {
  const e = t.data;
  switch (e.type) {
    case "init":
      R = e.mode, d({ type: "ready" });
      break;
    case "mine":
      ht(e);
      break;
    case "stop":
      b?.abort();
      break;
    default:
      h(
        `Unknown message type: ${e.type}`,
        u.WORKER_ERROR
      );
  }
});
//# sourceMappingURL=worker.js.map
