# Repository usage


## CLI

```
$ denon start

or

$ deno run --allow-net --allow-read --allow-env --import-map=import_map.json server.ts
```

## Endpoints

```
GET
/colors
```

```
POST
/colors

{
    "color": "<color name>"
}
```
