"use strict"


const createErrors=(function(state, errors){
   state.errors  = errors
})

const clearErrors =(function(state){
   state.errors = new Array()
})

export  {createErrors, clearErrors};