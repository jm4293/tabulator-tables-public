# React-tabulator 사용설명서

## npm install
   * npm install react-tabulator tabulator-tables

## version
   * "react-tabulator": "^0.19.0"
   * "tabulator-tables": "^6.0.1"

## import
   * import "react-tabulator/lib/styles.css”;
   * import "react-tabulator/lib/css/tabulator.min.css";
   * import { ColumnDefinition, ReactTabulator, ReactTabulatorOptions } from "react-tabulator";

## ref
   * tableRef는 React의 useRef훅을 사용하여 테이블 컴포넌트를 참조하는 변수
   * tableRef.current를 사용하여 ReactTabulator 컴포넌트의 인스턴스에 접근하고, getSelectedData() 메서드를 호출하여 선택된 행의 데이터를 가져온다.

```js
let tableRef = useRef<any>();

const btn_onClick_row_remove = () => {
const selectedData = tableRef.current.getSelectedData();

	if (selectedData.length === 0) {
		alert("선택된 row가 없습니다.");
		return;
	}
};
```

## return
```js
<ReactTabulator
onRef={(ref) => (tableRef = ref)}
columns={defaultColumns}
data={data}
options={options}
events={{
rowClick: (e: any, row: any) => {},
....
}}
footerElement={<span>Footer || </span>}
/>
```

## columns
   * 테이블의 열을 정의하는 객체의 배열

   1. title: 열의 제목을 나타내는 문자열
   1. field: 열의 데이터를 나타내는 문자열
   1. width: 열의 너비를 나타내는 숫자
   1. hozAlign: 열의 텍스트 정렬을 나타내는 문자열
   1. formatter: 열의 데이터를 포맷하는 문자열
   1. editor: 열의 편집여부를 표현 “true”, “false”, "input", "textarea", "number", "autocomplete", "tickCross", "star" 등
   1. editorParams: 에디터의 속성을 정의하는 객체
      *	elementAttributes: 이 속성은 에디터의 요소에 추가할 속성을 정의하는 객체.
      *	mask: 에디터의 입력을 마스킹하는 문자열 "AAA-999", "999-999-9999" 등
   1. formatter: 열의 형식 지정
   1. formatterParams: 포맷터의 속성을 정의하는 객체

## data
   * 테이블에 표시될 데이터를 제공하는 배열

## options
   * 테이블의 열을 정의하는 객체의 배열

   1. movableRows: 테이블에서 행을 드래그하여 이동할 수 있는지 여부 설정
   1. movableColumns: 테이블에서 열을 드래그하여 이동할 수 있는지 여부 설정
   1. pagination: 페이지네이션 활성와 여부 설정
   1. paginationSize: 페이지 당 표시할 행의 수
   1. paginationSizeSelector: 사용자가 선택할 수 있는 페이지 크기를 나타내는 배열
   1. height: 테이블 높이를 설정
   1. tooltips: 테이블 셀에 마우스를 가져가면 표시되는 툴팁 사용 여부
   1. rowClick: 사용자가 행을 클릭했을 때 실행될 콜백 함수
   1. cellClick: 사용자가 셀을 클릭했을 때 실행될 콜백 함수

## events
   * ReactTabulator 컴포넌트에서 발생하는 다양한 이벤트에 대한 처리 함수들을 정의

   1. rowClick: 테이블의 행을 클릭할 때 발생하는 이벤트
   1. rowUpdated: 테이블의 행이 업데이트될 때 발생하는 이벤트
   1. cellClick: 테이블의 셀을 클릭할 때 발생하는 이벤트
   1. dataLoading: 데이터가 테이블에 로드되기 전에 발생하는 이벤트
   1. dataLoaded: 데이터가 테이블에 로드된 후에 발생하는 이벤트
   1. dataProcessing: 데이터가 처리되기 전에 발생하는 이벤트
   1. dataProcessed: 데이터가 처리된 후에 발생하는 이벤트
   1. dataChanged: 테이블의 데이터가 변경될 때 발생하는 이벤트
   1. cellEditng: 셀 편집이 시작될 때 발생하는 이벤트
   1. cellEditCancelled: 셀 편집이 취소될 때 발생하는 이벤트
   1. cellEdited: 셀 편집이 완료된 후 발생하는 이벤트
   1. cellEdit: 셀 편집이 발생할 때 발생하는 이벤트
   1. rowSelected: 행이 선택될 때 발생하는 이벤트
   1. rowDeselected: 행이 선택 해제될 때 발생하는 이벤트
   1. rowAdded: 행이 추가될 때 발생하는 이벤트
   1. rowDeleted: 행이 삭제될 때 발생하는 이벤트
   1. rowMoved: 행이 이동될 때 발생하는 이벤트
   1. rowSelectionchanged: 행 선택이 변경될 때 발생하는 이벤트

## footerElement
   * 테이블 하단에 표시될 커스텀 요소를 정의

