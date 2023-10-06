import http from "node:http"
import {InvertNumberStream} from "./fundamentals.js"

const server = http.createServer(async (req, res) => {

  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()

  return res.end(fullStreamContent)

  //leitura parcial do conteudo
  // return req
  //       .pipe(new InvertNumberStream())
  //       .pipe(res)
})


server.listen(3334)