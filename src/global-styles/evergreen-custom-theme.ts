import { Theme } from "evergreen-ui";

const theme: Partial<Theme> =  {
  colors: {
    "imbDarkBlue": '#3A3E58'
  },
  components: {
    TableCell: {
    },
    TableHead: {
      baseStyle: {
        textTransform: "none",
        fontSize: ".9rem",
      }
    },
    TableRow: {
      baseStyle: {
        color: "#474d66",
        fontSize: "0.95rem"
      }
    }
  }
}

export default theme;
