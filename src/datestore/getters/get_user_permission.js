"use strict"

const getUserPermission =(function(state){
        let userPerm = state.allRoles.find(
          (x) => x.role === localStorage.getItem("userRole")
        );
        return userPerm;
});


export default getUserPermission;