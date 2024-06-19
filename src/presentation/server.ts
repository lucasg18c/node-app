import express from "express";

interface ServerOptions {
  port?: number;
}

export class Server {
  public readonly app = express();
  private readonly port: number;

  constructor(options: ServerOptions) {
    const { port = 3000 } = options;
    this.port = port;
  }

  async start() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
