var dataTable;

$(document).ready(function () {
    var url = window.location.search;
    if (url.includes("inprocess")) {
        loadDataTable("inprocess");
    }
    else if (url.includes("completed")) {
        loadDataTable("completed");
    }
    else if (url.includes("pending")) {
        loadDataTable("pending");
    }
    else if (url.includes("approved")) {
        loadDataTable("approved");
    }
    else {
        loadDataTable("all");
    }

});

function loadDataTable(status) {
    console.log("Loading DataTable...");
    dataTable = $("#tblData").DataTable({
        ajax: {
            url: "/admin/order/getall?status=" + status,
            type: "GET",
            datatype: "json",
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Error loading data: ", textStatus, errorThrown);
            }
        },
        columns: [
            { data: "id", width: "10%" },  // ID column
            { data: "name", width: "30%" },  // Name column
            { data: "phoneNumber", width: "15%" },  // Phone Number column
            { data: "orderStatus", width: "15%" },  // Order Status column (corrected closing bracket)
            { data: "orderTotal", width: "10%" },  // Order Total column
            {
                data: "id",
                render: function (data) {
                    return `<div class="w-75 btn-group" role="group">
                                <a href="/admin/order/details?orderId=${data}" class="btn btn-primary mx-1">
                                    <i class="bi bi-pencil-square p-1"></i>
                                </a>
                            </div>`;
                },
                width: "20%",  // Action column for edit button
            },
        ],
        error: function (xhr, error, code) {
            console.log("Error during DataTables processing:", xhr, error, code);
        }
    });
}
