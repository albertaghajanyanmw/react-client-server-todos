import { variables } from "configs";

export default () => ({
  main: {
    marginTop: variables.headerHeight,
    minHeight: `calc(100vh - ${variables.headerHeight})`,
  },
  loadingRoot: {
    textAlign: 'center',
  },
});