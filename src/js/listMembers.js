$(function() {
    $('#header').load('../components/header.html');
    $('#navbar').load('../components/navbar.html');
});

// Sử dụng AJAX để đọc tệp JSON
$.getJSON("../data/members.json", function(data) {
    $.each(data.members, function(index, member) {
        var row = $("<tr>");
        row.append($("<th>").text(index + 1));
        row.append($("<td>").text(member.fullname)); // Họ và tên
        row.append($("<td>").text(member.id)); // Mã định danh
        row.append($("<td>").text(member.dob)); // Ngày sinh
        row.append($("<td>").text(member.gender)); // Giới tính
        row.append($("<td>").text(member.address.province));
        row.append($("<td>").text(member.position)); // Chức vụ
        row.append($("<td>").text(member.major)); // Ngành
        row.append($("<td>").text(member.branch)); // Chi đoàn
        $("#myTable tbody").append(row);
    });
});

//Lấy tên chi đoàn theo ngành
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
            chidoan_select.append('<option>' + id + '0' + i + '-K16</option>');
        }
    } else {
        chidoan_select.empty();

        // Thêm các option mới
        chidoan_select.append('<option value="">Chi đoàn</option>');
        chidoan_select.append('<option value="">Vui lòng chọn ngành học ...</option>');
    }
});

//Tách chữ cái đầu
function acronym(text) {
    var listTxt = text.split(" ");
    var acronym = '';
    listTxt.forEach(function(word) {
        var shortName = word.charAt(0); // Lấy chữ cái đầu tiên của từ
        acronym += shortName.toUpperCase();
    });
    return acronym;
}

//Lọc dữ liệu theo các điều kiện
$('#btnSearch').click(function() {
    var nganh_select = $('#mem_nganh').find('option:selected').text();
    var chidoan = $('#mem_chidoan').find('option:selected').text();
    var gioitinh = $('#mem_gioitinh').find('option:selected').text();
    var chucvu = $('#mem_chucvu').find('option:selected').text();
    $('#myTable tbody tr').each(function() {
        if (nganh_select != 'Ngành') {
            if ($(this).find('td').eq(7).text() != nganh_select) {
                $(this).hide();
            } else {
                $(this).show();
            }
        } else {
            $(this).show();
        }

        if (nganh_select != 'Ngành' && chidoan != 'Chi đoàn') {
            if ($(this).find('td').eq(7).text() != nganh_select || $(this).find('td').eq(8).text() != chidoan) {
                $(this).hide();
            } else {
                $(this).show();
            }
        }

        if (gioitinh != 'Giới tính') {
            if ($(this).find('td').eq(4).text() != gioitinh) {
                $(this).hide();
            } else {
                $(this).show();
            }
        }

        if (chucvu != 'Chức vụ') {
            if ($(this).find('td').eq(6).text() == chucvu) {
                $(this).show();
            } else {
                $(this).hide();
            }
        }

        if (nganh_select != 'Ngành' && gioitinh != 'Giới tính') {
            if (chidoan == 'Chi đoàn') {
                if ($(this).find('td').eq(7).text() != nganh_select || $(this).find('td').eq(4).text() != gioitinh) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            } else {
                if ($(this).find('td').eq(7).text() != nganh_select || $(this).find('td').eq(8).text() != chidoan ||
                    $(this).find('td').eq(4).text() != gioitinh) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            }
        }

        if (nganh_select != 'Ngành' && chucvu != 'Chức vụ') {
            if (chidoan == 'Chi đoàn') {
                if ($(this).find('td').eq(7).text() != nganh_select || $(this).find('td').eq(6).text() != chucvu) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            } else {
                if ($(this).find('td').eq(7).text() != nganh_select || $(this).find('td').eq(8).text() != chidoan || $(this).find('td').eq(6).text() != chucvu) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            }
        }

        if (nganh_select != 'Ngành' && gioitinh != 'Giới tính' && chucvu != 'Chức vụ') {
            if (chidoan == 'Chi đoàn') {
                if ($(this).find('td').eq(7).text() != nganh_select || $(this).find('td').eq(4).text() != gioitinh || $(this).find('td').eq(6).text() != chucvu) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            } else {
                if ($(this).find('td').eq(7).text() != nganh_select || $(this).find('td').eq(8).text() != chidoan ||
                    $(this).find('td').eq(4).text() != gioitinh || $(this).find('td').eq(6).text() != chucvu) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            }
        }

        if (nganh_select == 'Ngành' && gioitinh != 'Giới tính' && chucvu != 'Chức vụ') {
            if ($(this).find('td').eq(4).text() != gioitinh || $(this).find('td').eq(6).text() != chucvu) {
                $(this).hide();
            } else {
                $(this).show();
            }
        };
    });
});

//Tìm kiếm theo trường nhập liệu
$("#mem_name").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr:gt(0)").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    })
})

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
    console.log($(row).children('td').eq(index - 1).text().split(" ").pop());
    return $(row).children('td').eq(index - 1).text().split(" ").pop();
}

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

function updateTableIndexes() {
    $('#myTable tbody tr').each(function(index) {
        $(this).find('th').eq(0).empty();
        $(this).find('th').eq(0).text(index + 1);
    });
}

$("#info").hide();
// Khi bấm vào bất kì dòng nào trong bảng
$("#myTable tbody").on("click", "tr", function() {
    var maDinhDanh = $(this).find("td").eq(1).text().trim();
    $.getJSON("../data/members.json", function(data) {
        $.each(data.members, function(index, member) {
            if (member.id === maDinhDanh) {
                $("#hoten").val(member.fullname);
                $("#maDD").val(member.id);
                $("#ngaySinh").val(member.dob);
                $("#gioiTinh").val(member.gender);
                $("#danToc").val(member.nation);
                $("#CMND").val(member["identification-card"]["card-id"]);
                $("#ngayCap").val(member["identification-card"]["dated"]);
                $("#noiCap").val(member["identification-card"]["issued-by"]);
                if (member["identification-card"]["religion"] == '') {
                    $("#tonGiao").val('Không');
                } else {
                    $("#tonGiao").val(member["identification-card"]["religion"]);
                }
                $("#tdPT").val(member.qualification);
                $("#tdCM").val(member['edu-lvl']);
                $('#llct').val(member['political-theory']);
                $("#queT").val(member["permanent_address"]["province"]);
                $("#queH").val(member["permanent_address"]["district"]);
                $("#queX").val(member["permanent_address"]["commune"]);
                $("#truT").val(member["permanent_address"]["province"]);
                $("#truH").val(member["permanent_address"]["district"]);
                $("#truX").val(member["permanent_address"]["commune"]);
                $("#infoNganh").val(member.major);
                $("#infoCD").val(member.branch);
                $("#ttnn").val(member["eng-lvl"]);
                $("#NgheNghiep").val(member["cur-job"]);
            }
        });
    });
    $("#info").show("slow");
});

$(".Xout").click(function() {
    $("#info").hide("slow");
});