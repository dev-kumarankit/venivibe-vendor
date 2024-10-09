export const apiPostFilter = (userData) => {
  const filteredUserData = Object.fromEntries(
    Object.entries(userData || {}).filter(([key, value]) => value !== "")
  );
  return filteredUserData;
};
