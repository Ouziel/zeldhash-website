import { Z as r, l as C, s as U, a as V } from "./nonce.js";
if (typeof globalThis.__ZELDMINER_WASM_BASE__ > "u")
  try {
    const t = typeof self < "u" && self.location?.origin ? self.location.origin : "http://localhost";
    globalThis.__ZELDMINER_WASM_BASE__ = new URL("/wasm/", t).href;
  } catch {
    globalThis.__ZELDMINER_WASM_BASE__ = "/wasm/";
  }
const w = self, G = w.name ?? void 0, R = (t) => t instanceof Error ? t.message : String(t);
let m = "cpu", f = null;
const g = (t) => {
  w.postMessage({ ...t, workerId: G });
}, b = (t, e = r.WORKER_ERROR, n) => {
  g({ type: "error", message: t, code: e, details: n });
}, D = (t) => typeof t == "object" && t !== null && "ok" in t, F = (t) => typeof t == "object" && t !== null && "nonce" in t && "txid" in t, K = (t) => {
  const e = BigInt(Number.MAX_SAFE_INTEGER);
  return t > e ? Number.MAX_SAFE_INTEGER : t < -e ? -Number.MAX_SAFE_INTEGER : Number(t);
}, Z = (t) => ({
  nonceLength: t.nonceLength,
  prefix: new Uint8Array(t.prefix),
  suffix: new Uint8Array(t.suffix),
  useCborNonce: t.useCborNonce
}), M = (t, e) => {
  t.set(e.nonceLength, Z(e));
}, $ = async (t, e, n, s, i) => {
  const u = t.get(s.nonceLength);
  if (u)
    return u;
  const p = e.build_mining_template(
    n.inputs,
    n.outputs,
    i,
    BigInt(n.satsPerVbyte),
    s.start,
    s.size,
    n.distribution ?? null
  ), a = {
    ...p,
    nonceLength: s.nonceLength,
    useCborNonce: p.useCborNonce ?? n.useCborNonce
  };
  return M(t, a), a;
}, X = async (t, e, n, s, i, u, p, a) => {
  if (e === "gpu") {
    if (!t.mine_batch_gpu)
      throw new Error("GPU mining requested but mine_batch_gpu is unavailable");
    return t.mine_batch_gpu(
      n,
      s,
      i,
      u,
      p,
      a
    );
  }
  return t.mine_batch_wasm(
    n,
    s,
    i,
    u,
    p,
    a
  );
}, j = async (t, e) => {
  let n;
  try {
    if (n = await C(), m === "gpu") {
      if (!n.mine_batch_gpu) {
        b(
          "GPU mining requested but mine_batch_gpu is unavailable",
          r.WEBGPU_NOT_AVAILABLE
        );
        return;
      }
      n.init_gpu && await n.init_gpu();
    }
  } catch (d) {
    const _ = R(d), h = m === "gpu" ? r.WEBGPU_NOT_AVAILABLE : r.WORKER_ERROR;
    b(`Failed to initialize WASM: ${_}`, h);
    return;
  }
  const s = /* @__PURE__ */ new Map(), i = t.template.useCborNonce ?? !!(t.distribution && t.distribution.length > 0);
  M(s, { ...t.template, useCborNonce: i });
  const u = t.nonceStep ?? BigInt(t.batchSize), p = t.network === "signet" ? "testnet" : t.network;
  let a = t.startNonce, N = 0n;
  const T = performance.now();
  for (; !e.signal.aborted; ) {
    const d = a;
    let _ = t.batchSize, h = 0n;
    for (; _ > 0 && !e.signal.aborted; ) {
      const B = d + h;
      let o;
      try {
        o = (i ? U(B, _) : V(B, _))[0];
      } catch (l) {
        b(
          `Invalid nonce range: ${R(l)}`,
          r.INVALID_INPUT
        ), e.abort();
        return;
      }
      let I;
      try {
        I = await $(
          s,
          n,
          {
            inputs: t.inputs,
            outputs: t.outputs,
            satsPerVbyte: t.satsPerVbyte,
            distribution: t.distribution,
            useCborNonce: i
          },
          o,
          p
        );
      } catch (l) {
        b(
          `Failed to build mining template: ${R(l)}`,
          r.WORKER_ERROR
        ), e.abort();
        return;
      }
      let c;
      const O = performance.now();
      try {
        c = await X(
          n,
          m,
          I.prefix,
          I.suffix,
          o.start,
          o.size,
          t.targetZeros,
          i
        );
      } catch (l) {
        const E = R(l);
        b(
          `Batch mining failed: ${E}`,
          r.WORKER_ERROR
        ), e.abort();
        return;
      }
      const S = performance.now() - O;
      if (D(c)) {
        if (!c.ok) {
          b(
            c.error ?? "Validation failed",
            r.INVALID_INPUT
          ), e.abort();
          return;
        }
      } else if (F(c)) {
        const l = N + h, E = BigInt(c.nonce) - o.start + 1n, A = l + E, y = performance.now() - T, L = y > 0 ? K(A) / (y / 1e3) : 0, P = o.start + E - 1n, x = {
          psbt: "",
          txid: c.txid,
          nonce: BigInt(c.nonce),
          attempts: A,
          duration: y,
          hashRate: L
        };
        g({
          type: "found",
          result: x,
          hashesProcessed: A,
          hashRate: L,
          lastNonce: P
        }), e.abort();
        return;
      }
      N += BigInt(o.size), h += BigInt(o.size), _ -= o.size;
      const W = S > 0 ? o.size / (S / 1e3) : o.size, k = o.start + BigInt(o.size) - 1n;
      g({ type: "progress", hashesProcessed: N, hashRate: W, lastNonce: k });
    }
    if (e.signal.aborted)
      break;
    const z = d + BigInt(t.batchSize) - 1n;
    g({ type: "batch_complete", lastNonce: z }), a = d + u;
  }
}, q = (t) => {
  const e = new AbortController();
  f?.abort(), f = e, j(t, e).finally(() => {
    f === e && (f = null);
  });
};
w.addEventListener("message", (t) => {
  const e = t.data;
  switch (e.type) {
    case "init":
      m = e.mode, g({ type: "ready" });
      break;
    case "mine":
      q(e);
      break;
    case "stop":
      f?.abort();
      break;
    default:
      b(
        `Unknown message type: ${e.type}`,
        r.WORKER_ERROR
      );
  }
});