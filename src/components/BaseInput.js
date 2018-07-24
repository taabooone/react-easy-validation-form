import { Component } from 'react';
import PropTypes from 'prop-types';

export default class BaseInput extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: props.name,
      value: props.value || '', // extended component can set its own base value.
      error: null,
      pristine: true,
    }
  }

  // If the value of the baseinput is set externaly we will use that as the source of truth.
  componentWillReceiveProps = (newProps) => {
    if(this.props.value !== newProps.value){
      this.setState({ value: newProps.value });
    }
  }

  // Finds the parent form when mounting and saves it to the state.
  componentDidMount = () => {
    const form = this.findParent(this._reactInternalInstance);
    this.setState({ form }, () => {
      this.state.form.addInput(this);
    })
  }

  findParent = (node) => {
    if (node._hostParent._currentElement.type === 'form') return node._hostParent._currentElement._owner._instance;
    return this.findParent(node._hostParent);
  }

  componentWillUnmount = () => {
    if (this.state.form) this.state.form.removeInput(this);
  }

  validateField = () => {
    if(typeof this.props.validations === 'undefined') return true;
    let isValid = true;
    this.props.validations.forEach((validation) => {
      const result = validation(this.state);
      if(!!result) {
        this.setState({ error: result });
        isValid = false;
      }
    });
    if(isValid) this.setState({ error: null });
    return isValid;
  }
}

BaseInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  handleChange: PropTypes.func,
}
