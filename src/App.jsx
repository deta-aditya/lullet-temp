import React, { useState } from "react";

import { Flex } from "@chakra-ui/react";

import PageHeader from "./components/PageHeader";
import PageBody from "./components/PageBody";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  return (
    <Flex h="100vh" flexDir="column">
      <PageHeader
        searchQuery={searchQuery}
        typeFilter={typeFilter}
        onSearchQueryChange={setSearchQuery}
        onTypeFilterChange={setTypeFilter}
      />
      <PageBody searchQuery={searchQuery} typeFilter={typeFilter} />
    </Flex>
  );
}

export default App;
