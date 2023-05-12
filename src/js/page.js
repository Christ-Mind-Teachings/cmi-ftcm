/* eslint no-console: off */

import {SourceStore, storeInit} from "common/modules/_util/store";
import {initHomePage} from "common/modules/_page/startup";
import search from "common/modules/_search/search";
import {showSearch, showQuotes, showTOC} from "common/modules/_util/url";
import {initQuoteDisplay} from "common/modules/_topics/events";
import toc from "common/modules/_contents/toc";
import {setEnv} from "common/modules/_config/config";

//teaching specific modules
//import toc from "./modules/_contents/toc";
//import {setEnv} from "./modules/_config/config";
import {pageDriver} from "./modules/_util/driver";
import {status} from "./modules/_config/status";

import constants from "./constants";

$(document).ready(() => {
  const store = new SourceStore(constants);
  storeInit(constants);

  setEnv(store, status);

  initHomePage(store, pageDriver);
  search.initialize(store);
  toc.initialize(store, "page");

  //support for quote display and sharing
  initQuoteDisplay("#show-quote-button", store);

  //if url contains ?tocbook=[ack | book1 | book2] then show TOC on page load
  showTOC();

  //if url contains ?search=y then show search modal on page load
  showSearch();

  //if url contains ?quotes=y then show quotes modal on page load
  showQuotes();
});

