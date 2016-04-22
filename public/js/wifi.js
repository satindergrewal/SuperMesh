// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

});

window.setInterval(function(){ populateTable(); }, 5000);

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( 'wifi/iwlist', function( data ) {

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

