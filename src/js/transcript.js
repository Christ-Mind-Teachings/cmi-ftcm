/* eslint no-console: off */

import {SourceStore, storeInit} from "common/modules/_util/store";
import search from "common/modules/_search/search";
import {showParagraph} from "common/modules/_util/url";
import auth from "common/modules/_user/netlify";
import fb from "common/modules/_util/facebook";
import {initTranscriptPage} from "common/modules/_page/startup";
import audio from "common/modules/_audio/audio";
//import {setLanguage} from "common/modules/_language/lang";

//teaching specific modules
import {setEnv, loadConfig} from "./modules/_config/config";
import {bookmarkStart} from "./modules/_bookmark/start";
import {searchInit} from "./modules/_search/search";
import toc, {getBookId} from "./modules/_contents/toc";
import about from "./modules/_about/about";

import constants from "./constants";
//import lang from "./lang";

//import {initialize as initVideo} from "common/modules/_video/acq";
//  initVideo();
//import {initialize as initNotes} from "common/modules/_page/notes";
//import { noteInfo } from "./notes";
//  initNotes(noteInfo);
//import contact from "./modules/_forms/contact";
//  contact.initialize("droga-mistrzostwa-kontakt");

$(document).ready(() => {
  const store = new SourceStore(constants);
  storeInit(constants);
  auth.initialize();

  //used only for non-english languages
  //setLanguage(lang);

  initTranscriptPage("pnDisplay");
  fb.initialize();
  about.initialize();

  setEnv(store);

  loadConfig(getBookId()).then((result) => {
    search.initialize(searchInit(store));
    toc.initialize("transcript");
    audio.initialize(store);
    showParagraph();
    bookmarkStart("transcript", store);
  }).catch((error) => {
    console.error(error);
  });
});
