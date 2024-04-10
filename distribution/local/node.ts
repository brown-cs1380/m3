import * as http from 'http';
import * as url from 'url';

import * as local from '../local/local.ts';
import * as serialization from '../util/serialization.js';
import nodeConfig, { NodeConfig } from './config.ts';

/*
    The start function will be called to start your node.
    It will take a callback as an argument.
    After your node has booted, you should call the callback.
*/


function isValidBody(body: string): Error | undefined {
  if (body.length === 0) {
    return new Error('No body');
  }
  try {
    JSON.parse(body);
  } catch (error) {
    return error;
  }
  return undefined;
}


function start(onStart: (server: http.Server) => void) {
  const server = http.createServer((req, res) => {
    /* Your server will be listening for PUT requests. */

    // Write some code...

    if (req.method !== 'PUT') {
      res.end(serialization.serialize(new Error('Method not allowed!')));
      return;
    }

    /*
      The path of the http request will determine the service to be used.
      The url will have the form: http://node_ip:node_port/service/method
    */


    // Write some code...


    const pathname: string = url.parse(req.url).pathname;
    const [, service, method] = pathname.split('/');

    console.log(`[SERVER] (${nodeConfig.ip}:${nodeConfig.port})
        Request: ${service}:${method}`);


    /*

      A common pattern in handling HTTP requests in Node.js is to have a
      subroutine that collects all the data chunks belonging to the same
      request. These chunks are aggregated into a body variable.

      When the req.on('end') event is emitted, it signifies that all data from
      the request has been received. Typically, this data is in the form of a
      string. To work with this data in a structured format, it is often parsed
      into a JSON object using JSON.parse(body), provided the data is in JSON
      format.

      Our nodes expect data in JSON format.
  */

    // Write some code...


    let chunks: string[] = [];

    req.on('data', (chunk) => {
      chunks.push(chunk);
    });

    req.on('end', () => {
      let body: string = chunks.join('');

      let error;

      if (error = isValidBody(body)) {
        res.end(serialization.serialize(error));
        return;
      }

      body = JSON.parse(body);
      body = serialization.deserialize(body);
      let args = body;


      /* Here, you can handle the service requests. */

      // Write some code...

      local.routes.get(service, (error, service) => {
        if (error) {
          res.end(serialization.serialize(error));
          console.error(error);
          return;
        }

        /*
      Here, we provide a default callback which will be passed to services.
      It will be called by the service with the result of it's call
      then it will serialize the result and send it back to the caller.
        */
        const serviceCallback = (e, v) => {
          res.end(serialization.serialize([e, v]));
        };

        // Write some code...


        console.log(`[SERVER] Args: ${JSON.stringify(args)} 
            ServiceCallback: ${serviceCallback}`);

        service[method](...args, serviceCallback);
      });
    });
  });


  // Write some code...

  /*
    Your server will be listening on the port and ip specified in the config
    You'll be calling the onStart callback when your server has successfully
    started.

    In this milestone, we'll be adding the ability to stop a node
    remotely through the service interface.
  */

  server.listen(nodeConfig.port, nodeConfig.ip, () => {
    console.log(`Server running at http://${nodeConfig.ip}:${nodeConfig.port}/`);
    onStart(server);
  });
};

export default start;
