$(document).ready(function () {
    // URL của tệp JSON
    const jsonUrl = '../data/fees.json';

    // Hàm để lấy dữ liệu từ tệp JSON và thêm vào bảng
    $.getJSON(jsonUrl, function (data) {
        let tableBody = $('#table-body');
        tableBody.empty(); // Xóa tất cả các hàng hiện có

        // Duyệt qua từng phần tử trong dữ liệu JSON và thêm vào bảng
        $.each(data, function (index, item) {
            let row = $('<tr></tr>');
            row.append($('<th></th>').attr('scope', 'row').text(item.id));
            row.append($('<td></td>').text(item.name));
            row.append($('<td></td>').text(item.content));
            row.append($('<td></td>').text(item.date));
            tableBody.append(row);
        });
    }).fail(function () {
        console.error('Không thể tải dữ liệu từ tệp JSON.');
    });
});
