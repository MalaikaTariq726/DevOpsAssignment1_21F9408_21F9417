import Connection from "./db.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import session from "express-session";
import passport from "passport";
import configurePassport from "./passportConfig.js";
import cookieParser from "cookie-parser";
dotenv.config();
Connection();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());
// ---------------------------------------------------------------------
// setup session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

configurePassport(passport);

app.use(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/googleLogin",
    failureRedirect: "http://localhost:3000/signin"
  })
);

app.get('/googleLogin', (req, res) => {
  const { user, token, isUserExist } = req.user;
  let error;
  res.cookie("token", token);
  if(!isUserExist) {
    res.redirect(`http://localhost:3000/setrole?email=${user.email}`);
  } else {
    if(user.role === "Mentor") {
      if(user.status === "Approved"){
        res.redirect(`http://localhost:3000/mentdash?email=${user.email}`);
      } else {
        error = "User not approved yet.";
        res.redirect(`http://localhost:3000/signin?error=${error}`);
      }
    } else if(user.role === "Student") {
      if(user.status === "Approved"){
        res.redirect(`http://localhost:3000/studdash?email=${user.email}`);
      } else {
        error = "User not approved yet.";
        res.redirect(`http://localhost:3000/signin?error=${error}`);
      }
    }
  }
});

app.get('/googleLogin/success', (req, res) => {
  const { email } = req.query;
  if(req.user && email === req.user.user.email){
    res.status(200).json({message:"User Login through google.", user: req.user.user, status: true});
  } else {
    res.json({message:"Not Authorized.", status: false});
  }
});

app.use(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// ------------------------------------------------------------------

app.use("/auth", authRoutes);
app.use("/project",projectRoutes);
app.use("/user",userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});