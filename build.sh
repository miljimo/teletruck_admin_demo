#!/bin/bash
export NODE_PACKAGE_MANAGED=nvm


function install_node_package_managed(){
    # function will install the node 
    # package manager

    return 0
}

function build_application(){
    nvm use 10.19.0
    npm install .
    npm run build
    return 0
}

build_application