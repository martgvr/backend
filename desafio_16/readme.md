# Pruebas de profiling

## Node Profiling

```
node --prof server.js
node --prof-process .\isolate-000002BF179CF750-166880-v8.log > node-profiling.txt
```

## Artillery 

```
artillery quick --count 50 --num 20 http://localhost:8080/info > artillery-profiling.txt
```

## Node Inspect

```
node --inspect server.js
artillery quick --count 50 --num 20 http://localhost:8080/info
```

## 0x

```
"scripts": {
    "test": "node ./utils/benchmark.js",
    "start": "0x server.js"
}
```