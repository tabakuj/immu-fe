# Notes
> This application is created using Next.js(typescript no javascript) with [tailwind css](https://tailwindui.com/components) and with [ant design](https://ant.design/components/notification).
> <br/> I have tried to keep this as simple as possible without using too much code and using component from ant design.
> <br/> Its work notting that there are no test created on this application.
---

### 1. How to build the Docker image

For example on the command below we will create an image named "immu-solution-fe".
<br/> The argument "NEXT_PUBLIC_API_URL" is the env variable which is used to connect to the backend api.
<br/> On this case we assume that (on the running computer we will have it at port 8080)
<br/> Its safe to assume that docker is installed on your machine, if not then please install it.

```shell
    #cd path to fe solution
    docker build --build-arg NEXT_PUBLIC_API_URL="http://host.docker.internal:8080" -t  immu-solution-fe .
```

### 2. Run the image

On this step we will run the image build on the previous step.<br>
The application will run on port "3000" so we need to expose this port here i have used port 8081.<br>
If you run this command a container with name "imu-fe" container will be created and running.

```shell
# to remove the container 
#docker rm -f imu-fe
docker run -it -p 8081:3000 --name imu-fe immu-solution-fe
```

> **Note** <br>
> The backend container needs to be running for this to work properly


### 3. Code 

this structure of the code is as follows: <br>
``` 
     Main Folder
        src Folder --> (nextjs folder)
            app Folder --> (nextjs folder)
                components Folder --> (where cusomtom components reside)
                
        models Folder --> (where all the models reside)
        services Folder --> (where the service, link to the api resides)
```


> **Note** <br>
> On the table when you click "view details" i haven't added the call to the backend since it not needed at this moment.<br/>
> If needed, let me know i can add it for sure. <br/>
> Also i have not used pagination since getting total is a little bit tricky on the be side of things.

