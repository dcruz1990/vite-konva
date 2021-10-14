export const general = () => {
  const isEqual = (objects: any[]) => {
    return objects.every(
      (obj) => JSON.stringify(obj) === JSON.stringify(objects[0])
    );
  };

  return {
    isEqual,
  };
};
