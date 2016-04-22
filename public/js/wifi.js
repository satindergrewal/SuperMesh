// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();
    getwlan1status();
    getwlan1iwconfig();

});

window.setInterval(function(){ 
    populateTable();
    getwlan1status();
    getwlan1iwconfig();
}, 15000);

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/admin/wifi/iwlist', function( data ) {

        $.each(data, function(){
            /*console.log('--------------------');
            console.log(this.signal);
            console.log(this.ssid);
            console.log(this.frequency);
            console.log(this.security);*/

            var signal_color = '';

            if (this.signal >= '-25' ) {
                signal_color = '#71bd00';
            } else if (this.signal >= '-55' ) {
                signal_color = '#dad700';
            } else if (this.signal >= '-75' ) {
                signal_color = '#f39f60';
            } else if (this.signal >= '-95' ) {
                signal_color = '#9a9a9a';
            }
            //console.log(signal_color);

            var wifi_security = '';
            var wifi_sec_color = '';

            if (this.security === 'open' ) {
                wifi_security = '<i class="fa fa-unlock-alt"></i>';
                wifi_sec_color = '#71bd00';
            } else if (this.security === 'wpa' || this.security === 'wpa2' ) {
                wifi_security = '<i class="fa fa-lock"></i>';
                wifi_sec_color = '#bd0000';
            }
            //console.log(wifi_security);

            tableContent += '<tr>';
                tableContent += '<td class="text-center" style="color: ' + signal_color + ';"><i class="fa fa-wifi"></i></td>';
                tableContent += '<td class="font-w600">' + this.ssid + '</td>';
                tableContent += '<td class="hidden-xs">' + this.frequency + '</td>';
                tableContent += '<td class="hidden-xs hidden-sm" style="color: ' + wifi_sec_color + ';">' + wifi_security + ' ' + this.security + '</td>';
                tableContent += '<td class="text-center">';
                tableContent += '<button class="btn btn-sm btn-minw btn-rounded btn-default" type="button">Connect</button>';
                tableContent += '</td>';
            tableContent += '</tr>';

        // Inject the whole content string into our existing HTML table
        $('#wifilist tbody').html(tableContent);
        //console.log(tableContent);

        });
        //console.log(data);
        //console.log(data[0]);
    });
};

function getwlan1status() {
    $.getJSON( '/admin/wifi/wlan1status', function( data ) {
        //console.log(data);
        $( "#wlan1_ipaddr" ).html( data['ipv4_address'] );
        $( "#wlan1_subnet" ).html( data['ipv4_subnet_mask'] );
    });
};

function getwlan1iwconfig() {
    $.getJSON( '/admin/wifi/wlan1iwconfig', function( data ) {
        //console.log(data);
        $( "#wlan1_ssid" ).html( data['ssid'] );
        $( "#wlan1_ieee" ).html( data['ieee'] );
    });
};