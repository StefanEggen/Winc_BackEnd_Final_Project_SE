import express from "express";
import * as Sentry from "@sentry/node";

import usersRouter from "./routes/users";
import bookingsRouter from "./routes/bookings";
import amenitiesRouter from "./routes/amenities";
import hostsRouter from "./routes/hosts";
import propertiesRouter from "./routes/properties";
import reviewsRouter from "./routes/reviews";
import loginRouter from "./routes/login";
import logMiddleware from "./middleware/logMiddleware";
import errorHandler from "./middleware/errorHandler";

const app = express();

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

//Error handler
app.use(errorHandler);

//Start server
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
