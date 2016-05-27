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
 * The **dpkg** command is used to configure dpkg package.
 *
 * @private
 * @category dpkg
 *
 */
var dpkg = module.exports = {
  exec: child_process.exec,
  status: status
};

/**
 * Parses the status for a single dpkg package.
 *
 * @private
 * @static
 * @category dpkg
 * @param {string} block The section of stdout for the pkg.
 * @returns {object} The parsed dpkg package status.
 *
 */
function parse_status_block(block) {
  var match;

  // Skip out of the block is invalid
  if (!block) return;

  if ( block.match(/^([^\s]+)/)[1] == 'dpkg-query:' ) {
    var parsed = {
      pkg: 'none'
    };
    return parsed;
  }
  else {
    var parsed = {
      pkg: block.match(/^([^\s]+)/)[1]
    };

    if ((match = block.match(/version:\s*(.*)/))) {
      parsed.version = match[1].toLowerCase();
    }

    return parsed;
  }
}

/**
 * Parses the status for all dpkg package.
 *
 * @private
 * @static
 * @category dpkg
 * @param {function} callback The callback function.
 *
 */
function parse_status(callback) {
  return function(error, stdout, stderr) {
    if (error) callback(error);
    else callback(error,
      stdout.trim().split('\n\n').map(parse_status_block).filter(function(i) { return !! i }));
      //console.log(stdout);
  };
}

/**
 * Parses the status for a single dpkg package.
 *
 * @private
 * @static
 * @category dpkg
 * @param {function} callback The callback function.
 *
 */
function parse_status_pkg(callback) {
  return function(error, stdout, stderr) {
    if (error) callback(error, parse_status_block(stderr.trim()));
    else callback(error, parse_status_block(stdout.trim()));
  };
}

/**
 * Parses the status for a single dpkg package.
 *
 * @private
 * @static
 * @category dpkg
 * @param {string} [pkg] The dpkg package.
 * @param {function} callback The callback function.
 * @example
 *
 * var dpkg = require('./dpkg');
 *
 * dpkg.status(function(err, status) {
 *   console.log(status);
 * });
 *
 * // =>
 * [
 *   {
 *     pkg: 'nodejs',
 *     version: '0.10.25~dfsg2-2ubuntu1'
 *   },
 *   {
 *     pkg: 'accountsservice',
 *     version: '0.6.37-1ubuntu10.1',
 *   }
 * ]
 *
 */
function status(pkg, callback) {
  if (callback) {
    return this.exec("dpkg-query -W -f='${binary:Package} version: ${Version}\n\n' " + pkg,
      parse_status_pkg(callback));  
  }
  else {
    return this.exec("dpkg-query -W -f='${binary:Package} version: ${Version}\n\n' ", parse_status(pkg));  
  }
}
