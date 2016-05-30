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


var ifconfig = module.exports = {
  exec: child_process.exec,
  status: status
};

/**
 * Parses the status for a single network interface.
 *
 * @private
 * @static
 * @category lshw
 * @returns {object} The parsed network interface status.
 *
 */
function parse_status_block(block) {
  var match;

  var parsed = {
    network: block.match(/logical\s+name:\s+([^\s]+)/)[1]
  };

  if ((match = block.match(/serial:\s*([^\s]+)/))) {
    parsed.serial = match[1].toLowerCase();
  }

  if ((match = block.match(/physical\s+id:\s+([^\s]+)/))) {
    parsed.physicalid = match[1].toLowerCase();
  }

  if ((match = block.match(/description:\s*(.*)/))) {
    parsed.description = match[1];
  }

  if ((match = block.match(/driver=\s*([^\s]+)/))) {
    parsed.driver = match[1];
  }

  if ((match = block.match(/broadcast=\s*([^\s]+)/))) {
    parsed.broadcast = match[1];
  }

  if ((match = block.match(/driverversion=\s*([^\s]+)/))) {
    parsed.driverversion = match[1];
  }

  if ((match = block.match(/firmware=\s*([^\s]+)/))) {
    parsed.firmware = match[1];
  }

  if ((match = block.match(/ip=\s*([^\s]+)/))) {
    parsed.ip = match[1];
  }

  if ((match = block.match(/multicast=\s*([^\s]+)/))) {
    parsed.multicast = match[1];
  }

  if ((match = block.match(/wireless=\s*(.*)/))) {
    parsed.wireless = match[1];
  }

  return parsed;
}

/**
 * Parses the status for all network interfaces.
 *
 * @private
 * @static
 * @category lshw
 * @param {function} callback The callback function.
 *
 */
function parse_status(callback) {
  return function(error, stdout, stderr) {
    if (error) callback(error);
    else callback(error,
      //stdout.trim().split('\n\n').map(parse_status_block));
      stdout.trim().split(/\s\*-/g).map(parse_status_block));
      //console.log(stdout.trim().split(/\s\*-/g))
  };
}

/**
 * The **lshw status** command is used to query the status of all
 * configured interfaces.
 *
 * @static
 * @category lshw
 * @param {function} callback The callback function.
 * @example
 *
 * var lshw = require('./lshw');
 *
 * lshw.status(function(err, status) {
 *   console.log(status);
 * });
 *
 * // =>
 * [
 *   {
 *     "network": "wlan0",
 *     "serial": "b8:27:eb:da:52:ad",
 *     "physicalid": "1",
 *     "description": "Wireless interface",
 *     "driver": "brcmfmac",
 *     "broadcast": "yes",
 *     "driverversion": "7.45.41.23",
 *     "firmware": "01-cc4eda9c",
 *     "ip": "192.168.10.1",
 *     "multicast": "yes",
 *     "wireless": "IEEE 802.11bgn"
 *   },
 *   {
 *     "network": "eth0",
 *     "serial": "00:0b:81:95:12:21",
 *     "physicalid": "2",
 *     "description": "Ethernet interface",
 *     "driver": "smsc95xx",
 *     "broadcast": "yes",
 *     "driverversion": "22-Aug-2005",
 *     "firmware": "smsc95xx",
 *     "ip": "10.0.1.23",
 *     "multicast": "yes"
 *   },
 *   {
 *     "network": "wlan1",
 *     "serial": "80:1f:64:f4:40:g7",
 *     "physicalid": "3",
 *     "description": "Wireless interface",
 *     "driver": "rtl8192cu",
 *     "broadcast": "yes",
 *     "multicast": "yes",
 *     "wireless": "unassociated"
 *   }
 * ]
 *
 */
function status(interface, callback) {
  this.exec('lshw -class network', parse_status(interface));
}
