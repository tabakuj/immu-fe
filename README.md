# Notes
> This application is created using Next.js (TypeScript, not JavaScript) combined with Tailwind CSS and Ant Design.
> <br/> I have tried to keep this as simple as possible without using too much code and by using components from Ant Design.
> <br/> It's worth noting that there are no tests created for this application.
---

### 1. How to build the Docker image

For example, in the command below, we will create an image named "immu-solution-fe".
<br/> The argument NEXT_PUBLIC_API_URL is the environment variable used to connect to the backend API.
<br/> In this case, we assume that the backend is running on port 8080 on the host computer.
<br/> It's safe to assume that Docker is installed on your machine; if not, please install it.

```shell
    #cd path to fe solution
    docker build --build-arg NEXT_PUBLIC_API_URL="http://host.docker.internal:8080" -t  immu-solution-fe .
```

### 2. Run the image

In this step, we will run the image built in the previous step.<br>
The application will run on port 3000, so we need to expose this port. Here, I have used port 8081.<br>
If you run this command, a container named "imu-fe" will be created and running.

```shell
# to remove the container 
#docker rm -f imu-fe
docker run -it -p 8081:3000 --name imu-fe immu-solution-fe
```

> **Note** <br>
> The backend container needs to be running for this to work properly.


### 3. Code 

The structure of the code is as follows: <br>
``` 
     Main Folder
        src Folder --> (nextjs folder)
            app Folder --> (nextjs folder)
                components Folder --> (where cusomtom components reside)
                
        models Folder --> (where all the models reside)
        services Folder --> (where the service, link to the api resides)
```


> **Note** <br>
> In the table, when you click "View Details," I haven't added the call to the backend since it is not needed at this moment.<br/>
> Also, I have not used pagination since getting the total is a little bit tricky on the backend side of things. <br/>
> If needed, let me know, and I can add these for sure. <br/>