


SuperNET API
===
need to create help/SuperNET.md file

## method: bitcoinrpc

Set the coin  to use for bitcoin RPC calls. this will suffice in single coin environments. That is bitcoinrpc API just sets the coin to use for the bitcoin RPC api


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"bitcoinrpc\",\"setcoin\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/bitcoinrpc?setcoin={string}
```

field | value type | Description
--------- | ------- | -----------
setcoin | string | no help info

ramchain API
===
need to create help/ramchain.md file

## method: verifytx

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"verifytx\",\"txid\":\"{hash}\",\"txbytes\":\"{str}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/verifytx?txid={hash}&txbytes={str}
```

field | value type | Description
--------- | ------- | -----------
txid | hash | no help info
txbytes | str | no help info

## method: getblockhash

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"getblockhash\",\"height\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/getblockhash?height={int}
```

field | value type | Description
--------- | ------- | -----------
height | int | no help info

## method: getblock

Returns information about the block with the given hash


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"getblock\",\"blockhash\":\"{hash}\",\"remoteonly\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/getblock?blockhash={hash}&remoteonly={int}
```

field | value type | Description
--------- | ------- | -----------
blockhash | hash | no help info
remoteonly | int | no help info

## method: getrawtransaction

Returns an object about the given transaction containing


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"getrawtransaction\",\"txid\":\"{hash}\",\"verbose\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/getrawtransaction?txid={hash}&verbose={int}
```

field | value type | Description
--------- | ------- | -----------
txid | hash | no help info
verbose | int | no help info

## method: gettransaction

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"gettransaction\",\"txid\":\"{hash}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/gettransaction?txid={hash}
```

field | value type | Description
--------- | ------- | -----------
txid | hash | no help info

## method: decoderawtransaction

Produces a human-readable JSON object for a raw transaction


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"decoderawtransaction\",\"rawtx\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/decoderawtransaction?rawtx={string}
```

field | value type | Description
--------- | ------- | -----------
rawtx | string | no help info

SuperNET API
===
need to create help/SuperNET.md file

## method: login

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"login\",\"handle\":\"{string}\",\"password\":\"{string}\",\"permanentfile\":\"{string}\",\"passphrase\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/login?handle={string}&password={string}&permanentfile={string}&passphrase={string}
```

field | value type | Description
--------- | ------- | -----------
handle | string | no help info
password | string | no help info
permanentfile | string | no help info
passphrase | string | no help info

## method: logout

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"logout\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/logout
```

field | value type | Description
--------- | ------- | -----------

## method: activehandle

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"activehandle\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/activehandle
```

field | value type | Description
--------- | ------- | -----------

## method: encryptjson

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"encryptjson\",\"password\":\"{string}\",\"permanentfile\":\"{string}\",\"anything\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/encryptjson?password={string}&permanentfile={string}&anything={string}
```

field | value type | Description
--------- | ------- | -----------
password | string | no help info
permanentfile | string | no help info
anything | string | no help info

## method: decryptjson

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"decryptjson\",\"password\":\"{string}\",\"permanentfile\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/decryptjson?password={string}&permanentfile={string}
```

field | value type | Description
--------- | ------- | -----------
password | string | no help info
permanentfile | string | no help info

InstantDEX API
===
need to create help/InstantDEX.md file

## method: orderbook

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"InstantDEX\",\"method\":\"orderbook\",\"exchange\":\"{string}\",\"base\":\"{string}\",\"rel\":\"{string}\",\"depth\":\"{int}\",\"allfields\":\"{int}\",\"ignore\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/InstantDEX/orderbook?exchange={string}&base={string}&rel={string}&depth={int}&allfields={int}&ignore={int}
```

field | value type | Description
--------- | ------- | -----------
exchange | string | no help info
base | string | no help info
rel | string | no help info
depth | int | no help info
allfields | int | no help info
ignore | int | no help info

## method: buy

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"InstantDEX\",\"method\":\"buy\",\"exchange\":\"{string}\",\"base\":\"{string}\",\"rel\":\"{string}\",\"price\":\"{float}\",\"volume\":\"{float}\",\"dotrade\":\"{float}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/InstantDEX/buy?exchange={string}&base={string}&rel={string}&price={float}&volume={float}&dotrade={float}
```

field | value type | Description
--------- | ------- | -----------
exchange | string | no help info
base | string | no help info
rel | string | no help info
price | float | no help info
volume | float | no help info
dotrade | float | no help info

## method: sell

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"InstantDEX\",\"method\":\"sell\",\"exchange\":\"{string}\",\"base\":\"{string}\",\"rel\":\"{string}\",\"price\":\"{float}\",\"volume\":\"{float}\",\"dotrade\":\"{float}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/InstantDEX/sell?exchange={string}&base={string}&rel={string}&price={float}&volume={float}&dotrade={float}
```

field | value type | Description
--------- | ------- | -----------
exchange | string | no help info
base | string | no help info
rel | string | no help info
price | float | no help info
volume | float | no help info
dotrade | float | no help info

## method: withdraw

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"InstantDEX\",\"method\":\"withdraw\",\"exchange\":\"{string}\",\"base\":\"{string}\",\"destaddr\":\"{string}\",\"amount\":\"{float}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/InstantDEX/withdraw?exchange={string}&base={string}&destaddr={string}&amount={float}
```

field | value type | Description
--------- | ------- | -----------
exchange | string | no help info
base | string | no help info
destaddr | string | no help info
amount | float | no help info

## method: apikeypair

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"InstantDEX\",\"method\":\"apikeypair\",\"exchange\":\"{string}\",\"apikey\":\"{string}\",\"apisecret\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/InstantDEX/apikeypair?exchange={string}&apikey={string}&apisecret={string}
```

field | value type | Description
--------- | ------- | -----------
exchange | string | no help info
apikey | string | no help info
apisecret | string | no help info

## method: setuserid

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"InstantDEX\",\"method\":\"setuserid\",\"exchange\":\"{string}\",\"userid\":\"{string}\",\"tradepassword\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/InstantDEX/setuserid?exchange={string}&userid={string}&tradepassword={string}
```

