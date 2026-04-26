require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const BlogPost = require('./models');
const RequestLogger = require('./Src/middlewares/logger.js');
const errorhandler = require('./Src/middlewares/errorHandler.js');
const ArticleRoutes = require('./Src/routes/article.route.js');
const app = express();
const PORT = process.env.PORT || 3000;
const Userroutes = require ('./Src/routes/user.route.js');

app.use(express.json());
app.use(cors('*'));
app.use(RequestLogger);
app.use("/api", ArticleRoutes);
app.use("/auth", Userroutes);
app.use(errorhandler);


// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    console.log('Indexes ensured');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
