const app = require("./app");
const bodyParse = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const mongoConnect = require("./utils/mongoose");

const path = require("path");
const fs = require("fs");

const userRouter = require("./router/user");
const medicationHistoryRouter = require("./router/medicalHistory");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Expose-Headers", "Content-Type, Authorization");
  next();
});

const accesLog = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flag: "a",
});

app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());
app.use(morgan("combined", { stream: accesLog }));
app.use(helmet());
app.use(compression());

app.use(userRouter);
app.use("/medicationhistoy", medicationHistoryRouter);

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "seccesful",
  });
});

app.use((req, res, next) => {
  const error = new Error("page not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  if (error.status || 500) {
    res.json({
      message: error.message,
    });
  }
});

(async () => {
  try {
    const client = await mongoConnect;
    // console.log(client);
    const port = 3098;
    app.listen(process.env.PORT || port, () => {
      console.log(`application running on post:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
})();
