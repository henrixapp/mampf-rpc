# GRPC for MaMpf

## Ruby command

```
grpc_tools_ruby_protoc --ruby_out=../app/grpc/mampf --grpc_out=../app/grpc/mampf ./mampf.proto 
```

Use `require_relative`!

## Golang command

```sh
protoc -I=.:/usr/local/include --go_out=. --go_opt=paths=source_relative \
    --go-grpc_out=. --go-grpc_opt=paths=source_relative \
    mampf.proto
```