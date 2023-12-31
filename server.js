const jsonServer = require("json-server");
const fs = require("fs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router(require("./db.js")());
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3001;

function isAuthenticated({ email, password }) {
  const userdb = JSON.parse(fs.readFileSync("./mockup-data/User.json", "UTF-8"));
  const user = userdb.find((user) => user.email === email && user.password === password);

  return {
    isAuth: !!user,
    user,
  };
}

const SECRET_KEY = "123456789";
const expiresIn = "1h";
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

server.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  const { isAuth, user } = isAuthenticated({ email, password });
  console.log(isAuth);
  if (!isAuth) {
    const status = 401;
    res.status(status).json({ status: status, message: "Incorrect email or password" });
    return;
  }
  const status = 200;
  const access_token = createToken({ email, password });
  const userWithoutPassword = { ...user };
  delete userWithoutPassword.password;
  res.status(status).json({ access_token, user: userWithoutPassword });
});

function addAuthenticatedUser({ name, email, password }) {
  const userdb = JSON.parse(fs.readFileSync("./mockup-data/User.json", "UTF-8"));
  let id = 1 + (userdb.length != 0 ? +userdb.at(-1).id : 0);
  userdb.push({ id, name, email, password });
  const userdbContent = JSON.stringify(userdb, null, 4);
  fs.writeFileSync("./mockup-data/User.json", userdbContent, "UTF-8");
}

server.post("/auth/register", (req, res) => {
  const { name, email, password } = req.body;
  addAuthenticatedUser({ name, email, password });

  const status = 200;
  res.status(status).json({});
});

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => (decode !== undefined ? decode : err));
}

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  console.log("*protected endpoint*");
  const allowedUrls = ["/City", "/Customer"];
  if (allowedUrls.includes(req.baseUrl)) {
    next();
    return;
  }

  if (req.headers.authorization === undefined || req.headers.authorization.split(" ")[0] !== "Bearer") {
    const status = 401;
    res.status(status).json({ status, message: "Bad authorization header" });
    return;
  }

  try {
    const isVerified = verifyToken(req.headers.authorization.split(" ")[1]);
    next();
  } catch (err) {
    const status = 401;
    res.status(status).json({ status, message: "Error: access_token is not valid" });
  }
});

server.use(middlewares);
server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
