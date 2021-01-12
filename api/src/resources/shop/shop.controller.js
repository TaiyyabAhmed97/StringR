import { Shop } from "./shop.model";

export const login = async (req, res) => {
  try {
    let { email, password } = req.body
    console.log(email)
    console.log(password)

    return res.status(200).send({ data: { email: email, password: password } });
  } catch (e) {
    console.error(e);
    return res.status(400).send({ error: e });
  }
};

export const signUp = async (req, res) => {
  try {
    const user = await User.create(req.body);
    if (!user) {
      console.log("failed to create user");
      return res.status(400).end();
    }
    return res.status(201).send({ data: user });
  } catch (e) {
    console.error(e);
    return res.status(400).send({ error: e });
  }
};
