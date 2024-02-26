export const generateRandomPassword = () => {
  const minLength = 10;
  const maxLength = 12;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

  const passwordLength =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }

  return password;
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  if (localStorage.getItem("auth")) {
    return JSON.parse(localStorage.getItem("auth"));
  } else {
    return false;
  }
};

export const roles = [
  "Chariman",
  "Senior Member",
  "Member",
  "Commissioner",
  "Deputy Commissioner",
  "Assistant Commissioner",
  "SSTO",
];
