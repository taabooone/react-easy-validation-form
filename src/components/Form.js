import React, { Component } from 'react';
import PropTypes from 'prop-types';


class BaseForm extends Component {

  state = {
    fields: [],
  }

  validateAll = () => {
    let validState = true;
    this.state.fields.forEach((field) => {
      const fieldValid = field.validateField();
      if(!fieldValid) validState = false;
    })
    return validState;
  }

  addToFields = (input) => {
    return (previousState, currentProps) => {
      return { ...previousState, fields: [...previousState.fields, input] };
    };
  }

  removeFromFields = (input) => {
    return (previousState, currentProps) => {
      const array = [...previousState.fields]; // make a separate copy of the array
      const index = array.findIndex((elem) => {
        return elem.state.name === input.state.name;
      })
      array.splice(index, 1);
      return { fields: array };
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const isValid = this.validateAll();
    if(isValid){
      const validatedFields = {};
      this.state.fields.forEach((field) => {
        validatedFields[field.props.name] = field.state.value;
      });
      this.props.handleSubmit(validatedFields);
    }
  }

  addInput = async (input) => {
    await this.setState(this.addToFields(input));
  }

  removeInput = async (input) => {
    await this.setState(this.removeFromFields(input));
  }

  render() {
    const { children, handleSubmit, ...rest} = this.props;
    return (
      <form {...rest} onSubmit={this.handleSubmit}>
        {children}
      </form>
    )
  }
}

export default BaseForm;

BaseForm.PropTypes = {
  // A function that handles onsubmit is required.
  // $params: fields
  handleSubmit: PropTypes.func.isRequired,
}
