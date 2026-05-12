export type IQueueMessageType = string | object | Array<object>;

export interface QueueServiceInterface {
  /**
   * Sends a message to the specified queue.
   * @param queue - The name of the queue.
   * @param data - The message data (can be object or string).
   */
  sendMessage(queue: string, data: IQueueMessageType): Promise<void>;

  /**
   * Receives a message from the specified queue.
   * @param queue - The name of the queue.
   * @returns A Promise resolving to the received message.
   */
  receiveMessage(queue: string): Promise<IQueueMessageType | null>;

  /**
   * Deletes a message from the specified queue.
   * @param queue - The name of the queue.
   * @param messageId - The ID of the message to delete.
   * @returns A Promise that resolves when the message is deleted.
   */
  deleteMessage(queue: string, messageId: string): Promise<void>;
}
