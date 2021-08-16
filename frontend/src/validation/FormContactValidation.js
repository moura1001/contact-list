function name(name) {
  if (name.length < 3 || name.length > 128)
    return false;

  if (!/^([A-Za-z0-9]+\s?)+$/.test(name))
    return false;

  return true;
}

function email(email) {
  if (email.length < 7 || email.length > 128)
    return false;

  if (!/^([._]*[A-Za-z0-9]+[._]*)@[A-Za-z0-9]+\.(com|org|br)$/.test(email))
    return false;

  return true;
}

function address(address) {
  if (address.length < 3 || address.length > 128)
    return false;

  if (!/^([A-Za-z0-9]+\s?)+,?\s?([A-Za-z0-9]+\s?)*$/.test(address))
    return false;

  return true;
}

function telephone(telephone) {
  if (telephone.length < 8 || telephone.length > 16)
    return false;

  if (!/^([0-9]+)$/.test(telephone))
    return false;

  return true;
}

const FormContactValidation = (fields) => {
  let errors = {};

  if (!name(fields.name))
    errors["name"] = "Invalid name";

  if (!email(fields.email))
    errors["email"] = "Invalid email";

  if (!address(fields.address))
    errors["address"] = "Invalid address";

  if (!telephone(fields.telephone))
    errors["telephone"] = "Invalid telephone";
  
  return errors;

}

export default FormContactValidation