field | value type | Description
--------- | ------- | -----------
exchange | string | no help info
userid | string | no help info
tradepassword | string | no help info

## method: supports

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"InstantDEX\",\"method\":\"supports\",\"exchange\":\"{string}\",\"base\":\"{string}\",\"rel\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/InstantDEX/supports?exchange={string}&base={string}&rel={string}
```

field | value type | Description
--------- | ------- | -----------
exchange | string | no help info
base | string | no help info
rel | string | no help info

## method: balance

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"InstantDEX\",\"method\":\"balance\",\"exchange\":\"{string}\",\"base\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/InstantDEX/balance?exchange={string}&base={string}
```

field | value type | Description
--------- | ------- | -----------
exchange | string | no help info
base | string | no help info

## method: orderstatus

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"InstantDEX\",\"method\":\"orderstatus\",\"exchange\":\"{string}\",\"orderid\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/InstantDEX/orderstatus?exchange={string}&orderid={string}
```

field | value type | Description
--------- | ------- | -----------
exchange | string | no help info
orderid | string | no help info

## method: cancelorder

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"InstantDEX\",\"method\":\"cancelorder\",\"exchange\":\"{string}\",\"orderid\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/InstantDEX/cancelorder?exchange={string}&orderid={string}
```

field | value type | Description
--------- | ------- | -----------
exchange | string | no help info
orderid | string | no help info

## method: openorders

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"InstantDEX\",\"method\":\"openorders\",\"exchange\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/InstantDEX/openorders?exchange={string}
```

field | value type | Description
--------- | ------- | -----------
exchange | string | no help info

## method: tradehistory

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"InstantDEX\",\"method\":\"tradehistory\",\"exchange\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/InstantDEX/tradehistory?exchange={string}
```

field | value type | Description
--------- | ------- | -----------
exchange | string | no help info

## method: pollgap

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"InstantDEX\",\"method\":\"pollgap\",\"exchange\":\"{string}\",\"pollgap\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/InstantDEX/pollgap?exchange={string}&pollgap={int}
```

field | value type | Description
--------- | ------- | -----------
exchange | string | no help info
pollgap | int | no help info

## method: allexchanges

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"InstantDEX\",\"method\":\"allexchanges\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/InstantDEX/allexchanges
```

field | value type | Description
--------- | ------- | -----------

## method: allpairs

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"InstantDEX\",\"method\":\"allpairs\",\"exchange\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/InstantDEX/allpairs?exchange={string}
```

field | value type | Description
--------- | ------- | -----------
exchange | string | no help info

## method: request

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"InstantDEX\",\"method\":\"request\",\"reference\":\"{string}\",\"base\":\"{string}\",\"rel\":\"{string}\",\"volume\":\"{float}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/InstantDEX/request?reference={string}&base={string}&rel={string}&volume={float}
```

field | value type | Description
--------- | ------- | -----------
reference | string | no help info
base | string | no help info
rel | string | no help info
volume | float | no help info

## method: proposal

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"InstantDEX\",\"method\":\"proposal\",\"reference\":\"{string}\",\"message\":\"{string}\",\"basetxid\":\"{hash}\",\"reltxid\":\"{hash}\",\"duration\":\"{int}\",\"flags\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/InstantDEX/proposal?reference={string}&message={string}&basetxid={hash}&reltxid={hash}&duration={int}&flags={int}
```

field | value type | Description
--------- | ------- | -----------
reference | string | no help info
message | string | no help info
basetxid | hash | no help info
reltxid | hash | no help info
duration | int | no help info
flags | int | no help info

## method: accept

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"InstantDEX\",\"method\":\"accept\",\"reference\":\"{string}\",\"message\":\"{string}\",\"basetxid\":\"{hash}\",\"reltxid\":\"{hash}\",\"duration\":\"{int}\",\"flags\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/InstantDEX/accept?reference={string}&message={string}&basetxid={hash}&reltxid={hash}&duration={int}&flags={int}
```

field | value type | Description
--------- | ------- | -----------
reference | string | no help info
message | string | no help info
basetxid | hash | no help info
reltxid | hash | no help info
duration | int | no help info
flags | int | no help info

## method: confirm

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"InstantDEX\",\"method\":\"confirm\",\"reference\":\"{string}\",\"message\":\"{string}\",\"basetxid\":\"{hash}\",\"reltxid\":\"{hash}\",\"baseheight\":\"{int}\",\"relheight\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/InstantDEX/confirm?reference={string}&message={string}&basetxid={hash}&reltxid={hash}&baseheight={int}&relheight={int}
```

field | value type | Description
--------- | ------- | -----------
reference | string | no help info
message | string | no help info
basetxid | hash | no help info
reltxid | hash | no help info
baseheight | int | no help info
relheight | int | no help info

tradebot API
===
need to create help/tradebot.md file

## method: monitor

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"tradebot\",\"method\":\"monitor\",\"exchange\":\"{string}\",\"base\":\"{string}\",\"rel\":\"{string}\",\"commission\":\"{float}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/tradebot/monitor?exchange={string}&base={string}&rel={string}&commission={float}
```

field | value type | Description
--------- | ------- | -----------
exchange | string | no help info
base | string | no help info
rel | string | no help info
commission | float | no help info

## method: monitorall

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"tradebot\",\"method\":\"monitorall\",\"exchange\":\"{string}\",\"commission\":\"{float}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/tradebot/monitorall?exchange={string}&commission={float}
```

field | value type | Description
--------- | ------- | -----------
exchange | string | no help info
commission | float | no help info

## method: unmonitor

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"tradebot\",\"method\":\"unmonitor\",\"exchange\":\"{string}\",\"base\":\"{string}\",\"rel\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/tradebot/unmonitor?exchange={string}&base={string}&rel={string}
```

field | value type | Description
--------- | ------- | -----------
exchange | string | no help info
base | string | no help info
rel | string | no help info

