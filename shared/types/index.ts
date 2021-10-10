export * from "./game";

export type ClassConstructor<T> = {
  new (...args: any[]): T;
};

export type VoidFunction = () => void;
