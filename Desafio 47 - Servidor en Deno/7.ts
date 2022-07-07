import { serve } from "https://deno.land/std@0.145.0/http/mod.ts";

const s = serve((req) => {
  const url = req.url
  console.log(url)
  const params = url.split('?')[1]
  console.log(params)
  return new Response('hola!!')
}, { port: 8080 })