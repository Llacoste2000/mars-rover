// prevents TS errors
declare var self: Worker;

while (true) {
  const message = prompt("Enter a command\n");

  if (message) {
    self.postMessage(message);
  }
}
