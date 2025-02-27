import { toast } from "react-toastify";

export default function customToaster({ type, message }) {
   toast[
      type?.toLowerCase() === "danger" ? "error" : type?.toLowerCase()
   ](message || "Success", { position: "bottom-right" });
}
