export default class Component {
  target;
  props;
  state;
  constructor(target, props) {
    this.target = target;
    this.props = props;
    this.initialState();
    this.setEvt();
    this.render();
  }

  //========= State Area
  initialState() {}
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  //========= Service Fn Area
  setEvt() {}
  addEvt(evtType, selector, cbFn) {
    const childElements = [...this.target.querySelectorAll(selector)];
    const isEvtTarget = (evtTarget) =>
      childElements.includes(evtTarget) || evtTarget.closest(selector);
    this.target.addEventListener(evtType, (evt) => {
      if (!isEvtTarget(evt.target)) return false;
      cbFn(evt);
    });
  }
  componentDidMount() {}

  //========= Render Area
  HTMLtemplate() {
    return ``;
  }
  render() {
    this.target.innerHTML = this.HTMLtemplate();
    this.componentDidMount();
  }
}
