import { User } from "./user.model";

export const getUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      console.log("could not find user");
      return res
        .status(400)
        .send({ error: "could not find user with given id" });
    }
    return res.status(200).send({ data: user });
  } catch (e) {
    console.error(e);
    return res.status(400).send({ error: e });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    if (!user) {
      console.log("failed to create user");
      return req.status(400).end();
    }
    return res.status(201).send({ data: user });
  } catch (e) {
    console.error(e);
    return res.status(400).send({ error: e });
  }
};

export const getUserByPhoneNum = async (req, res) => {
  try {
    const user = await User.findOne({ phoneNumber: req.body.phoneNumber });
    if (!user) {
      console.log("incorrect phone number, no user found");
      return req.status(400).end();
    }
    return res.status(201).send({ data: user });
  } catch (e) {
    console.error(e);
    return res.status(400).send({ error: e });
  }
};
