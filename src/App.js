import $ from "./utils/elementSelector.js";
import Component from "./core/Component.js";

import FilterInput from "./components/FilterInput.js";
import DataTable from "./components/DataTable.js";

import getData from "./api/getData.js";
import flattenRawData, { DATAFLOW_BY_TYPE } from "./utils/flattenRawData.js";

export default class App extends Component {
  //========= State Area
  initialState() {
    this.state = {
      filterKeyword: "",
      data1: {
        filterColumn: undefined,
        isReversed: false,
        dataArray: [],
        tableHeadFlow: DATAFLOW_BY_TYPE["data1"],
      },
      data2: {
        filterColumn: undefined,
        isReversed: false,
        dataArray: [],
        tableHeadFlow: DATAFLOW_BY_TYPE["data2"],
      },
      data3: {
        filterColumn: undefined,
        isReversed: false,
        dataArray: [],
        tableHeadFlow: DATAFLOW_BY_TYPE["data3"],
      },
    };

    const getDataFromDB = async () => {
      this.setState({
        data1: {
          ...this.state.data1,
          dataArray: flattenRawData({
            rawData: await getData({ query: "data1" }),
            dataType: "data1",
          }),
        },
        data2: {
          ...this.state.data2,
          dataArray: flattenRawData({
            rawData: await getData({ query: "data2" }),
            dataType: "data2",
          }),
        },
        data3: {
          ...this.state.data3,
          dataArray: flattenRawData({
            rawData: await getData({ query: "data3" }),
            dataType: "data3",
          }),
        },
      });
    };
    getDataFromDB();
  }

  //========= Service Fn Area

  handleInputValue(newInputValue) {
    this.setState({
      filterKeyword: newInputValue,
    });
  }

  handleTableHeadClick(target) {
    const targetIdx = Number(target.getAttribute("key"));
    const targetData = target.closest("table").classList.value;

    const setFilterOpt = () => {
      const opt = {
        filterColumn: undefined,
        isReversed: false,
      };

      //?????? ?????? ??? ?????? ?????? ??????????????? ???????????? ????????????
      if (this.state[targetData].filterColumn === undefined) {
        (opt.filterColumn = targetIdx), (opt.isReversed = false);
      }
      //???????????? ???????????? ?????? ????????? ?????????????????? ??????
      if (
        this.state[targetData].filterColumn === targetIdx &&
        !this.state[targetData].isReversed
      ) {
        (opt.filterColumn = targetIdx), (opt.isReversed = true);
      }
      //???????????? ???????????? ?????? ????????? ???????????? ??????
      if (
        this.state[targetData].filterColumn === targetIdx &&
        this.state[targetData].isReversed
      ) {
        (opt.filterColumn = undefined), (opt.isReversed = false);
      }
      //???????????? ?????? ?????? ?????? ?????? ?????????, ?????????????????? ????????? & ?????? ?????? ???????????? ??????
      if (
        this.state[targetData].filterColumn &&
        this.state[targetData].filterColumn !== targetIdx
      ) {
        (opt.filterColumn = targetIdx), (opt.isReversed = false);
      }
      return opt;
    };
    const nowFilterOpt = setFilterOpt();

    this.setState({
      [targetData]: {
        ...this.state[targetData],
        filterColumn: nowFilterOpt.filterColumn,
        isReversed: nowFilterOpt.isReversed,
      },
    });
  }

  get filteredData() {
    const { filterKeyword } = this.state;
    const dataTypeArray = ["data1", "data2", "data3"];
    const filteredDataArrays = {
      data1: [],
      data2: [],
      data3: [],
    };

    dataTypeArray.map((dataType) => {
      const { dataArray, filterColumn, isReversed, tableHeadFlow } =
        this.state[dataType];

      //????????? ????????? X?????? ?????? X?????? ?????? ??????
      if (filterKeyword === "" && filterColumn === undefined) {
        filteredDataArrays[dataType] = dataArray;
        return;
      }
      //????????? ????????? O ??????, ?????? O?????? ?????????,??????????????????
      if (filterKeyword !== "" || filterColumn !== undefined) {
        const filteredByColumn = dataArray.sort((a, b) => {
          if (
            !isNaN(a[tableHeadFlow[filterColumn]]) &&
            !isNaN(b[tableHeadFlow[filterColumn]])
          ) {
            return (
              (Number(a[tableHeadFlow[filterColumn]]) >
                Number(b[tableHeadFlow[filterColumn]])) -
              (Number(a[tableHeadFlow[filterColumn]]) <
                Number(b[tableHeadFlow[filterColumn]]))
            );
          } else {
            return (
              (a[tableHeadFlow[filterColumn]] >
                b[tableHeadFlow[filterColumn]]) -
              (a[tableHeadFlow[filterColumn]] < b[tableHeadFlow[filterColumn]])
            );
          }
        });

        if (isReversed) filteredByColumn.reverse();

        const re = new RegExp(filterKeyword);
        const filteredByColumnAndKeyWord = dataArray.filter((column) => {
          let isIn = false;
          tableHeadFlow.map((head) => {
            if (re.test(column[head])) isIn = true;
          });
          return isIn;
        });

        return (filteredDataArrays[dataType] = filteredByColumnAndKeyWord);
      }
    });

    return filteredDataArrays;
  }

  componentDidMount() {
    const { handleInputValue, handleTableHeadClick, filteredData } = this;
    const { filterKeyword, data1, data2, data3 } = this.state;

    new FilterInput($(".filter__input"), {
      filterKeyword,
      handleInputValue: handleInputValue.bind(this),
    });
    new DataTable($(".data1"), {
      data: data1,
      handleTableHeadClick: handleTableHeadClick.bind(this),
      filteredData: filteredData.data1,
    });
    new DataTable($(".data2"), {
      data: data2,
      handleTableHeadClick: handleTableHeadClick.bind(this),
      filteredData: filteredData.data2,
    });
    new DataTable($(".data3"), {
      data: data3,
      handleTableHeadClick: handleTableHeadClick.bind(this),
      filteredData: filteredData.data3,
    });
  }
  //========= Render Area
  HTMLtemplate() {
    return `
          <div class="filter__input"></div>
          <table class="data1"></table>
          <table class="data2"></table>
          <table class="data3"></table>
      `;
  }
}
