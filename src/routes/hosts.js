import { Router } from "express";
import { getHosts } from "../services/hosts";
import { createHost } from "../services/hosts";
import { getHostById } from "../services/hosts";
import { updateHostById } from "../services/hosts";
import { deleteHostById } from "../services/hosts";
import auth from "../middleware/auth";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
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