## method: accumulate

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"tradebot\",\"method\":\"accumulate\",\"exchange\":\"{string}\",\"base\":\"{string}\",\"rel\":\"{string}\",\"price\":\"{float}\",\"volume\":\"{float}\",\"duration\":\"{float}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/tradebot/accumulate?exchange={string}&base={string}&rel={string}&price={float}&volume={float}&duration={float}
```

field | value type | Description
--------- | ------- | -----------
exchange | string | no help info
base | string | no help info
rel | string | no help info
price | float | no help info
volume | float | no help info
duration | float | no help info

## method: divest

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"tradebot\",\"method\":\"divest\",\"exchange\":\"{string}\",\"base\":\"{string}\",\"rel\":\"{string}\",\"price\":\"{float}\",\"volume\":\"{float}\",\"duration\":\"{float}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/tradebot/divest?exchange={string}&base={string}&rel={string}&price={float}&volume={float}&duration={float}
```

field | value type | Description
--------- | ------- | -----------
exchange | string | no help info
base | string | no help info
rel | string | no help info
price | float | no help info
volume | float | no help info
duration | float | no help info

## method: activebots

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"tradebot\",\"method\":\"activebots\",\"exchange\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/tradebot/activebots?exchange={string}
```

field | value type | Description
--------- | ------- | -----------
exchange | string | no help info

## method: status

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"tradebot\",\"method\":\"status\",\"exchange\":\"{string}\",\"botid\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/tradebot/status?exchange={string}&botid={string}
```

field | value type | Description
--------- | ------- | -----------
exchange | string | no help info
botid | string | no help info

## method: pause

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"tradebot\",\"method\":\"pause\",\"exchange\":\"{string}\",\"botid\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/tradebot/pause?exchange={string}&botid={string}
```

field | value type | Description
--------- | ------- | -----------
exchange | string | no help info
botid | string | no help info

## method: stop

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"tradebot\",\"method\":\"stop\",\"exchange\":\"{string}\",\"botid\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/tradebot/stop?exchange={string}&botid={string}
```

field | value type | Description
--------- | ------- | -----------
exchange | string | no help info
botid | string | no help info

## method: resume

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"tradebot\",\"method\":\"resume\",\"exchange\":\"{string}\",\"botid\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/tradebot/resume?exchange={string}&botid={string}
```

field | value type | Description
--------- | ------- | -----------
exchange | string | no help info
botid | string | no help info

pangea API
===
need to create help/pangea.md file

## method: call

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"pangea\",\"method\":\"call\",\"tablehash\":\"{hash}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/pangea/call?tablehash={hash}
```

field | value type | Description
--------- | ------- | -----------
tablehash | hash | no help info

## method: raise

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"pangea\",\"method\":\"raise\",\"tablehash\":\"{hash}\",\"numchips\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/pangea/raise?tablehash={hash}&numchips={int}
```

field | value type | Description
--------- | ------- | -----------
tablehash | hash | no help info
numchips | int | no help info

## method: bet

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"pangea\",\"method\":\"bet\",\"tablehash\":\"{hash}\",\"numchips\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/pangea/bet?tablehash={hash}&numchips={int}
```

field | value type | Description
--------- | ------- | -----------
tablehash | hash | no help info
numchips | int | no help info

## method: check

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"pangea\",\"method\":\"check\",\"tablehash\":\"{hash}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/pangea/check?tablehash={hash}
```

field | value type | Description
--------- | ------- | -----------
tablehash | hash | no help info

## method: fold

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"pangea\",\"method\":\"fold\",\"tablehash\":\"{hash}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/pangea/fold?tablehash={hash}
```

field | value type | Description
--------- | ------- | -----------
tablehash | hash | no help info

## method: allin

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"pangea\",\"method\":\"allin\",\"tablehash\":\"{hash}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/pangea/allin?tablehash={hash}
```

field | value type | Description
--------- | ------- | -----------
tablehash | hash | no help info

## method: status

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"pangea\",\"method\":\"status\",\"tablehash\":\"{hash}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/pangea/status?tablehash={hash}
```

field | value type | Description
--------- | ------- | -----------
tablehash | hash | no help info

## method: mode

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"pangea\",\"method\":\"mode\",\"tablehash\":\"{hash}\",\"params\":\"{str}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/pangea/mode?tablehash={hash}&params={str}
```

field | value type | Description
--------- | ------- | -----------
tablehash | hash | no help info
params | str | no help info

## method: history

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"pangea\",\"method\":\"history\",\"tablehash\":\"{hash}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/pangea/history?tablehash={hash}
```

field | value type | Description
--------- | ------- | -----------
tablehash | hash | no help info

## method: handhistory

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"pangea\",\"method\":\"handhistory\",\"tablehash\":\"{hash}\",\"hand\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/pangea/handhistory?tablehash={hash}&hand={int}
```

field | value type | Description
--------- | ------- | -----------
tablehash | hash | no help info
hand | int | no help info

## method: host

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"pangea\",\"method\":\"host\",\"minplayers\":\"{int}\",\"params\":\"{array}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/pangea/host?minplayers={int}&params={array}
```

field | value type | Description
--------- | ------- | -----------
minplayers | int | no help info
params | array | no help info

## method: lobby

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"pangea\",\"method\":\"lobby\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/pangea/lobby
```

field | value type | Description
--------- | ------- | -----------

## method: join

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"pangea\",\"method\":\"join\",\"tablehash\":\"{hash}\",\"handle\":\"{str}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/pangea/join?tablehash={hash}&handle={str}
```

field | value type | Description
--------- | ------- | -----------
tablehash | hash | no help info
handle | str | no help info

## method: buyin

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"pangea\",\"method\":\"buyin\",\"tablehash\":\"{hash}\",\"numchips\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/pangea/buyin?tablehash={hash}&numchips={int}
```

field | value type | Description
--------- | ------- | -----------
tablehash | hash | no help info
numchips | int | no help info

## method: start

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"pangea\",\"method\":\"start\",\"tablehash\":\"{hash}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/pangea/start?tablehash={hash}
```

field | value type | Description
--------- | ------- | -----------
tablehash | hash | no help info

SuperNET API
===
need to create help/SuperNET.md file

## method: help

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"help\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/help
```

field | value type | Description
--------- | ------- | -----------

## method: utime2utc

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"utime2utc\",\"utime\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/utime2utc?utime={string}
```

