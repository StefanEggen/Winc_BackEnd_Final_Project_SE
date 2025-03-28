const errorHandler = (err, req, res, next) => {
  console.error("Error message:", err.message);
  console.error(err.stack);
  res.status(500).json({
    message:
      "An error occurred on the server, please double-check your request!",
  });
};

export default errorHandler;
