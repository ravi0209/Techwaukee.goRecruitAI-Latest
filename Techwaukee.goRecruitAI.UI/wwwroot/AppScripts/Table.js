function searchJobTable(tbl) {
    // Declare variables

    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("txtAdvSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById(tbl);
    tr = table.getElementsByTagName("tr");
    var val1 = input.value;
    var ser = new Array;
    // Loop through all table rows, and hide those who don't match the search query
    if (val1.includes(",")) {
        ser = val1.split(",");
    }
    else {
        ser.push(input.value);
        //ser.length = 1;
    }

    if (ser.length == 1) {
        filter = ser[0].toUpperCase();

        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    else if (ser.length == 2) {
        filter = ser[1].toUpperCase();

        for (i = 0; i < tr.length; i++) {
            var td1 = tr[i].getElementsByTagName("td")[0];
            var td2 = tr[i].getElementsByTagName("td")[1];
            if (td1) {
                txtValue1 = td1.textContent || td1.innerText;
                txtValue2 = td2.textContent || td2.innerText;

                if (txtValue1.toUpperCase().indexOf(ser[0].toUpperCase()) > -1 && txtValue2.toUpperCase().indexOf(ser[1].toUpperCase()) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    else if (ser.length == 3) {
        for (i = 0; i < tr.length; i++) {
            var td1 = tr[i].getElementsByTagName("td")[0];
            var td2 = tr[i].getElementsByTagName("td")[1];
            var td3 = tr[i].getElementsByTagName("td")[2];
            if (td1) {
                txtValue1 = td1.textContent || td1.innerText;
                txtValue2 = td2.textContent || td2.innerText;
                txtValue3 = td3.textContent || td3.innerText;

                if (txtValue1.toUpperCase().indexOf(ser[0].toUpperCase()) > -1 && txtValue2.toUpperCase().indexOf(ser[1].toUpperCase()) > -1 && txtValue3.toUpperCase().indexOf(ser[2].toUpperCase()) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    else if (ser.length == 4) {
        for (i = 0; i < tr.length; i++) {
            var td1 = tr[i].getElementsByTagName("td")[0];
            var td2 = tr[i].getElementsByTagName("td")[1];
            var td3 = tr[i].getElementsByTagName("td")[2];
            var td4 = tr[i].getElementsByTagName("td")[3];
            if (td1) {
                txtValue1 = td1.textContent || td1.innerText;
                txtValue2 = td2.textContent || td2.innerText;
                txtValue3 = td3.textContent || td3.innerText;
                txtValue4 = td4.textContent || td4.innerText;

                if (txtValue1.toUpperCase().indexOf(ser[0].toUpperCase()) > -1 && txtValue2.toUpperCase().indexOf(ser[1].toUpperCase()) > -1 && txtValue3.toUpperCase().indexOf(ser[2].toUpperCase()) > -1 && txtValue4.toUpperCase().indexOf(ser[3].toUpperCase()) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    getPager(tbl, 5);
}

function keyValidation(evt, tbl) {
    var e = event || evt;
    var charCode = e.which || e.keyCode;

    if (charCode == 188) {
        return false;
    }
    else {
        searchJobTable(tbl);
    }
    return true;
}

function getPager(table, noRows) {
    $('.pagination').html(''); // reset pagination
    var trnum = 0; // reset tr counter
    var maxRows = noRows; // get Max Rows from select option
    var totalRows = $('table tbody tr:not([style*="display: none"])').length; // numbers of rows
    $(table + ' tr:gt(0)').each(function () { // each TR in  table and not the header
        if (($(this).css("display") == "table-row")) {
            trnum++; // Start Counter

            if (trnum > maxRows) { // if tr number gt maxRows
                $(this).hide(); // fade it out
            }
            if (trnum <= maxRows) {
                $(this).show();
            }
        }// else fade in Important in case if it ..
    }); //  was fade out to fade it in

    if (totalRows > maxRows) { // if tr total rows gt max rows option
        var pagenum = Math.ceil(totalRows / maxRows); // ceil total(rows/maxrows) to get ..

        $('.pagination').append("<li class='page-item'>" +
            "<a class='page-link' href='#link' aria-label='Previous'>" +
            "<span aria-hidden='true'><i class='ni ni-bold-left' aria-hidden='true'></i></span>" +
            "</a></li>");
        //    numbers of pages
        for (var i = 1; i <= pagenum;) {
            // for each page append pagination li
            $('.pagination').append('<li class="page-item" data-page="' + i + '">\
                                      <span  class="page-link">' + i++ + '<span class="sr-only">(current)</span></span>\
                                    </li>').show();
        }

        $('.pagination').append("<li class='page-item'>" +
            "<a class='page-link' href='#link' aria-label='Next'>" +
            "<span aria-hidden='true'><i class='ni ni-bold-right' aria-hidden='true'></i></span>" +
            "</a></li>");

        // end for i
    } // end if row count > max rows

    $('.pagination li:first-child').addClass('active'); // add active class to the first li
    $('.pagination li').on('click', function () { // on click each page
        var pageNum = $(this).attr('data-page'); // get it's number
        var trIndex = 0; // reset tr counter
        $('.pagination li').removeClass('active'); // remove active class from all li
        $(this).addClass('active'); // add active class to the clicked
        $(table + ' tr:gt(0)').each(function () { // each tr in table not the header
            trIndex++; // tr index counter
            // if tr index gt maxRows*pageNum or lt maxRows*pageNum-maxRows fade if out
            if (trIndex > (maxRows * pageNum) || trIndex <= ((maxRows * pageNum) - maxRows)) {
                $(this).hide();
            } else {
                $(this).show();
            } //else fade in
        }); // end of for each tr in table
    }); // end of on click pagination list

    $('#divInfo').text("Showing 1 to " + $('select#maxRows option:selected').val() + " of " + totalRows + " entries");

    //$('.pagination').html('');
    //$('#divInfo').text("Showing 1 to " + len + " of entries");
}

function getPaging(rowlength) {
    var totalrows = $(".divControl").length;
    var pageSize = rowlength;
    var counter = 0;
    $("#divPages").empty();
    // $(".prev").removeAttr("style");
    $('.prev').css('display', 'none');
    $('.next').css('display', 'block');
    var noOfPage = totalrows / pageSize;
    noOfPage = Math.ceil(noOfPage);
    for (var i = 1; i <= noOfPage; i++) {
        $("#divPages").append('<div class="page" id="page_' + i + '">' + i + '</div>');
    }
    var totalPagenum = $("div.page").length;
    if (totalPagenum > 3) {
        $("div.page").hide();
        for (var n = 1; n <= 3; n++) {
            $("div.page:nth-child(" + n + ")").show();
            $("#page_1").addClass('pageselect');
        }
    }
    else {
        $("div.next").hide();
        $("div.prev").hide();
        $("#page_1").addClass('pageselect');
    }
    $(".divControl").hide();
    for (var j = 1; j <= pageSize; j++) {
        $(".divControl:nth-child(" + j + ")").show();
    }
    displayevent();
    //$('#divInfo').text("Showing 1 to " + $('select#maxRows option:selected').val() + " of " + totalRows + " entries");

    $('#divInfo').text("Showing 1 to " + rowlength + " of " + totalrows + " entries");

    $("div.page").click(function () {
        var currentPage = $(this).text();
        $(".divControl").hide();
        for (var k = (currentPage * pageSize) - (pageSize - 1); k <= (currentPage * pageSize); k++) {
            $(".divControl:nth-child(" + k + ")").show();
        }
        for (var i = 1; i <= totalPagenum; i++) {
            $("#page_" + i).removeClass('pageselect');
        }

        $("#page_" + currentPage).addClass('pageselect');
    });
}
$("div.next").click(function () {
    if ($("div.selected:last").nextAll('div.page').length > 3) {
        $("div.selected").last().nextAll(':lt(3)').show();
        $("div.selected").hide();
        displayevent();
        //lastposevent();
        $("div.prev").show();
        $("div.next").show();
    }
    else {
        $("div.selected").last().nextAll().show();
        $("div.selected").hide();
        displayevent();
        $("div.next").hide();
        $("div.prev").show();
    }
});

$("div.prev").click(function () {
    if ($("div.selected:first").prevAll('div.page').length > 3) {
        $("div.selected").first().prevAll(':lt(3)').show();
        $("div.selected").hide();
        $("div.prev").show();
        $("div.next").show();
        displayevent();
    }
    else {
        $("div.selected").first().prevAll().show();
        $("div.selected").hide();
        $("div.prev").hide();
        $("div.next").show();
        displayevent();
    }
});

var tbllist = new Array;
function getSearchPaging(tablename, rowlength) {
    tbllist.length = 0;
    //var totalrows1 = $('.divControl:not([style*="display: none"])').length;
    var totalrows = $(tablename + ' tbody tr:not([style*="display: none"])').length;
    var tblname = tablename + " tr.divControl";
    var pageSize = 10;
    var counter = 0;
    $("#divPages").empty();
    // $(".prev").removeAttr("style");
    $('.prev').css('display', 'none');
    $('.next').css('display', 'block');
    var noOfPage = totalrows / pageSize;
    noOfPage = Math.ceil(noOfPage);
    for (var i = 1; i <= noOfPage; i++) {
        $("#divPages").append('<div class="page" id="page_' + i + '">' + i + '</div>');
    }
    var totalPagenum = $("div.page").length;
    if (totalPagenum > 3) {
        $("div.page").hide();
        for (var n = 1; n <= 3; n++) {
            $("div.page:nth-child(" + n + ")").show();
            $("#page_1").addClass('pageselect');
        }
    }
    else {
        $("div.next").hide();
        $("div.prev").hide();
        $("#page_1").addClass('pageselect');
    }

    //for (var j = 1; j <= totalrows; j++) {
    //    if ($(".divControl:nth-child(" + j + ")").css('display') == 'none') {
    //        $("#divControl_" + j).hide();
    //    }
    //    else {
    //        //$(".divControl:nth-child(" + j + ")").show();
    //        $("#divControl_"+j).show();
    //    }
    //}

    $(tblname).each(function () {
        if ($(this).css('display') == 'none') {
        }
        else {
            tbllist.push((this).id);
        }
    });

    for (var i = 0; i < tbllist.length; i++) {
        if (i < 10) {
            //alert("test"+tbllist[i]);
            //document.getElementById(tbllist[i]).removeClass = "hidden";
        }
        else {
            //alert(tbllist[i]);
            document.getElementById(tbllist[i]).style.display = "none";
        }
    }

    //displayevent();
    //$('#divInfo').text("Showing 1 to " + $('select#maxRows option:selected').val() + " of " + totalRows + " entries");

    $('#divInfo').text("Showing 1 to " + rowlength + " of " + totalrows + " entries");

    $("div.page").click(function () {
        var currentPage = $(this).text();

        //$(".divControl").hide();
        for (var i = 0; i < tbllist.length; i++) {
            document.getElementById(tbllist[i]).style.display = "none";
        }

        var x = 0;
        if (noOfPage == currentPage) {
            for (var k = (currentPage * pageSize) - (pageSize); k <= (currentPage * pageSize); k++) {
                if (k <= tbllist.length - 1) {
                    document.getElementById(tbllist[k]).style.display = "table-row";
                }
            }
        }
        else {
            for (var k = (currentPage * pageSize) - (pageSize - 1); k <= (currentPage * pageSize); k++) {
                if (k <= tbllist.length - 1) {
                    document.getElementById(tbllist[k]).style.display = "table-row";
                }
            }
        }

        for (var i = 1; i <= totalPagenum; i++) {
            $("#page_" + i).removeClass('pageselect');
        }

        $("#page_" + currentPage).addClass('pageselect');
    });

    $("div.next").click(function () {
        if ($("div.selected:last").nextAll('div.page').length > 3) {
            $("div.selected").last().nextAll(':lt(3)').show();
            $("div.selected").hide();
            displaysearchevent();
            //lastposevent();
            $("div.prev").show();
            $("div.next").show();
        }
        else {
            $("div.selected").last().nextAll().show();
            $("div.selected").hide();
            $("div.next").hide();
            $("div.prev").show();
            // displaysearchevent();
        }
    });
}

function displaysearchevent() {
    $("div.page").each(function () {
        if ($(this).css('display') === 'none') {
            $(this).removeClass('selected');
        }
        else {
            $(this).addClass('selected');
        }
    });
}

function displayevent() {
    $("div.page").each(function () {
        if ($(this).css('display') === 'block') {
            $(this).addClass('selected');
        }
        else {
            $(this).removeClass('selected');
        }
    });
}

function getPagination(table, noRows) {
    $('.pagination').html(''); // reset pagination
    var trnum = 0; // reset tr counter
    var maxRows = noRows; // get Max Rows from select option
    var totalRows = $(table + ' tbody tr').length; // numbers of rows
    $(table + ' tr:gt(0)').each(function () { // each TR in  table and not the header
        trnum++; // Start Counter
        if (trnum > maxRows) { // if tr number gt maxRows
            $(this).hide(); // fade it out
        }
        if (trnum <= maxRows) {
            $(this).show();
        } // else fade in Important in case if it ..
    }); //  was fade out to fade it in
    if (totalRows > maxRows) { // if tr total rows gt max rows option
        var pagenum = Math.ceil(totalRows / maxRows); // ceil total(rows/maxrows) to get ..
        //    numbers of pages

        $('.pagination').append("<li class='page-item'>" +
            "<a class='page-link' href='#link' aria-label='Previous'>" +
            "<span aria-hidden='true'><i class='ni ni-bold-left' aria-hidden='true'></i></span>" +
            "</a></li>");

        for (var i = 1; i <= pagenum;) { // for each page append pagination li
            $('.pagination').append('<li class="page-item" data-page="' + i + '">\
                                      <span  class="page-link">' + i++ + '<span class="sr-only">(current)</span></span>\
                                    </li>').show();
        }

        $('.pagination').append("<li class='page-item'>" +
            "<a class='page-link' href='#link' aria-label='Next'>" +
            "<span aria-hidden='true'><i class='ni ni-bold-right' aria-hidden='true'></i></span>" +
            "</a></li>");

        // end for i
    } // end if row count > max rows
    $('.pagination li:first-child').addClass('active'); // add active class to the first li
    $('.pagination li').on('click', function () { // on click each page
        var pageNum = $(this).attr('data-page'); // get it's number
        var trIndex = 0; // reset tr counter
        $('.pagination li').removeClass('active'); // remove active class from all li
        $(this).addClass('active'); // add active class to the clicked
        $(table + ' tr:gt(0)').each(function () { // each tr in table not the header
            trIndex++; // tr index counter
            // if tr index gt maxRows*pageNum or lt maxRows*pageNum-maxRows fade if out
            if (trIndex > (maxRows * pageNum) || trIndex <= ((maxRows * pageNum) - maxRows)) {
                $(this).hide();
            } else {
                $(this).show();
            } //else fade in
        }); // end of for each tr in table
    }); // end of on click pagination list

    $('#divInfo').text("Showing 1 to " + $('select#maxRows option:selected').val() + " of " + totalRows + " entries");
}

function pad2(number) {
    return (number < 10 ? '0' : '') + number
}