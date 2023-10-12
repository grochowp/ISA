export function CreateXReal1(a, b, d) {
  return (Math.random() * (b - a) + a).toFixed(d);
}

export function RealToInt(a, b, x, l, d) {
  return Math.floor((1 / (b - a)) * (x - a) * (Math.pow(2, l) - 1));
}

export function IntToBin(x) {
  return (x >>> 0).toString(2);
}

export function BinToInt(x) {
  return parseInt(x, 2);
}

export function IntToReal(a, b, x, l, d) {
  return ((x * (b - a)) / (Math.pow(2, l) - 1) + a).toFixed(d);
}

export function RealToFX(x) {
  return (x % 1) * (Math.cos(20 * Math.PI * x) - Math.sin(x));
}
