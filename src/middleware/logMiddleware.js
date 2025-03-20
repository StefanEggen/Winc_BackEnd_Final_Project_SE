import logger from "../utils/log";

const logMiddleware = (req, res, next) => {
  const start = new Date();

  next();

  const ms = new Date() - start;
  logger.info(
    `${req.method} ${req.originalUrl} - Status code: ${res.statusCode} - Duration: ${ms}ms`
  );
};

export default logMiddleware;
