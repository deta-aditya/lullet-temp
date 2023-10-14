import React, { useState } from "react";
import { Heading, Card, CardBody, CardHeader, Button } from "@chakra-ui/react";
import BulletPoint from "./components/BulletPoint";

function DailyLogCard({ dailyLog }) {
  const [bulletPoints] = useState(dailyLog.bulletPoints);

  const bulletPointsValue = bulletPoints.map(
    (bulletPoint) => bulletPoint.value,
  );

  const bulletPointsContainsValue = bulletPointsValue.some(
    (value) => value !== "",
  );

  const dailyLogHasChanged = dailyLog.bulletPoints
    .map((bulletPoints) => bulletPoints.value)
    .some((value, index) => bulletPointsValue[index] !== value);

  const showSaveButton = bulletPointsContainsValue && dailyLogHasChanged;

  return (
    <Card width="480px">
      <CardHeader display="flex" alignItems="center" gap="16px">
        <Heading fontSize="24px">{dailyLog.dateFormatted}</Heading>
        {showSaveButton && (
          <Button
            variant="unstyled"
            px="16px"
            py="4px"
            bg="blue.100"
            h="auto"
            borderRadius="8px"
          >
            Save
          </Button>
        )}
      </CardHeader>
      <CardBody>
        {bulletPoints.map((bulletPoint) => (
          <BulletPoint key={bulletPoint.id} bulletPoint={bulletPoint} />
        ))}
      </CardBody>
    </Card>
  );
}

export default DailyLogCard;
