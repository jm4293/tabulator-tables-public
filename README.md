# ReactTabulator

### npm install

```bash
npm i react-tabulator tabulator-tables
#npm i luxon // datatime 사용할 때 필요한 라이브러리
#npm i -D @types/luxon // datatime 사용할 때 필요한 라이브러리
```

### ReactTabulator 사용법

* columns: 이는 테이블의 열을 정의하는 객체의 배열입니다. 각 객체는 title, field, width, hozAlign, formatter 등의 속성을 가질 수 있습니다.
   * title: 열의 제목을 나타내는 문자열입니다.
   * field: 열의 데이터를 나타내는 문자열입니다. 이 속성은 데이터 배열의 요소들과 매핑됩니다.
   * width: 열의 너비를 나타내는 숫자입니다.
   * hozAlign: 열의 텍스트 정렬을 나타내는 문자열입니다. "left", "center", "right" 등의 값을 가질 수 있습니다.
   * formatter: 열의 데이터를 포맷하는 문자열입니다. "progress", "star", "tickCross" 등의 값을 가질 수 있습니다.
   * editable: 이 속성은 열의 셀을 편집할 수 있는지 여부를 나타내는 불리언입니다.
   * editor: 이 속성은 셀을 편집할 때 사용할 에디터를 나타내는 문자열입니다. "input", "textarea", "number", "autocomplete", "tickCross", "star" 등의 값을 가질 수 있습니다.
   * editorParams: 이 속성은 에디터의 속성을 정의하는 객체입니다. 에디터에 따라 다양한 속성을 가질 수 있습니다.
   * elementAttributes: 이 속성은 에디터의 요소에 추가할 속성을 정의하는 객체입니다. "maxlength", "placeholder" 등의 값을 가질 수 있습니다.
   * mask: 이 속성은 에디터의 입력을 마스킹하는 문자열입니다. "AAA-999", "999-999-9999" 등의 값을 가질 수 있습니다.
   * selectContents: 이 속성은 에디터의 내용을 선택하는지 여부를 나타내는 불리언입니다.
   * verticalNavigation: 이 속성은 에디터의 수직 방향 탐색을 나타내는 문자열입니다. "editor", "table", "hybrid" 등의 값을 가질 수 있습니다.
   * shiftEnterSubmit: 이 속성은 셀의 내용을 편집한 후 Shift+Enter 키를 눌러 셀의 내용을 제출할지 여부를 나타내는 불리언입니다.
   * formatterParams: 이 속성은 포맷터의 속성을 정의하는 객체입니다. 포맷터에 따라 다양한 속성을 가질 수 있습니다.

```js
const columns: ColumnDefinition[] = [
    {
        title: "Name",
        field: "name",
        width: 150,
        editable: true,
        editor: "input",
        editorParams: {
            search: true,
            // mask: "AAA-999",
            // selectContents: true,
            elementAttributes: {
                maxlength: "10", //set the maximum character length of the input element to 10 characters
            },
        },
    },
    {
        title: "Age",
        field: "age",
        hozAlign: "left",
        editable: true,
        editor: "textarea",
        editorParams: {
            elementAttributes: {
                // maxlength: "10", //set the maximum character length of the textarea element to 10 characters
            },
            // mask: "AAA-999",
            // selectContents: true,
            verticalNavigation: "editor", //navigate cursor around text area without leaving the cell
            // shiftEnterSubmit: true, //submit cell value on shift enter
        },
    },
    { title: "Favourite Color", field: "col", editable: true, editor: "input" },
    {
        title: "Date Of Birth",
        field: "dob",
        // hozAlign: "center",
        // editable: true,
        // editor: DateEditor,
        // editorParams: { format: "MM/DD/YYYY" },
    },
    {
        title: "Rating",
        field: "rating",
        hozAlign: "center",
        formatter: "star",
        editable: true,
    },
    {
        title: "Passed?",
        field: "passed",
        hozAlign: "center",
        formatter: "tickCross",
        editable: true,
    },
];
```

* data: 이 속성은 테이블에 표시될 데이터 배열입니다. 각 요소는 테이블의 한 행을 나타냅니다. 데이터 배열의 요소들은 컬럼 정의에서 지정한 필드 이름에 따라 해당 열에 매핑됩니다.
   * id: 각 행의 고유한 식별자를 나타내는 숫자입니다.
   * name: 각 행의 이름을 나타내는 문자열입니다.
   * age: 각 행의 나이를 나타내는 문자열입니다.
   * col: 각 행의 색을 나타내는 문자열입니다.
   * dob: 각 행의 생년월일을 나타내는 문자열입니다.
   * rating: 각 행의 평가를 나타내는 숫자입니다.
   * passed: 각 행의 통과 여부를 나타내는 불리언입니다.

