import { Tabulator } from "react-tabulator/lib/types/TabulatorTypes";
import { FC } from "react";
import Select from "react-select";

interface reactSelectProps {
  cell: Tabulator.CellComponent;
  onRendered: Tabulator.EmptyCallback;
  success: Tabulator.ValueBooleanCallback;
  cancel: Tabulator.ValueVoidCallback;
  editorParams: any;
}

export const ReactSelect: FC<reactSelectProps> = ({
  cell,
  onRendered,
  success,
  cancel,
  editorParams,
}) => {
  const { genderOptions } = editorParams;

  const handleGenderChange = (selectedOption: any) => {
    // Handle gender change here
  };

  const editor = document.createElement("div");
  editor.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      success(cell.getValue());
    } else if (e.key === "Escape") {
      // cancel();
    }
  });

  return (
    <Select
      defaultValue={cell.getValue()}
      options={genderOptions}
      onChange={handleGenderChange}
      inputId="gender-select"
    />
  );
};
