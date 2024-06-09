$(document).ready(function () {
    // URL của tệp JSON
    const jsonUrl = '../data/fees.json';

    // Hàm để lấy dữ liệu từ tệp JSON và thêm vào bảng
    $.getJSON(jsonUrl, function (data) {
        const rowsPerPage = 10;
        const $tableBody = $('#data-table tbody');
        const $pagination = $('#pagination');
        const $paginationInfo = $('#pagination-info');
        let currentPage = 1;
        let sortDirection = 'asc';
        let sortKey = 'id';
        let selectedItemId = null;

        function displayRows(data, rowsPerPage, page) {
            $tableBody.empty();
            page--;

            const start = rowsPerPage * page;
            const end = start + rowsPerPage;
            const paginatedItems = data.slice(start, end);

            paginatedItems.forEach((item) => {
                const row = `
                <tr>
                    <th scope="row" class="key">${item.id}</th>
                    <td>${item.nguoiThu}</td>
                    <td>${item.noiDung}</td>
                    <td class="text-primary">${item.tongThu}₫</td>
                    <td>${item.ngayThu}</td>
                    <td>
                        <div class="table-action">
                            <button class="btn edit-btn"><i class="fa-solid fa-pen-to-square text-primary"></i></button>
                            <button class="btn delete-btn"><i class="fa-solid fa-trash-can text-danger"></i></button>
                        </div>
                    </td>
                </tr>
            `;
                $tableBody.append(row);
            });

            $paginationInfo.text(`Trang ${page + 1} trên ${Math.ceil(data.length / rowsPerPage)}`);

            //Gắn sự kiện nút sửa edit-btn
            $('.edit-btn').on('click', function () {
                // Lấy ra id
                selectedItemId = $(this).closest('tr').find('.key').text();

                resetForm('#myForm');

                // Cập nhận thông tin vào modal
                const selectedItem = data.find((item) => item.id == selectedItemId);
                if (selectedItem) {
                    $('#collecter-name').val(selectedItem.nguoiThu);
                    $('#total-amount').val(Number.parseInt(selectedItem.tongThu));
                    $('#date').val(selectedItem.ngayThu);
                    $('#message-textarea').val(selectedItem.noiDung);

                    // Hiển thị modal
                    $('#addModal').modal('show');
                }
            });

            // Gắn sự kiện nút xóa
            $('.delete-btn').on('click', function () {
                selectedItemId = $(this).closest('tr').find('.key').text();
                $('#deleteConfirmModal').modal('show');
            });
        }

        function setupPagination(data, rowsPerPage) {
            $pagination.empty();
            const pageCount = Math.ceil(data.length / rowsPerPage);

            $pagination.append(
                `<li class="page-item" id="prev-page"><a class="page-link" href="#"><i class="fa-solid fa-angle-left"></i></a></li>`,
            );

            for (let i = 1; i <= pageCount; i++) {
                const btn = paginationButton(i, data);
                $pagination.append(btn);
            }

            $pagination.append(
                `<li class="page-item" id="next-page"><a class="page-link" href="#"><i class="fa-solid fa-angle-right"></i></a></li>`,
            );

            $('#prev-page').on('click', function (e) {
                e.preventDefault();
                if (currentPage > 1) {
                    currentPage--;
                    displayRows(data, rowsPerPage, currentPage);
                    updatePaginationButtons();
                }
            });

            $('#next-page').on('click', function (e) {
                e.preventDefault();
                const pageCount = Math.ceil(data.length / rowsPerPage);
                if (currentPage < pageCount) {
                    currentPage++;
                    displayRows(data, rowsPerPage, currentPage);
                    updatePaginationButtons();
                }
            });

            updatePaginationButtons();
        }

        function paginationButton(page, data) {
            const $button = $(`<li class="page-item"><a class="page-link" href="#">${page}</a></li>`);

            if (currentPage === page) $button.addClass('active');

            $button.on('click', function (e) {
                e.preventDefault();
                currentPage = page;
                displayRows(data, rowsPerPage, currentPage);
                updatePaginationButtons();
            });

            return $button;
        }

        function updatePaginationButtons() {
            $('.page-item').removeClass('active');
            $(`#pagination .page-item:eq(${currentPage})`).addClass('active');

            const pageCount = Math.ceil(data.length / rowsPerPage);

            $('#prev-page').toggle(currentPage > 1);
            $('#next-page').toggle(currentPage < pageCount);
        }

        function updateSortIcons() {
            $('th[data-sort]').each(function () {
                const $icon = $(this).find('i');
                if ($(this).data('sort') === sortKey) {
                    $icon.removeClass('fa-sort fa-sort-up fa-sort-down');
                    $icon.addClass(sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down');
                    $icon.addClass('active');
                } else {
                    $icon.removeClass('fa-sort-up fa-sort-down active');
                    $icon.addClass('fa-sort');
                }
            });
        }

        function sortData(key, direction) {
            data.sort((a, b) => {
                if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
                if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
                return 0;
            });
            displayRows(data, rowsPerPage, currentPage);
            setupPagination(data, rowsPerPage);
        }

        $('th[data-sort]').on('click', function () {
            const key = $(this).data('sort');
            sortDirection = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
            sortKey = key;
            sortData(sortKey, sortDirection);
            updateSortIcons();
        });

        // Xử lý sự kiện xác nhận xóa
        $('#confirmDeleteButton').on('click', function () {
            data = data.filter((item) => item.id != selectedItemId);
            displayRows(data, rowsPerPage, currentPage);
            setupPagination(data, rowsPerPage);
            $('#deleteConfirmModal').modal('hide');

            //Reset id được chọn
            selectedItemId = null;
        });

        // Xử lý phần tìm kiếm
        $('#search-input').on('input', function () {
            var filter = $(this).val().toLowerCase();
            var rows = $('#data-table tbody tr');
            rows.filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(filter) > -1);
            });

            // Kiểm tra xem có kết quả nào được hiển thị hay không
            if (rows.filter(':visible').length === 0) {
                // Nếu không có kết quả, thêm một dòng thông báo vào bảng
                $('#data-table tbody').append(
                    '<tr class="no-results"><td colspan="6" class="text-center">Không có kết quả nào trùng khớp</td></tr>',
                );
            } else {
                // Nếu có kết quả, ẩn dòng thông báo nếu có
                $('#data-table tbody tr.no-results').remove();
            }
        });

        function resetForm(selector) {
            // Reset các giá trị trong form
            $('#collecter-name').val('');
            $('#total-amount').val('');
            $('#date').val('');
            $('#message-textarea').val('');

            // Reset các lỗi
            let form = $(selector);
            form.find('input, textarea').each(function () {
                let input = $(this);
                input.removeClass('is-invalid is-valid');
            });
        }

        // Xử lý sự kiện thêm mới
        $('#add-btn').on('click', function () {
            selectedItemId = null;

            resetForm('#myForm');

            $('#addModal').modal('show');
        });

        // Xử lý sự kiện export file
        $('#excel-export').on('click', function () {
            var newData = [];
            var headers = ['ID', 'Người Thu', 'Nội Dung', 'Tổng Thu', 'Ngày Thu'];
            newData.push(headers);

            data.forEach((item) => {
                var row = [];
                row.push(item.id);
                row.push(item.nguoiThu);
                row.push(item.noiDung);
                row.push(item.tongThu);
                row.push(item.ngayThu);
                newData.push(row);
            });

            var ws = XLSX.utils.aoa_to_sheet(newData);
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            XLSX.writeFile(wb, 'DuLieu.xlsx');
        });

        // Xử lý form
        $('#save-btn').on('click', function () {
            validateForm();
        });

        function validateForm() {
            let form = $('#myForm');
            let isValid = true;

            form.find('input, textarea').each(function () {
                let input = $(this);

                if (!input.val()) {
                    input.addClass('is-invalid').removeClass('is-valid');
                    isValid = false;
                } else {
                    input.addClass('is-valid').removeClass('is-invalid');
                }
            });

            if (isValid) {
                // Thu thập dữ liệu
                let formData = {
                    id: selectedItemId !== null ? selectedItemId : data.length + 1,
                    nguoiThu: $('#collecter-name').val(),
                    tongThu: $('#total-amount').val(),
                    ngayThu: $('#date').val(),
                    noiDung: $('#message-textarea').val(),
                };

                if (selectedItemId !== null) {
                    // Update the existing item
                    let index = data.findIndex((item) => item.id == selectedItemId);
                    if (index !== -1) {
                        data[index] = formData;
                    }

                    displayRows(data, rowsPerPage, currentPage);
                    setupPagination(data, rowsPerPage);
                } else {
                    // Add new item
                    data.push(formData);

                    //Xếp phần tử mới lên đầu
                    sortDirection = 'desc';
                    sortKey = 'id';
                    sortData(sortKey, sortDirection);
                    updateSortIcons();
                }

                // Đóng modal
                $('#addModal').modal('hide');

                // Xóa các class trạng thái hợp lệ
                form.find('input, textarea').removeClass('is-valid is-invalid');

                selectedItemId = null;
            }
        }

        displayRows(data, rowsPerPage, currentPage);
        setupPagination(data, rowsPerPage);
        updateSortIcons();
    }).fail(function () {
        console.error('Không thể tải dữ liệu từ tệp JSON.');
    });
});
