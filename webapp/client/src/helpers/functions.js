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

export const smoothScrolling = () => {
  if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
    document.querySelector('body').on("mousewheel", (event) => {
      event.preventDefault();
      var wd = event.wheelDelta;
      var csp = window.pageYOffset;
      window.scrollTo(0, csp - wd);
    });
  }
}

export const convertMillionToString = (number) => {
  switch(true) {
    case number >= 1000 && number < 1000000:
      return `${number/1000} ngàn`;
    case number >= 1000000 && number < 1000000000:
      return `${number/1000000} triệu`;
    default: return number;
  }
}

export const isLogged = () => {
  return false;
}
