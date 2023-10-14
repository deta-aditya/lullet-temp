import React from "react";
import { Box, Heading, Flex, Tabs, TabList, Spacer } from "@chakra-ui/react";

import SearchInput from "./components/SearchInput";
import FilterTab from "./components/FilterTab";
import { TYPE_FILTERS } from "./constants";

function PageHeader({ searchQuery, typeFilter }) {
  const tabIndex = TYPE_FILTERS.findIndex(
    (filter) => filter.type === typeFilter,
  );

  return (
    <Box bg="white" px="36px" py="28px">
      <Flex justifyContent="space-between" alignItems="center">
        <Heading color="blue.500" fontFamily='"Permanent Marker", cursive'>
          Lullet
        </Heading>
        <SearchInput searchQuery={searchQuery} />
        <Spacer flex="0 1" />
      </Flex>
      <Tabs index={tabIndex} variant="unstyled" mt="28px">
        <TabList>
          {TYPE_FILTERS.map((filter) => (
            <FilterTab key={filter.type}>{filter.text}</FilterTab>
          ))}
        </TabList>
      </Tabs>
    </Box>
  );
}

export default PageHeader;
