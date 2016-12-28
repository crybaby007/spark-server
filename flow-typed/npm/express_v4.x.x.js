// flow-typed signature: 54f4a1579bf43031e95db3d78777be00
// flow-typed version: aac2114da6/express_v4.x.x/flow_>=v0.25.x

// @flow
import type { Server } from 'http';

declare type express$RouterOptions = {
  caseSensitive?: boolean,
  mergeParams?: boolean,
  strict?: boolean
};

declare class express$RequestResponseBase {
  app: express$Application;
  get(field: string): string | void;
}

declare type $File = {
  buffer: Buffer,
  destination: string,
  encoding: string,
  fieldname: string,
  filename: string,
  mimetype: string,
  originalname: string,
  path: string,
  size: number,
};

declare class express$Request extends http$IncomingMessage mixins express$RequestResponseBase {
  baseUrl: string;
  body: Object;
  cookies: {[cookie: string]: string};
  files: {[key: string]: Array<$File>},
  fresh: boolean;
  hostname: boolean;
  ip: string;
  ips: Array<string>;
  method: string;
  originalUrl: string;
  params: {[param: string]: string};
  path: string;
  protocol: 'https' | 'http';
  query: {[name: string]: string};
  route: string;
  secure: boolean;
  signedCookies: {[signedCookie: string]: string};
  stale: boolean;
  subdomains: Array<string>;
  xhr: boolean;
  accepts(types: string): string | false;
  acceptsCharsets(...charsets: Array<string>): string | false;
  acceptsEncodings(...encoding: Array<string>): string | false;
  acceptsLanguages(...lang: Array<string>): string | false;
  header(field: string): string | void;
  is(type: string): boolean;
  param(name: string, defaultValue?: string): string | void;
}

declare type express$CookieOptions = {
  domain?: string,
  encode?: (value: string) => string,
  expires?: Date,
  httpOnly?: boolean,
  maxAge?: string,
  path?: string,
  secure?: boolean,
  signed?: boolean
};

declare type express$RenderCallback = (err: Error | null, html?: string) => mixed;

declare type express$SendFileOptions = {
  maxAge?: number,
  root?: string,
  lastModified?: boolean,
  headers?: {[name: string]: string},
  dotfiles?: 'allow' | 'deny' | 'ignore'
};

declare class express$Response extends http$ServerResponse mixins express$RequestResponseBase {
  headersSent: boolean;
  locals: {[name: string]: mixed};
  append(field: string, value?: string): this;
  attachment(filename?: string): this;
  cookie(name: string, value: string, options?: express$CookieOptions): this;
  clearCookie(name: string, options?: express$CookieOptions): this;
  download(path: string, filename?: string, callback?: (err?: ?Error) => void): this;
  format(typesObject: {[type: string]: Function}): this;
  json(body?: mixed): this;
  jsonp(body?: mixed): this;
  links(links: {[name: string]: string}): this;
  location(path: string): this;
  redirect(url: string, ...args: Array<void>): this;
  redirect(status: number, url: string, ...args: Array<void>): this;
  render(view: string, locals?: {[name: string]: mixed}, callback?: express$RenderCallback): this;
  send(body?: mixed): this;
  sendFile(path: string, options?: express$SendFileOptions, callback?: (err?: ?Error) => mixed): this;
  sendStatus(statusCode: number): this;
  set(field: string | {[field: string]: ?string}, value?: string): this;
  status(statusCode: number): this;
  type(type: string): this;
  vary(field: string): this;
}

declare type express$NextFunction = (err?: ?Error) => mixed;
declare type express$Middleware =
  (req: express$Request, res: express$Response, next: express$NextFunction) => mixed;
declare interface express$RouteMethodType<T> {
  (middleware: express$Middleware): T;
  (...middleware: Array<express$Middleware>): T;
  (path: string|RegExp|string[], ...middleware: Array<express$Middleware>): T;
}
declare interface express$RouterMethodType<T> {
  (middleware: express$Middleware): T;
  (...middleware: Array<express$Middleware>): T;
  (path: string|RegExp|string[], ...middleware: Array<express$Middleware>): T;
  (path: string, router: express$Router): T;
}
declare class express$Route {
  all: express$RouteMethodType<this>;
  get: express$RouteMethodType<this>;
  post: express$RouteMethodType<this>;
  put: express$RouteMethodType<this>;
  head: express$RouteMethodType<this>;
  delete: express$RouteMethodType<this>;
  options: express$RouteMethodType<this>;
  trace: express$RouteMethodType<this>;
  copy: express$RouteMethodType<this>;
  lock: express$RouteMethodType<this>;
  mkcol: express$RouteMethodType<this>;
  move: express$RouteMethodType<this>;
  purge: express$RouteMethodType<this>;
  propfind: express$RouteMethodType<this>;
  proppatch: express$RouteMethodType<this>;
  unlock: express$RouteMethodType<this>;
  report: express$RouteMethodType<this>;
  mkactivity: express$RouteMethodType<this>;
  checkout: express$RouteMethodType<this>;
  merge: express$RouteMethodType<this>;

  // @TODO Missing 'm-search' but get flow illegal name error.

  notify: express$RouteMethodType<this>;
  subscribe: express$RouteMethodType<this>;
  unsubscribe: express$RouteMethodType<this>;
  patch: express$RouteMethodType<this>;
  search: express$RouteMethodType<this>;
  connect: express$RouteMethodType<this>;
}

declare class express$Router extends express$Route {
  constructor(options?: express$RouterOptions): void;
  use: express$RouterMethodType<this>;
  route(path: string): express$Route;
  static (): express$Router;
}

declare class express$Application extends express$Router mixins events$EventEmitter {
  constructor(): void;
  locals: {[name: string]: mixed};
  mountpath: string;
  listen(port: number, hostname?: string, backlog?: number, callback?: (err?: ?Error) => mixed): Server;
  listen(port: number, hostname?: string, callback?: (err?: ?Error) => mixed): Server;
  listen(port: number, callback?: (err?: ?Error) => mixed): Server;
  listen(path: string, callback?: (err?: ?Error) => mixed): Server;
  listen(handle: Object, callback?: (err?: ?Error) => mixed): Server;
  disable(name: string): void;
  disabled(name: string): boolean;
  enable(name: string): void;
  enabled(name: string): boolean;
  engine(name: string, callback: Function): void;
  /**
   * Mixed will not be taken as a value option. Issue around using the GET http method name and the get for settings.
   */
  //   get(name: string): mixed;
  set(name: string, value: mixed): mixed;
  param(name: string, (req: express$Request, res: express$Response) => void): mixed;
  render(name: string, optionsOrFunction: {[name: string]: mixed}, callback: express$RenderCallback): void;
}

declare module 'express' {
  declare function serveStatic(root: string, options?: Object): express$Middleware;

  declare type RouterOptions = express$RouterOptions;
  declare type CookieOptions = express$CookieOptions;
  declare type File = $File;
  declare type Middleware = express$Middleware;
  declare type NextFunction = express$NextFunction;
  declare type $Response = express$Response;
  declare type $Request = express$Request;
  declare type $Application = express$Application;

  declare module.exports: {
    (): express$Application, // If you try to call like a function, it will use this signature
    static: serveStatic, // `static` property on the function
    Router: typeof express$Router, // `Router` property on the function
  };
}
