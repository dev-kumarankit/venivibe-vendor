export const apiFilterValidation = (urlArray: any[], urlLink: string) => {
  const urlParams = urlArray
    .filter((x) => x.value !== undefined && (x.value || x.name === "is_read" || x.name === "is_archived"))
    .map((x) =>
      x.name === "is_archived"
        ? `${x.name}=${x.value === false ? false : x.value === true ? true : ""}`
        : x.name === "is_read"
        ? `${x.name}=${x.value === false ? false : x.value === true ? true : ""}`
        : `${x.name}=${x.value}`
    );

  return urlParams.length > 0 ? `${urlLink}${urlParams.join("&")}` : urlLink;
};