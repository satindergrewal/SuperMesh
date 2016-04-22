// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();
    getwlan1status();
    getwlan1iwconfig()

});

window.setInterval(function(){ populateTable(); }, 15000);

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

            tableContent += '<tr>';
                tableContent += '<td class="text-center">' + this.signal + '</i></td>';
                tableContent += '<td class="font-w600">' + this.ssid + '</td>';
                tableContent += '<td class="hidden-xs">' + this.frequency + '</td>';
                tableContent += '<td class="hidden-xs hidden-sm">' + this.security + '</td>';
                tableContent += '<td class="text-center">';
                tableContent += '';
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
        console.log(data);
        console.log(data['ipv4_address']);
        $( "#wlan1_ipaddr" ).val( data['ipv4_address'] );
        $( "#wlan1_subnet" ).val( data['ipv4_subnet_mask'] );
        $( "#wlan1_routeip" ).val( data['ipv4_address'] );
    });
};

function getwlan1iwconfig() {
    $.getJSON( '/admin/wifi/wlan1iwconfig', function( data ) {
        console.log(data);
        $( "#wlan1_ssid" ).val( data['ssid'] );
    });
};