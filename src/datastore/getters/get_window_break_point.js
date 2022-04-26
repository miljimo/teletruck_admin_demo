"use strict"

 // This should be same as tailwind. So, it stays in sync with tailwind utility classes
const windowBreakPoint = (function(state){

 if (state.windowWidth >= 1200) 
    return "xl";
 if (state.windowWidth >= 992) 
    return "lg";
 if (state.windowWidth >= 768)
     return "md";
 if (state.windowWidth >= 576) 
    return "sm";
 return "xs";

});


export default windowBreakPoint;


