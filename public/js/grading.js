/*
 Grading
*/
$('.list-group-item-action').on('click', (e) => {
    e.preventDefault();
    $('#assignment-project-id').val(e.currentTarget.id);
    $('#project-grade').html($(e.currentTarget).attr('data-grade'));
    $('#project-grade-error').html('');
});

$('#grade-form-remove').click((e) => {
    e.preventDefault();

    var form = $('#assignment-grade-form');
    var url = form.attr('action');

    $.ajax({
        type: 'DELETE',
        url,
        data: form.serialize(),
        success: (data) => {
            if (data.project_id != null) {
                $('#project-grade').html('N.A.');
                $(`#${data.project_id}`).attr('data-grade', 'N.A.');
            }
        },
    });
});

$('#grade-form-finalized').click((e) => {
    e.preventDefault();

    var url = $(e.currentTarget).data('url');

    if (confirm('Do you want to finalize grades?')) {
        $.ajax({
            type: 'PUT',
            url: `${url}.json`,
            data: { assignment: { grades_finalized: true } },
            success: (data) => {
                $('#assignment-grade-form').html('Grades have been finalized!');
            },
        });
    }
});

$('#grade-form-submit').click((e) => {
    e.preventDefault();

    var form = $('#assignment-grade-form');
    var type = 'POST';
    var url = form.attr('action');

    if ($('#assignment-grade-grade').val() !== '') {
        $.ajax({
            type,
            url,
            data: form.serialize(),
            datatype: 'json',
            success: (data) => {
                $('#project-grade').html(data.grade);
                $(`#${data.project_id}`).attr('data-grade', data.grade);
                $('#project-grade-error').html('');
                $('#assignment-grade-grade').val('');
            },
            error: (data) => {
                $('#project-grade-error').html(`* ${data.responseJSON.error}`);
                $('#assignment-grade-grade').val('');
            },
        });
    }
});