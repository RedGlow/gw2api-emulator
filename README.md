# GW2 API Emulator

GW2 API emulator is a simple Node.js program that emulates the [GW2 APIs](https://wiki.guildwars2.com/wiki/API:Main).

Its purposes are:

- Allow quick testing of software based on the GW2 API by using an in-memory, locally running server with a very small amount of data
- Allow for integration tests with GW2 API

## Usage

Install the GW2 API Emulator:

```shell
$ npm install gw2api-emulator -g
```

Run it:

```shell
$ gw2api-emulator --port 2837
```

For more information about the supported options and how they work:

```shell
$ gw2api-emulator --help
```
