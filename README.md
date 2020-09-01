# Imgix Ngrok Proxy

A transparent [Imgix][1] proxy that signs URLs and routes them through [Ngrok][2].

## Quickstart

```
$ cp docker-compose{.example,}.yml
# Set env vars accordingly
$ docker-compose up -d
$ google-chrome http://localhost:3000/cats.jpg?duotone=3C1E46,FAE664&duotone-alpha=100
$ google-chrome http://localhost:3000/dogs.jpg?duotone=3C1E46,FAE664&duotone-alpha=100
$ google-chrome http://localhost:3000/inspect/http # Ngrok inspector

```

## Acknowledgements

- [Photo of cats](./example/cats.jpg) by [Raul Varzar](https://unsplash.com/@calypso999) on [Unsplash](https://unsplash.com/photos/1l2waV8glIQ).
- [Photo of dogs](./example/dogs.jpg) by [Alvan Nee](https://unsplash.com/@alvannee) on [Unsplash](https://unsplash.com/photos/T-0EW-SEbsE).

[1]: https://www.imgix.com
[2]: https://ngrok.io
