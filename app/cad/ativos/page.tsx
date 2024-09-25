import RegisterPage from "@/components/RegisterPage";
import { FC } from "react";
import activesDocument from "@/utils/objects/ActivesObj";

const Ativos: FC = () => {
  return (
    <>
      <RegisterPage title="Ativos" category="active" documents={activesDocument} />
    </>
  );
};

export default Ativos;
