declare module "node-fetch" {
  function nodefetch(url: string, params: any): Promise<any>;
  export = nodefetch;
}
