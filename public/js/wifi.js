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

        $.each(data, function(index){
            /*console.log('--------------------');
            console.log(this.signal);
            console.log(this.ssid);
            console.log(this.frequency);
            console.log(this.security);*/

            //console.log(index);

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
                wifi_sec_color = '#337ab7';
            }
            else if (this.security === 'wep') {
                wifi_security = '<i class="fa fa-lock"></i>';
                wifi_sec_color = '#a48ad4';
            }
            //console.log(wifi_security);

            tableContent += '<tr>';
                tableContent += '<td class="text-center" style="color: ' + signal_color + ';"><i class="fa fa-wifi"></i></td>';
                tableContent += '<td class="font-w600" rel=' + index + '>' + this.ssid + '</td>';
                tableContent += '<td class="hidden-xs">' + this.frequency + '</td>';
                tableContent += '<td class="hidden-xs hidden-sm" sec_val="' + this.security + '" rel=' + index + ' style="color: ' + wifi_sec_color + ';">' + wifi_security + ' ' + this.security + '</td>';
                tableContent += '<td class="text-center">';
                tableContent += '<button class="btn btn-sm btn-primary" type="button" rel=' + index + ' onclick="UpdateWiFiSettings(' + index + ')">Connect</button>';
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
    $.getJSON( '/admin/network/ifconfig/wlan1', function( data ) {
        //console.log(data);
        $( "#wlan1_ipaddr" ).html( data['ipv4_address'] );
        $( "#wlan1_subnet" ).html( data['ipv4_subnet_mask'] );
    });
};

function getwlan1iwconfig() {
    $.getJSON( '/admin/wifi/iwconfig/wlan1', function( data ) {
        //console.log(data);
        $( "#wlan1_ssid" ).html( data['ssid'] );
        $( "#wlan1_ieee" ).html( data['ieee'] );
    });
};

function getWiFidetails(index_value) {
    console.log(index_value);
    console.log($('td[rel="' + index_value + '"]').eq(0).text());
    console.log($('td[rel="' + index_value + '"]').eq(1).text());
}

// Update Network Settings
function UpdateWiFiSettings(index_value) {

    /*App.loader('show');
    setTimeout(function () {
        App.loader('hide');
    }, 3000);*/

    console.log(index_value);
    console.log($('td[rel="' + index_value + '"]').eq(0).text());
    console.log($('td[rel="' + index_value + '"]').eq(1).text());

    //event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    /*$('#FormNetSettings input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });*/

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var WiFiSettings = {
            'ssid': $('td[rel="' + index_value + '"]').eq(0).text(),
            'security': $('td[rel="' + index_value + '"]').eq(1).text()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: WiFiSettings,
            url: '/admin/wifi/wpa_supplicant/setup',
            dataType: 'html',
            success: function(data, textStatus, jqXHR) {
                var NetData = JSON.parse(data);
                console.log(NetData);

                if (NetData.msg === 'success') {
                    console.log('Success');
                    swal("Success", "WiFi Settings Saved.", "success");

                    // Populate IP Info
                    //populateIPInfo();
                }
                else {
                    // If something goes wrong, alert the error message that our service returned
                    swal("Oops...", "Something went wrong!", "error");
                }
            },
            error: function(xhr, textStatus, error) {
                console.log('failure');
                console.log(xhr.statusText);
                console.log(textStatus);
                console.log(error);
                
            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};