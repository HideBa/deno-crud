# 
## run
```
deno run --allow-env --allow-net  app.ts 
```

without
```
--allow-env
```

you'll get
```
Uncaught PermissionDenied: access to environment variables, run again with the --allow-env flag
```