field | value type | Description
--------- | ------- | -----------
utime | string | no help info

## method: utc2utime

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"utc2utime\",\"utc\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/utc2utime?utc={int}
```

field | value type | Description
--------- | ------- | -----------
utc | int | no help info

## method: html

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"html\",\"agentform\":\"{string}\",\"htmlfile\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/html?agentform={string}&htmlfile={string}
```

field | value type | Description
--------- | ------- | -----------
agentform | string | no help info
htmlfile | string | no help info

## method: DHT

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"DHT\",\"hexmsg\":\"{string}\",\"destip\":\"{string}\",\"categoryhash\":\"{hash}\",\"subhash\":\"{hash}\",\"maxdelay\":\"{int}\",\"broadcast\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/DHT?hexmsg={string}&destip={string}&categoryhash={hash}&subhash={hash}&maxdelay={int}&broadcast={int}
```

field | value type | Description
--------- | ------- | -----------
hexmsg | string | no help info
destip | string | no help info
categoryhash | hash | no help info
subhash | hash | no help info
maxdelay | int | no help info
broadcast | int | no help info

## method: rosetta

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"rosetta\",\"passphrase\":\"{string}\",\"pin\":\"{string}\",\"showprivkey\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/rosetta?passphrase={string}&pin={string}&showprivkey={string}
```

field | value type | Description
--------- | ------- | -----------
passphrase | string | no help info
pin | string | no help info
showprivkey | string | no help info

## method: keypair

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"keypair\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/keypair
```

field | value type | Description
--------- | ------- | -----------

## method: priv2pub

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"priv2pub\",\"privkey\":\"{hash}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/priv2pub?privkey={hash}
```

field | value type | Description
--------- | ------- | -----------
privkey | hash | no help info

## method: wif2priv

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"wif2priv\",\"wif\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/wif2priv?wif={string}
```

field | value type | Description
--------- | ------- | -----------
wif | string | no help info

## method: cipher

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"cipher\",\"privkey\":\"{hash}\",\"destpubkey\":\"{hash}\",\"message\":\"{str}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/cipher?privkey={hash}&destpubkey={hash}&message={str}
```

field | value type | Description
--------- | ------- | -----------
privkey | hash | no help info
destpubkey | hash | no help info
message | str | no help info

## method: decipher

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"decipher\",\"privkey\":\"{hash}\",\"srcpubkey\":\"{hash}\",\"cipherstr\":\"{str}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/decipher?privkey={hash}&srcpubkey={hash}&cipherstr={str}
```

field | value type | Description
--------- | ------- | -----------
privkey | hash | no help info
srcpubkey | hash | no help info
cipherstr | str | no help info

## method: broadcastcipher

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"broadcastcipher\",\"message\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/broadcastcipher?message={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info

## method: broadcastdecipher

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"broadcastdecipher\",\"message\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/broadcastdecipher?message={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info

## method: multicastcipher

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"multicastcipher\",\"pubkey\":\"{hash}\",\"message\":\"{str}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/multicastcipher?pubkey={hash}&message={str}
```

field | value type | Description
--------- | ------- | -----------
pubkey | hash | no help info
message | str | no help info

## method: multicastdecipher

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"multicastdecipher\",\"privkey\":\"{hash}\",\"cipherstr\":\"{str}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/multicastdecipher?privkey={hash}&cipherstr={str}
```

field | value type | Description
--------- | ------- | -----------
privkey | hash | no help info
cipherstr | str | no help info

## method: subscribe

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"subscribe\",\"category\":\"{string}\",\"subcategory\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/subscribe?category={string}&subcategory={string}
```

field | value type | Description
--------- | ------- | -----------
category | string | no help info
subcategory | string | no help info

## method: gethexmsg

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"gethexmsg\",\"category\":\"{string}\",\"subcategory\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/gethexmsg?category={string}&subcategory={string}
```

field | value type | Description
--------- | ------- | -----------
category | string | no help info
subcategory | string | no help info

## method: posthexmsg

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"posthexmsg\",\"category\":\"{string}\",\"subcategory\":\"{string}\",\"hexmsg\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/posthexmsg?category={string}&subcategory={string}&hexmsg={string}
```

field | value type | Description
--------- | ------- | -----------
category | string | no help info
subcategory | string | no help info
hexmsg | string | no help info

## method: announce

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"announce\",\"category\":\"{string}\",\"subcategory\":\"{string}\",\"message\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/announce?category={string}&subcategory={string}&message={string}
```

field | value type | Description
--------- | ------- | -----------
category | string | no help info
subcategory | string | no help info
message | string | no help info

## method: survey

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"survey\",\"category\":\"{string}\",\"subcategory\":\"{string}\",\"message\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/survey?category={string}&subcategory={string}&message={string}
```

field | value type | Description
--------- | ------- | -----------
category | string | no help info
subcategory | string | no help info
message | string | no help info

## method: categoryhashes

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"categoryhashes\",\"category\":\"{string}\",\"subcategory\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/categoryhashes?category={string}&subcategory={string}
```

field | value type | Description
--------- | ------- | -----------
category | string | no help info
subcategory | string | no help info

mouse API
===
need to create help/mouse.md file

## method: image

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"mouse\",\"method\":\"image\",\"name\":\"{string}\",\"x\":\"{int}\",\"y\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/mouse/image?name={string}&x={int}&y={int}
```

field | value type | Description
--------- | ------- | -----------
name | string | no help info
x | int | no help info
y | int | no help info

## method: change

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"mouse\",\"method\":\"change\",\"name\":\"{string}\",\"x\":\"{int}\",\"y\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/mouse/change?name={string}&x={int}&y={int}
```

field | value type | Description
--------- | ------- | -----------
name | string | no help info
x | int | no help info
y | int | no help info

## method: click

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"mouse\",\"method\":\"click\",\"name\":\"{string}\",\"x\":\"{int}\",\"y\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/mouse/click?name={string}&x={int}&y={int}
```

field | value type | Description
--------- | ------- | -----------
name | string | no help info
x | int | no help info
y | int | no help info

