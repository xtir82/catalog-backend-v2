import UserModel from "../model/user.model.js";
import generateToken from "../utils/jsonwebtoken.js";
import { createHash, isValidPassword } from "../utils/utils.js";

class SessionController {
  //Register
  async jwtRegister(req, res) {
    const { first_name, last_name, age, email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({ email: "El email ya existe" });
    } else {
      const newUser = new UserModel({
        first_name: first_name,
        last_name: last_name,
        age: age,
        email: email,
        password: createHash(password),
      });

      const savedUser = await newUser.save();

      const token = generateToken(newUser);

      res.cookie("catalogCookieToken", token, {
        maxAge: 3600000,
        httpOnly: true,
      });

      res.redirect("/api/session/current");
    }
  }

  //Login
  async jwtLogin(req, res) {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(401).json({ email: "El usuario no está registrado" });
      }

      if (isValidPassword(password, user)) {
        const token = generateToken(user);
        res.cookie("catalogCookieToken", token, {
          maxAge: 3600000,
          httpOnly: true,
        });

        res.redirect("/api/session/current");
      } else {
        return res.status(404).json({ email: "Informacion no valida" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  //Logout
  async Logout(req, res) {
    res.clearCookie("catalogCookieToken");
    res.redirect("/login");
  }

  //Current
  async jwtCurrent(req, res) {
    res.render("home", {usuario: req.user.first_name});
  }

  //Views
  renderRegister(req, res) {
    if (req.session.login) {
      res.redirect("/profile");
    } else {
      res.render("register");
    }
  }

  renderLogin(req, res) {
    if (req.session.login) {
      res.redirect("/profile");
    } else {
      res.render("login");
    }
  }

  renderProfile(req, res) {
    console.log("holis" + req.session.user);
    if (!req.session.login) {
      res.redirect("/login");
    } else {
      res.render("profile", { user: req.session.user });
    }
  }
}

export const sessionController = new SessionController();
