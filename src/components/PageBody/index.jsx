import React, { useEffect, useState } from "react";
import { Box, Flex, SkeletonText, useToast } from "@chakra-ui/react";

import { isBulletPointTypeOf } from "../../utils/bulletPoint";
import DailyLogCard from "./components/DailyLogCard";

function PageBody({ searchQuery, typeFilter }) {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [dailyLogs, setDailyLogs] = useState([]);

  const mappedDailyLogs = dailyLogs.map((dailyLog) => ({
    ...dailyLog,
    bulletPoints: dailyLog.bulletPoints
      .filter((bulletPoint) =>
        bulletPoint.value.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .filter((bulletPoint) => isBulletPointTypeOf(bulletPoint, typeFilter)),
  }));

  const filteredDailyLogs = mappedDailyLogs.filter(
    (dailyLog) => dailyLog.bulletPoints.length > 0,
  );

  useEffect(() => {
    let hasFetched = false;
    const fetchData = async () => {
      if (hasFetched) {
        return;
      }

      const response = await fetch("http://localhost:8000/daily-logs");
      const json = await response.json();
      setDailyLogs(json);
    };

    try {
      fetchData();
    } catch (e) {
      toast({
        title: "Error when fetching data",
        status: "error",
      });
    } finally {
      setLoading(false);
    }

    return () => (hasFetched = true);
  }, []);

  return (
    <Box flexGrow="1" overflowY="auto">
      <Flex w="fit-content" p="36px" h="full" gap="24px" alignItems="stretch">
        {loading ? (
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        ) : (
          filteredDailyLogs.map((dailyLog) => (
            <DailyLogCard
              key={dailyLog.date}
              dailyLog={dailyLog}
              typeFilter={typeFilter}
            />
          ))
        )}
      </Flex>
    </Box>
  );
}

export default PageBody;
