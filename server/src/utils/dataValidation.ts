import { ClientSocket } from '@interfaces/socket.interface';
import { validateOrReject, ValidatorOptions } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { SERVER_EVENT_NAME } from '@shared/constants/events';
import { ClassConstructor } from '@shared/types';
import { Game } from '@models/game.model';

const defaultValidatorOptions: ValidatorOptions = {
  whitelist: true,
  skipMissingProperties: true,
};

export const validateRequestData = async <T, V>(
  socket: ClientSocket,
  cls: ClassConstructor<T>,
  data: V,
  options?: ValidatorOptions,
): Promise<boolean> => {
  const validatorOptions = { ...defaultValidatorOptions, ...options };

  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await validateOrReject(plainToClass(cls, data), validatorOptions);
    return true;
  } catch (e) {
    if (e instanceof Array) {
      const message = Object.values(e[0].constraints)[0] as string;
      socket.emit(SERVER_EVENT_NAME.Notification, message, 'Error');
    }

    return false;
  }
};
