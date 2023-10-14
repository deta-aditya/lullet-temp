import React from "react";

import { Input } from "@chakra-ui/react";

function SearchInput() {
  return (
    <Input
      my="0"
      w="480px"
      placeholder="Search..."
      borderRadius="full"
      textAlign="center"
      border="2px"
      borderColor="gray.200"
      bg="gray.100"
    />
  );
}

export default SearchInput;
