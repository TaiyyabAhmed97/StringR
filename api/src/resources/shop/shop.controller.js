import { Shop } from "./shop.model";

export const login = async (req, res) => {
  try {
    Shop.findOne({ email: req.body.email }, function (err, user) {

      if (!user.validPassword(req.body.password)) {
        //password did not match
        return res.status(400).send({ data: { error: "wrong passwords" } });
      } else {
        return res.status(200).send({ data: { email: user.email, password: user.password } });
        // password matched. proceed forward
      }
    });


  } catch (e) {
    console.error(e);
    return res.status(400).send({ error: e });
  }
};

export const signUp = async (req, res) => {
  try {
    const user = await Shop.create(req.body);
    if (!user) {
      console.log("failed to create user");
      return res.status(400).end();
    }
    user.password = user.generateHash(req.body.password);
    user.save();
    return res.status(201).send({ data: user });
  } catch (e) {
    console.error(e);
    return res.status(400).send({ error: e });
  }
};
