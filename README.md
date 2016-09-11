## How to deploy

### Locally
- harbor

### At ec2

- Run the checkout container linked with the mysql instance:

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
