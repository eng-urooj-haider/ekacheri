import EkacheriForm from "./KacheriForm.jsx";
import useKacheriForm from "../../hooks/useKacheriForm.js";

export default function Create() {
  const { locations, dfps } = useKacheriForm();
  return (
    <div>
      <EkacheriForm locations={locations} dfps={dfps} />
    </div>
  );
}
