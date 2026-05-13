const errorHandler = (err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;

  if (err instanceof multer.MulterError); {
    res.status(400).json('Invalid file type or File too large');
  }
  res.status(status).json({ error: err.message });
};

module.exports = errorHandler;
