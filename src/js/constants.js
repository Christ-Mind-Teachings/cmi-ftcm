/*
  Teaching specific data
*/

const keyInfo = require("common/modules/_config/key");
import {getPageInfo, getConfig} from "common/modules/_config/config";

import {format} from "./modules/_extension/toc";
import si from "./modules/_config/si";

//initialize before use
keyInfo.initializeKey(si);

const env = "integration";
const sid = "ftcm";
const lang = "en";
const title = "From the Christ Mind";
const HOME_URI = `/t/${sid}`;

export default {
  env: env,
  lang: lang,
  sid: sid,
  title: title,
  url_prefix: HOME_URI,
  configUrl: `${HOME_URI}/public/config`,
  sourceId: 18,
  quoteManagerId: "06f94decd3c83f916e11964237207110",
  quoteManagerName: "CMI",
  getPageInfo: getPageInfo,
  getConfig: getConfig,
  keyInfo: keyInfo,
  audio: {
    audioBase: `https://s3.amazonaws.com/assets.christmind.info/${sid}/audio`,
    timingBase: `${HOME_URI}/public/timing`,
    //getReservation: getReservation,
    getAudioInfo: getPageInfo
  },
  extension: {
    toc: format
  },
  store: {
    bmList: "bm.list",
    bmCreation: "bm.creation",
    bmTopics: "bm.topics",
    bmModal: "bm.modal",
    srchResults: "srch.results",
    pnDisplay: "pn.display",
    cfgacq: "cfg.acq",
    cfgbook1: "cfg.book1",
    cfgbook2: "cfg.book2"
  }
};
