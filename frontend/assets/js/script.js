$(function () {
    var screem = $(window).height(), li = $('.sidebar nav ul li'), main = padding = 0, count = li.length;
    if (screem > 798) {
        main = screem - ($('header').height() + $('footer').height());
        $('main').height(main);
    }
    var padding = parseInt(100 / count);
    if (padding !== 100) {
        padding += 1;
    }
    for (var number = 0; number < (count + 1); number++) {
        li.eq(number).css('padding', padding + '% 0%');
    }
    $.ajax({
        url: 'http://python-server:5000/minimundos',
        method: 'get',
        crossDomain: true,
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        sucess: function (response) {
            result(response);
        },
        error: function (response) {
            console.error('Error:', response);
        }
    });

    $(document).on('click', '#add a', function () {
        $('#result').html('<form action="http://python-server:5000/minimundo" id="api-python"></form><input type="text" name="name" placeholder="name" value=""><select value="type"><option value="">Selecionar o tipo</option></option></select><textarea></textarea><input type="submit" value="Cadastar" name="save">');
        $('#add').css('display', 'none');
    });

    $(document).on('submit', '#api-python', function (event) {
        event.preventDefault();
        $.ajax({
            data: {
                name: $('input[name="name"]').val(),
                type: $('select[name="type"]').val(),
                smallword: $('textarea').val()
            }, url: $(this).attr('action'), method: 'POST',
            crossDomain: true,
            headers: {
                "accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            success: function (response) {
                $('#add').css('display', 'block');
                $.ajax({
                    url: 'http://python-server:5000/minimundos',
                    method: 'get',
                    crossDomain: true,
                    headers: {
                        "accept": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    },
                    sucess: function (response) {
                        result(response);
                    },
                    error: function (response) {
                        console.error('Error:', response);
                    }
                });
            },
            error: function (response) {
                console.error('Error:', response);
            }
        });
    });
    $(document).on('click', '.form-delete', function () {
        if (confirm('Quer mesmo deletar essa linha?')) {
            $.ajax({
                url: $(this).attr('href'),
                method: 'DELETE',
                crossDomain: true,
                headers: {
                    "accept": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                success: function (response) {

                    $.ajax({
                        url: 'http://python-server:5000/minimundos',
                        method: 'get',
                        crossDomain: true,
                        headers: {
                            "accept": "application/json",
                            "Access-Control-Allow-Origin": "*"
                        },
                        sucess: function (response) {
                            result(response);
                        },
                        error: function (response) {
                            console.error('Error:', response);
                        }
                    });
                }, error: function (response) {
                    console.error('Error:', response);
                }
            });
        }
    });

    function result(resultset) {
        var table;
        if ($('#result table').length === -1) {
            table = $('table');
            var th = [];
            $.each(['nome', 'tipo', 'opções'], function (index, element) {
                th[index] = $('th').text(element);
            });
            var thead = $('thead').append($('tr').append(th.join('')));
        }
        var tr = [];
        $.each(resultset, function (index, element) {
            var td = [];
            $.each(element, function (key, value) {
                if (key === 0) {
                    var id = value;
                } else {
                    if (key === 3) {
                        td[key] = $('td').html('<a href="http://python-server:5000/smallword?id=' + id + '" class="form-delete"><span class="icon-lixeira"></span></a>');
                    } else {
                        td[key] = $('td').text(value);
                    }
                }
            });
            tr[index] = $('tr').attr('data-id', id).append(td.join(''));
        });
        if (table !== 'undefined') {
            var tbody = $('tbody').append(tr.join(''));
            $('#result').append(table.append(thead).append(tbody));
        } else {
            $('#result table tbody').append(tr.join(''));
        }
    }
});