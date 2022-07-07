const args = Deno.args
const numsParsed = args.map(n => Number(n))

console.log(numsParsed.reduce((total, num) => total += num))