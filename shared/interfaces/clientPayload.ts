export interface ClientPayload<T> {
  /**
   * Returns client payload data. Data that can be send to client
   * @returns {T}
   */
  getCP(): T;
}