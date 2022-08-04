import { Injectable } from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { IncomingHttpHeaders } from 'http'
import { Context } from './context.interface'

@Injectable()
export class ContextService {
  createContext(req: FastifyRequest) {
    return this.parseHeaders(req.headers)
  }

  parseHeaders(headers: IncomingHttpHeaders): Context {
    const eventId = (headers['x-ywc-event-id'] ?? undefined) as
      | string
      | undefined

    return {
      eventId,
    }
  }
}
