import React from "react";
import { Heading, Card, CardBody, CardHeader, Button } from "@chakra-ui/react";
import BulletPoint from "./components/BulletPoint";

function DailyLogCard({ dailyLog }) {
  return (
    <Card width="480px">
      <CardHeader display="flex" alignItems="center" gap="16px">
        <Heading fontSize="24px">{dailyLog.dateFormatted}</Heading>
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
      </CardHeader>
      <CardBody>
        {dailyLog.bulletPoints.map((bulletPoint) => (
          <BulletPoint key={bulletPoint.id} bulletPoint={bulletPoint} />
        ))}
      </CardBody>
    </Card>
  );
}

export default DailyLogCard;
