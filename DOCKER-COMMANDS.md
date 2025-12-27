## Dev

`docker compose up --build`

## Staging

```
docker compose \
  -f compose.yaml \
  -f compose.staging.yaml \
  up -d --build
```

## Prod

```
docker compose \
  -f compose.yaml \
  -f compose.prod.yaml \
  up -d --build
```
