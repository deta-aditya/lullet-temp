export function isBulletPointTypeOf(bulletPoint, type) {
  return type === "all" || bulletPoint.type === type;
}

export function isBulletPointEqual(bulletPoint1, bulletPoint2) {
  return (
    bulletPoint1.type === bulletPoint2.type &&
    bulletPoint1.value === bulletPoint2.value
  );
}
