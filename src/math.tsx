// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Math {
  avg: (arr: number[]) => number
}

Math.avg = function (arr: number[]) {
  return arr.reduce((a, b) => a + b, 0) / arr.length
}
