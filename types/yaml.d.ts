interface AnimeItem {
  name: string;
  group: string;
  id: string | null;
}

interface AnimeConfig {
  host: string;
  url: string;
  list: AnimeItem[];
}
