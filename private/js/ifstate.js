/*
 * Copyright (c) 2015 Satinderjit Singh
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

var child_process = require('child_process');

/**
 * The **ip link show** command is used to configure links package.
 *
 * @private
 * @category links
 *
 */
var links = module.exports = {
  exec: child_process.exec,
  status: status
};

/**
 * Parses the status for a single links package.
 *
 * @private
 * @static
 * @category links
 * @param {string} block The section of stdout for the interface.
 * @returns {object} The parsed links package status.
 *
 */
function parse_status_block(block) {
  var match;

  // Skip out of the block is invalid
  if (!block) return;

  if ( block.match(/^([^\s]+)/)[1] == 'Device' ) {
    var parsed = {
      interface: 'none'
    };
    return parsed;
  }
  else {
    var parsed = {
      interface: block.match(/:\s+([^\s]+)/)[1].replace(/^(.*?):*$/, '$1')
    };

    if ((match = block.match(/state\s*([^\s]+)/))) {
      parsed.state = match[1];
    }

    return parsed;
  }
}

/**
 * Parses the status for all links package.
 *
 * @private
 * @static
 * @category links
 * @param {function} callback The callback function.
 *
 */
function parse_status(callback) {
  return function(error, stdout, stderr) {
    console.log(stderr);
    if (error) callback(error);
    else callback(error,
      stdout.trim().split('\n').map(parse_status_block).filter(function(i) { return !! i }));
      //console.log(stdout);
  };
}

/**
 * Parses the status for a single links package.
 *
 * @private
 * @static
 * @category links
 * @param {function} callback The callback function.
 *
 */
function parse_status_interface(callback) {
  return function(error, stdout, stderr) {
    if (error) callback(error, parse_status_block(stderr.trim()));
    else callback(error, parse_status_block(stdout.trim()));
  };
}

/**
 * Parses the status for a single links package.
 *
 * @private
 * @static
 * @category links
 * @param {string} [interface] The links package.
 * @param {function} callback The callback function.
 * @example
 *
 * var links = require('./links');
 *
 * links.status(function(err, status) {
 *   console.log(status);
 * });
 *
 * // =>
 * [
 *   {
 *     interface: 'eth0',
 *     state: 'DOWN'
 *   },
 *   {
 *     interface: 'wlan0',
 *     state: 'UP',
 *   }
 * ]
 *
 */
function status(interface, callback) {
  if (callback) {
    return this.exec("ip link show " + interface + " | grep -v 'link'",
      parse_status_interface(callback));  
  }
  else {
    return this.exec("ip link show | grep -v 'link'", parse_status(interface));  
  }
}
