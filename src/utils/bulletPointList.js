export function changeById(bulletPointList, id, changeFunction) {
  return bulletPointList.map((bulletPoint) => {
    if (bulletPoint.id !== id) {
      return bulletPoint;
    }
    return changeFunction(bulletPoint);
  });
}
