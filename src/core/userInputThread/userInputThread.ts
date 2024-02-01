export class UserInputThread {
  constructor(onMessage: (message: string) => void) {
    const workerURL = new URL("userInputWorker.ts", import.meta.url).href;
    const worker = new Worker(workerURL);

    worker.onmessage = (message) => {
      onMessage(message.data);
    };
  }
}
