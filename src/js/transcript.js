/* eslint no-console: off */

import {SourceStore, storeInit} from "common/modules/_util/store";
import search from "common/modules/_search/search";
import {showParagraph} from "common/modules/_util/url";
import {initTranscriptPage} from "common/modules/_page/startup";
import audio from "common/modules/_audio/audio";
import toc, {getBookId} from "common/modules/_contents/toc";
import {setEnv, loadConfig} from "common/modules/_config/config";

//teaching specific modules
//import {setEnv, loadConfig} from "./modules/_config/config";
//import toc, {getBookId} from "./modules/_contents/toc";

import constants from "./constants";
import {status} from "./modules/_config/status";

$(document).ready(() => {
  const store = new SourceStore(constants);
  storeInit(constants);

  setEnv(store, status);

  loadConfig(getBookId()).then((result) => {
    initTranscriptPage(store);
    search.initialize(store);

    audio.initialize(store);
    toc.initialize(store, "transcript");
    showParagraph();
  }).catch((error) => {
    console.error(error);
  });
});
