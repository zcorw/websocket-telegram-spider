declare interface AnimeUpdated {
  type: "updated";
  value: string;
}

declare interface AnimeTorrent {
  type: "torrent";
  value: string;
}

declare type AnimeWorkerMessage = AnimeUpdated | AnimeTorrent;
