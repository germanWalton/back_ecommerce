// @deno-types="https://deno.land/x/servest/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest/mod.ts";

const app = createApp();
let visitas = 0
app.handle("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      'content-type': "text/html; charset=UTF-8"
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>App</title>
        </head>
        <body>
          Hello!
          <p>Numero de visitas {++visitas}</p>
        </body>
      </html>
    )
  })
})

app.listen({ port: 8888 })