export const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
export const regexEmailPattern = "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*"

export const regexPassword = /^((?=\S?[A-Z])(?=\S?[a-z]).{4,})\S$/;
export const regexPasswordPattern = "((?=\\S?[A-Z])(?=\\S?[a-z]).{4,})\\S";

export const regexName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
export const regexNamePattern = "[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*"
