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

        function displayRows(data, rowsPerPage, page) {
            $tableBody.empty();
            page--;

            const start = rowsPerPage * page;
            const end = start + rowsPerPage;
            const paginatedItems = data.slice(start, end);

            paginatedItems.forEach((item) => {
                const row = `
                <tr>
                    <th scope="row">${item.id}</th>
                    <td>${item.nguoiThu}</td>
                    <td>${item.loaiThuPhi}</td>
                    <td>${item.noiDung}</td>
                    <td class="text-primary">${item.tongThu}</td>
                    <td>${item.ngayThu}</td>
                    <td>
                        <div class="table-action">
                            <button class="btn"><i class="fa-solid fa-pen-to-square text-primary"></i></button>
                            <button class="btn"><i class="fa-solid fa-trash-can text-danger"></i></button>
                        </div>
                    </td>
                </tr>
            `;
                $tableBody.append(row);
            });

            $paginationInfo.text(`Trang ${page + 1} trên ${Math.ceil(data.length / rowsPerPage)}`);
        }

        function setupPagination(data, rowsPerPage) {
            $pagination.empty();
            const pageCount = Math.ceil(data.length / rowsPerPage);

            $pagination.append(
                `<li class="page-item" id="prev-page"><a class="page-link" href="#">Trang trước</a></li>`,
            );

            for (let i = 1; i <= pageCount; i++) {
                const btn = paginationButton(i, data);
                $pagination.append(btn);
            }

            $pagination.append(
                `<li class="page-item" id="next-page"><a class="page-link" href="#">Trang tiếp</a></li>`,
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

        displayRows(data, rowsPerPage, currentPage);
        setupPagination(data, rowsPerPage);
        updateSortIcons();
    }).fail(function () {
        console.error('Không thể tải dữ liệu từ tệp JSON.');
    });
});
