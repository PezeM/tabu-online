import { Game } from '@models/game.model';

export function IsCurrentCard() {
  return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
    const childFunction = descriptor.value;

    descriptor.value = (...args: any[]) => {
      const game = args[1];
      const cardName = args[2];

      if (!game || !cardName || !(game instanceof Game)) return null;
      if (!game.currentCard) return null;

      if (game.currentCard.name !== cardName) {
        return null;
      } else {
        return childFunction.apply(this, args);
      }
    };

    return descriptor;
  };
}
