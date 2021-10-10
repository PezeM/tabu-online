import { logger } from '@utils/logger';

interface PerformanceLogOptions {
  name?: string;
  argsSelector?: (args: any[]) => any;
  logCondition?: (args: any[]) => boolean;
}

function getArgsToLog(args: any[], argsSelector: (args: any[]) => any): any {
  if (!argsSelector) {
    return null;
  }

  try {
    return argsSelector(args);
  } catch (error) {
    return null;
  }
}

function isLogEnabled(args: any[], logCondition: (args: any[]) => boolean): boolean {
  if (!logCondition) {
    return true;
  }

  try {
    return logCondition(args);
  } catch (error) {
    return false;
  }
}

export function PerformanceLog(options: PerformanceLogOptions = {}): MethodDecorator {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const className = target.constructor.name;
    const method = options.name || propertyKey;
    const originalMethod = descriptor.value;

    // eslint-disable-next-line
    descriptor.value = async function (...args: any[]) {
      const start = Date.now();

      try {
        // eslint-disable-next-line
        return await originalMethod.apply(this, args);
      } finally {
        const end = Date.now();
        const duration = end - start;

        logger.debug(`[${className}][${method}] took ${duration} ms`, {
          args: getArgsToLog(args, options.argsSelector),
          start,
          end,
          duration,
        });
      }
    };
  };
}
