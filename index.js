#!/usr/bin/env node
console.log("Starting GW2 API emulator server...");

const argv = require("yargs")
  .usage("Usage: $0 [--port PORT]")
  .alias("p", "port")
  .describe("p", "Port to listen to")
  .default("p", "3333")
  .epilog("Runs a GW2 API emulator on given port.").argv;
const express = require("express");
const app = express();
/**
 * @type Array
 */
const data = require("./data.json");

const port = parseInt(argv.port, 10);

/**
 *
 * @param {express.Response} res
 */
const setupRes = res => {
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader(
    "access-control-expose-headers",
    "X-Result-Total,X-Result-Count"
  );
  res.setHeader("cache-control", "public,max-age=3600");
  res.setHeader("x-content-type-options", "nosniff");
  res.setHeader("x-frame-options", "SAMEORIGIN");
  res.setHeader("x-powered-by", "ARR/2.5");
  res.setHeader("x-rate-limit-limit", "600");
  res.setHeader("x-result-count", "56174");
  res.setHeader("x-result-total", "56174");
  res.setHeader("x-xss-protection", "1; mode=block");
};

app.get("/v2/items", (req, res) => {
  setupRes(res);
  if (req.query.page === undefined) {
    res.json(data.map(item => item.id));
  } else {
    const page = parseInt(req.query.page, 10);
    const pageSize = req.query.page_size
      ? parseInt(req.query.page_size, 10)
      : 50;
    const slice = data.slice(page * pageSize, (page + 1) * pageSize);
    res.setHeader("X-Page-Size", pageSize);
    const pageTotal = Math.ceil(data.length / pageSize);
    res.setHeader("X-Page-Total", pageTotal);
    res.setHeader("X-Result-Count", slice.length);
    res.setHeader("X-Result-Total", data.length);
    //link: </v2/items?page=44&page_size=50>; rel=previous, </v2/items?page=46&page_size=50>; rel=next, </v2/items?page=45&page_size=50>; rel=self, </v2/items?page=0&page_size=50>; rel=first, </v2/items?page=1123&page_size=50>; rel=last
    res.setHeader(
      "link",
      (page === 0
        ? ""
        : `</v2/items?page=${page -
            1}&page_size=${pageSize}>; rel=previous, `) +
        (page === pageTotal - 1
          ? ""
          : `</v2/items?page=${page + 1}&page_size=${pageSize}>; rel=next, `) +
        `</v2/items?page=${page}&page_size=${pageSize}>; rel=self, ` +
        `</v2/items?page=0&page_size=${pageSize}>; rel=first, ` +
        `</v2/items?page=${pageTotal - 1}&page_size=${pageSize}>; rel=last`
    );
    res.json(slice);
  }
});

app.get("/v2/items/:id", (req, res) => {
  setupRes(res);
  const id = parseInt(req.params.id, 10);
  res.json(data.filter(item => item.id === id)[0]);
});

app.listen(port, () =>
  console.log(`Server started and listening at http://localhost:${port}`)
);
