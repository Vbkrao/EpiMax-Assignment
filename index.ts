import { app } from "./app";
import "./mongo";

app.listen(4000, () => {
  console.log("Server Started on port 4000");
});
