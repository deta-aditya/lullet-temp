import React from "react";
import { Tab } from "@chakra-ui/react";

function FilterTab({ children }) {
  return (
    <Tab
      px="24px"
      py="8px"
      borderWidth="2px"
      borderColor="transparent"
      borderRadius="full"
      _selected={{
        borderColor: "blue.200",
        bg: "blue.100",
        fontWeight: "bold",
      }}
    >
      {children}
    </Tab>
  );
}

export default FilterTab;
