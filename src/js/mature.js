$(document).ready(function () {
    $.getJSON('../data/mature.json', function (data) {
        const memberMature = $('#member-mature');
        data.forEach((member) => {
            memberMature.append(`
                <tr class="text-center">            
                    <td><input type="checkbox"></td>
                    <td>${member.id}</td>
                    <td>${member.fullname}</td>
                    <td>${member.dob}</td>
                    <td>${member.joined}</td>
                    <td>${member.position}</td>
                </tr>
                `);
        });
    });
    $('#member-mature').on('click', 'tr', function (event) {
        var $checkbox = $(this).find('input[type="checkbox"]');
        $checkbox.prop('checked', !$checkbox.prop('checked'));
    });

    $('#matureBtn').on('click', function () {
        var checkedBoxes = $('#member-mature tr input[type="checkbox"]:checked');
        var checkedData = [];

        checkedBoxes.each(function () {
            var $row = $(this).closest('tr');
            console.log($row.find('td:eq(1)').text());
            var rowData = {
                id: $row.find('td:eq(1)').text(),
                fullname: $row.find('td:eq(2)').text(),
                dob: $row.find('td:eq(3)').text(),
                joined: $row.find('td:eq(4)').text(),
                position: $row.find('td:eq(5)').text(),
            };
            checkedData.push(rowData);
        });

        console.log(checkedData);
    });
});
