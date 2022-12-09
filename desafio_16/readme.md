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

<br><hr><br>

## Con NGINX

Terminal

```
pm2 start .\server.js --name='Servidor Cluster' -i 4 -- -- --port 8081
```

Configuración Nginx

```
http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    upstream node_app {
        server 127.0.0.1:8082;
        server 127.0.0.1:8083;
        server 127.0.0.1:8084;
        server 127.0.0.1:8085;
    }

    server {
        listen       8080;
        server_name  127.0.0.1;

        location / {
            root   html;
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```
