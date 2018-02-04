$(function() {
    $("#sizePicker").submit(function(event){
        event.preventDefault();
        var desiredWidth = Number($("#inputWidth").val());
        var desiredHeight = Number($("#inputHeight").val());
        makeGrid(desiredWidth, desiredHeight);
    })
});

function makeGrid(width, height) {
    var table = $("#pixelCanvas");

    // Add a TBODY element if it doesn't exist yet
    if(table.children().length === 0){
        table.append("<tbody></tbody>");
    }

    var tbody = table.children().first();

    var rowCount = tbody.children().length;
    var columnCount = tbody.children().first().children().length;

    // Add missing rows
    if(height > rowCount){
        var newRowHtml = "<tr>" + "<td></td>".repeat(columnCount) + "</tr>";
        tbody.append(newRowHtml.repeat(height - rowCount));
    }

    // Remove redundant rows
    tbody.children().slice(height).remove();

    // Add missing columns
    if(width > columnCount){
        var newCellHtml = "<td></td>".repeat(width - columnCount);
        tbody.children().append(newCellHtml);
    }
    
    // Remove redundant columns
    if(width < columnCount){
        tbody.children().each(function(index, row){
            $(row).children().slice(width).remove();
        });
    }

    table.find("td").click(function(event){
        var color = $("#colorPicker").val();
        var target = $(event.target);
        if(target.attr("data-color") === color){
            $(event.target).css("background-color", "");
            target.attr("data-color", "");
        }
        else{
            $(event.target).css("background-color", color);
            target.attr("data-color", color);
        }
    });
}
