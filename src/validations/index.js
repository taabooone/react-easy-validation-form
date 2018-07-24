const required = ({value}) => {
  if (!!value) return false;
  return 'This field is required';
}

const isEmail = ({value}) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (regex.test(value)) return false;
  return 'Please enter a valid email address';
}

export { required, isEmail };
