import React, { useState } from "react";
import { Pressable } from "react-native";

// Style
import { Typography } from "../../styles";

// Icon package

const CircleBtn = ({
  color,
  children,
  borderRadius = Typography.FONT_SIZE_TITLE_MD,
  onPress
}) => {
  const [pressOpacity, setPressOpacity] = useState(1);
  return (
    <Pressable
      style={{
        borderRadius: borderRadius,
        padding: Typography.LINE_HEIGHT_NORMAL / 2,
        backgroundColor: color,
        opacity: pressOpacity
      }}
      onPress={onPress}
      onPressIn={() => setPressOpacity(0.5)}
      onPressOut={() => setPressOpacity(1)}
    >
      {children}
    </Pressable>
  );
};

export default CircleBtn;
