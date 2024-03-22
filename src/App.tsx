import React, { useRef, useState } from "react";
import "./App.css";
import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/tabulator.min.css";
import {
  ColumnDefinition,
  ReactTabulator,
  ReactTabulatorOptions,
} from "react-tabulator";
import { DateTime } from "luxon";

// interface 정의 시작
interface dataInterface {
  id: number;
  name: string;
  age: number;
  gender: string;
  height: number;
  col: string;
  dob: string;
  cheese?: boolean;
}

interface genderOptionInterface {
  label: string;
  value: string;
}

interface colorOptionInterface {
  label: string;
  value: string;
}
// interface 정의 끝

// defaultData, genderOptions, colorOptions, defaultColumns, options 정의 시작
const defaultData: dataInterface[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Billy Bob ${i + 1 + Math.random() * 1000}`,
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

const genderOptions: genderOptionInterface[] = [
  { label: "남자", value: "남자" },
  { label: "여자", value: "여자" },
];

const colorOptions: colorOptionInterface[] = [
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
    title: "Money",
    field: "age",
    // sorter: "number",
    hozAlign: "right",
    editor: true,
    formatter: "money",
    formatterParams: {
      symbol: "₩",
      thousand: ",",
      precision: false,
      decimal: ".",
      symbolAfter: false,
    },
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
      mask: "yyyy-MM-dd",
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
// defaultData, genderOptions, colorOptions, defaultColumns, options 정의 끝

function App() {
  let tableRef = useRef<any>();

  const [data, setData] = useState<dataInterface[]>(defaultData);

  const btn_onClick_row_add = () => {
    const newRow: dataInterface = {
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

  const handleCellClicked = (e: any, cell: any) => {
    const fieldName = cell.getField();

    if (fieldName === "select") {
      cell.getRow().toggleSelect();
    }
  };

  const handleCellEdited = (cell: any) => {
    const fieldName = cell.getField();
    const newValue = cell.getValue();

    if (fieldName === "height") {
      if (+newValue > 200) {
        cell.setValue(200);
      }
    }

    if (fieldName === "dob") {
      const date = cell.getValue();
      const dateTime = DateTime.fromISO(date);

      if (dateTime.isValid) {
        cell.setValue(dateTime.toISODate());
      } else {
        cell.setValue("0000-00-00");
      }
    }
  };

  const handleSorter = (
    a: any,
    b: any,
    aRow: any,
    bRow: any,
    column: any,
    dir: any,
    sorterParams: any,
  ) => {
    const fieldName = column.getField();

    if (fieldName === "name") {
      const numA = parseInt(a.match(/\d+/)[0]);
      const numB = parseInt(b.match(/\d+/)[0]);
      return numA - numB;
    }
  };

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
          cellClick: handleCellClicked,
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
          rowAdded: (row: any) => {},
          rowDeleted: (row: any) => {},
          rowMoved: (row: any) => {},
          rowSelectionChanged: (data: any) => {},
          dataSorting: (sorters: any) => {},
          dataSorted: (sorters: any) => {},
          sorter: handleSorter,
        }}
        footerElement={<span>Footer || </span>}
      />
    </div>
  );
}

export default App;