## method: close

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"mouse\",\"method\":\"close\",\"name\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/mouse/close?name={string}
```

field | value type | Description
--------- | ------- | -----------
name | string | no help info

## method: leave

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"mouse\",\"method\":\"leave\",\"name\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/mouse/leave?name={string}
```

field | value type | Description
--------- | ------- | -----------
name | string | no help info

keyboard API
===
need to create help/keyboard.md file

## method: key

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"keyboard\",\"method\":\"key\",\"name\":\"{string}\",\"c\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/keyboard/key?name={string}&c={int}
```

field | value type | Description
--------- | ------- | -----------
name | string | no help info
c | int | no help info

SuperNET API
===
need to create help/SuperNET.md file

## method: getpeers

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"getpeers\",\"activecoin\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/getpeers?activecoin={string}
```

field | value type | Description
--------- | ------- | -----------
activecoin | string | no help info

## method: mypeers

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"mypeers\",\"supernet\":\"{array}\",\"rawpeers\":\"{array}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/mypeers?supernet={array}&rawpeers={array}
```

field | value type | Description
--------- | ------- | -----------
supernet | array | no help info
rawpeers | array | no help info

## method: stop

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"stop\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/stop
```

field | value type | Description
--------- | ------- | -----------

## method: saveconf

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"saveconf\",\"wallethash\":\"{hash}\",\"confjsonstr\":\"{str}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/saveconf?wallethash={hash}&confjsonstr={str}
```

field | value type | Description
--------- | ------- | -----------
wallethash | hash | no help info
confjsonstr | str | no help info

## method: layer

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"SuperNET\",\"method\":\"layer\",\"mypriv\":\"{hash}\",\"otherpubs\":\"{array}\",\"str\":\"{str}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/SuperNET/layer?mypriv={hash}&otherpubs={array}&str={str}
```

field | value type | Description
--------- | ------- | -----------
mypriv | hash | no help info
otherpubs | array | no help info
str | str | no help info

iguana API
===
need to create help/iguana.md file

## method: peers

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"iguana\",\"method\":\"peers\",\"activecoin\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/iguana/peers?activecoin={string}
```

field | value type | Description
--------- | ------- | -----------
activecoin | string | no help info

## method: maxpeers

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"iguana\",\"method\":\"maxpeers\",\"activecoin\":\"{string}\",\"max\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/iguana/maxpeers?activecoin={string}&max={int}
```

field | value type | Description
--------- | ------- | -----------
activecoin | string | no help info
max | int | no help info

## method: getconnectioncount

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"iguana\",\"method\":\"getconnectioncount\",\"activecoin\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/iguana/getconnectioncount?activecoin={string}
```

field | value type | Description
--------- | ------- | -----------
activecoin | string | no help info

## method: addcoin

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"iguana\",\"method\":\"addcoin\",\"newcoin\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/iguana/addcoin?newcoin={string}
```

field | value type | Description
--------- | ------- | -----------
newcoin | string | no help info

## method: startcoin

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"iguana\",\"method\":\"startcoin\",\"activecoin\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/iguana/startcoin?activecoin={string}
```

field | value type | Description
--------- | ------- | -----------
activecoin | string | no help info

## method: pausecoin

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"iguana\",\"method\":\"pausecoin\",\"activecoin\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/iguana/pausecoin?activecoin={string}
```

field | value type | Description
--------- | ------- | -----------
activecoin | string | no help info

## method: addnode

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"iguana\",\"method\":\"addnode\",\"activecoin\":\"{string}\",\"ipaddr\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/iguana/addnode?activecoin={string}&ipaddr={string}
```

field | value type | Description
--------- | ------- | -----------
activecoin | string | no help info
ipaddr | string | no help info

## method: persistent

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"iguana\",\"method\":\"persistent\",\"activecoin\":\"{string}\",\"ipaddr\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/iguana/persistent?activecoin={string}&ipaddr={string}
```

field | value type | Description
--------- | ------- | -----------
activecoin | string | no help info
ipaddr | string | no help info

## method: removenode

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"iguana\",\"method\":\"removenode\",\"activecoin\":\"{string}\",\"ipaddr\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/iguana/removenode?activecoin={string}&ipaddr={string}
```

field | value type | Description
--------- | ------- | -----------
activecoin | string | no help info
ipaddr | string | no help info

## method: oneshot

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"iguana\",\"method\":\"oneshot\",\"activecoin\":\"{string}\",\"ipaddr\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/iguana/oneshot?activecoin={string}&ipaddr={string}
```

field | value type | Description
--------- | ------- | -----------
activecoin | string | no help info
ipaddr | string | no help info

## method: nodestatus

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"iguana\",\"method\":\"nodestatus\",\"activecoin\":\"{string}\",\"ipaddr\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/iguana/nodestatus?activecoin={string}&ipaddr={string}
```

field | value type | Description
--------- | ------- | -----------
activecoin | string | no help info
ipaddr | string | no help info

ramchain API
===
need to create help/ramchain.md file

## method: getinfo

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"getinfo\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/getinfo
```

field | value type | Description
--------- | ------- | -----------

## method: getbestblockhash

Returns raw transaction representation for given transaction id


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"getbestblockhash\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/getbestblockhash
```

field | value type | Description
--------- | ------- | -----------

## method: getblockcount

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"getblockcount\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/getblockcount
```

field | value type | Description
--------- | ------- | -----------

## method: listaddressgroupings

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"listaddressgroupings\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/listaddressgroupings
```

field | value type | Description
--------- | ------- | -----------

## method: walletlock

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"walletlock\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/walletlock
```

field | value type | Description
--------- | ------- | -----------

## method: checkwallet

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"checkwallet\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/checkwallet
```

field | value type | Description
--------- | ------- | -----------

## method: repairwallet

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"repairwallet\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/repairwallet
```

field | value type | Description
--------- | ------- | -----------

## method: makekeypair

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"makekeypair\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/makekeypair
```

field | value type | Description
--------- | ------- | -----------

## method: gettxoutsetinfo

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"gettxoutsetinfo\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/gettxoutsetinfo
```

