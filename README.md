## How to deploy

### Locally
- harbor

### At ec2

- Pull the new version 

```bash
docker pull leocwolter/apollo
```

- Stop and remove the running container

```
docker stop apollo
docker rm apollo
```

- Run the container:

```bash
docker run --name apollo -p 8080:4001 -d leocwolter/apollo
```

##Dependencias
- node > v6
- npm
- grunt-cli `npm install grunt-cli -g`

###Rodar o projeto
Instalar dependencias do node: `npm install`

Rodar: `npm start`

Acesse: `http://localhost:4001`
