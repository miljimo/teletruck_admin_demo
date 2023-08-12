export NETWORK_NAME=teletruck_docker_network
export APP_CONTAINER_NAME=teletruck_admin
export APP_PORT=5000


function docker_network_exists() {  
  local network_name="$1"
  local existing_network=$(docker network ls --format '{{.Name}}' | grep -w "^${network_name}$")
  if [[ -n "$existing_network" ]]; then
    return 0
  fi
  return 1
}


function check_docker_image() {
    local name="$1"
    local ids=$(docker images -q "$name")
    if [[ -n $ids ]]; then
       return 0
    fi 
    return 1
}



function get_container_id_by_name() {
    local container_name="$1"
    local container_id=$(docker ps -q --filter "name=${container_name}")
    echo "$container_id"
}

function create_docker_network(){
    docker_network_exists $NETWORK_NAME
    local status=$?
    if [ $status != 0 ]; then
      # create the docker network for the php mysql servers
      docker network create $NETWORK_NAME
      echo "Docker network = $NETWORK_NAME created."
    fi
    return 0
}

function build_container(){

    local container_id=$(get_container_id_by_name $APP_CONTAINER_NAME)
    if [ "${container_id}" != '' ]; then
        docker container stop ${container_id}
        docker container rm $container_id
    fi

    # build the image again
    echo building and running the container application... 
    docker build  -t $APP_CONTAINER_NAME --network $NETWORK_NAME .
    docker run -d --name $APP_CONTAINER_NAME --network $NETWORK_NAME -p ${APP_PORT}:80 $APP_CONTAINER_NAME
    
}

function setup_application(){
 create_docker_network
 build_container
 echo "application running : http://localhost:$APP_PORT"
}


setup_application