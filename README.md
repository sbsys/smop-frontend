
# SMOP Frontend

## Instructions for *development* & *testing*

- Modify **[.env](./.env)** file with the correct **environment** value (current **backend service** location): **`REACT_APP_ADMIN_API_SERVICE=<host>:<port>`**

- Modify **[src/admin/core/constants/constant.ts](./src/admin/core/constants/constant.ts)** file with the correct **constant** value (**to false**): **`export const offline: boolean = false;`** to perform **HTTP Request** instead of local data

- To **start** the **Docker** image app, execute the command: **`docker compose -f docker-compose-dev.yml up -d`**

- Open the **local** link: **[localhost:3000](http://localhost:3000)**

- To **stop** the **Docker** image app, execute the command: **`docker compose -f docker-compose-dev.yml down`**

> ### If there are any changes in the source code, run the commands to remove the old Docker image and create a new one when the current Docker image is stopped
>
> - To get the current **Docker image name**, execute the command: **`docker images`**
>
> - To **delete** the current **Dokcer image**, execute the commad: **`docker image rm <dokcer-image-name>`**
