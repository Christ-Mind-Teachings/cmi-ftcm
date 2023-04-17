/* eslint no-console: off */

import {SourceStore, storeInit} from "common/modules/_util/store";
import search from "common/modules/_search/search";
import auth from "common/modules/_user/netlify";
import {initStickyMenu, initAnimation} from "common/modules/_page/startup";
import {showSearch, showQuotes, showTOC} from "common/modules/_util/url";
import fb from "common/modules/_util/facebook";
import {initQuoteDisplay} from "common/modules/_topics/events";
//import {setLanguage} from "common/modules/_language/lang";

//teaching specific modules
import {searchInit} from "./modules/_search/search";
import {bookmarkStart} from "./modules/_bookmark/start";
import {setEnv} from "./modules/_config/config";
import toc from "./modules/_contents/toc";
import about from "./modules/_about/about";

import constants from "./constants";
//import lang from "./lang";

//Support for Notes modal
//import {initialize as initNotes} from "common/modules/_page/notes";
//import { noteInfo } from "./notes";
//  initNotes(noteInfo);
//import {setRuntimeEnv} from "./setEnv";

$(document).ready(() => {
  const store = new SourceStore(constants);
  storeInit(constants);
  initStickyMenu();

  //used only for non-english languages
  //setLanguage(lang);

  auth.initialize();
  setEnv(store);

  bookmarkStart("page", store);
  search.initialize(searchInit(store));
  toc.initialize("page");
  about.initialize();

  //support for quote display and sharing
  fb.initialize();
  initQuoteDisplay("#show-quote-button", store);
  initAnimation();

  //if url contains ?tocbook=[ack | book1 | book2] then show TOC on page load
  showTOC();

  //if url contains ?search=y then show search modal on page load
  showSearch();

  //if url contains ?quotes=y then show quotes modal on page load
  showQuotes();
});

