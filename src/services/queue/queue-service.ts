import { QueueServiceInterface, IQueueMessageType } from "./interface";

export class QueueService implements QueueServiceInterface {
  deleteMessage(queue: string, messageId: string): Promise<void> {
    throw new Error("deleteMessage Method not implemented.");
  }
  sendMessage(queue: string, data: IQueueMessageType): Promise<void> {
    throw new Error("sendMessage Method not implemented");
  }

  receiveMessage(queue: string): Promise<IQueueMessageType | null> {
    throw new Error("receiveMessage Method not implemented");
  }
}
