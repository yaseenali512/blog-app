const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const registerRoutes = require("./routes/registerRoute");
const authRoutes = require("./routes/authRouter");

const postRouter = require("./routes/postRouter");
const contactRouter = require("./routes/contactRouter");
const userRouter = require("./routes/userRouter");

dotenv.config();
const app = express();

mongoose
  .connect(process.env.DB_USERNAME, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.use(express.json());
app.use(cors());

app.use("/api/register/", registerRoutes);
app.use("/api/login/", authRoutes);

app.use("/api/posts", postRouter);
app.use("/api/create/", postRouter);
app.use("/api/update/", postRouter);
app.use("/api/delete/", postRouter);
app.use("/api/contact/", contactRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Listening at port ", PORT));
