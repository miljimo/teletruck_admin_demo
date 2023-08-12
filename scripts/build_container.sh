
export CONTAINER_NAME=teletruck_admin

function build_container(){


    docker build -t "${CONTAINER_NAME}" .

    
}


build_container