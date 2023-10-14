import React from "react";
import { Box, Heading, Flex, Tabs, TabList, Spacer } from "@chakra-ui/react";

import SearchInput from "./components/SearchInput";
import FilterTab from "./components/FilterTab";

function PageHeader() {
  return (
    <Box bg="white" px="36px" py="28px">
      <Flex justifyContent="space-between" alignItems="center">
        <Heading color="blue.500" fontFamily='"Permanent Marker", cursive'>
          Lullet
        </Heading>
        <SearchInput />
        <Spacer flex="0 1" />
      </Flex>
      <Tabs variant="unstyled" mt="28px">
        <TabList>
          <FilterTab>All</FilterTab>
          <FilterTab>To Do</FilterTab>
          <FilterTab>Completed</FilterTab>
          <FilterTab>Canceled</FilterTab>
          <FilterTab>Events</FilterTab>
          <FilterTab>Notes</FilterTab>
        </TabList>
      </Tabs>
    </Box>
  );
}

export default PageHeader;
