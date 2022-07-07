import { parse } from "https://deno.land/std@0.95.0/datetime/mod.ts";

const fecha = parse('29-06-2022', 'dd-mm-yyyy')

console.log(fecha)

