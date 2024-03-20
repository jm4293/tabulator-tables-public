import React, { useRef, useState } from "react";
import "./App.css";
import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/tabulator.min.css";
import {
  ColumnDefinition,
  ReactTabulator,
  ReactTabulatorOptions,
} from "react-tabulator";

interface interfaceData {
  id: number;
  name: string;
  age: number;
  gender: string;
  height: number;
  col: string;
  dob: string;
  cheese?: boolean;
}

const defaultData: interfaceData[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Billy Bob ${i + 1}`,
  age: 12 + i,
  gender: i % 2 === 0 ? "남자" : "여자",
  height: 95 + i,
  col:
    i % 4 === 0
      ? "red"
      : i % 4 === 1
      ? "green"
      : i % 4 === 2
      ? "blue"
      : "yellow",
  dob: "2020-01-01",
  cheese: i % 2 === 0,
}));

const genderOptions = [
  { label: "남자", value: "남자" },
  { label: "여자", value: "여자" },
];

const colorOptions = [
  { label: "Red", value: "red" },
  { label: "Green", value: "green" },
  { label: "Blue", value: "blue" },
  { label: "Yellow", value: "yellow" },
];

const defaultColumns: ColumnDefinition[] = [
  {
    title: "Select",
    field: "select",
    formatter: "rowSelection",
    headerSort: false,
    cellClick: (e, cell) => {
      cell.getRow().toggleSelect();
    },
    hozAlign: "center",
    width: 50,
  },
  {
    title: "Name",
    field: "name",
    // sorter: "string",
    width: 200,
    editor: true,
    headerFilter: "input",
  },
  {
    title: "Age",
    field: "age",
    // sorter: "number",
    hozAlign: "right",
    // formatter: "progress",
    editor: true,
  },
  {
    title: "Gender",
    field: "gender",
    // sorter: "string",
    headerFilter: "select",
    headerFilterParams: {
      values: genderOptions,
    },
    editor: "select",
    editorParams: {
      values: genderOptions,
    },
  },
  {
    title: "Height",
    field: "height",
    hozAlign: "center",
    width: 100,
    editor: true,
    editorParams: {
      elementAttributes: {
        type: "number",
        min: 0,
        max: 200,
      },
    },
  },
  {
    title: "Favourite Color",
    field: "col",
    sorter: "string",
    headerFilter: "select",
    headerFilterParams: {
      values: colorOptions,
    },
    editor: "select",
    editorParams: {
      values: colorOptions,
    },
  },
  {
    title: "Date Of Birth",
    field: "dob",
    hozAlign: "center",
    formatter: "datetime",
    formatterParams: {
      inputFormat: "yyyy-MM-dd",
      outputFormat: "yyyy-MM-dd",
      invalidPlaceholder: "유효하지 않은 날짜",
    },
    editor: true,
    editorParams: {
      elementAttributes: {
        type: "date",
        max: "9999-12-31",
      },
    },
  },
  {
    title: "Cheese Preference",
    field: "cheese",
    // sorter: "boolean",
    hozAlign: "center",
    formatter: "tickCross",
  },
];

const options: ReactTabulatorOptions = {
  // height: 300,
  movableRows: true,
  movableColumns: true,
  // pagination: true,
  // paginationSize: 10,
  // paginationSizeSelector: [10, 20, 30],
};

function App() {
  let tableRef = useRef<any>();

  const [data, setData] = useState<interfaceData[]>(defaultData);

  const btn_onClick_row_add = () => {
    const newRow: interfaceData = {
      id: data.length + 1,
      name: "",
      age: 0,
      gender: "남자",
      height: 0,
      col: "",
      dob: "0000-00-00",
      cheese: true,
    };

    const newData = [newRow, ...data];
    setData(newData);
  };

  const btn_onClick_row_remove = () => {
    const selectedData = tableRef.current.getSelectedData();

    if (selectedData.length === 0) {
      alert("선택된 row가 없습니다.");
      return;
    }

    const selectedId = selectedData.map((el: any) => el.id);
    const newData = data.filter((el) => !selectedId.includes(el.id));
    setData(newData.sort((a, b) => a.id - b.id));
  };

  const handleCellEdited = (cell: any) => {
    const fieldName = cell.getField();
    const newValue = cell.getValue();

    console.log("newValue",newValue)

    if (fieldName === "height") {
      if (+newValue > 200) {
        cell.setValue(200);
      }
    } else if(fieldName === "dob") {
        const date = new Date(newValue);
        if (isNaN(date.getTime())) {
            cell.setValue("0000-00-00");
        }
    } else {
      cell.setValue(newValue);
    }
  };

  console.log("data", data);

  return (
    <div className="tabulator-container">
      <button onClick={btn_onClick_row_add}>추가</button>
      <button onClick={btn_onClick_row_remove}>제거</button>

      <ReactTabulator
        onRef={(ref) => (tableRef = ref)}
        columns={defaultColumns}
        data={data}
        options={options}
        events={{
          rowClick: (e: any, row: any) => {},
          rowUpdated: (row: any) => {},
          cellClick: (e: any, cell: any) => {},
          dataLoading: (data: any) => {},
          dataLoaded: (data: any) => {},
          dataProcessing: (data: any) => {},
          dataProcessed: (data: any) => {},
          dataChanged: (data: any) => {},
          cellEditing: (cell: any) => {},
          cellEditCancelled: (cell: any) => {},
          cellEdited: handleCellEdited,
          cellEdit: (cell: any) => {},
          rowSelected: (row: any) => {},
          rowDeselected: (row: any) => {},
        }}
        footerElement={<span>Footer || </span>}
      />
    </div>
  );
}

export default App;