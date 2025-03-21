import express from "express";
import * as Sentry from "@sentry/node";
import "dotenv/config";

import usersRouter from "./routes/users.js";
import bookingsRouter from "./routes/bookings.js";
import amenitiesRouter from "./routes/amenities.js";
import hostsRouter from "./routes/hosts.js";
import propertiesRouter from "./routes/properties.js";
import reviewsRouter from "./routes/reviews.js";
import loginRouter from "./routes/login.js";
import logMiddleware from "./middleware/logMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

//Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({
      tracing: true,
    }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({
      app,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!,
});

// RequestHandler creates a separate execution context, so that all
// transactions/spans/breadcrumbs are isolated across requests
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

//Sentry

//Middleware
app.use(express.json());
app.use(logMiddleware);

//Resource routers
app.use("/users", usersRouter);
app.use("/bookings", bookingsRouter);
app.use("/amenities", amenitiesRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/reviews", reviewsRouter);

//Login
app.use("/login", loginRouter);

// Sentry error handler - must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

//Error handler
app.use(errorHandler);

//Start server
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
