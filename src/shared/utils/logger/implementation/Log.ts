import { LoggerFactory } from './LoggerFactory';

const logger = LoggerFactory.getInstance();
export default function Log() {
  try {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      const targetMethod = descriptor.value;
      descriptor.value = async function (...args: any[]) {
        logger.log(`🚀 ~ ${target.constructor.name} - ${propertyKey}`);
        for (const argIndex in args) {
          logger.log(`🔵 Param - ${argIndex + 1} ~ ${JSON.stringify(args[argIndex])}`);
        }
        const result = await targetMethod.apply(this, args);
        logger.log(`✅  ~ Returns - `, result);
        return result;
      };
    };
  } catch (error) {
    console.log(error)
  }
}
