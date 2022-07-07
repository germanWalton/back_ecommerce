import { red, green, bgYellow, bgWhite, bold } from "https://deno.land/std/fmt/colors.ts"

console.log(bgWhite(bold(red("Hola!"))))
console.log(bgYellow(bold(green("Adios!"))))