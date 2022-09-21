
# SMOP Frontend

## Instructions for *development* & *testing*

- Modify **[.env](./.env)** file with the correct **environment** value (current **backend service** location): **`REACT_APP_ADMIN_API_SERVICE=\<host>:\<port>`**

- To **start** the **Docker** image app, execute the command: **`docker compose -f docker-compose-dev.yml up`**

- Open the **local** link: **[localhost:3000](http://localhost:3000)**

- To **stop** the **Docker** image app, execute the command: **`docker compose -f docker-compose-dev.yml down`**

> ### If there are any changes in the source code, run the commands to remove the old Docker image and create a new one when the current Docker image is stopped
>
> - To get the current **Docker image name**, execute the command: **`docker images`**
>
> - To **delete** the current **Dokcer image**, execute the commad: **`docker image rm \<dokcer-image-name>`**
