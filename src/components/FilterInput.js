import Component from "../core/Component.js";

export default class FilterInput extends Component {
  //========= Service Fn Area
  setEvt() {
    let debounceId;
    const { handleInputValue } = this.props;

    this.addEvt("input", ".filter__input input", ({ target }) => {
      if (debounceId) {
        clearTimeout(debounceId);
      }
      debounceId = setTimeout(() => {
        handleInputValue(target.value);
      }, 1000);
    });
  }
  //========= Render Area
  HTMLtemplate() {
    const { filterKeyword } = this.props;
    return `
          <input type="text" placeHolder="필터링할 키워드를 입력하세요." value="${filterKeyword}" autoFocus />
      `;
  }
}
