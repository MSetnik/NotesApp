import React, { useState } from "react";
import { ActivityIndicator, Pressable } from "react-native";

// Style
import { Colors, Typography } from "../../styles";

// Icon package

const CircleBtn = ({
  color,
  children,
  borderRadius = Typography.FONT_SIZE_TITLE_LG * 2,
  onPress,
  style,
  disabled = false,
  isLoading = false
}) => {
  const [pressOpacity, setPressOpacity] = useState(1);
  return (
    <Pressable
      disabled={disabled}
      style={[{
        borderRadius: borderRadius,
        padding: Typography.LINE_HEIGHT_NORMAL / 2,
        backgroundColor: color,
        opacity: disabled ? 0.3 : pressOpacity
      }, style]}
      onPress={onPress}
      onPressIn={() => setPressOpacity(0.5)}
      onPressOut={() => setPressOpacity(1)}
    >
      {
        isLoading ? <ActivityIndicator size="small" color={Colors.themeColor("dark").textColor}/> : children

      }
    </Pressable>
  );
};

export default CircleBtn;
