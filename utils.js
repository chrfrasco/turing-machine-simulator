function setNth(arr, idx, val) {
  const arrCopy = [...arr];
  arrCopy[idx] = val;
  return arrCopy;
}

function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const argsHash = hash(args);
    if (cache.has(argsHash)) {
      return cache.get(argsHash);
    }

    const result = fn(...args);
    cache.set(argsHash, result);
    return result;
  };
}

function hash(args) {
  if (Array.isArray(args)) {
    return `a:${args.map(hash).join("")}`;
  }

  if (isPrimitive(args)) {
    return `${args}`;
  }

  return `o:${Object.entries(args)
    .map(hash)
    .join("")}`;
}

function isPrimitive(arg) {
  return typeof arg !== "object";
}

function not(fn) {
  return (...args) => !fn(...args);
}

module.exports = { memoize, hash, setNth, not };
