const TABLE_HEAD_BY_DATATYPE = {
  data1: ["이메일", "이름", "생년월일", "주소", "점수", "생성일", "수정일"],
  data2: [
    "이름",
    "총점",
    "평균",
    "HTML",
    "CSS",
    "JavaScript",
    "국어",
    "영어",
    "수학",
  ],
  data3: ["번호", "닉네임", "나이", "원격근무지", "포지션", "검증여부"],
};

export const DataGrid = ({ flattenData, dataType }) => {
  const tableElement = document.createElement("table");
  const tableHeadElement = document.createElement("thead");
  const tableBodyElement = document.createElement("tbody");

  const tableHeadArray = TABLE_HEAD_BY_DATATYPE[String(dataType)];

  const renderTableHead = () => {
    const tr = document.createElement("tr");
    tableHeadArray.map((headElement) => {
      const td = document.createElement("th");
      td.innerText = headElement;
      tr.appendChild(td);
    });
    tableHeadElement.appendChild(tr);
  };

  const renderTableBody = () => {
    flattenData.map((row) => {
      const tr = document.createElement("tr");
      row.dataFlow.map((key) => {
        const td = document.createElement("td");
        td.innerText = row[key] || "-";
        tr.appendChild(td);
      });
      tableBodyElement.appendChild(tr);
    });
  };

  renderTableHead();
  renderTableBody();

  tableElement.appendChild(tableHeadElement);
  tableElement.appendChild(tableBodyElement);

  return tableElement;
};

export default DataGrid;