field | value type | Description
--------- | ------- | -----------

## method: listlockunspent

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"listlockunspent\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/listlockunspent
```

field | value type | Description
--------- | ------- | -----------

## method: getrawchangeaddress

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"getrawchangeaddress\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/getrawchangeaddress
```

field | value type | Description
--------- | ------- | -----------

## method: listaccounts

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"listaccounts\",\"minconf\":\"{int}\",\"includewatchonly\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/listaccounts?minconf={int}&includewatchonly={int}
```

field | value type | Description
--------- | ------- | -----------
minconf | int | no help info
includewatchonly | int | no help info

## method: listreceivedbyaddress

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"listreceivedbyaddress\",\"minconf\":\"{int}\",\"includeempty\":\"{int}\",\"flag\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/listreceivedbyaddress?minconf={int}&includeempty={int}&flag={int}
```

field | value type | Description
--------- | ------- | -----------
minconf | int | no help info
includeempty | int | no help info
flag | int | no help info

## method: listunspent

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"listunspent\",\"minconf\":\"{int}\",\"maxconf\":\"{int}\",\"array\":\"{array}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/listunspent?minconf={int}&maxconf={int}&array={array}
```

field | value type | Description
--------- | ------- | -----------
minconf | int | no help info
maxconf | int | no help info
array | array | no help info

## method: dumpwallet

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"dumpwallet\",\"filename\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/dumpwallet?filename={string}
```

field | value type | Description
--------- | ------- | -----------
filename | string | no help info

## method: backupwallet

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"backupwallet\",\"filename\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/backupwallet?filename={string}
```

field | value type | Description
--------- | ------- | -----------
filename | string | no help info

## method: encryptwallet

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"encryptwallet\",\"passphrase\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/encryptwallet?passphrase={string}
```

field | value type | Description
--------- | ------- | -----------
passphrase | string | no help info

## method: validatepubkey

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"validatepubkey\",\"pubkey\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/validatepubkey?pubkey={string}
```

field | value type | Description
--------- | ------- | -----------
pubkey | string | no help info

## method: getnewaddress

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"getnewaddress\",\"account\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/getnewaddress?account={string}
```

field | value type | Description
--------- | ------- | -----------
account | string | no help info

## method: vanitygen

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"vanitygen\",\"vanity\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/vanitygen?vanity={string}
```

field | value type | Description
--------- | ------- | -----------
vanity | string | no help info

## method: getaddressesbyaccount

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"getaddressesbyaccount\",\"account\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/getaddressesbyaccount?account={string}
```

field | value type | Description
--------- | ------- | -----------
account | string | no help info

## method: getaccount

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"getaccount\",\"address\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/getaccount?address={string}
```

field | value type | Description
--------- | ------- | -----------
address | string | no help info

## method: getaccountaddress

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"getaccountaddress\",\"account\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/getaccountaddress?account={string}
```

field | value type | Description
--------- | ------- | -----------
account | string | no help info

## method: dumpprivkey

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"dumpprivkey\",\"address\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/dumpprivkey?address={string}
```

field | value type | Description
--------- | ------- | -----------
address | string | no help info

## method: importwallet

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"importwallet\",\"filename\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/importwallet?filename={string}
```

field | value type | Description
--------- | ------- | -----------
filename | string | no help info

## method: decodescript

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"decodescript\",\"script\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/decodescript?script={string}
```

field | value type | Description
--------- | ------- | -----------
script | string | no help info

## method: setaccount

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"setaccount\",\"address\":\"{string}\",\"account\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/setaccount?address={string}&account={string}
```

field | value type | Description
--------- | ------- | -----------
address | string | no help info
account | string | no help info

## method: walletpassphrasechange

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"walletpassphrasechange\",\"oldpassphrase\":\"{string}\",\"newpassphrase\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/walletpassphrasechange?oldpassphrase={string}&newpassphrase={string}
```

field | value type | Description
--------- | ------- | -----------
oldpassphrase | string | no help info
newpassphrase | string | no help info

## method: signmessage

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"signmessage\",\"address\":\"{string}\",\"message\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/signmessage?address={string}&message={string}
```

field | value type | Description
--------- | ------- | -----------
address | string | no help info
message | string | no help info

## method: verifymessage

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"verifymessage\",\"address\":\"{string}\",\"sig\":\"{string}\",\"message\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/verifymessage?address={string}&sig={string}&message={string}
```

field | value type | Description
--------- | ------- | -----------
address | string | no help info
sig | string | no help info
message | string | no help info

## method: listreceivedbyaccount

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"listreceivedbyaccount\",\"confirmations\":\"{int}\",\"includeempty\":\"{int}\",\"watchonly\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/listreceivedbyaccount?confirmations={int}&includeempty={int}&watchonly={int}
```

field | value type | Description
--------- | ------- | -----------
confirmations | int | no help info
includeempty | int | no help info
watchonly | int | no help info

## method: getbalance

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"getbalance\",\"confirmations\":\"{int}\",\"includeempty\":\"{int}\",\"watchonly\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/getbalance?confirmations={int}&includeempty={int}&watchonly={int}
```

field | value type | Description
--------- | ------- | -----------
confirmations | int | no help info
includeempty | int | no help info
watchonly | int | no help info

## method: importprivkey

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"importprivkey\",\"wif\":\"{string}\",\"account\":\"{string}\",\"rescan\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/importprivkey?wif={string}&account={string}&rescan={int}
```

field | value type | Description
--------- | ------- | -----------
wif | string | no help info
account | string | no help info
rescan | int | no help info

## method: getreceivedbyaccount

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"getreceivedbyaccount\",\"account\":\"{string}\",\"includeempty\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/getreceivedbyaccount?account={string}&includeempty={int}
```

field | value type | Description
--------- | ------- | -----------
account | string | no help info
includeempty | int | no help info

## method: walletpassphrase

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"walletpassphrase\",\"passphrase\":\"{string}\",\"timeout\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/walletpassphrase?passphrase={string}&timeout={int}
```

field | value type | Description
--------- | ------- | -----------
passphrase | string | no help info
timeout | int | no help info

