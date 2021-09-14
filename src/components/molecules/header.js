import React from "react";
import { View } from "react-native";
import { Typography } from "../../styles";

const Header = ({ leftElement, rightElement }) => {
  return (
    <View style={{
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: Typography.FONT_SIZE_TITLE_MD,
      alignItems: "center",
      marginBottom: Typography.FONT_SIZE_TITLE_MD
    }}>
      {leftElement}
      {rightElement}
    </View>
  );
};

export default Header;
