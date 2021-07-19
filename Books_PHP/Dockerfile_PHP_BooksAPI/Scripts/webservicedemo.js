function getAllBooks()
{
    $.ajax({
        url: '/books',
        type: 'GET',
        cache: false,
        dataType: 'json',
        success: function (data) {
            createBooksTable(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

function addBook()
{
    var publishDate = new Date($('#bookdateyear').val(), $('#bookdatemonth').val() - 1, $('#bookdateday').val()).toISOString().slice(0, 19).replace('T', ' ');
    var book = {
		BookId: 0,
        Title: $('#booktitle').val(),
        Author: $('#bookauthor').val(),
        Genre: $('#bookgenre').val(),
        PublishDate: publishDate,
        Description: $('#bookdesc').val(),
        Price: $('#bookprice').val()
    };

    $.ajax({
        url: '/books',
        type: 'POST',
        data: JSON.stringify(book),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            getAllBooks();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
    $("#newbookform").html("");
}

function cancelChangeBook()
{
    $("#newbookform").html("");
}

function editBook(bookId)
{
    $.ajax({
        url: '/books/' + bookId,
        type: 'GET',
        cache: false,
        dataType: 'json',
        success: function (data) {
            createEditBookForm(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

function editBookValues(bookId)
{
    var publishDate = new Date($('#bookdateyear').val(), $('#bookdatemonth').val() - 1, $('#bookdateday').val()).toISOString().slice(0, 19).replace('T', ' ');
    var book = {
        BookId: bookId,
        Title: $('#booktitle').val(),
        Author: $('#bookauthor').val(),
        Genre: $('#bookgenre').val(),
        PublishDate: publishDate,
        Description: $('#bookdesc').val(),
        Price: $('#bookprice').val()
    };

    $.ajax({
        url: '/books',
        type: 'PUT',
        data: JSON.stringify(book),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            getAllBooks();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
    $("#newbookform").html("");

}

function deleteBook(bookId)
{
    $.ajax({
        url: '/books/' + bookId,
        type: 'DELETE',
        dataType: 'json',
        success: function (data) {
            getAllBooks();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + '\n' + textStatus + '\n' + errorThrown);
        }
    });
}

function createBooksTable(books)
{
    var strResult = '<div class="col-md-12">' + 
                    '<table class="table table-bordered table-hover">' +
                    '<thead>' +
                    '<tr>' +
                    '<th>Title</th>' +
                    '<th>Author</th>' +
                    '<th>Description</th>' +
                    '<th>&nbsp;</th>' +
                    '<th>&nbsp;</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>';
    $.each(books, function (index, book) 
    {                        
        strResult += "<tr><td>" + book.Title + "</td><td> " + book.Author + "</td><td>" + book.Description + "</td><td>";
        strResult += '<input type="button" value="Edit Book" class="btn btn-sm btn-primary" onclick="editBook(' + book.BookId + ');" />';
        strResult += '</td><td>';
        strResult += '<input type="button" value="Delete Book" class="btn btn-sm btn-primary" onclick="deleteBook(' + book.BookId + ');" />';
        strResult += "</td></tr>";
    });
    strResult += "</tbody></table>";
    $("#allbooks").html(strResult);
}

function createNewBookForm()
{
    var strResult = '<div class="col-md-12">';
    strResult += '<form class="form-horizontal" role="form">';
    strResult += '<div class="form-group"><label for="booktitle" class="col-md-3 control-label">Book Title</label><div class="col-md-9"><input type="text" class="form-control" id="booktitle"></div></div>';
    strResult += '<div class="form-group"><label for="bookauthor" class="col-md-3 control-label">Author</label><div class="col-md-9"><input type="text" class="form-control" id="bookauthor"></div></div>';
    strResult += '<div class="form-group"><label for="bookdesc" class="col-md-3 control-label">Description</label><div class="col-md-9"><input type="text" class="form-control" id="bookdesc"></div></div>';
    strResult += '<div class="form-group"><label for="bookgenre" class="col-md-3 control-label">Genre</label><div class="col-md-9"><input type="text" class="form-control" id="bookgenre"></div></div>';
    strResult += '<div class="form-group"><label for="bookdateday" class="col-md-3 control-label">Publication Date</label><div class="col-md-1"><input type="text" class="form-control" id="bookdateday" placeholder="dd" size="2"></div><div class="col-md-1"><input type="text" class="form-control" id="bookdatemonth" placeholder="mm" size="2"></div><div class="col-md-1"><input type="text" class="form-control" id="bookdateyear" placeholder="yyyy" size="4"></div></div>';
    strResult += '<div class="form-group"><label for="bookprice" class="col-md-3 control-label">Price</label><div class="col-md-9"><input type="text" class="form-control" id="bookprice"></div></div>';
    strResult += '<div class="form-group"><div class="col-md-offset-3 col-md-9"><input type="button" value="Add Book" class="btn btn-sm btn-primary" onclick="addBook();" />&nbsp;&nbsp;<input type="button" value="Cancel" class="btn btn-sm btn-primary" onclick="cancelChangeBook();" /></div></div>';
    strResult += '</form></div>';
    $("#newbookform").html(strResult);
}

function createEditBookForm(book)
{
    var publishDate = new Date(book.PublishDate);
    var strResult = '<div class="col-md-12">';
    strResult += '<form class="form-horizontal" role="form">';
    strResult += '<div class="form-group"><label for="booktitle" class="col-md-3 control-label">Book Title</label><div class="col-md-9"><input type="text" class="form-control" id="booktitle" value="' + book.Title + '" ></div></div>';
    strResult += '<div class="form-group"><label for="bookauthor" class="col-md-3 control-label">Author</label><div class="col-md-9"><input type="text" class="form-control" id="bookauthor" value="' + book.Author + '" ></div></div>';
    strResult += '<div class="form-group"><label for="bookdesc" class="col-md-3 control-label">Description</label><div class="col-md-9"><input type="text" class="form-control" id="bookdesc"  value="' + book.Description + '" ></div></div>';
    strResult += '<div class="form-group"><label for="bookgenre" class="col-md-3 control-label">Genre</label><div class="col-md-9"><input type="text" class="form-control" id="bookgenre" value="' + book.Genre + '" ></div></div>';
    strResult += '<div class="form-group"><label for="bookdateday" class="col-md-3 control-label">Publication Date</label><div class="col-md-1"><input type="text" class="form-control" id="bookdateday" placeholder="dd" size="2" value="' + publishDate.getDate() + '"> </div><div class="col-md-1"><input type="text" class="form-control" id="bookdatemonth" placeholder="mm" size="2" value="' + (publishDate.getMonth() + 1) + '"></div><div class="col-md-1"><input type="text" class="form-control" id="bookdateyear" placeholder="yyyy" size="4" value="' + publishDate.getFullYear() + '"></div></div>';
    strResult += '<div class="form-group"><label for="bookprice" class="col-md-3 control-label">Price</label><div class="col-md-9"><input type="text" class="form-control" id="bookprice" value="' + book.Price + '" ></div></div>';
    strResult += '<div class="form-group"><div class="col-md-offset-3 col-md-9"><input type="button" value="Edit Book" class="btn btn-sm btn-primary" onclick="editBookValues(' + book.BookId + ');" />&nbsp;&nbsp;<input type="button" value="Cancel" class="btn btn-sm btn-primary" onclick="cancelChangeBook();" /></div></div>';
    strResult += '</form></div>';
    $("#newbookform").html(strResult);

}