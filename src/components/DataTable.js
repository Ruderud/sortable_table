import Component from "../core/Component.js";

export default class DataTable extends Component {
  //========= Service Fn Area
  setEvt() {
    const { data, handleTableHeadClick } = this.props;
    this.addEvt("click", "thead tr th", ({ target }) => {
      handleTableHeadClick(target);
    });
  }
  //========= Render Area
  HTMLtemplate() {
    const { data, filteredData } = this.props;

    return `
            <thead>
                <tr>
                    ${data.tableHeadFlow
                      .map((head, idx) => {
                        // console.log(idx, data);
                        if (idx === data.filterColumn) {
                          return `
                              <th key="${idx}" >${head} ${
                            data.isReversed ? "🔽" : "🔼"
                          }</th>
                              `;
                        }
                        return `
                            <th key="${idx}" >${head}</th>
                        `;
                      })
                      .join("")}
                </tr>
            </thead>
            <tbody>
                
                    ${filteredData
                      .map((row) => {
                        return `
                            <tr>${data.tableHeadFlow
                              .map((ele) => {
                                return `<td>${row[ele] || "-"}</td>`;
                              })
                              .join("")}</tr>
                        `;
                      })
                      .join("")}
            </tbody>
        `;
  }
}
