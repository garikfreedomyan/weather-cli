export function getArgs([_executor, _file, ...args]) {
  const result = {};
  if (args.length) {
    args.forEach((el, i, arr) => {
      if (el.charAt(0) === '-') {
        if (i === arr.length - 1) {
          result[el.substring(1)] = true;
        } else if (arr[i + 1].charAt(0) !== '-') {
          result[el.substring(1)] = arr[i + 1];
        } else {
          result[el.substring(1)] = true;
        }
      }
    });
  }

  return result;
}
