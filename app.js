const dotevn = require("dotenv");
dotevn.config();
const userRouter = require("./routes/user.routes");
const blogRouter = require("./routes/blog");
const commentRouter = require("./routes/comment.routes");
const categoryRouter = require("./routes/category.routes");
const path = require("path");
const DataBases = require("./DataBases");
const express = require("express");
const staticPath = path.join(path.dirname(""), "static/images");
const port = 7500;
const cors = require("cors");
const errorMiddleware = require("./middleware/error");
const app = express();
DataBases();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.use("/comment", commentRouter);
app.use("/category", categoryRouter);
app.use("/images", express.static(staticPath));

app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`hello in server`);
});
