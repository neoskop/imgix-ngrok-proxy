# Imgix Ngrok Proxy

A transparent [Imgix][1] proxy that signs URLs and routes them through [Ngrok][2].

## Quickstart

```
$ cp docker-compose{.example,}.yml
# Set env vars accordingly
$ docker-compose up -d
$ google-chrome http://localhost:3000/cats.jpg?duotone=3C1E46,FAE664&duotone-alpha=100
```

## Acknowledgements

[Photo](./example/cats) by [Raul Varzar](https://unsplash.com/@calypso999) on [Unsplash](https://unsplash.com/photos/1l2waV8glIQ).

[1]: https://www.imgix.com
[2]: https://ngrok.io
