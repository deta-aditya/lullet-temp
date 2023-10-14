import React, { useState } from "react";
import { Heading, Card, CardBody, CardHeader, Button } from "@chakra-ui/react";

import {
  isBulletPointEqual,
  isBulletPointTypeOf,
} from "../../../../utils/bulletPoint";
import BulletPoint from "./components/BulletPoint";
import { changeById } from "../../../../utils/bulletPointList";

function DailyLogCard({ dailyLog, typeFilter }) {
  const [bulletPoints, setBulletPoints] = useState(() =>
    dailyLog.bulletPoints.map((bulletPoint) => ({
      ...bulletPoint,
      isNewlyCreated: false,
    })),
  );

  const bulletPointsContainsValue = bulletPoints.some(
    (bulletPoint) => bulletPoint.value !== "",
  );

  const dailyLogHasChanged = dailyLog.bulletPoints.some(
    (bulletPoint, index) =>
      typeFilter === "all" &&
      !isBulletPointEqual(bulletPoint, bulletPoints[index]),
  );

  const showSaveButton = bulletPointsContainsValue && dailyLogHasChanged;

  const filteredBulletPoints = bulletPoints.filter((bulletPoint) =>
    isBulletPointTypeOf(bulletPoint, typeFilter),
  );

  const handleTextChange = (id, newValue) => {
    setBulletPoints((current) =>
      changeById(current, id, (bulletPoint) => ({
        ...bulletPoint,
        value: newValue,
      })),
    );
  };

  const handleRequestNewPoint = () => {
    setBulletPoints((current) => {
      const nextId = [...current].sort((a, b) => b.id - a.id)[0].id + 1;
      return [
        ...current,
        { id: nextId, type: "task-todo", value: "", isNewlyCreated: true },
      ];
    });
  };

  const handleFirstTimeFocus = (id) => {
    setBulletPoints((current) =>
      changeById(current, id, (bulletPoint) => ({
        ...bulletPoint,
        isNewlyCreated: false,
      })),
    );
  };

  const handleTransformToType = (id, type) => {
    setBulletPoints((current) =>
      changeById(current, id, (bulletPoint) => {
        const isJustChangingToTask =
          type === "task-todo" &&
          (bulletPoint.type === "event" || bulletPoint.type === "note");

        const shouldClearValue =
          type === "event" || type === "note" || isJustChangingToTask;

        if (shouldClearValue) {
          return { ...bulletPoint, type, value: "" };
        }

        return { ...bulletPoint, type };
      }),
    );
  };

  return (
    <Card width="480px">
      <CardHeader display="flex" alignItems="center" gap="16px">
        <Heading fontSize="24px">{dailyLog.dateFormatted}</Heading>
        {showSaveButton && (
          <Button
            variant="unstyled"
            px="16px"
            py="2px"
            bg="blue.100"
            h="auto"
            borderRadius="8px"
          >
            Save
          </Button>
        )}
      </CardHeader>
      <CardBody>
        {filteredBulletPoints.map((bulletPoint) => (
          <BulletPoint
            key={bulletPoint.id}
            bulletPoint={bulletPoint}
            onTextChange={(newText) =>
              handleTextChange(bulletPoint.id, newText)
            }
            onRequestNewPoint={handleRequestNewPoint}
            onFirstTimeFocus={() => handleFirstTimeFocus(bulletPoint.id)}
            onTransformToType={(type) =>
              handleTransformToType(bulletPoint.id, type)
            }
          />
        ))}
      </CardBody>
    </Card>
  );
}

export default DailyLogCard;
