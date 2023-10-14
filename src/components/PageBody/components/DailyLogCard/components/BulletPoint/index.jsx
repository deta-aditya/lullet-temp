import React from "react";
import { Flex, Input, Text } from "@chakra-ui/react";

function BulletPoint({ bulletPoint }) {
  const { type, value } = bulletPoint;

  let signifier = "&middot;";
  switch (type) {
    case "task-completed":
      signifier = "&times;";
      break;
    case "event":
      signifier = "&#9702;";
      break;
    case "note":
      signifier = "-";
      break;
  }

  const inputTextDecoration = type === "task-cancelled" ? "line-through" : "";
  const signifierFontSize = type === "event" ? "32px" : "24px";

  return (
    <Flex gap="16px">
      <Text
        w="16px"
        textAlign="center"
        fontSize={signifierFontSize}
        dangerouslySetInnerHTML={{ __html: signifier }}
      />
      <Input
        textDecoration={inputTextDecoration}
        variant="unstyled"
        placeholder="Press /e for event, and /n for note..."
        fontSize="18px"
        value={value}
      />
    </Flex>
  );
}

export default BulletPoint;
