export const general = () => {
  const isEqual = (objects: any[]) => {
    return objects.every(
      (obj) => JSON.stringify(obj) === JSON.stringify(objects[0])
    );
  };

  const generateGuid = () => {
    var S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };

  return {
    isEqual,
    generateGuid,
  };
};
