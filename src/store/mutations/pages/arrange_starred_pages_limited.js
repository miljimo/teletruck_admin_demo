"use strict"

const ARRANGE_STARRED_PAGES_LIMITED=(function(state, list) {
    const starredPagesMore = state.starredPages.slice(10);
    state.starredPages = list.concat(starredPagesMore);
  });

  export default ARRANGE_STARRED_PAGES_LIMITED;