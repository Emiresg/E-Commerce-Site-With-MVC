$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    console.log("Loading DataTable...");
    dataTable = $("#tblData").DataTable({
        ajax: {
            url: "/admin/user/getall",
            type: "GET",
            datatype: "json",
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Error loading data: ", textStatus, errorThrown);
            }
        },
        columns: [
            { data: "name", width: "20%" },
            { data: "email", width: "10%" },
            { data: "phoneNumber", width: "10%" },
            { data: "company.name", width: "15%" },
            { data: "role", width: "10%" },
            {
                data: { id: "id", lockoutEnd: "lockoutEnd" },
                render: function (data) {
                    var today = new Date().getTime();
                    var lockout = new Date(data.lockoutEnd).getTime();

                    if (lockout > today) {
                        return `
                        <div class="text-center">
                            <a onclick=LockUnlock('${data.id}') class="btn btn-success text-white" style="cursor:pointer; width:100px";>
                                <i class="bi bi-unlock-fill"></i> Unlock
                            </a>
                            <a href="/admin/user/RoleManagement?userId=${data.id}" class="btn btn-danger text-white" style="cursor:pointer; width:150px";>
                                <i class="bi bi-pencil-square"></i> Permission
                            </a>
                        </div>
                        `
                    }
                    else {
                        return `
                        <div class="text-center">
                            <a onclick=LockUnlock('${data.id}') class="btn btn-danger text-white" style="cursor:pointer; width:100px";>
                                <i class="bi bi-lock"></i> Lock
                            </a>
                            <a href="/admin/user/RoleManagement?userId=${data.id}" class="btn btn-danger text-white" style="cursor:pointer; width:150px";>
                                <i class="bi bi-pencil-square"></i> Permission
                            </a>
                        </div>
                        `
                    }
                },
                width: "25%",
            },
        ],
        error: function (xhr, error, code) {
            console.log(xhr, error, code);
        }
    });
}

function LockUnlock(id) {
    $.ajax({
        type: "POST",
        url: '/Admin/User/LockUnlock',
        data: JSON.stringify(id),
        contentType: "application/json",
        success: function (data) {
            if (data.success) {
                toastr.success(data.message);
                dataTable.ajax.reload();
            }
        }
    });
}

