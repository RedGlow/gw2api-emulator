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

## Currently implemented endpoints and limitations

Currently the following "container" endpoints have been implemented:

- `/v2/items`
- `/v2/recipes`

Each of them contain only the first 150 elements of the GW2 API as of 16/06/2019.

The allowed ways to call these endpoints are (e.g. for `items`):

- http://localhost:3333/v2/items
- http://localhost:3333/v2/items?page=2
- http://localhost:3333/v2/items?page=4&page_size=3
- http://localhost:3333/v2/items/122

The returned headers are consistent with the GW2 API (especially Link, X-Page-Size, X-Page-Total, X-Result-Count, X-Result-Total).

Errors are not considered.