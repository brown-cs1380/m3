/*

Service  Description                                Methods
status   Status and control of the current node     get, spawn, stop
comm     A message communication interface          send
groups   A mapping from group names to nodes        get, put, add, rem, del
gossip   The receiver part of the gossip protocol   recv
routes   A mapping from names to functions          get, put

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