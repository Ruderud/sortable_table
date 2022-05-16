import { getData } from "./api/getData.js";
import DataGrid from "./components/DataGrid.js";
import { flattenRawData } from "./utils/flattenRawData.js";

export const App = ({ target }) => {
  const AppElement = document.createElement("div");

  //   const targetDataTypes = ["data1"];
  const targetDataTypes = ["data1", "data2", "data3"];

  const renderDataGrid = async ({ dataType }) => {
    const rawData = await getData({ query: dataType });
    const flattenData = flattenRawData({ rawData, dataType });

    return DataGrid({ flattenData, dataType });
  };

  targetDataTypes.map(async (targetDataType) => {
    AppElement.appendChild(await renderDataGrid({ dataType: targetDataType }));
  });

  target.appendChild(AppElement);
};

export default App;
