import { Controller, Get } from 'routing-controllers';

@Controller('/healthz')
export class HealthzController {
  @Get('/')
  index() {
    const healthcheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
    };

    return healthcheck;
  }
}
