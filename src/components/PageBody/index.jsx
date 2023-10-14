import React from "react";
import { Box, Flex } from "@chakra-ui/react";

import DailyLogCard from "./components/DailyLogCard";
import { SAMPLE_DAILY_LOGS } from "./constants";

function PageBody({ searchQuery, typeFilter }) {
  const mappedDailyLogs = SAMPLE_DAILY_LOGS.map((dailyLog) => ({
    ...dailyLog,
    bulletPoints: dailyLog.bulletPoints
      .filter((bulletPoint) =>
        bulletPoint.value.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .filter(
        (bulletPoint) =>
          typeFilter === "all" || bulletPoint.type === typeFilter,
      ),
  }));

  const filteredDailyLogs = mappedDailyLogs.filter(
    (dailyLog) => dailyLog.bulletPoints.length > 0,
  );

  return (
    <Box flexGrow="1" overflowY="auto">
      <Flex w="fit-content" p="36px" h="full" gap="24px" alignItems="stretch">
        {filteredDailyLogs.map((dailyLog) => (
          <DailyLogCard key={dailyLog.date} dailyLog={dailyLog} />
        ))}
      </Flex>
    </Box>
  );
}

export default PageBody;
