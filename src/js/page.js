/* eslint no-console: off */
/* ----- */
import {storeInit} from "www/modules/_util/store";

//common modules
import auth from "www/modules/_user/netlify";
import {initStickyMenu, initAnimation} from "www/modules/_page/startup";
import {initialize as initNotes} from "www/modules/_page/notes";
import {showTOC} from "www/modules/_util/url";
import {setLanguage} from "www/modules/_language/lang";

import fb from "www/modules/_util/facebook";
import {initQuoteDisplay} from "www/modules/_topics/events";

//teaching specific modules
import {bookmarkStart} from "./modules/_bookmark/start";
import search from "./modules/_search/search";
import toc from "./modules/_contents/toc";
import about from "./modules/_about/about";
import { noteInfo } from "./notes";
import constants from "./constants";

import {setRuntimeEnv} from "./setEnv";

$(document).ready(() => {
  storeInit(constants);
  initStickyMenu();
  setLanguage(constants);
  setRuntimeEnv();

  bookmarkStart("page");
  search.initialize(constants.sid);
  auth.initialize();
  toc.initialize("page");
  initNotes(noteInfo);
  about.initialize();

  //support for quote display and sharing
  fb.initialize();
  initQuoteDisplay("#show-quote-button", constants);

  initAnimation();
  showTOC();
});

