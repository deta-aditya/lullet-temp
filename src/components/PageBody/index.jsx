import React from "react";
import { Box, Flex } from "@chakra-ui/react";

import DailyLogCard from "./components/DailyLogCard";
import { SAMPLE_DAILY_LOGS } from "./constants";

function PageBody() {
  return (
    <Box flexGrow="1" overflowY="auto">
      <Flex w="fit-content" p="36px" h="full" gap="24px" alignItems="stretch">
        {SAMPLE_DAILY_LOGS.map((dailyLog) => (
          <DailyLogCard key={dailyLog.date} dailyLog={dailyLog} />
        ))}
      </Flex>
    </Box>
  );
}

export default PageBody;
