#!/usr/bin/bash

function is_command_exists(){
    local comm="$1"

    if [[ ! -f "${comm}" ]]; then
        return 1;
    fi
    return 1;
}



npm run serve




