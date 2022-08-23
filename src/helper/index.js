const titleFormat = (str, length) => {
  const arr = str.split("");
  if (arr.length > length) {
    const result = arr.slice(0, length).join("");
    return `${result}...`;
  }
  return str;
};

export default titleFormat;
