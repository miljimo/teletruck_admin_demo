"use strict"


const loading = (function (state, isLoading) {
    if (isLoading) {
        state.isLoading = true;
    }
    state.isLoading = false;
});


export default loading;