```js
const data = [
    {
      id: 1,
      name: "Oli Bob",
      age: "12",
      col: "red",
      dob: "1" + "" + "1/11/1911",
    },
    { id: 2, name: "Mary May", age: "1", col: "blue", dob: "14/05/1982" },
    {
      id: 3,
      name: "Christine Lobowski",
      age: "42",
      col: "green",
      dob: "22/05/1982",
    },
    {
      id: 4,
      name: "Brendon Philips",
      age: "125",
      col: "orange",
      dob: "01/08/1980",
    },
    {
      id: 5,
      name: "Margret Marmajuke",
      age: "16",
      col: "yellow",
      dob: "31/01/1999",
    },
  ];
```

[//]: # (* layout: 이는 테이블의 레이아웃을 정의하는 문자열입니다. "fitColumns", "fitData", "fitDataFill", "fitDataStretch" 등의 값을 가질 수 있습니다.)

[//]: # (* tooltips: 각 셀에 표시될 툴팁을 커스터마이즈합니다.)

[//]: # (* cellClick: 셀을 클릭했을 때 실행할 콜백 함수를 지정합니다.)

[//]: # (* rowClick: 행을 클릭했을 때 실행할 콜백 함수를 지정합니다.ㄴ)

[//]: # (* rowSelected: 행을 선택했을 때 실행할 콜백 함수를 지정합니다.)

[//]: # (* rowDeselected: 행의 선택을 취소했을 때 실행할 콜백 함수를 지정합니다.)

[//]: # (* cellEditing: 셀의 편집이 시작될 때 실행할 콜백 함수를 지정합니다.)

[//]: # (* cellEdited: 셀의 내용이 편집되었을 때 실행할 콜백 함수를 지정합니다.)


[//]: # (```js)

[//]: # (import React from "react";)

[//]: # (import "./App.css";)

[//]: # (import "react-tabulator/lib/styles.css";)

[//]: # (import "react-tabulator/lib/css/tabulator.min.css";)

[//]: # (import { ColumnDefinition, ReactTabulator } from "react-tabulator";)

[//]: # ()
[//]: # (function App&#40;&#41; {)

[//]: # (  const columns: ColumnDefinition[] = [)

[//]: # (    { title: "Name", field: "name", width: 150 },)

[//]: # (    {)

[//]: # (      title: "Age",)

[//]: # (      field: "age",)

[//]: # (      hozAlign: "left",)

[//]: # (      formatter: "progress",)

[//]: # (    },)

[//]: # (    { title: "Favourite Color", field: "col" },)

[//]: # (    {)

[//]: # (      title: "Date Of Birth",)

[//]: # (      field: "dob",)

[//]: # (      hozAlign: "center",)

[//]: # (    },)

[//]: # (    {)

[//]: # (      title: "Rating",)

[//]: # (      field: "rating",)

[//]: # (      hozAlign: "center",)

[//]: # (      formatter: "star",)

[//]: # (    },)

[//]: # (    {)

[//]: # (      title: "Passed?",)

[//]: # (      field: "passed",)

[//]: # (      hozAlign: "center",)

[//]: # (      formatter: "tickCross",)

[//]: # (    },)

[//]: # (  ];)

[//]: # ()
[//]: # (  const data = [)

[//]: # (    { id: 1, name: "Oli Bob", age: "12", col: "red", dob: "" },)

[//]: # (    { id: 2, name: "Mary May", age: "1", col: "blue", dob: "14/05/1982" },)

[//]: # (    {)

[//]: # (      id: 3,)

[//]: # (      name: "Christine Lobowski",)

[//]: # (      age: "42",)

[//]: # (      col: "green",)

[//]: # (      dob: "22/05/1982",)

[//]: # (    },)

[//]: # (    {)

[//]: # (      id: 4,)

[//]: # (      name: "Brendon Philips",)

[//]: # (      age: "125",)

[//]: # (      col: "orange",)

[//]: # (      dob: "01/08/1980",)

[//]: # (    },)

[//]: # (    {)

[//]: # (      id: 5,)

[//]: # (      name: "Margret Marmajuke",)

[//]: # (      age: "16",)

[//]: # (      col: "yellow",)

[//]: # (      dob: "31/01/1999",)

[//]: # (    },)

[//]: # (  ];)

[//]: # ()
[//]: # (  return &#40;)

[//]: # (    <div className="tabulator-container">)

[//]: # (      <ReactTabulator columns={columns} data={data} layout="fitdata" />)

[//]: # (    </div>)

[//]: # (  &#41;;)

[//]: # (})

[//]: # ()
[//]: # (export default App;)

[//]: # (```)



