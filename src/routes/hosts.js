import { Router } from "express";
import getHosts from "../services/hosts/getHosts.js";
import createHost from "../services/hosts/createHost.js";
import getHostById from "../services/hosts/getHostById.js";
import updateHostById from "../services/hosts/updateHostById.js";
import deleteHostById from "../services/hosts/deleteHostById.js";
import auth from "../middleware/auth.js";
import { validate as isUuid } from "uuid";

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
        return res.status(404).json({ error: `Host with name ${name} not found` });
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
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;
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
    const { id } = req.params;

    if (!isUuid(id)) {
      return res.status(404).json({ error: `Host with id ${id} not found` });
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

    if (updatedHost) {
      res
        .status(200)
        .send({ message: `Host with id ${id} successfully updated` });
    } else {
      res.status(404).json({ error: `Host with id ${id} not found` });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isUuid(id)) {
      return res.status(404).json({ error: "Host with id ${id} not found" });
    }

    const deletedHost = await deleteHostById(id);

    if (deletedHost) {
      res
        .status(200)
        .send({ message: `Host with id ${id} successfully deleted` });
    } else {
      res.status(404).json({ error: `Host with id ${id} not found` });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
