$(document).ready(function () {
    // Lấy dữ liệu từ file JSON và điều khiển dropdown select
    $.getJSON('../data/address.json', function (data) {
        var $provinceSelect = $('#provinceSelect1');
        $.each(data.province, function (index, province) {
            $provinceSelect.append('<option value="' + province.idProvince + '">' + province.name + '</option>');
        });

        var $districtSelect = $('#districtSelect1');
        $provinceSelect.on('change', function () {
            var selectedProvinceId = $(this).val();
            $.each(data.district, function (index, district) {
                if (district.idProvince === selectedProvinceId) {
                    $districtSelect.append(
                        '<option value="' + district.idDistrict + '">' + district.name + '</option>',
                    );
                }
            });
        });

        // Select Commune
        var $communeSelect = $('#communeSelect1');
        $districtSelect.on('change', function () {
            var selectedDistrictId = $(this).val();
            $.each(data.commune, function (index, commune) {
                if (commune.idDistrict === selectedDistrictId) {
                    $communeSelect.append('<option value="' + commune.idCommune + '">' + commune.name + '</option>');
                }
            });
        });
        var $provinceSelect2 = $('#provinceSelect2');
        $.each(data.province, function (index, province) {
            $provinceSelect2.append('<option value="' + province.idProvince + '">' + province.name + '</option>');
        });

        var $districtSelect2 = $('#districtSelect2');

        $provinceSelect2.on('change', function () {
            var selectedProvinceId = $(this).val();
            $.each(data.district, function (index, district) {
                if (district.idProvince === selectedProvinceId) {
                    $districtSelect2.append(
                        '<option value="' + district.idDistrict + '">' + district.name + '</option>',
                    );
                }
            });
        });

        // Select Commune
        var $communeSelect2 = $('#communeSelect2');
        $districtSelect2.on('change', function () {
            var selectedDistrictId = $(this).val();
            $.each(data.commune, function (index, commune) {
                if (commune.idDistrict === selectedDistrictId) {
                    $communeSelect2.append('<option value="' + commune.idCommune + '">' + commune.name + '</option>');
                }
            });
        });
    });
    $.getJSON('../data/majors.json', function (data) {
        $.each(data.major, function (index, major) {
            $('#majorSelect').append('<option value="' + major.id + '">' + major.name + '</option>');
        });

        $('#majorSelect').change(function () {
            $('#branchSelect').empty();

            var selectedMajorId = $(this).val();

            $.each(data.branch, function (index, branch) {
                if (branch.idMajor === selectedMajorId) {
                    $('#branchSelect').append('<option value="' + branch.id + '">' + branch.name + '</option>');
                }
            });
        });

        // Gọi sự kiện change một lần để hiển thị branch ban đầu khi major được chọn
        $('.majorSelect').change();
    });

    $('avt-change').click(function () {
        $('#fileInput').click();
    });

    // Cập nhật ảnh khi chọn file
    $('#fileInput').change(function (event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#avatar').attr('src', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
});

$('#downloadButton').on('click', function () {
    // Đọc tệp JSON
    $.getJSON('../data/dataExampleExcel.json', function (jsonData) {
        // Chuyển đổi JSON thành worksheet
        const ws = XLSX.utils.json_to_sheet(jsonData.members);

        // Tạo workbook mới và thêm worksheet vào
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        // Xuất workbook thành file Excel
        XLSX.writeFile(wb, 'data.xlsx');
    });
});
$(document).ready(function () {
    $('#uploadButton').on('click', function () {
        $('#uploadExcel').trigger('click');
    });

    $('#uploadExcel').on('change', function (event) {
        const file = event.target.files[0];
        console.log(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(firstSheet);
                const membersTableBody = $('#membersTableBody');
                jsonData.forEach((member) => {
                    membersTableBody.append(`
                        <tr style="font-size: 11px">
                            <td>${member.id}</td>
                            <td>${member.fullname}</td>
                            <td>${member.dob}</td>
                            <td>${member.gender}</td>
                            <td>${member.nation}</td>
                            <td>${member['identification-card']}</td>
                            <td>${member['edu-lvl']}</td>
                            <td>${member['eng-lvl']}</td>
                            <td>${member.qualification}</td>
                            <td>${member['political-theory']}</td>
                            <td>${member['cur-job']}</td>
                            <td>${member.major}</td>
                            <td>${member.branch}</td>
                        </tr>
                    `);
                });
                $('#mdAdd').append(` 
                        <button type="button" class="btn btn-primary accept" data-bs-dismiss="modal">
                            <i class="fa-solid fa-paper-plane"></i><span>Phê duyệt</span>
                        </button>
                `);
            };
            reader.readAsArrayBuffer(file);
        }
    });
});
