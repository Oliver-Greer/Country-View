const getLocalStorage = (name: string) => {
  try {
    return localStorage.getItem(name);
  } catch {
    return false;
  }
};

export default getLocalStorage;
