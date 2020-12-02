import navigationConstants from "./constants";

const initialState = {
  currentPage: "",
  currentNavKey: 1,
  isCollapsed: false,
};

export default function account(state = initialState, action) {
  switch (action.type) {
    case navigationConstants.CHANGE_PAGE_REQUEST:
      return {
        ...state,
        currentPage: action.currentPage,
      };
      case navigationConstants.COLLAPSE_NAV_REQUEST:
      return {
        ...state,
        isCollapsed: action.isCollapsed,
      };
    default:
      return state;
  }
}
