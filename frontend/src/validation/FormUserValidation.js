function email(email) {
  if (email.length < 7 || email.length > 128)
    return false;

  if (!/^([._]*[A-Za-z0-9]+[._]*)@[A-Za-z0-9]+\.(com|org|br)$/.test(email))
    return false;

  return true;
}

function password(password) {
  if (password.length < 3 || password.length > 128)
    return false;

  if (!/^[A-Za-z_]*\d+[A-Za-z_]*\d+[A-Za-z0-9_]*$/.test(password))
    return false;

  return true;
}

const FormUserValidation = (fields) => {
  let errors = {};

  if (!email(fields.email))
    errors["email"] = "Invalid email";

  if (!password(fields.password))
    errors["password"] = "Invalid password";

  return errors;

}

export default FormUserValidation