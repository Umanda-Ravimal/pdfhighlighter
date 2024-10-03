import { alpha, createTheme, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    centerText: true;
    body3: true;
    header: true;
    grayText: true;
    blueText: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    addNode: true;
    button1: true;
    button2: true;
    buttonClicked: true;
    accept: true;
    reject: true;
    iconButton: true;
    borderButton: true;
    borderButtonBlue: true;
    iconClicked: true;
    borderButtonClicked: true;
    textButton: true;
  }

  interface ButtonPropsColorOverrides {}
}

declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    draggedDiagramCard: true;
    diagramCard: true;
    borderBox: true;
    dashBox: true;
    promptBox: true;
    footerBox: true;
    container: true;
    containerTwo: true;
    browseBox: true;
    dashRoundBox: true;
    processBox1: true;
    processBox2: true;
    extractingBox: true;
    sourceBox: true;
    folderContainer: true;
    blueBox: true;
    sourceContainer: true;
    blockBox: true;
  }
}

declare module "@mui/material/TextField" {
  interface TextFieldPropsVariantOverrides {
    cardTitle: true;
  }
}

declare module "@mui/material/Avatar" {
  interface AvatarPropsVariantOverrides {
    smallTopLeft: true;
    blueCircle: true;
    blueCircleSmall: true;
    grayCircle:true;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
    tertiary: Palette["primary"];
    globalAction: Palette["primary"];
    stepAction: Palette["primary"];

    checkboxPrimary: Palette["primary"];
    checkboxStyle1: Palette["secondary"];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
    tertiary?: PaletteOptions["primary"];
    globalAction?: PaletteOptions["primary"];
    stepAction?: PaletteOptions["primary"];

    checkboxPrimary?: PaletteOptions["primary"];
    checkboxStyle1?: PaletteOptions["secondary"];
  }
}

//Initializes an empty MUI theme object.
let theme = createTheme({});
// createTheme: Function from MUI to create or extend a MUI theme.

// Defines styles for specific card variants (draggedDiagramCard and diagramCard).
const DiagramCardStyles = {
  backgroundColor: "#fff",
  padding: "10px",
  borderRadius: "0.5rem",
  border: "2px solid #1d1d1d",
  paddingTop: "-1rem",
  fontSize: "0.8rem",
  height: "100%",
  width: "100%",
};

declare module "@mui/material/styles" {
  interface Theme {
    styledBox: { [key: string]: React.CSSProperties };
    tableView?: {
      [key: string]: React.CSSProperties | { [key: string]: React.CSSProperties };
    };
  }

  interface ThemeOptions {
    styledBox?: { [key: string]: React.CSSProperties };
    // tableView?: {
    //   [key: string]: React.CSSProperties | { [key: string]: any };
    // };
  }
}

// declare module "@kelsen-labs/interfaces" {
//   interface StyledBoxVariantOverrides {
//     inputVariant: true;
//     cardCoverImage: true;
//     cardCoverImagePreview: true;
//     cardAddNewBlock: true;
//   }

//   interface DataGridVariantOverrides {
//     grayRow: true;
//   }
// }

