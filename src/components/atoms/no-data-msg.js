import React from "react";
import { View, Text } from "react-native";

// Style
import { Colors, Typography, SharedStyles } from "../../styles";

const NoDataMessage = ({ text = "???", style = null, textStyle = null, icon }) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          marginHorizontal: Typography.FONT_SIZE_NORMAL,
          padding: Typography.FONT_SIZE_NORMAL,
          borderRadius: Typography.FONT_SIZE_TITLE_LG,
          backgroundColor: Colors.themeColor().backgroundSecondary,
          alignItems: "center"
        },
        style
      ]}
    >
      { icon }
      <Text
        style={[
          SharedStyles.typography.bodyMedum,
          { color: Colors.themeColor().textColor },
          textStyle
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

export default NoDataMessage;
