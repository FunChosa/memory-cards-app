import "./NoData.css";
import { IoAdd } from "react-icons/io5";
import { LuFileJson2 } from "react-icons/lu";
import Button from "../utils/Button";
import useStore from "../../store";
const NoData = () => {
  const { openAddModal, openImportModal } = useStore((state) => state);
  return (
    <div className="no-data-container">
      <div className="no-data-title">No cards found</div>
      <div className="no-data-actions">
        <Button
          title="New Card"
          icon={<IoAdd />}
          onClick={openAddModal}
          className={"collection-action-btn"}
        />
        <Button
          title="Import JSON"
          icon={<LuFileJson2 />}
          onClick={openImportModal}
          className={"collection-action-btn"}
        />
      </div>
    </div>
  );
};

export default NoData;
