import express, {
  Application,
  json,
  NextFunction,
  Request,
  Response,
} from "express";
import cors from "cors";
import http from "http";

import { FortuneControllerInstance } from "./controllers/fortune.controller";

class App {
  private _app: Application;
  private _server: http.Server;
  private _fortuneController = FortuneControllerInstance;

  constructor() {
    this._app = express();
    this._server = http.createServer(this._app);

    this._configureMiddlewares();
    this._configureRoutes();
    this._configureExceptionHandlers();
  }

  private _configureMiddlewares(): void {
    this._app.use(cors({ origin: process.env["ORIGIN"], credentials: true }));
    this._app.use(express.json({ limit: "50mb" }));
    this._app.use(json());
  }

  private _configureExceptionHandlers(): void {
    this._app.use(this._handleErrors.bind(this));
    this._app.use("*", this._handleNotFound.bind(this));
  }

  private _configureRoutes() {
    const controllers = [this._fortuneController];

    controllers.forEach((controller) => {
      this._app.use("/api/v1", controller.router);
    });
  }

  private _handleErrors(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ): void {
    const error = err.message || err.toString() || "Internal Server Error";
    res.status(500).json(error);
  }

  private _handleNotFound(_req: Request, res: Response): void {
    res.status(404).json("Route not found");
  }

  public start(port: number): void {
    this._server.listen(port, () => {
      console.log(`Listening on ${port}`);
    });
  }
}

export const AppInstance = new App();