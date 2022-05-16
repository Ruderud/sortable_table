import { getData } from "./api/getData.js";
import DataGrid from "./components/DataGrid.js";
import { flattenRawData } from "./utils/flattenRawData.js";

export const App = ({ target }) => {
  const AppElement = document.createElement("div");
  const TARGET_DATA_TYPES = ["data1", "data2", "data3"];
  const state = {
    //sortOpt: 1(오름차순), 0(초기순서), -1(내림차순)
    flat_data1: [],
    data1_sort_opt: {
      targetIndex: undefined,
      sortOpt: 0,
    },
    flat_data2: [],
    data2_sort_opt: {
      targetIndex: undefined,
      sortOpt: 0,
    },
    flat_data3: [],
    data3_sort_opt: {
      targetIndex: undefined,
      sortOpt: 0,
    },
  };

  const renderInitialInputElement = () => {
    const inputElement = document.createElement("input");
    inputElement.classList = "filter__input";
    inputElement.placeholder = "필터링할 키워드를 입력하세요.";
    inputElement.autofocus = true;
    AppElement.appendChild(inputElement);
  };

  const renderInitialTableElements = () => {
    TARGET_DATA_TYPES.map((targetDataType) => {
      const tableContainer = document.createElement("table");
      tableContainer.classList = String(targetDataType);
      AppElement.appendChild(tableContainer);
    });
  };

  const renderDataGrid = () => {
    TARGET_DATA_TYPES.map(async (targetDataType) => {
      const targetTable = AppElement.querySelector(`.${targetDataType}`);
      const rawData = await getData({ query: targetDataType });
      const flattenData = flattenRawData({ rawData, dataType: targetDataType });
      DataGrid({ target: targetTable, flattenData, dataType: targetDataType });
      //saveData for sort at App state
      state[`flat_${targetDataType}`].push(flattenData);
    });
  };

  const injectSortEvt = () => {};

  //render: initial => else flow
  renderInitialInputElement();
  renderInitialTableElements();
  renderDataGrid();

  target.appendChild(AppElement);
};

export default App;
