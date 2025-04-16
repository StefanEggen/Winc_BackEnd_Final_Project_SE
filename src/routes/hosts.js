import { Router } from "express";
import getHosts from "../services/hosts/getHosts.js";
import createHost from "../services/hosts/createHost.js";
import getHostById from "../services/hosts/getHostById.js";
import updateHostById from "../services/hosts/updateHostById.js";
import deleteHostById from "../services/hosts/deleteHostById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;

    if (name) {
      // Use getHostById to fetch host by name
      const host = await getHostById(name, "name");
      if (host) {
        return res.json(host);
      } else {
        return res
          .status(404)
          .json({ error: `Host with name ${name} not found` });
      }
    }

    const hosts = await getHosts();
    res.json(hosts);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const requiredFields = [
      "username",
      "password",
      "name",
      "email",
      "phoneNumber",
      "profilePicture",
      "aboutMe",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ error: `These fields are required: ${missingFields}` });
    }

    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;

    // Check if a host with the same username already exists
    const existingHost = await getHostById(username, "username");
    if (existingHost) {
      return res
        .status(400)
        .json({ error: `Username "${username}" already exists.` });
    }

    // Create the new host
    const newHost = await createHost(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );
    res.status(201).json(newHost);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const host = await getHostById(id);

    if (!host) {
      res.status(404).json({ error: `Host with id ${id} not found` });
    } else {
      res.status(200).json(host);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const requiredFields = [
      "username",
      "name",
      "email",
      "phoneNumber",
      "profilePicture",
      "aboutMe",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ error: `These fields are required: ${missingFields}` });
    }

    const { id } = req.params;

    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;
    const updatedHost = await updateHostById(
      id,
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );

    if (!updatedHost) {
      return res.status(404).json({ error: `Host with id ${id} not found` });
    }
    res.status(200).send({
      message: `Host with id ${id} successfully updated`,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedHost = await deleteHostById(id);

    if (!deletedHost) {
      return res.status(404).json({ error: `Host with id ${id} not found` });
    }
    res.status(200).send({
      message: `Host with id ${id} successfully deleted`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
