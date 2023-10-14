import React from "react";
import { Flex, Input, Text } from "@chakra-ui/react";

function BulletPoint({
  bulletPoint,
  onTransformToType,
  onRequestNewPoint,
  onTextChange,
  onFirstTimeFocus,
}) {
  const { type, value, isNewlyCreated } = bulletPoint;

  let bullet = "&middot;";
  let placeholderText = "Write /e for event, and /n for note...";
  switch (type) {
    case "task-completed":
      bullet = "&times;";
      break;
    case "event":
      bullet = "&#9702;";
      placeholderText = "Write /n for note, /t for task...";
      break;
    case "note":
      bullet = "-";
      placeholderText = "Write /e for event, /t for task...";
      break;
  }

  const inputTextDecoration = type === "task-cancelled" ? "line-through" : "";
  const bulletFontSize = type === "event" ? "32px" : "24px";

  const handleChangeInput = (e) => {
    const newValue = e.target.value;
    if (newValue === "/e" && type !== "event") {
      onTransformToType("event");
      return;
    }

    if (newValue === "/n" && type !== "note") {
      onTransformToType("note");
      return;
    }

    if (newValue === "/t" && type !== "task-todo") {
      onTransformToType("task-todo");
      return;
    }

    onTextChange(newValue);
  };

  const handleKeyDownInput = (e) => {
    if (e.key === "Enter") {
      onRequestNewPoint();
    }
  };

  const handleFocusInput = () => {
    if (isNewlyCreated) {
      onFirstTimeFocus();
    }
  };

  const handleBulletClick = () => {
    if (value === "") {
      return;
    }

    switch (type) {
      case "task-todo":
        onTransformToType("task-completed");
        break;
      case "task-completed":
        onTransformToType("task-cancelled");
        break;
      case "task-cancelled":
        onTransformToType("task-todo");
        break;
    }
  };

  return (
    <Flex gap="16px">
      <Text
        w="16px"
        textAlign="center"
        cursor="pointer"
        fontSize={bulletFontSize}
        dangerouslySetInnerHTML={{ __html: bullet }}
        onClick={handleBulletClick}
      />
      <Input
        autoFocus={isNewlyCreated}
        textDecoration={inputTextDecoration}
        variant="unstyled"
        placeholder={placeholderText}
        fontSize="18px"
        value={value}
        onKeyDown={handleKeyDownInput}
        onChange={handleChangeInput}
        onFocus={handleFocusInput}
      />
    </Flex>
  );
}

export default BulletPoint;
