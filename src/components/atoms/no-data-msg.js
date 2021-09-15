import React, { useContext } from "react";
import { View, Text } from "react-native";

// Style
import { Colors, Typography, SharedStyles } from "../../styles";

// Store
import { StoreContext } from "../../store/reducer";

const NoDataMessage = ({ text = "???", style = null, textStyle = null, icon }) => {
  const store = useContext(StoreContext);
  const state = store.state;

  return (
    <View
      style={[
        {
          flexDirection: "row",
          marginHorizontal: Typography.FONT_SIZE_NORMAL,
          padding: Typography.FONT_SIZE_NORMAL,
          borderRadius: Typography.FONT_SIZE_TITLE_LG,
          backgroundColor: Colors.themeColor(state.theme).backgroundSecondary,
          alignItems: "center"
        },
        style
      ]}
    >
      { icon }
      <Text
        style={[
          SharedStyles.typography.bodyMedum,
          { color: Colors.themeColor(state.theme).textColor },
          textStyle
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

export default NoDataMessage;
