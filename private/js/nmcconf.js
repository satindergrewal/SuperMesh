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


var nmcconf = module.exports = {
  exec: child_process.exec,
  status: status
};

/**
 * Parses the status for a single network interface.
 *
 * @private
 * @static
 * @category nmcconf
 * @returns {object} The parsed network interface status.
 *
 */
function parse_status_block(block) {
  var match;

  var parsed = {
    rpcuser: block.match(/rpcuser=([^\s]+)/)[1]
  };

  if ((match = block.match(/rpcpassword=\s*(.*)/))) {
    parsed.rpcpass = match[1];
  }

  if ((match = block.match(/rpcport=\s*(.*)/))) {
    parsed.rpcport = match[1];
  }

  if ((match = block.match(/server=\s*(.*)/))) {
    parsed.server = match[1];
  }

  return parsed;
}

/**
 * Parses the status for all network interfaces.
 *
 * @private
 * @static
 * @category nmcconf
 * @param {function} callback The callback function.
 *
 */
function parse_status(callback) {
  return function(error, stdout, stderr) {
    if (error) callback(error);
    else callback(error,
      stdout.trim().split('\n\n').map(parse_status_block));
      //stdout.trim().split(/\s\*-usb:/g).map(parse_status_block));
      //console.log(stdout.trim().split(/\s\*-usb:/g))
  };
}

/**
 * The **nmcconf status** command is used to query the status of all
 * configured interfaces.
 *
 * @static
 * @category nmcconf
 * @param {function} callback The callback function.
 * @example
 *
 * var nmcconf = require('./nmcconf');
 *
 * nmcconf.status(function(err, status) {
 *   console.log(status);
 * });
 *
 * // =>
 * [
 *  {
 *    "rpcuser": "pi",
 *    "rpcpass": "c892f76fc45365d50cb744ec1d5cdde659c98e0b",
 *    "rpcport": "8336",
 *    "server": "1"
 *  }
 * ]
 *
 */
function status(interface, callback) {
  this.exec('cat /media/usb0/namecoin/namecoin.conf', parse_status(interface));
}
