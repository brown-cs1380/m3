/*
Service   Description                            Methods
comm      A message communication interface      send
groups    A mapping from group names to nodes    get,put, add, rem, del
routes    A mapping from names to functions      put
status    Information about the current group    get, stop, spawn
gossip    Status and information dissemination   send, at, del
*/

/* Comm Service */
import * as comm from './comm.ts';

/* Groups Service */
import * as groups from './groups.ts';

/* Routes Service */
import * as routes from './routes.ts';

/* Status Service */
import * as status from './status.ts';

/* Gossip Service */
import * as gossip from './gossip.ts';

// Exporting the modules
export { comm, groups, status, routes, gossip };