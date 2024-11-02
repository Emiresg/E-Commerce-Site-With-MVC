﻿$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    console.log("Loading DataTable...");
    dataTable = $("#tblData").DataTable({
        ajax: {
            url: "/admin/category/getall",
            type: "GET",
            datatype: "json",
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Error loading data: ", textStatus, errorThrown);
            }
        },
        columns: [
            { data: "name", width: "30%" },
            { data: "displayOrder", width: "30%" },
            {
                data: "id",
                render: function (data) {
                    return `<div class="w-75 btn-group" role="group">
                                <a href="/admin/category/upsert?id=${data}" class="btn btn-primary mx-1"> <i class="bi bi-pencil-square p-1"></i>Edit</a>
                                <a onClick=Delete('/admin/category/delete/${data}') class="btn btn-danger mx-1"> <i class="bi bi-trash p-1"></i>Delete</a>
                            </div>`;
                },
                width: "40%",
            },
        ],
        error: function (xhr, error, code) {
            console.log(xhr, error, code);
        }
    });
}


function Delete(url) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function (data) {
                    if (data.success) {
                        dataTable.ajax.reload();
                        toastr.success(data.message);
                    }
                },
                error: function (xhr, status, error) {
                    toastr.error("Error occurred while deleting.");
                    console.error("Delete error: ", xhr, status, error);
                }
            });
        }
    });
}