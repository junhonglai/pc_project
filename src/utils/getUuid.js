import { v4 as uuidv4 } from "uuid";

let uid = localStorage.getItem("uuid");
export default function getUuid() {
  if (!uid) {
    uid = uuidv4();
    localStorage.setItem("uuid", uid);
  }
  return uid;
}
