// wifilist data array for filling in info box
var wifiListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( 'wifi/iwlist', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        /*$.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);*/

        $.each(data, function(){
            console.log('--------------------');
            console.log(this.signal);
            console.log(this.ssid);
            console.log(this.frequency);
            console.log(this.security);
        });

        console.log(data);
        console.log(data[0].);
    });
};
