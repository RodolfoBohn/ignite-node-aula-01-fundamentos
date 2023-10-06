import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

/*
  *
  * HTTP
  * MÉTODO (GET, POST, PUT, PATCH, DELETE)
  * ROTA
  * GET: BUSCAR
  * POST: CRIAR
  * PUT: ATUALIZAR (OBJETO INTEIRO)
  * PATCH: ATUALIZAR (SOMENTE UMA UNICA INFORMAÇÃO)
  * DELETE: DELETAR
  *
  * HEADERS: METADADOS DA REQUEST / RESPONSE
  * HTTP STATUS: STATUS DA REQUISIÇÃO, FALAM SOBRE SUCESSO, FALHA ETC
  *
*/



/*
*
* Query params: URL Stateful => Filtros, paginação, não obrigatórios e não sensíveis
* https://localhost:3333/users?usuario=Rodolfo
*
* Route Params: Identificação de recurso
* GET https://localhost:3333/users/1
*
* Request body: Infos sensíveis de um formulário
*
*/

const server = http.createServer(async(req, res) => {
  const {method, url} = req

  await json(req, res)

  const route = routes.find(r => r.path.test(url) && r.method === method)

  if(route) {
    const routeParams = req.url.match(route.path)
    const {query, ...params} = {...routeParams.groups}

    req.params = params
    req.query = query ? extractQueryParams(query) : {}
    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})


server.listen(3333)