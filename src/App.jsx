import React from "react";

import { Flex } from "@chakra-ui/react";

import PageHeader from "./components/PageHeader";
import PageBody from "./components/PageBody";

function App() {
  return (
    <Flex h="100vh" flexDir="column">
      <PageHeader />
      <PageBody />
    </Flex>
  );
}

export default App;