//ThemeOptions: Interface that defines the options accepted by createTheme.
const themeOptions: ThemeOptions = {
  styledBox: {
    inputVariant: {
      width: "100%",
      textAlign: "center",
      border: "none",
      // backgroundColor: "transparent",
      outline: "none",
    },
    cardCoverImage: {
      width: "100%",
      maxWidth: "7rem",
      height: "auto",
      maxHeight: "5rem",
      objectFit: "cover",
      borderRadius: "0.5rem",
    },
    cardCoverImagePreview: {
      borderRadius: "0.5rem",
      width: "100%",
      maxWidth: "7rem",
      height: "5rem",
      backgroundColor: "rgba(245, 204, 0, 0.16)",
    },
    cardAddNewBlock: {
      fontSize: "0.7rem",
      fontWeight: 600,
      backgroundColor: "#fff",
      color: "#1d1d1d",
      marginBottom: "2px",
      borderRadius: "0.3rem",
      minWidth: "6rem",
      padding: "0.25rem",
      width: "100%",
      // '&:hover': {
      //   backgroundColor: 'rgba(0, 0, 0, 0.2)',
      // },
    },
  },
  typography: {
    button: {
      fontWeight: 600,
      fontSize: "12px",
      margin: "2px",
    },
    fontFamily:
      '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Roboto"',
    body1: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: 1.57,
      marginBottom: "8px",
      marginTop: "8px",
    },
    subtitle1: {
      fontSize: "14px",
      fontWeight: 800,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: 1.57,
    },
    overline: {
      fontSize: "0.75vw",
      fontWeight: 600,
      letterSpacing: "0.5px",
      lineHeight: 2.5,
      textTransform: "uppercase",
    },
    caption: {
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: 1.66,
      color: "#f44336",
    },
    h1: {
      fontWeight: 700,
      fontSize: "20px",
      lineHeight: 1.375,
    },
    h2: {
      fontWeight: 700,
      fontSize: "18px",
      lineHeight: 1.375,
    },
    h3: {
      fontWeight: 700,
      fontSize: "16px",
      lineHeight: 1.375,
    },
    h4: {
      fontWeight: 600,
      fontSize: "16px",
      lineHeight: 1.375,
    },
    h5: {
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: 1.375,
    },
    h6: {
      fontWeight: 500,
      fontSize: "12px",
      lineHeight: 1.375,
    },
  },
  components: {
    MuiImageList: {
      styleOverrides: {
        root: {
          width: "auto",
          height: "auto",
        },
      },
    },
    MuiImageListItem: {
      styleOverrides: {
        root: {
          width: "150px",
          height: "auto",
          margin: "4px", // Example margin
        },
      },
    },

    MuiStack: {
      styleOverrides: {
        root: {
          width: "100%",
          height: "100%",
          gap: "8px",
        },
      },
    },

    MuiSlider: {
      styleOverrides: {
        root: {},
        valueLabel: {
          backgroundColor: "#006AE9",
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {},
      },
      variants: [
        {
          props: { variant: "centerText" }, // Ensure this matches the augmentation
          style: {
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "150%",
            letterSpacing: "0.15px",
            textAlign: "center",
            marginLeft: "24px",
            marginRight: "24px",
            marginBottom: "8px",
          },
        },
        {
          props: { variant: "body3" }, // Ensure this matches the augmentation
          style: {
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "150%",
            letterSpacing: "0.15px",
            textAlign: "center",
          },
        },
        {
          props: { variant: "header" }, // Ensure this matches the augmentation
          style: {
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            fontStyle: "normal",
            letterSpacing: "0.15px",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: 1.375,
            padding: "0 16px 0 16px",
          },
        },
        {
          props: { variant: "blueText" }, // Ensure this matches the augmentation
          style: {
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            fontStyle: "normal",
            letterSpacing: "0.15px",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: 1.5,
            textDecoration: "underline",
            cursor: "pointer",
            color: "blue",
          },
        },
        {
          props: { variant: "grayText" }, // Ensure this matches the augmentation
          style: {
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            fontStyle: "normal",
            letterSpacing: "0.15px",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: 1.5,
            textDecoration: "underline",
            color: "grey",
            pointerEvents: "none",
          },
        },
      ],
    },

    MuiPaper: {
      variants: [
        {
          props: { variant: "draggedDiagramCard" },
          style: { ...DiagramCardStyles, borderColor: "#fd944e" },
        },
        {
          props: { variant: "diagramCard" },
          style: DiagramCardStyles,
        },
        {
          props: { variant: "borderBox" },
          style: {
            border: "1px solid grey",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            paddingBottom: "12px",
            borderRadius: "0",
            borderShadow: "unset",
            // backgroundColor: "transparent",
          },
        },
        {
          props: { variant: "dashBox" },
          style: {
            display: "flex",
            border: "1px dashed grey",
            padding: "16px",
            borderRadius: "0",
            borderShadow: "unset",
            // backgroundColor: "transparent",
            justifyContent: "center",
            maxHeight: "100px",
            overflowY: "auto",
          },
        },
        {
          props: { variant: "blockBox" },
          style: {
            display: "flex",
            padding: "16px",
            borderRadius: "0",
            borderShadow: "unset",
            // backgroundColor: "transparent",
            justifyContent: "center",
            maxHeight: "100px",
            overflowY: "auto",
          },
        },
        {
          props: { variant: "promptBox" },
          style: {
            border: "0.5px solid grey",
            borderRadius: "8px 8px 0 0",
            borderShadow: "unset",
            // backgroundColor: "transparent",
          },
        },
        {
          props: { variant: "footerBox" },
          style: {
            border: "0.5px solid grey",
            height: "100%",
            borderTop: "none",
            borderBottom: "none",
            borderShadow: "unset",
            borderRadius: "0",
            // backgroundColor: "transparent",
            padding: "5px 12px 10px",
          },
        },
        {
          props: { variant: "container" },
          style: {
            width: "-webkit-fill-available",
            height: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "16px",
            paddingRight: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            borderShadow: "unset",
            borderRadius: "0",
            // backgroundColor: "transparent",
          },
        },
        {
          props: { variant: "containerTwo" },
          style: {
            width: "-webkit-fill-available",
            height: "auto",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "10px",
            paddingRight: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            borderShadow: "unset",
            borderRadius: "0",
            // backgroundColor: "transparent",
          },
        },
        {
          props: { variant: "browseBox" },
          style: {
            border: "1px solid grey",
            borderRadius: "5px",
            overflowY: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            // backgroundColor: "transparent",
            borderShadow: "unset",
          },
        },
        {
          props: { variant: "dashRoundBox" },
          style: {
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            textAlign: "center",
            // backgroundColor: "transparent",
            cursor: "pointer",
            border: "1px dashed grey",
            paddingBottom: "10px",
          },
        },
        {
          props: { variant: "processBox1" },
          style: {
            position: "relative",
            display: "inline-flex",
            // backgroundColor: "transparent",
          },
        },
        {
          props: { variant: "processBox2" },
          style: {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "transparent",
          },
        },
        {
          props: { variant: "extractingBox" },
          style: {
            width: "auto",
            height: "25px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            borderRadius: "100px",
            backgroundColor: "#FFA722",
            alignItems: "center",
            padding: "2px",
            color: "#fff",
          },
        },
        {
          props: { variant: "sourceBox" },
          style: {
            border: "1px solid grey",
            borderRadius: "5px",
            width: "100%",
            height: "260px",
            // backgroundColor: "transparent",
            overflowY: "auto",
          },
        },
        {
          props: { variant: "blueBox" },
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid blue",
            borderRadius: "8px",
            padding: "5px 0",
            borderShadow: "unset",
            // backgroundColor: "transparent",
          },
        },
        {
          props: { variant: "folderContainer" },
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            paddingLeft: "6px",
            paddingRight: "6px",
            maxHeight: "175px",
            overflow: "auto",
            marginTop: "8px",
            width: "-webkit-fill-available",
            height: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            borderShadow: "unset",
            borderRadius: "0",
            // backgroundColor: "transparent",
          },
        },
        {
          props: { variant: "sourceContainer" },
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            paddingLeft: "6px",
            paddingRight: "6px",
            maxHeight: "210px",
            overflow: "auto",
            marginTop: "8px",
            width: "-webkit-fill-available",
            height: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            borderShadow: "unset",
            borderRadius: "0",
            // backgroundColor: "transparent",
          },
        },
      ],
    },

    MuiButton: {
      variants: [
        {
          props: { variant: "button1" },
          style: {
            fontSize: "12px", // Customize the font size for login button
            fontWeight: 600,
            fontStyle: "normal",
            padding: "4px 10px",
            color: "#fff",
            borderRadius: "4px",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#006AE9",
            "&:hover": {
              backgroundColor: alpha("#006AE9", 0.8),
              // alpha: Function from MUI to adjust the opacity of a color.
            },
            "&.Mui-disabled": {
              backgroundColor: "#D1D1D1",
              color: "#666666",
            },
          },
        },
        {
          props: { variant: "button2" },
          style: {
            fontSize: "12px", // Customize the font size for login button
            fontWeight: 600,
            fontStyle: "normal",
            marginTop: "20px",
            padding: "4px 10px",
            color: "#fff",
            borderRadius: "4px",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#006AE9",
            "&:hover": {
              backgroundColor: alpha("#006AE9", 0.8),
            },
          },
        },
        {
          props: { variant: "buttonClicked" },
          style: {
            color: "#1976d2",
            backgroundColor: "#D9E9FC",
            "&:hover": {
              backgroundColor: alpha("#D9E9FC", 0.8),
            },
          },
        },
        {
          props: { variant: "accept" },
          style: {
            fontSize: "12px", // Customize the font size for login button
            fontWeight: 600,
            fontStyle: "normal",
            marginTop: "5px",
            color: "green",
            justifyContent: "center",
            alignItems: "center",
            // "&:hover": {
            //   backgroundColor: alpha("#006AE9", 0.8),
            // },
          },
        },
        {
          props: { variant: "reject" },
          style: {
            fontSize: "12px", // Customize the font size for login button
            fontWeight: 600,
            fontStyle: "normal",
            marginTop: "5px",
            color: "red",
            justifyContent: "center",
            alignItems: "center",
            // "&:hover": {
            //   backgroundColor: alpha("#006AE9", 0.8),
            // },
          },
        },
        {
          props: { variant: "addNode" },
          style: {
            position: "absolute",
            width: "60px",
            height: "8px",
            minWidth: "8px",
            minHeight: "8px",
            padding: "7px 6px 6px 6px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: "#0050ff",
            fontSize: "0.8rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            "&:hover": {
              backgroundColor: alpha("#0050ff", 0.8),
            },
          },
        },
        {
          props: { variant: "iconButton" },
          style: {
            textAlign: "center",
            WebkitFlex: "0 0 auto",
            msFlex: "0 0 auto",
            flex: "0 0 auto",
            fontSize: "1.5rem",
            padding: "0",
            borderRadius: "50%",
            overflow: "visible",
            color: "rgba(0, 0, 0, 0.54)",
            minWidth: "0",
            margin: "0",
          },
        },
        {
          props: { variant: "iconClicked" },
          style: {
            textAlign: "center",
            WebkitFlex: "0 0 auto",
            msFlex: "0 0 auto",
            flex: "0 0 auto",
            fontSize: "1.5rem",
            padding: "0",
            borderRadius: "50%",
            overflow: "visible",
            color: "#006AE9",
            minWidth: "0",
            margin: "0",
          },
        },
        {
          props: { variant: "borderButton" },
          style: {
            textAlign: "center",
            WebkitFlex: "0 0 auto",
            msFlex: "0 0 auto",
            flex: "0 0 auto",
            fontSize: "1.5rem",
            padding: "2px",
            overflow: "visible",
            color: "rgba(0, 0, 0, 0.54)",
            minWidth: "0",
            margin: "0",
            border: "1px solid grey",
            borderRadius: "2px",
            backgroundColor: "white",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#D9E9FC",
            },
            "&:active": {
              color: "#006AE9",
              backgroundColor: "#D9E9FC",
            },
          },
        },
        {
          props: { variant: "borderButtonBlue" },
          style: {
            textAlign: "center",
            WebkitFlex: "0 0 auto",
            msFlex: "0 0 auto",
            flex: "0 0 auto",
            fontSize: "1.5rem",
            padding: "2px",
            overflow: "visible",
            color: "#006AE9",
            minWidth: "0",
            margin: "0",
            border: "1px solid #006AE9",
            borderRadius: "2px",
            "&:hover": {
              borderColor: alpha("#006AE9", 0.8),
            },
          },
        },
        {
          props: { variant: "borderButtonClicked" },
          style: {
            textAlign: "center",
            WebkitFlex: "0 0 auto",
            msFlex: "0 0 auto",
            flex: "0 0 auto",
            fontSize: "1.5rem",
            padding: "2px",
            overflow: "visible",
            minWidth: "0",
            margin: "0",
            border: "1px solid #D9E9FC",
            borderRadius: "2px",
            color: "#1976d2",
            backgroundColor: "#D9E9FC",
            "&:hover": {
              backgroundColor: alpha("#D9E9FC", 0.8),
            },
          },
        },
        {
          props: { variant: "textButton" },
          style: {
            color: "#006AE9",
          },
        },
      ],
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "&.cardTitle": {
            fontSize: "0.8rem",
            fontWeight: 600,
            "& input": {
              textAlign: "start",
              // backgroundColor: "transparent",
              padding: "0.05rem 0.1rem",
              minWidth: "6rem",
              maxWidth: "100%",
              marginBottom: "0.4rem",
            },
            "& .MuiInput-notchedOutline": {
              border: "none",
            },
            "&:hover .MuiInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused .MuiInput-notchedOutline": {
              border: "none",
            },
          },
        },
      },
    },
    MuiCardContent: {},

    MuiAvatar: {
      variants: [
        {
          props: { variant: "smallTopLeft" },
          style: {
            width: 24, // Adjust the size here
            height: 24, // Adjust the size here
            position: "relative",
            top: 0,
            left: 0,
          },
        },
        {
          props: { variant: "blueCircle" },
          style: {
            width: 24, // Adjust the size here
            height: 24, // Adjust the size here
            position: "relative",
            top: 0,
            left: 0,
            backgroundColor: "#006AE9",
          },
        },
        {
          props: { variant: 'grayCircle' },
          style: {
            width: 20, // Adjust the size here
            height: 20, // Adjust the size here
            position: 'relative',
            top: 0,
            left: 0,
            backgroundColor: "#F8FAFD",
            color : "#767674",
            border: "1px solid #767674",
            fontSize:"14px"

          },
        },
        {
          props: { variant: "blueCircleSmall" },
          style: {
            width: 15, // Adjust the size here
            height: 15, // Adjust the size here
            backgroundColor: "#006AE9",
          },
        },
      ],
    },

    MuiCard: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px",
          marginTop: "10px",
          backgroundColor: "#F8FAFD",
        },
      },
      variants: [
        {
          props: { variant: "draggedDiagramCard" },
          style: { ...DiagramCardStyles, borderColor: "#fd944e" },
        },
      ],
    },

    MuiCardHeader: {},
    MuiCheckbox: {
      styleOverrides: {
        root: {
          // Add your custom styles here
          color: "#9e9e9e", // Example: change default color
          "&.Mui-checked": {
            color: "#006AE9", // Example: change color when checked
          },
          "&.Mui-disabled": {
            color: "#9e9e9e", // Example: change color when disabled
          },
        },
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        "*": {},
        html: {},
        body: {},
      },
    },
    MuiOutlinedInput: {},
    MuiTableHead: {},
  },
};

theme = createTheme(theme, themeOptions);
theme = createTheme(theme, {
  //Palette and PaletteOptions: Interfaces provided by MUI for defining and customizing color palettes in the theme.
  palette: {
    globalAction: {
      main: "#260353",
      light: "#441680",
      dark: "#441680",
      contrastText: "#fff",
    },
    stepAction: {
      main: "#441680",
      light: "#260353",
      dark: "#260353",
      contrastText: "#fff",
    },

    checkboxPrimary: {
      main: "#ccc",
      contrastText: "#FFFFFF",
    },
    checkboxStyle1: {
      checked: "#78C1BE",
      border: "1px solid #78C1BE",
      hover: "#ccc",
      disabled: "#FFFFFF",
      backgroundColor: "",
      contrastText: "#fff",
    },
  },
});

export { theme };
