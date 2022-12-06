# Uso del repositorio

## Sin NGINX

Sin PM2

```
node .\server.js --port <puerto> --mode <fork | cluster>
```

Con PM2

```
pm2 start .\server.js --name='Servidor Fork'
pm2 start .\server.js --name='Servidor Cluster' -i <num procesos>
```

## Con NGINX

```
pm2 start .\server.js --name='Servidor Cluster' -i 4 -- -- --port 8081
```