import axios from "axios";
import { devUrl } from "../../envVars";

export const getNumbers = async (req, res) => {
  try {
    let users = await axios.get(`${devUrl}/api/users`);
    const numbers = users.data.data.map((user) => {
      return user.phoneNumber;
    });
    return numbers;
  } catch (e) {
    console.log(e);
    return e;
  }
};
