class Validator {
  isEmail(str) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(str);
  }
  
  isUsername(str) {
    return /^[a-zA-Z0-9_]{6,20}$/.test(str);
  }
  
  isPassword(str) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(str);
  }
}

export {
  Validator
}