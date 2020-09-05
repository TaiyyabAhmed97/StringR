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
export const getStringsList = async (req, res) => {
  try {
    let stringjobs = await axios.get(`${devUrl}/api/stringjob`);
    let rstonlyArray = stringjobs.data.data.map((item) => {
      return item.rst;
    });
    let strings = new Set();
    for (let rst of rstonlyArray) {
      for (let item of rst) {
        strings.add(item.mains.string);
        strings.add(item.crosses.string);
      }
    }
    let rackets = getRacketsList(rstonlyArray);
    let stringArray = [...strings];
    return { stringArray, rackets };
  } catch (e) {
    console.error(e);
  }
};

const getRacketsList = (rsts) => {
  let rackets = new Set();
  for (let rst of rsts) {
    for (let item of rst) {
      rackets.add(item.racket);
    }
  }
  return [...rackets];
};
