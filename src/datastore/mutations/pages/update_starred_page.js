"use strict"

const  UPDATE_STARRED_PAGE = (function(state, payload) {
    // find item index in search list state
    const index = state.navbarSearchAndPinList["pages"].data.findIndex(
      (item) => item.url == payload.url
    );

    // update the main list
    state.navbarSearchAndPinList["pages"].data[index].is_bookmarked =
      payload.val;

    // if val is true add it to starred else remove
    if (payload.val) {
      state.starredPages.push(
        state.navbarSearchAndPinList["pages"].data[index]
      );
    } else {
      // find item index from starred pages
      const index = state.starredPages.findIndex(
        (item) => item.url == payload.url
      );

      // remove item using index
      state.starredPages.splice(index, 1);
    }
  });


  export default  UPDATE_STARRED_PAGE ;

