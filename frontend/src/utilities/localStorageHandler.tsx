export const getLocalStorage = (name: string) => {
  try {
    return localStorage.getItem(name);
  } catch {
    return false;
  }
};

export const setLocalStorage = (name: string, value: string) => {
  try {
    localStorage.setItem(name, value);
  } catch {}
};