## method: getreceivedbyaddress

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"getreceivedbyaddress\",\"address\":\"{string}\",\"minconf\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/getreceivedbyaddress?address={string}&minconf={int}
```

field | value type | Description
--------- | ------- | -----------
address | string | no help info
minconf | int | no help info

## method: sendrawtransaction

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"sendrawtransaction\",\"rawtx\":\"{string}\",\"allowhighfees\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/sendrawtransaction?rawtx={string}&allowhighfees={int}
```

field | value type | Description
--------- | ------- | -----------
rawtx | string | no help info
allowhighfees | int | no help info

## method: listsinceblock

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"listsinceblock\",\"blockhash\":\"{hash}\",\"target\":\"{int}\",\"flag\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/listsinceblock?blockhash={hash}&target={int}&flag={int}
```

field | value type | Description
--------- | ------- | -----------
blockhash | hash | no help info
target | int | no help info
flag | int | no help info

## method: listtransactions

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"listtransactions\",\"account\":\"{string}\",\"count\":\"{int}\",\"skip\":\"{int}\",\"includewatchonly\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/listtransactions?account={string}&count={int}&skip={int}&includewatchonly={int}
```

field | value type | Description
--------- | ------- | -----------
account | string | no help info
count | int | no help info
skip | int | no help info
includewatchonly | int | no help info

## method: gettxout

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"gettxout\",\"txid\":\"{hash}\",\"vout\":\"{int}\",\"mempool\":\"{int}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/gettxout?txid={hash}&vout={int}&mempool={int}
```

field | value type | Description
--------- | ------- | -----------
txid | hash | no help info
vout | int | no help info
mempool | int | no help info

## method: settxfee

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"settxfee\",\"amount\":\"{float}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/settxfee?amount={float}
```

field | value type | Description
--------- | ------- | -----------
amount | float | no help info

## method: lockunspent

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"lockunspent\",\"flag\":\"{int}\",\"array\":\"{array}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/lockunspent?flag={int}&array={array}
```

field | value type | Description
--------- | ------- | -----------
flag | int | no help info
array | array | no help info

## method: createmultisig

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"createmultisig\",\"M\":\"{int}\",\"array\":\"{array}\",\"account\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/createmultisig?M={int}&array={array}&account={string}
```

field | value type | Description
--------- | ------- | -----------
M | int | no help info
array | array | no help info
account | string | no help info

## method: createrawtransaction

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"createrawtransaction\",\"vins\":\"{array}\",\"vouts\":\"{array}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/createrawtransaction?vins={array}&vouts={array}
```

field | value type | Description
--------- | ------- | -----------
vins | array | no help info
vouts | array | no help info

## method: signrawtransaction

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"signrawtransaction\",\"rawtx\":\"{string}\",\"vins\":\"{array}\",\"privkeys\":\"{array}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/signrawtransaction?rawtx={string}&vins={array}&privkeys={array}
```

field | value type | Description
--------- | ------- | -----------
rawtx | string | no help info
vins | array | no help info
privkeys | array | no help info

## method: move

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"move\",\"fromaccount\":\"{string}\",\"toaccount\":\"{string}\",\"amount\":\"{float}\",\"minconf\":\"{int}\",\"comment\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/move?fromaccount={string}&toaccount={string}&amount={float}&minconf={int}&comment={string}
```

field | value type | Description
--------- | ------- | -----------
fromaccount | string | no help info
toaccount | string | no help info
amount | float | no help info
minconf | int | no help info
comment | string | no help info

## method: sendfrom

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"sendfrom\",\"fromaccount\":\"{string}\",\"toaddress\":\"{string}\",\"amount\":\"{float}\",\"minconf\":\"{int}\",\"comment\":\"{string}\",\"comment2\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/sendfrom?fromaccount={string}&toaddress={string}&amount={float}&minconf={int}&comment={string}&comment2={string}
```

field | value type | Description
--------- | ------- | -----------
fromaccount | string | no help info
toaddress | string | no help info
amount | float | no help info
minconf | int | no help info
comment | string | no help info
comment2 | string | no help info

## method: sendmany

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"sendmany\",\"fromaccount\":\"{string}\",\"array\":\"{array}\",\"minconf\":\"{int}\",\"comment\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/sendmany?fromaccount={string}&array={array}&minconf={int}&comment={string}
```

field | value type | Description
--------- | ------- | -----------
fromaccount | string | no help info
array | array | no help info
minconf | int | no help info
comment | string | no help info

## method: sendtoaddress

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"ramchain\",\"method\":\"sendtoaddress\",\"address\":\"{string}\",\"amount\":\"{float}\",\"comment\":\"{string}\",\"comment2\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/ramchain/sendtoaddress?address={string}&amount={float}&comment={string}&comment2={string}
```

field | value type | Description
--------- | ------- | -----------
address | string | no help info
amount | float | no help info
comment | string | no help info
comment2 | string | no help info

hash API
===
need to create help/hash.md file

## method: hex

This API call is used to convert any input string to hexadecimal value. Converting a string to hexadecimal provides a single long alphanumerical string.

The example shows if we convert a small example of HTML code to hexadecimal using API call what it would look like:

> Example string (HTML Code):

```text
<html><head><title>Home Page</title></head><body><h1>Hello World</h1><p>This is test.</p></body></html>
```

> HTTP API call example for converting to hexadecimal:

```text
http://127.0.0.1:7778/api/hash/hex?message=<html><head><title>Home+Page</title></head><body><h1>Hello+World</h1><p>This+is+test.</p></body></html>
```

> End result:

```text
{
  "result": "hash calculated",
  "message": "<html><head><title>Home Page</title></head><body><h1>Hello World</h1><p>This is test.</p></body></html>",
  "hex": "3c68746d6c3e3c686561643e3c7469746c653e486f6d6520506167653c2f7469746c653e3c2f686561643e3c626f64793e3c68313e48656c6c6f20576f726c643c2f68313e3c703e5468697320697320746573742e3c2f703e3c2f626f64793e3c2f68746d6c3e00",
  "tag": "7729339918800585698"
}
```



> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hash\",\"method\":\"hex\",\"message\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hash/hex?message={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info

## method: unhex

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hash\",\"method\":\"unhex\",\"hexmsg\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hash/unhex?hexmsg={string}
```

field | value type | Description
--------- | ------- | -----------
hexmsg | string | no help info

## method: curve25519_pair

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hash\",\"method\":\"curve25519_pair\",\"element\":\"{hash}\",\"scalar\":\"{hash}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hash/curve25519_pair?element={hash}&scalar={hash}
```

field | value type | Description
--------- | ------- | -----------
element | hash | no help info
scalar | hash | no help info

## method: NXT

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hash\",\"method\":\"NXT\",\"passphrase\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hash/NXT?passphrase={string}
```

field | value type | Description
--------- | ------- | -----------
passphrase | string | no help info

## method: curve25519

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hash\",\"method\":\"curve25519\",\"pubkey\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hash/curve25519?pubkey={string}
```

field | value type | Description
--------- | ------- | -----------
pubkey | string | no help info

## method: crc32

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hash\",\"method\":\"crc32\",\"message\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hash/crc32?message={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info

## method: base64_encode

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hash\",\"method\":\"base64_encode\",\"message\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hash/base64_encode?message={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info

## method: base64_decode

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hash\",\"method\":\"base64_decode\",\"message\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hash/base64_decode?message={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info

## method: rmd160_sha256

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hash\",\"method\":\"rmd160_sha256\",\"message\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hash/rmd160_sha256?message={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info

## method: sha256_sha256

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hash\",\"method\":\"sha256_sha256\",\"message\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hash/sha256_sha256?message={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info

## method: sha224

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hash\",\"method\":\"sha224\",\"message\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hash/sha224?message={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info

## method: sha256

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hash\",\"method\":\"sha256\",\"message\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hash/sha256?message={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info

## method: sha384

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hash\",\"method\":\"sha384\",\"message\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hash/sha384?message={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info

## method: sha512

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hash\",\"method\":\"sha512\",\"message\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hash/sha512?message={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info

## method: rmd128

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hash\",\"method\":\"rmd128\",\"message\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hash/rmd128?message={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info

## method: rmd160

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hash\",\"method\":\"rmd160\",\"message\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hash/rmd160?message={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info

## method: rmd256

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hash\",\"method\":\"rmd256\",\"message\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hash/rmd256?message={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info

## method: rmd320

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hash\",\"method\":\"rmd320\",\"message\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hash/rmd320?message={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info

## method: sha1

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hash\",\"method\":\"sha1\",\"message\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hash/sha1?message={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info

## method: md2

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hash\",\"method\":\"md2\",\"message\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hash/md2?message={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info

## method: md4

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hash\",\"method\":\"md4\",\"message\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hash/md4?message={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info

## method: md5

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hash\",\"method\":\"md5\",\"message\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hash/md5?message={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info

## method: tiger192_3

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hash\",\"method\":\"tiger192_3\",\"message\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hash/tiger192_3?message={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info

## method: whirlpool

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hash\",\"method\":\"whirlpool\",\"message\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hash/whirlpool?message={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info

hmac API
===
need to create help/hmac.md file

## method: sha224

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hmac\",\"method\":\"sha224\",\"message\":\"{string}\",\"passphrase\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hmac/sha224?message={string}&passphrase={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info
passphrase | string | no help info

## method: sha256

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hmac\",\"method\":\"sha256\",\"message\":\"{string}\",\"passphrase\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hmac/sha256?message={string}&passphrase={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info
passphrase | string | no help info

## method: sha384

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hmac\",\"method\":\"sha384\",\"message\":\"{string}\",\"passphrase\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hmac/sha384?message={string}&passphrase={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info
passphrase | string | no help info

## method: sha512

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hmac\",\"method\":\"sha512\",\"message\":\"{string}\",\"passphrase\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hmac/sha512?message={string}&passphrase={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info
passphrase | string | no help info

## method: rmd128

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hmac\",\"method\":\"rmd128\",\"message\":\"{string}\",\"passphrase\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hmac/rmd128?message={string}&passphrase={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info
passphrase | string | no help info

## method: rmd160

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hmac\",\"method\":\"rmd160\",\"message\":\"{string}\",\"passphrase\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hmac/rmd160?message={string}&passphrase={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info
passphrase | string | no help info

## method: rmd256

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hmac\",\"method\":\"rmd256\",\"message\":\"{string}\",\"passphrase\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hmac/rmd256?message={string}&passphrase={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info
passphrase | string | no help info

## method: rmd320

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hmac\",\"method\":\"rmd320\",\"message\":\"{string}\",\"passphrase\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hmac/rmd320?message={string}&passphrase={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info
passphrase | string | no help info

## method: sha1

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hmac\",\"method\":\"sha1\",\"message\":\"{string}\",\"passphrase\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hmac/sha1?message={string}&passphrase={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info
passphrase | string | no help info

## method: md2

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hmac\",\"method\":\"md2\",\"message\":\"{string}\",\"passphrase\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hmac/md2?message={string}&passphrase={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info
passphrase | string | no help info

## method: md4

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hmac\",\"method\":\"md4\",\"message\":\"{string}\",\"passphrase\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hmac/md4?message={string}&passphrase={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info
passphrase | string | no help info

## method: md5

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hmac\",\"method\":\"md5\",\"message\":\"{string}\",\"passphrase\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hmac/md5?message={string}&passphrase={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info
passphrase | string | no help info

## method: tiger192_3

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hmac\",\"method\":\"tiger192_3\",\"message\":\"{string}\",\"passphrase\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hmac/tiger192_3?message={string}&passphrase={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info
passphrase | string | no help info

## method: whirlpool

put helpful info here


> Shell command format:

```shell
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"hmac\",\"method\":\"whirlpool\",\"message\":\"{string}\",\"passphrase\":\"{string}\"}"
```

> HTTP API call format:

```url
http://127.0.0.1:7778/api/hmac/whirlpool?message={string}&passphrase={string}
```

field | value type | Description
--------- | ------- | -----------
message | string | no help info
passphrase | string | no help info

end of help

