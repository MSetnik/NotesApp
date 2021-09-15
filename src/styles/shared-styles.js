import { StyleSheet } from "react-native";

// Boje
import * as Colors from "./colors";

// Tipografija
import * as Typography from "./typography";

export const layout = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.themeColor().background
  },
  flex: {
    flex: 1
  },
  alignCenter: {
    alignSelf: "center"
  },
  standardHorisontalPadding: {
    paddingHorizontal: Typography.FONT_SIZE_NORMAL
  },
  standardVerticalPadding: {
    paddingVertical: Typography.FONT_SIZE_NORMAL
  },
  standardHorisontalMargin: {
    marginHorizontal: Typography.FONT_SIZE_NORMAL
  },
  standardVerticalMargin: {
    marginVertical: Typography.FONT_SIZE_NORMAL
  }
});

export const typography = StyleSheet.create({
  titleLarge: {
    fontSize: Typography.FONT_SIZE_TITLE_LG,
    lineHeight: Typography.LINE_HEIGHT_TITLE_LG,
    letterSpacing: Typography.LETTER_SPACING,
    fontWeight: Typography.FONT_WEIGHT_BOLD
  },
  titleMedium: {
    fontSize: Typography.FONT_SIZE_TITLE_MD,
    lineHeight: Typography.LINE_HEIGHT_TITLE_MD,
    letterSpacing: Typography.LETTER_SPACING,
    fontWeight: Typography.FONT_WEIGHT_BOLD
  },
  titleNormal: {
    fontSize: Typography.FONT_SIZE_MEDIUM,
    lineHeight: Typography.LINE_HEIGHT_NORMAL,
    letterSpacing: Typography.LETTER_SPACING,
    fontWeight: Typography.FONT_WEIGHT_BOLD
  },
  button: {
    fontSize: Typography.FONT_SIZE_MEDIUM,
    lineHeight: Typography.LINE_HEIGHT_NORMAL,
    letterSpacing: Typography.LETTER_SPACING,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    textTransform: "uppercase"
  },
  subtitle: {
    fontSize: Typography.FONT_SIZE_NORMAL,
    lineHeight: Typography.LINE_HEIGHT_NORMAL,
    letterSpacing: Typography.LETTER_SPACING,
    fontWeight: Typography.FONT_WEIGHT_BOLD
  },
  bodyMedum: {
    fontSize: Typography.FONT_SIZE_NORMAL,
    lineHeight: Typography.LINE_HEIGHT_NORMAL,
    fontWeight: Typography.FONT_WEIGHT_NORMAL
  },
  bodySmall: {
    fontSize: Typography.FONT_SIZE_SMALL,
    lineHeight: Typography.LINE_HEIGHT_SMALL,
    fontWeight: Typography.FONT_WEIGHT_NORMAL
  },
  label: {
    fontSize: Typography.FONT_SIZE_SMALL,
    lineHeight: Typography.LINE_HEIGHT_SMALL,
    letterSpacing: Typography.LETTER_SPACING,
    fontWeight: Typography.FONT_WEIGHT_NORMAL
  },
  modalTitle: {
    marginBottom: Typography.FONT_SIZE_NORMAL,
    fontSize: Typography.FONT_SIZE_TITLE_MD,
    lineHeight: Typography.LINE_HEIGHT_TITLE_MD,
    letterSpacing: Typography.LETTER_SPACING,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    textAlign: "center"
  },
  modalMessage: {
    marginBottom: Typography.FONT_SIZE_TITLE_LG,
    paddingHorizontal: Typography.FONT_SIZE_NORMAL,
    fontSize: Typography.FONT_SIZE_NORMAL,
    lineHeight: Typography.LINE_HEIGHT_NORMAL,
    textAlign: "center"
  },
  textCenter: {
    textAlign: "center"
  },
  uppercase: {
    textTransform: "uppercase"
  },
  inputValidationError: {
    marginBottom: Typography.FONT_SIZE_NORMAL,
    color: Colors.themeColor().error
  }
});

export const shadow = StyleSheet.create({
  elevation2: {
    elevation: 2,
    shadowColor: Colors.themeColor().textColor,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62
  },
  elevation5: {
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  elevation8: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8
  }
});
