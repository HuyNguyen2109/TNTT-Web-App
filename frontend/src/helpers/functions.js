export const validateEmail = (email) => {
  const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const formatPhoneNumber = (value) => {
  let match = value.match(/^(\d{3})(\d{3})(\d{4})$/);
  return match? (`${match[1]}-${match[2]}-${match[3]}`) : value;
};

export const removeWhiteSpace = (value) => {
  return value.replace(' ', '');
}

export const formatName = (name) => {
  const nameExtraction = name.split(" ");
  nameExtraction[nameExtraction.length -2] = nameExtraction[nameExtraction.length -2].charAt(0) + '.';
  if (nameExtraction.length > 4) {
    nameExtraction[2] = nameExtraction[2].charAt(0) + '.';
  }
  return nameExtraction.join(" ");
}

export const setDocumentTitle = (title) => {
  return document.title = title;
}
