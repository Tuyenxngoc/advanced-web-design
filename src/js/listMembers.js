$(function() {
    $('#header').load('../components/header.html');
    $('#navbar').load('../components/navbar.html');
});

$('#mem_nganh').change(function() {
    var nganh = $(this).find('option:selected').text();
    var chidoan_select = $('#mem_chidoan');

    if (nganh != 'Ngành') {
        var id = acronym(nganh);

        // Xóa tất cả các option hiện có trong select chidoan
        chidoan_select.empty();

        // Thêm các option mới
        chidoan_select.append('<option value="">Chi đoàn</option>');
        for (var i = 1; i <= 7; i++) {
            chidoan_select.append('<option>' + id + '0' + i + '</option>');
        }
    } else {
        chidoan_select.empty();

        // Thêm các option mới
        chidoan_select.append('<option value="">Chi đoàn</option>');
        chidoan_select.append('<option value="">Vui lòng chọn ngành học ...</option>');
    }
});

sortTableByColumn('Họ và tên');

$('#btnSearch').click(function() {
    var nganh_select = $('#mem_nganh').find('option:selected').text();
    var nganh = acronym(nganh_select);
    var chidoan = $('#mem_chidoan').find('option:selected').text();
    var gioitinh = $('#mem_gioitinh').find('option:selected').text();
    var chucvu = $('#mem_chucvu').find('option:selected').text();
    $('#myTable tbody tr').each(function() {
        if (nganh_select != 'Ngành') {
            if ($(this).find('td').eq(6).text() != nganh) {
                $(this).hide();
            } else {
                $(this).show();
            }
        }
        if (nganh_select != 'Ngành' && chidoan != 'Chi đoàn') {
            if ($(this).find('td').eq(6).text() != nganh || $(this).find('td').eq(7).text() != chidoan) {
                $(this).hide();
            } else {
                $(this).show();
            }
        }
        if (nganh_select != 'Ngành' && chidoan == 'Chi đoàn' && gioitinh != 'Giới tính') {
            if ($(this).find('td').eq(6).text() != nganh || $(this).find('td').eq(3).text() != gioitinh) {
                $(this).hide();
            } else {
                $(this).show();
            }
        }
        if (nganh_select != 'Ngành' && chidoan == 'Chi đoàn' && chucvu != 'Chức vụ') {
            if ($(this).find('td').eq(6).text() != nganh || $(this).find('td').eq(5).text() != chucvu) {
                $(this).hide();
            } else {
                $(this).show();
            }
        }
        if (nganh_select != 'Ngành' && chidoan != 'Chi đoàn' && gioitinh != 'Giới tính') {
            if ($(this).find('td').eq(6).text() != nganh || $(this).find('td').eq(7).text() != chidoan ||
                $(this).find('td').eq(3).text() != gioitinh) {
                $(this).hide();
            } else {
                $(this).show();
            }
        }

        if (nganh_select != 'Ngành' && chidoan != 'Chi đoàn' && chucvu != 'Chức vụ') {
            if ($(this).find('td').eq(6).text() != nganh || $(this).find('td').eq(7).text() != chidoan ||
                $(this).find('td').eq(3).text() != gioitinh || $(this).find('td').eq(5).text() != chucvu) {
                $(this).hide();
            } else {
                $(this).show();
            }
        }
        if (nganh_select != 'Ngành' && chidoan == 'Chi đoàn' && gioitinh != 'Giới tính' && chucvu != 'Chức vụ') {
            if ($(this).find('td').eq(6).text() != nganh || $(this).find('td').eq(3).text() != gioitinh || $(this).find('td').eq(5).text() != chucvu) {
                $(this).hide();
            } else {
                $(this).show();
            }
        }
        if (nganh_select != 'Ngành' && chidoan != 'Chi đoàn' && gioitinh != 'Giới tính' && chucvu != 'Chức vụ') {
            if ($(this).find('td').eq(6).text() != nganh || $(this).find('td').eq(7).text() != chidoan ||
                $(this).find('td').eq(3).text() != gioitinh || $(this).find('td').eq(5).text() != chucvu) {
                $(this).hide();
            } else {
                $(this).show();
            }
        }
        if (nganh_select == 'Ngành' && gioitinh != 'Giới tính') {
            if ($(this).find('td').eq(3).text() != gioitinh) {
                $(this).hide();
            } else {
                $(this).show();
            }
        }
        if (nganh_select == 'Ngành' && chucvu != 'Chức vụ') {
            if ($(this).find('td').eq(5).text() != chucvu) {
                $(this).hide();
            } else {
                $(this).show();
            }
        }
    });
});

$('th').click(function() {
    if ($(this).text() != "STT" && $(this).text() != "Ngày sinh") {
        var table = $(this).parents('table').eq(0);
        var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
        this.asc = !this.asc;
        if (this.asc) { rows = rows.reverse() }
        for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
        updateTableIndexes();
    }
})

//Tìm kiếm theo trường nhập liệu
$("#mem_name").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr:gt(0)").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    })
})

//Function
function updateTableIndexes() {
    $('#myTable tbody tr').each(function(index) {
        $(this).find('th').eq(0).text(index + 1);
    });
}

function acronym(text) {
    var listTxt = text.split(" ");
    var acronym = '';
    listTxt.forEach(function(word) {
        var shortName = word.charAt(0); // Lấy chữ cái đầu tiên của từ
        acronym += shortName.toUpperCase();
    });
    return acronym;
}

function sortTableByColumn(columnName) {
    var table = $('#myTable');
    var columnIndex;

    // Tìm chỉ số của cột cần sắp xếp
    table.find('th').each(function(index) {
        if ($(this).text().trim() === columnName) {
            columnIndex = index;
            return false;
        }
    });

    var rows = table.find('tbody > tr').toArray().sort(comparer(columnIndex));
    for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
    updateTableIndexes();
}

function comparer(index) {
    return function(a, b) {
        var valA = getCellValue(a, index);
        var valB = getCellValue(b, index);
        // return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB);
        return valA.localeCompare(valB, 'vi', { sensitivity: 'base' });
    };
}

//Hàm lấy ra nội dung dòng, cột
function getCellValue(row, index) {
    return $(row).children('td').eq(index - 1).text().split(" ").pop();
}