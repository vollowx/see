function signum(num) {
  if (num < 0) {
    return -1;
  } else if (num === 0) {
    return 0;
  } else {
    return 1;
  }
}
function lerp(start, stop, amount) {
  return (1 - amount) * start + amount * stop;
}
function clampInt(min, max, input) {
  if (input < min) {
    return min;
  } else if (input > max) {
    return max;
  }
  return input;
}
function clampDouble(min, max, input) {
  if (input < min) {
    return min;
  } else if (input > max) {
    return max;
  }
  return input;
}
function sanitizeDegreesDouble(degrees) {
  degrees = degrees % 360;
  if (degrees < 0) {
    degrees = degrees + 360;
  }
  return degrees;
}
function differenceDegrees(a2, b2) {
  return 180 - Math.abs(Math.abs(a2 - b2) - 180);
}
function matrixMultiply(row, matrix) {
  const a2 = row[0] * matrix[0][0] + row[1] * matrix[0][1] + row[2] * matrix[0][2];
  const b2 = row[0] * matrix[1][0] + row[1] * matrix[1][1] + row[2] * matrix[1][2];
  const c2 = row[0] * matrix[2][0] + row[1] * matrix[2][1] + row[2] * matrix[2][2];
  return [a2, b2, c2];
}
const SRGB_TO_XYZ = [
  [0.41233895, 0.35762064, 0.18051042],
  [0.2126, 0.7152, 0.0722],
  [0.01932141, 0.11916382, 0.95034478],
];
const XYZ_TO_SRGB = [
  [3.2413774792388685, -1.5376652402851851, -0.49885366846268053],
  [-0.9691452513005321, 1.8758853451067872, 0.04156585616912061],
  [0.05562093689691305, -0.20395524564742123, 1.0571799111220335],
];
const WHITE_POINT_D65 = [95.047, 100, 108.883];
function argbFromRgb(red, green, blue) {
  return ((255 << 24) | ((red & 255) << 16) | ((green & 255) << 8) | (blue & 255)) >>> 0;
}
function redFromArgb(argb) {
  return (argb >> 16) & 255;
}
function greenFromArgb(argb) {
  return (argb >> 8) & 255;
}
function blueFromArgb(argb) {
  return argb & 255;
}
function argbFromXyz(x2, y, z2) {
  const matrix = XYZ_TO_SRGB;
  const linearR = matrix[0][0] * x2 + matrix[0][1] * y + matrix[0][2] * z2;
  const linearG = matrix[1][0] * x2 + matrix[1][1] * y + matrix[1][2] * z2;
  const linearB = matrix[2][0] * x2 + matrix[2][1] * y + matrix[2][2] * z2;
  const r2 = delinearized(linearR);
  const g2 = delinearized(linearG);
  const b2 = delinearized(linearB);
  return argbFromRgb(r2, g2, b2);
}
function xyzFromArgb(argb) {
  const r2 = linearized(redFromArgb(argb));
  const g2 = linearized(greenFromArgb(argb));
  const b2 = linearized(blueFromArgb(argb));
  return matrixMultiply([r2, g2, b2], SRGB_TO_XYZ);
}
function argbFromLstar(lstar) {
  const fy = (lstar + 16) / 116;
  const fz = fy;
  const fx = fy;
  const kappa = 24389 / 27;
  const epsilon = 216 / 24389;
  const lExceedsEpsilonKappa = lstar > 8;
  const y = lExceedsEpsilonKappa ? fy * fy * fy : lstar / kappa;
  const cubeExceedEpsilon = fy * fy * fy > epsilon;
  const x2 = cubeExceedEpsilon ? fx * fx * fx : lstar / kappa;
  const z2 = cubeExceedEpsilon ? fz * fz * fz : lstar / kappa;
  const whitePoint = WHITE_POINT_D65;
  return argbFromXyz(x2 * whitePoint[0], y * whitePoint[1], z2 * whitePoint[2]);
}
function lstarFromArgb(argb) {
  const y = xyzFromArgb(argb)[1] / 100;
  const e2 = 216 / 24389;
  if (y <= e2) {
    return (24389 / 27) * y;
  } else {
    const yIntermediate = Math.pow(y, 1 / 3);
    return 116 * yIntermediate - 16;
  }
}
function yFromLstar(lstar) {
  const ke = 8;
  if (lstar > ke) {
    return Math.pow((lstar + 16) / 116, 3) * 100;
  } else {
    return (lstar / (24389 / 27)) * 100;
  }
}
function linearized(rgbComponent) {
  const normalized = rgbComponent / 255;
  if (normalized <= 0.040449936) {
    return (normalized / 12.92) * 100;
  } else {
    return Math.pow((normalized + 0.055) / 1.055, 2.4) * 100;
  }
}
function delinearized(rgbComponent) {
  const normalized = rgbComponent / 100;
  let delinearized2 = 0;
  if (normalized <= 31308e-7) {
    delinearized2 = normalized * 12.92;
  } else {
    delinearized2 = 1.055 * Math.pow(normalized, 1 / 2.4) - 0.055;
  }
  return clampInt(0, 255, Math.round(delinearized2 * 255));
}
function whitePointD65() {
  return WHITE_POINT_D65;
}
class ViewingConditions {
  constructor(n2, aw, nbb, ncb, c2, nc, rgbD, fl, fLRoot, z2) {
    this.n = n2;
    this.aw = aw;
    this.nbb = nbb;
    this.ncb = ncb;
    this.c = c2;
    this.nc = nc;
    this.rgbD = rgbD;
    this.fl = fl;
    this.fLRoot = fLRoot;
    this.z = z2;
  }
  static make(
    whitePoint = whitePointD65(),
    adaptingLuminance = ((200 / Math.PI) * yFromLstar(50)) / 100,
    backgroundLstar = 50,
    surround = 2,
    discountingIlluminant = false
  ) {
    const xyz = whitePoint;
    const rW = xyz[0] * 0.401288 + xyz[1] * 0.650173 + xyz[2] * -0.051461;
    const gW = xyz[0] * -0.250268 + xyz[1] * 1.204414 + xyz[2] * 0.045854;
    const bW = xyz[0] * -2079e-6 + xyz[1] * 0.048952 + xyz[2] * 0.953127;
    const f2 = 0.8 + surround / 10;
    const c2 = f2 >= 0.9 ? lerp(0.59, 0.69, (f2 - 0.9) * 10) : lerp(0.525, 0.59, (f2 - 0.8) * 10);
    let d2 = discountingIlluminant ? 1 : f2 * (1 - (1 / 3.6) * Math.exp((-adaptingLuminance - 42) / 92));
    d2 = d2 > 1 ? 1 : d2 < 0 ? 0 : d2;
    const nc = f2;
    const rgbD = [d2 * (100 / rW) + 1 - d2, d2 * (100 / gW) + 1 - d2, d2 * (100 / bW) + 1 - d2];
    const k2 = 1 / (5 * adaptingLuminance + 1);
    const k4 = k2 * k2 * k2 * k2;
    const k4F = 1 - k4;
    const fl = k4 * adaptingLuminance + 0.1 * k4F * k4F * Math.cbrt(5 * adaptingLuminance);
    const n2 = yFromLstar(backgroundLstar) / whitePoint[1];
    const z2 = 1.48 + Math.sqrt(n2);
    const nbb = 0.725 / Math.pow(n2, 0.2);
    const ncb = nbb;
    const rgbAFactors = [
      Math.pow((fl * rgbD[0] * rW) / 100, 0.42),
      Math.pow((fl * rgbD[1] * gW) / 100, 0.42),
      Math.pow((fl * rgbD[2] * bW) / 100, 0.42),
    ];
    const rgbA = [
      (400 * rgbAFactors[0]) / (rgbAFactors[0] + 27.13),
      (400 * rgbAFactors[1]) / (rgbAFactors[1] + 27.13),
      (400 * rgbAFactors[2]) / (rgbAFactors[2] + 27.13),
    ];
    const aw = (2 * rgbA[0] + rgbA[1] + 0.05 * rgbA[2]) * nbb;
    return new ViewingConditions(n2, aw, nbb, ncb, c2, nc, rgbD, fl, Math.pow(fl, 0.25), z2);
  }
}
ViewingConditions.DEFAULT = ViewingConditions.make();
class Cam16 {
  constructor(hue, chroma, j, q, m2, s2, jstar, astar, bstar) {
    this.hue = hue;
    this.chroma = chroma;
    this.j = j;
    this.q = q;
    this.m = m2;
    this.s = s2;
    this.jstar = jstar;
    this.astar = astar;
    this.bstar = bstar;
  }
  distance(other) {
    const dJ = this.jstar - other.jstar;
    const dA = this.astar - other.astar;
    const dB = this.bstar - other.bstar;
    const dEPrime = Math.sqrt(dJ * dJ + dA * dA + dB * dB);
    const dE = 1.41 * Math.pow(dEPrime, 0.63);
    return dE;
  }
  static fromInt(argb) {
    return Cam16.fromIntInViewingConditions(argb, ViewingConditions.DEFAULT);
  }
  static fromIntInViewingConditions(argb, viewingConditions) {
    const red = (argb & 16711680) >> 16;
    const green = (argb & 65280) >> 8;
    const blue = argb & 255;
    const redL = linearized(red);
    const greenL = linearized(green);
    const blueL = linearized(blue);
    const x2 = 0.41233895 * redL + 0.35762064 * greenL + 0.18051042 * blueL;
    const y = 0.2126 * redL + 0.7152 * greenL + 0.0722 * blueL;
    const z2 = 0.01932141 * redL + 0.11916382 * greenL + 0.95034478 * blueL;
    const rC = 0.401288 * x2 + 0.650173 * y - 0.051461 * z2;
    const gC = -0.250268 * x2 + 1.204414 * y + 0.045854 * z2;
    const bC = -2079e-6 * x2 + 0.048952 * y + 0.953127 * z2;
    const rD = viewingConditions.rgbD[0] * rC;
    const gD = viewingConditions.rgbD[1] * gC;
    const bD = viewingConditions.rgbD[2] * bC;
    const rAF = Math.pow((viewingConditions.fl * Math.abs(rD)) / 100, 0.42);
    const gAF = Math.pow((viewingConditions.fl * Math.abs(gD)) / 100, 0.42);
    const bAF = Math.pow((viewingConditions.fl * Math.abs(bD)) / 100, 0.42);
    const rA = (signum(rD) * 400 * rAF) / (rAF + 27.13);
    const gA = (signum(gD) * 400 * gAF) / (gAF + 27.13);
    const bA = (signum(bD) * 400 * bAF) / (bAF + 27.13);
    const a2 = (11 * rA + -12 * gA + bA) / 11;
    const b2 = (rA + gA - 2 * bA) / 9;
    const u2 = (20 * rA + 20 * gA + 21 * bA) / 20;
    const p2 = (40 * rA + 20 * gA + bA) / 20;
    const atan2 = Math.atan2(b2, a2);
    const atanDegrees = (atan2 * 180) / Math.PI;
    const hue = atanDegrees < 0 ? atanDegrees + 360 : atanDegrees >= 360 ? atanDegrees - 360 : atanDegrees;
    const hueRadians = (hue * Math.PI) / 180;
    const ac = p2 * viewingConditions.nbb;
    const j = 100 * Math.pow(ac / viewingConditions.aw, viewingConditions.c * viewingConditions.z);
    const q = (4 / viewingConditions.c) * Math.sqrt(j / 100) * (viewingConditions.aw + 4) * viewingConditions.fLRoot;
    const huePrime = hue < 20.14 ? hue + 360 : hue;
    const eHue = 0.25 * (Math.cos((huePrime * Math.PI) / 180 + 2) + 3.8);
    const p1 = (5e4 / 13) * eHue * viewingConditions.nc * viewingConditions.ncb;
    const t2 = (p1 * Math.sqrt(a2 * a2 + b2 * b2)) / (u2 + 0.305);
    const alpha = Math.pow(t2, 0.9) * Math.pow(1.64 - Math.pow(0.29, viewingConditions.n), 0.73);
    const c2 = alpha * Math.sqrt(j / 100);
    const m2 = c2 * viewingConditions.fLRoot;
    const s2 = 50 * Math.sqrt((alpha * viewingConditions.c) / (viewingConditions.aw + 4));
    const jstar = ((1 + 100 * 7e-3) * j) / (1 + 7e-3 * j);
    const mstar = (1 / 0.0228) * Math.log(1 + 0.0228 * m2);
    const astar = mstar * Math.cos(hueRadians);
    const bstar = mstar * Math.sin(hueRadians);
    return new Cam16(hue, c2, j, q, m2, s2, jstar, astar, bstar);
  }
  static fromJch(j, c2, h2) {
    return Cam16.fromJchInViewingConditions(j, c2, h2, ViewingConditions.DEFAULT);
  }
  static fromJchInViewingConditions(j, c2, h2, viewingConditions) {
    const q = (4 / viewingConditions.c) * Math.sqrt(j / 100) * (viewingConditions.aw + 4) * viewingConditions.fLRoot;
    const m2 = c2 * viewingConditions.fLRoot;
    const alpha = c2 / Math.sqrt(j / 100);
    const s2 = 50 * Math.sqrt((alpha * viewingConditions.c) / (viewingConditions.aw + 4));
    const hueRadians = (h2 * Math.PI) / 180;
    const jstar = ((1 + 100 * 7e-3) * j) / (1 + 7e-3 * j);
    const mstar = (1 / 0.0228) * Math.log(1 + 0.0228 * m2);
    const astar = mstar * Math.cos(hueRadians);
    const bstar = mstar * Math.sin(hueRadians);
    return new Cam16(h2, c2, j, q, m2, s2, jstar, astar, bstar);
  }
  static fromUcs(jstar, astar, bstar) {
    return Cam16.fromUcsInViewingConditions(jstar, astar, bstar, ViewingConditions.DEFAULT);
  }
  static fromUcsInViewingConditions(jstar, astar, bstar, viewingConditions) {
    const a2 = astar;
    const b2 = bstar;
    const m2 = Math.sqrt(a2 * a2 + b2 * b2);
    const M2 = (Math.exp(m2 * 0.0228) - 1) / 0.0228;
    const c2 = M2 / viewingConditions.fLRoot;
    let h2 = Math.atan2(b2, a2) * (180 / Math.PI);
    if (h2 < 0) {
      h2 += 360;
    }
    const j = jstar / (1 - (jstar - 100) * 7e-3);
    return Cam16.fromJchInViewingConditions(j, c2, h2, viewingConditions);
  }
  toInt() {
    return this.viewed(ViewingConditions.DEFAULT);
  }
  viewed(viewingConditions) {
    const alpha = this.chroma === 0 || this.j === 0 ? 0 : this.chroma / Math.sqrt(this.j / 100);
    const t2 = Math.pow(alpha / Math.pow(1.64 - Math.pow(0.29, viewingConditions.n), 0.73), 1 / 0.9);
    const hRad = (this.hue * Math.PI) / 180;
    const eHue = 0.25 * (Math.cos(hRad + 2) + 3.8);
    const ac = viewingConditions.aw * Math.pow(this.j / 100, 1 / viewingConditions.c / viewingConditions.z);
    const p1 = eHue * (5e4 / 13) * viewingConditions.nc * viewingConditions.ncb;
    const p2 = ac / viewingConditions.nbb;
    const hSin = Math.sin(hRad);
    const hCos = Math.cos(hRad);
    const gamma = (23 * (p2 + 0.305) * t2) / (23 * p1 + 11 * t2 * hCos + 108 * t2 * hSin);
    const a2 = gamma * hCos;
    const b2 = gamma * hSin;
    const rA = (460 * p2 + 451 * a2 + 288 * b2) / 1403;
    const gA = (460 * p2 - 891 * a2 - 261 * b2) / 1403;
    const bA = (460 * p2 - 220 * a2 - 6300 * b2) / 1403;
    const rCBase = Math.max(0, (27.13 * Math.abs(rA)) / (400 - Math.abs(rA)));
    const rC = signum(rA) * (100 / viewingConditions.fl) * Math.pow(rCBase, 1 / 0.42);
    const gCBase = Math.max(0, (27.13 * Math.abs(gA)) / (400 - Math.abs(gA)));
    const gC = signum(gA) * (100 / viewingConditions.fl) * Math.pow(gCBase, 1 / 0.42);
    const bCBase = Math.max(0, (27.13 * Math.abs(bA)) / (400 - Math.abs(bA)));
    const bC = signum(bA) * (100 / viewingConditions.fl) * Math.pow(bCBase, 1 / 0.42);
    const rF = rC / viewingConditions.rgbD[0];
    const gF = gC / viewingConditions.rgbD[1];
    const bF = bC / viewingConditions.rgbD[2];
    const x2 = 1.86206786 * rF - 1.01125463 * gF + 0.14918677 * bF;
    const y = 0.38752654 * rF + 0.62144744 * gF - 897398e-8 * bF;
    const z2 = -0.0158415 * rF - 0.03412294 * gF + 1.04996444 * bF;
    const argb = argbFromXyz(x2, y, z2);
    return argb;
  }
}
class Hct {
  constructor(internalHue, internalChroma, internalTone) {
    this.internalHue = internalHue;
    this.internalChroma = internalChroma;
    this.internalTone = internalTone;
    this.setInternalState(this.toInt());
  }
  static from(hue, chroma, tone) {
    return new Hct(hue, chroma, tone);
  }
  static fromInt(argb) {
    const cam = Cam16.fromInt(argb);
    const tone = lstarFromArgb(argb);
    return new Hct(cam.hue, cam.chroma, tone);
  }
  toInt() {
    return getInt(this.internalHue, this.internalChroma, this.internalTone);
  }
  get hue() {
    return this.internalHue;
  }
  set hue(newHue) {
    this.setInternalState(getInt(sanitizeDegreesDouble(newHue), this.internalChroma, this.internalTone));
  }
  get chroma() {
    return this.internalChroma;
  }
  set chroma(newChroma) {
    this.setInternalState(getInt(this.internalHue, newChroma, this.internalTone));
  }
  get tone() {
    return this.internalTone;
  }
  set tone(newTone) {
    this.setInternalState(getInt(this.internalHue, this.internalChroma, newTone));
  }
  setInternalState(argb) {
    const cam = Cam16.fromInt(argb);
    const tone = lstarFromArgb(argb);
    this.internalHue = cam.hue;
    this.internalChroma = cam.chroma;
    this.internalTone = tone;
  }
}
const CHROMA_SEARCH_ENDPOINT = 0.4;
const DE_MAX = 1;
const DL_MAX = 0.2;
const LIGHTNESS_SEARCH_ENDPOINT = 0.01;
function getInt(hue, chroma, tone) {
  return getIntInViewingConditions(
    sanitizeDegreesDouble(hue),
    chroma,
    clampDouble(0, 100, tone),
    ViewingConditions.DEFAULT
  );
}
function getIntInViewingConditions(hue, chroma, tone, viewingConditions) {
  if (chroma < 1 || Math.round(tone) <= 0 || Math.round(tone) >= 100) {
    return argbFromLstar(tone);
  }
  hue = sanitizeDegreesDouble(hue);
  let high = chroma;
  let mid = chroma;
  let low = 0;
  let isFirstLoop = true;
  let answer = null;
  while (Math.abs(low - high) >= CHROMA_SEARCH_ENDPOINT) {
    const possibleAnswer = findCamByJ(hue, mid, tone);
    if (isFirstLoop) {
      if (possibleAnswer != null) {
        return possibleAnswer.viewed(viewingConditions);
      } else {
        isFirstLoop = false;
        mid = low + (high - low) / 2;
        continue;
      }
    }
    if (possibleAnswer === null) {
      high = mid;
    } else {
      answer = possibleAnswer;
      low = mid;
    }
    mid = low + (high - low) / 2;
  }
  if (answer === null) {
    return argbFromLstar(tone);
  }
  return answer.viewed(viewingConditions);
}
function findCamByJ(hue, chroma, tone) {
  let low = 0;
  let high = 100;
  let mid = 0;
  let bestdL = 1e3;
  let bestdE = 1e3;
  let bestCam = null;
  while (Math.abs(low - high) > LIGHTNESS_SEARCH_ENDPOINT) {
    mid = low + (high - low) / 2;
    const camBeforeClip = Cam16.fromJch(mid, chroma, hue);
    const clipped = camBeforeClip.toInt();
    const clippedLstar = lstarFromArgb(clipped);
    const dL = Math.abs(tone - clippedLstar);
    if (dL < DL_MAX) {
      const camClipped = Cam16.fromInt(clipped);
      const dE = camClipped.distance(Cam16.fromJch(camClipped.j, camClipped.chroma, hue));
      if (dE <= DE_MAX && dE <= bestdE) {
        bestdL = dL;
        bestdE = dE;
        bestCam = camClipped;
      }
    }
    if (bestdL === 0 && bestdE === 0) {
      break;
    }
    if (clippedLstar < tone) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return bestCam;
}
class Blend {
  static harmonize(designColor, sourceColor) {
    const fromHct = Hct.fromInt(designColor);
    const toHct = Hct.fromInt(sourceColor);
    const differenceDegrees$1 = differenceDegrees(fromHct.hue, toHct.hue);
    const rotationDegrees = Math.min(differenceDegrees$1 * 0.5, 15);
    const outputHue = sanitizeDegreesDouble(
      fromHct.hue + rotationDegrees * Blend.rotationDirection(fromHct.hue, toHct.hue)
    );
    return Hct.from(outputHue, fromHct.chroma, fromHct.tone).toInt();
  }
  static hctHue(from, to, amount) {
    const ucs = Blend.cam16Ucs(from, to, amount);
    const ucsCam = Cam16.fromInt(ucs);
    const fromCam = Cam16.fromInt(from);
    const blended = Hct.from(ucsCam.hue, fromCam.chroma, lstarFromArgb(from));
    return blended.toInt();
  }
  static cam16Ucs(from, to, amount) {
    const fromCam = Cam16.fromInt(from);
    const toCam = Cam16.fromInt(to);
    const fromJ = fromCam.jstar;
    const fromA = fromCam.astar;
    const fromB = fromCam.bstar;
    const toJ = toCam.jstar;
    const toA = toCam.astar;
    const toB = toCam.bstar;
    const jstar = fromJ + (toJ - fromJ) * amount;
    const astar = fromA + (toA - fromA) * amount;
    const bstar = fromB + (toB - fromB) * amount;
    return Cam16.fromUcs(jstar, astar, bstar).toInt();
  }
  static rotationDirection(from, to) {
    const a2 = to - from;
    const b2 = to - from + 360;
    const c2 = to - from - 360;
    const aAbs = Math.abs(a2);
    const bAbs = Math.abs(b2);
    const cAbs = Math.abs(c2);
    if (aAbs <= bAbs && aAbs <= cAbs) {
      return a2 >= 0 ? 1 : -1;
    } else if (bAbs <= aAbs && bAbs <= cAbs) {
      return b2 >= 0 ? 1 : -1;
    } else {
      return c2 >= 0 ? 1 : -1;
    }
  }
}
class TonalPalette {
  constructor(hue, chroma) {
    this.hue = hue;
    this.chroma = chroma;
    this.cache = /* @__PURE__ */ new Map();
  }
  static fromInt(argb) {
    const hct = Hct.fromInt(argb);
    return TonalPalette.fromHueAndChroma(hct.hue, hct.chroma);
  }
  static fromHueAndChroma(hue, chroma) {
    return new TonalPalette(hue, chroma);
  }
  tone(tone) {
    let argb = this.cache.get(tone);
    if (argb === void 0) {
      argb = Hct.from(this.hue, this.chroma, tone).toInt();
      this.cache.set(tone, argb);
    }
    return argb;
  }
}
class CorePalette {
  constructor(argb) {
    const hct = Hct.fromInt(argb);
    const hue = hct.hue;
    this.a1 = TonalPalette.fromHueAndChroma(hue, Math.max(48, hct.chroma));
    this.a2 = TonalPalette.fromHueAndChroma(hue, 16);
    this.a3 = TonalPalette.fromHueAndChroma(hue + 60, 24);
    this.n1 = TonalPalette.fromHueAndChroma(hue, 4);
    this.n2 = TonalPalette.fromHueAndChroma(hue, 8);
    this.error = TonalPalette.fromHueAndChroma(25, 84);
  }
  static of(argb) {
    return new CorePalette(argb);
  }
}
class Scheme {
  constructor(props) {
    this.props = props;
  }
  get primary() {
    return this.props.primary;
  }
  get primaryContainer() {
    return this.props.primaryContainer;
  }
  get onPrimary() {
    return this.props.onPrimary;
  }
  get onPrimaryContainer() {
    return this.props.onPrimaryContainer;
  }
  get secondary() {
    return this.props.secondary;
  }
  get secondaryContainer() {
    return this.props.secondaryContainer;
  }
  get onSecondary() {
    return this.props.onSecondary;
  }
  get onSecondaryContainer() {
    return this.props.onSecondaryContainer;
  }
  get tertiary() {
    return this.props.tertiary;
  }
  get onTertiary() {
    return this.props.onTertiary;
  }
  get tertiaryContainer() {
    return this.props.tertiaryContainer;
  }
  get onTertiaryContainer() {
    return this.props.onTertiaryContainer;
  }
  get error() {
    return this.props.error;
  }
  get onError() {
    return this.props.onError;
  }
  get errorContainer() {
    return this.props.errorContainer;
  }
  get onErrorContainer() {
    return this.props.onErrorContainer;
  }
  get background() {
    return this.props.background;
  }
  get onBackground() {
    return this.props.onBackground;
  }
  get surface() {
    return this.props.surface;
  }
  get onSurface() {
    return this.props.onSurface;
  }
  get surfaceVariant() {
    return this.props.surfaceVariant;
  }
  get onSurfaceVariant() {
    return this.props.onSurfaceVariant;
  }
  get outline() {
    return this.props.outline;
  }
  get shadow() {
    return this.props.shadow;
  }
  get inverseSurface() {
    return this.props.inverseSurface;
  }
  get inverseOnSurface() {
    return this.props.inverseOnSurface;
  }
  get inversePrimary() {
    return this.props.inversePrimary;
  }
  static light(argb) {
    const core = CorePalette.of(argb);
    return new Scheme({
      primary: core.a1.tone(40),
      onPrimary: core.a1.tone(100),
      primaryContainer: core.a1.tone(90),
      onPrimaryContainer: core.a1.tone(10),
      secondary: core.a2.tone(40),
      onSecondary: core.a2.tone(100),
      secondaryContainer: core.a2.tone(90),
      onSecondaryContainer: core.a2.tone(10),
      tertiary: core.a3.tone(40),
      onTertiary: core.a3.tone(100),
      tertiaryContainer: core.a3.tone(90),
      onTertiaryContainer: core.a3.tone(10),
      error: core.error.tone(40),
      onError: core.error.tone(100),
      errorContainer: core.error.tone(90),
      onErrorContainer: core.error.tone(10),
      background: core.n1.tone(99),
      onBackground: core.n1.tone(10),
      surface: core.n1.tone(99),
      onSurface: core.n1.tone(10),
      surfaceVariant: core.n2.tone(90),
      onSurfaceVariant: core.n2.tone(30),
      outline: core.n2.tone(50),
      shadow: core.n1.tone(0),
      inverseSurface: core.n1.tone(20),
      inverseOnSurface: core.n1.tone(95),
      inversePrimary: core.a1.tone(80),
    });
  }
  static dark(argb) {
    const core = CorePalette.of(argb);
    return new Scheme({
      primary: core.a1.tone(80),
      onPrimary: core.a1.tone(20),
      primaryContainer: core.a1.tone(30),
      onPrimaryContainer: core.a1.tone(90),
      secondary: core.a2.tone(80),
      onSecondary: core.a2.tone(20),
      secondaryContainer: core.a2.tone(30),
      onSecondaryContainer: core.a2.tone(90),
      tertiary: core.a3.tone(80),
      onTertiary: core.a3.tone(20),
      tertiaryContainer: core.a3.tone(30),
      onTertiaryContainer: core.a3.tone(90),
      error: core.error.tone(80),
      onError: core.error.tone(20),
      errorContainer: core.error.tone(30),
      onErrorContainer: core.error.tone(80),
      background: core.n1.tone(10),
      onBackground: core.n1.tone(90),
      surface: core.n1.tone(10),
      onSurface: core.n1.tone(90),
      surfaceVariant: core.n2.tone(30),
      onSurfaceVariant: core.n2.tone(80),
      outline: core.n2.tone(60),
      shadow: core.n1.tone(0),
      inverseSurface: core.n1.tone(90),
      inverseOnSurface: core.n1.tone(20),
      inversePrimary: core.a1.tone(40),
    });
  }
  toJSON() {
    return Object.assign({}, this.props);
  }
}
const hexFromArgb = (argb) => {
  const r2 = redFromArgb(argb);
  const g2 = greenFromArgb(argb);
  const b2 = blueFromArgb(argb);
  const outParts = [r2.toString(16), g2.toString(16), b2.toString(16)];
  for (const [i2, part] of outParts.entries()) {
    if (part.length === 1) {
      outParts[i2] = '0' + part;
    }
  }
  return '#' + outParts.join('');
};
const argbFromHex = (hex) => {
  hex = hex.replace('#', '');
  const isThree = hex.length === 3;
  const isSix = hex.length === 6;
  const isEight = hex.length === 8;
  if (!isThree && !isSix && !isEight) {
    throw new Error('unexpected hex ' + hex);
  }
  let r2 = 0;
  let g2 = 0;
  let b2 = 0;
  if (isThree) {
    r2 = parseIntHex(hex.slice(0, 1).repeat(2));
    g2 = parseIntHex(hex.slice(1, 2).repeat(2));
    b2 = parseIntHex(hex.slice(2, 3).repeat(2));
  } else if (isSix) {
    r2 = parseIntHex(hex.slice(0, 2));
    g2 = parseIntHex(hex.slice(2, 4));
    b2 = parseIntHex(hex.slice(4, 6));
  } else if (isEight) {
    r2 = parseIntHex(hex.slice(2, 4));
    g2 = parseIntHex(hex.slice(4, 6));
    b2 = parseIntHex(hex.slice(6, 8));
  }
  return ((255 << 24) | ((r2 & 255) << 16) | ((g2 & 255) << 8) | (b2 & 255)) >>> 0;
};
function parseIntHex(value) {
  return parseInt(value, 16);
}
function themeFromSourceColor(source, customColors = []) {
  const palette = CorePalette.of(source);
  return {
    source,
    schemes: {
      light: Scheme.light(source),
      dark: Scheme.dark(source),
    },
    palettes: {
      primary: palette.a1,
      secondary: palette.a2,
      tertiary: palette.a3,
      neutral: palette.n1,
      neutralVariant: palette.n2,
      error: palette.error,
    },
    customColors: customColors.map((c2) => customColor(source, c2)),
  };
}
function customColor(source, color) {
  let value = color.value;
  const from = value;
  const to = source;
  if (color.blend) {
    value = Blend.harmonize(from, to);
  }
  const palette = CorePalette.of(value);
  const tones = palette.a1;
  return {
    color,
    value,
    light: {
      color: tones.tone(40),
      onColor: tones.tone(100),
      colorContainer: tones.tone(90),
      onColorContainer: tones.tone(10),
    },
    dark: {
      color: tones.tone(80),
      onColor: tones.tone(20),
      colorContainer: tones.tone(30),
      onColorContainer: tones.tone(90),
    },
  };
}
/**
 * @param {HTMLElement} target
 * @param {any} styleJSON
 * @param {string} suffix
 */
function setPropertyWithSuffix(target, styleJSON, suffix) {
  for (const [key, value] of Object.entries(styleJSON)) {
    const token = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    const color = hexFromArgb(value);
    target.style.setProperty(`--md-sys-color-${token}-${suffix}`, color);
    if (['surface', 'on-surface'].includes(token)) {
      const hex = color.replace('#', '');
      const r = parseIntHex(hex.slice(0, 2));
      const g = parseIntHex(hex.slice(2, 4));
      const b = parseIntHex(hex.slice(4, 6));
      target.style.setProperty(`--md-sys-color-${token}-rgb-${suffix}`, `${r}, ${g}, ${b}`);
    }
  }
}
/**
 * @param {any} theme
 * @param {HTMLElement} target
 */
function applyTheme(theme, target = document.body) {
  setPropertyWithSuffix(target, theme.schemes.light.toJSON(), 'light');
  setPropertyWithSuffix(target, theme.schemes.dark.toJSON(), 'dark');
}

export default class ColorSystem {
  /**
   * @param {HTMLElement} target
   * @param {string} color
   */
  static changeTheme(target, color = '#6750A4') {
    const themeColor = themeFromSourceColor(argbFromHex(color));
    updateCrTitleBarColor(color);
    applyTheme(themeColor, target);
  }
}
function updateCrTitleBarColor(_color) {
  let crTitleBarColor = document.querySelector('meta[name="theme-color"]');
  if (crTitleBarColor) {
    crTitleBarColor.setAttribute('content', _color);
  } else {
    crTitleBarColor = document.createElement('meta');
    crTitleBarColor.setAttribute('name', 'theme-color');
    crTitleBarColor.setAttribute('content', _color);
    document.head.appendChild(crTitleBarColor);
  }
}
