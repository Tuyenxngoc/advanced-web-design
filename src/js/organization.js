$(document).ready(function () {
    // URL của tệp JSON
    var data = [
        {
            id: 1,
            maDoan: 'cntt',
            tenDoan: 'CNTT07',
            nghanhHoc: 'Công nghệ thông tin',
        },
        {
            id: 2,
            maDoan: 'ktpm',
            tenDoan: 'KTPM01',
            nghanhHoc: 'Kỹ thuật phần mềm',
        },
        {
            id: 3,
            maDoan: 'httt',
            tenDoan: 'HTTT02',
            nghanhHoc: 'Hệ thống thông tin',
        },
    ];

    // Variable for class and ID selectors
    const selectors = {
        tableBody: '#data-table tbody',
        pagination: '#pagination',
        paginationInfo: '#pagination-info',
        editBtn: '.edit-btn',
        deleteBtn: '.delete-btn',
        maDoan: '#maDoan',
        tenDoan: '#tenDoan',
        nghanhHoc: '#nghanhHoc',
        addModal: '#addModal',
        deleteConfirmModal: '#deleteConfirmModal',
        confirmDeleteButton: '#confirmDeleteButton',
        myForm: '#myForm',
        addBtn: '#add-btn',
        addFilter: '#add-filter',
        filterBox: '#filter-box',
        filterBy: '#filter-by',
        filterValue: '#filter-value',
        exportBtn: '#export-btn',
        saveBtn: '#save-btn',
    };

    const rowsPerPage = 10;
    const $tableBody = $(selectors.tableBody);
    const $pagination = $(selectors.pagination);
    const $paginationInfo = $(selectors.paginationInfo);
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
                    <td>${item.maDoan}</td>
                    <td>${item.tenDoan}</td>
                    <td>Công nghệ thông tin</td>
                    <td>${item.nghanhHoc}</td>
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
        $(selectors.editBtn).on('click', function () {
            // Lấy ra id
            selectedItemId = $(this).closest('tr').find('.key').text();

            resetForm(selectors.myForm);

            // Cập nhận thông tin vào modal
            const selectedItem = data.find((item) => item.id == selectedItemId);
            if (selectedItem) {
                $(selectors.maDoan).val(selectedItem.maDoan);
                $(selectors.tenDoan).val(selectedItem.tenDoan);
                $(selectors.nghanhHoc).val(selectedItem.nghanhHoc);

                // Hiển thị modal
                $(selectors.addModal).modal('show');
            }
        });

        // Gắn sự kiện nút xóa
        $(selectors.deleteBtn).on('click', function () {
            selectedItemId = $(this).closest('tr').find('.key').text();
            $(selectors.deleteConfirmModal).modal('show');
        });
    }

    function setupPagination(data, rowsPerPage) {
        $pagination.empty();
        if (data.length === 0) {
            return;
        }
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
                updatePaginationButtons(data.length);
            }
        });

        $('#next-page').on('click', function (e) {
            e.preventDefault();
            const pageCount = Math.ceil(data.length / rowsPerPage);
            if (currentPage < pageCount) {
                currentPage++;
                displayRows(data, rowsPerPage, currentPage);
                updatePaginationButtons(data.length);
            }
        });

        updatePaginationButtons(data.length);
    }

    function paginationButton(page, data) {
        const $button = $(`<li class="page-item"><a class="page-link" href="#">${page}</a></li>`);

        if (currentPage === page) $button.addClass('active');

        $button.on('click', function (e) {
            e.preventDefault();
            currentPage = page;
            displayRows(data, rowsPerPage, currentPage);
            updatePaginationButtons(data.length);
        });

        return $button;
    }

    function updatePaginationButtons(totalElements) {
        $('.page-item').removeClass('active');
        $(`#pagination .page-item:eq(${currentPage})`).addClass('active');

        const pageCount = Math.ceil(totalElements / rowsPerPage);

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
    $(selectors.confirmDeleteButton).on('click', function () {
        data = data.filter((item) => item.id != selectedItemId);
        displayRows(data, rowsPerPage, currentPage);
        setupPagination(data, rowsPerPage);
        $(selectors.deleteConfirmModal).modal('hide');

        //Reset id được chọn
        selectedItemId = null;
    });

    function resetForm(selector) {
        // Reset các giá trị trong form
        $(selectors.maDoan).val('');
        $(selectors.tenDoan).val('');

        // Reset các lỗi
        let form = $(selector);
        form.find('input, textarea').each(function () {
            let input = $(this);
            input.removeClass('is-invalid is-valid');
        });
    }

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

    // Xử lý sự kiện thêm mới
    $(selectors.addBtn).on('click', function () {
        selectedItemId = null;

        resetForm(selectors.myForm);

        $(selectors.addModal).modal('show');
    });

    //Xử lý sự kiện lọc
    $(selectors.addFilter).on('click', function () {
        $(selectors.filterBox).hide();
        currentPage = 1;

        var filterBy = $(selectors.filterBy).val();
        var filterValue = $(selectors.filterValue).val().trim();

        if (filterValue) {
            var filterData = data.filter(function (item) {
                return item[filterBy].includes(filterValue);
            });
            displayRows(filterData, rowsPerPage, currentPage);
            setupPagination(filterData, rowsPerPage);
        } else {
            displayRows(data, rowsPerPage, currentPage);
            setupPagination(data, rowsPerPage);
        }
    });

    // Xử lý sự kiện export file
    $(selectors.exportBtn).on('click', function () {
        var newData = [];
        var headers = ['ID', 'Mã Chi Đoàn', 'Tên Chi Đoàn', 'Tên Đoàn Cơ Sở', 'Nghành Học'];
        newData.push(headers);

        data.forEach((item) => {
            var row = [];
            row.push(item.id);
            row.push(item.maDoan);
            row.push(item.tenDoan);
            row.push('Công nghệ thông tin');
            row.push(item.nghanhHoc);
            newData.push(row);
        });

        var ws = XLSX.utils.aoa_to_sheet(newData);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'DuLieuDoanCoSo.xlsx');
    });

    // Xử lý form
    $(selectors.saveBtn).on('click', function () {
        validateForm();
    });

    function validateForm() {
        let form = $(selectors.myForm);
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
                maDoan: $(selectors.maDoan).val(),
                tenDoan: $(selectors.tenDoan).val(),
                nghanhHoc: $(selectors.nghanhHoc).val(),
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

                currentPage = 1;
                //Xếp phần tử mới lên đầu
                sortDirection = 'desc';
                sortKey = 'id';
                sortData(sortKey, sortDirection);
                updateSortIcons();
            }

            // Đóng modal
            $(selectors.addModal).modal('hide');

            // Xóa các class trạng thái hợp lệ
            form.find('input, textarea').removeClass('is-valid is-invalid');

            selectedItemId = null;
        }
    }

    displayRows(data, rowsPerPage, currentPage);
    setupPagination(data, rowsPerPage);
    updateSortIcons();
});
