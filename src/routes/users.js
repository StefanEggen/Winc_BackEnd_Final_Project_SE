import { Router } from "express";
import getUsers from "../services/users/getUsers.js";
import createUser from "../services/users/createUser.js";
import getUserById from "../services/users/getUserById.js";
import deleteUserById from "../services/users/deleteUserById.js";
import updateUserById from "../services/users/updateUserById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { username, email } = req.query;

    if (username) {
      // Use getUserById to fetch user by username
      const user = await getUserById(username, "username");
      if (user) {
        res.json(user);
      } else {
        res
          .status(404)
          .json({ error: `User with username ${username} not found` });
      }
      return;
    }

    if (email) {
      // Use getUserById to fetch user by email
      const user = await getUserById(email, "email");
      if (user) {
        return res.json(user);
      } else {
        return res
          .status(404)
          .json({ error: `User with email ${email} not found` });
      }
    }

    // If no username is provided, return all users
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;

    // Check if a user with the same username already exists
    const existingUser = await getUserById(username, "username");
    if (existingUser) {
      return res
        .status(400)
        .json({ error: `Username "${username}" already exists.` });
    }

    // Create the new user
    const newUser = await createUser(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      res.status(404).json({ error: "User with id ${id} not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;

    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;

    const updatedUser = await updateUserById(
      id,
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );

    if (updatedUser) {
      res
        .status(200)
        .send({ message: "User with id ${id} updated successfully" });
    } else {
      res.status(404).json({ message: "User with id ${id} not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    if (deletedUser) {
      res
        .status(200)
        .send({ message: "User with id ${id} deleted successfully" });
    } else {
      res.status(404).json({ message: "User with id ${id} not found" });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
