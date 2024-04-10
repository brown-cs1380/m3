import id from '../util/id.js';
import nodeConfig, { NodeConfig } from './config.ts';

interface MoreStatus {
  sid: string;
  nid: string;
  counts: number;
}

export const moreStatus: MoreStatus = {
  sid: id.getSID(nodeConfig),
  nid: id.getNID(nodeConfig),
  counts: 0,
};


export function get(configuration: string, callback?: (error: Error | null, result?: any) => void): void {
  callback = callback || function() {};

  if (configuration in this.nodeConfig) {
    callback(null, this.nodeConfig[configuration]);
  } else if (configuration in this.moreStatus) {
    callback(null, this.moreStatus[configuration]);
  } else if (configuration === 'heapTotal') {
    callback(null, Deno.memoryUsage().total);
  } else if (configuration === 'heapUsed') {
    callback(null, Deno.memoryUsage().used);
  } else {
    callback(new Error('Status key not found'));
  }
};





