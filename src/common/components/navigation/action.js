import navigationConstants from './constants';

function changePage(page) {
    function request(newPage) { return { type: navigationConstants.CHANGE_PAGE_REQUEST, currentPage: newPage }; }
    return (dispatch) => {
        dispatch(request(page));
    };
}

function collapseSideNav(nav) {
    function request(collapsed) { return { type: navigationConstants.COLLAPSE_NAV_REQUEST, isCollapsed: collapsed }; }
    return (dispatch) => {
        dispatch(request(nav));
    };
}

export default {
    changePage,
    collapseSideNav,
};
