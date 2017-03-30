var grid = document.getElementById('table');

var ascending = false;

grid.onclick = function(e) {
    if (e.target.tagName != 'TH') return;

    sortGrid(e.target.cellIndex, e.target.getAttribute('data-type'));
    //console.log(e.target.cellIndex);
    //console.log(e.target.getAttribute('data-type'));
    var thead = grid.getElementsByTagName('thead')[0];
    if (ascending) {
       ascending = false;
      } else {
       ascending = true;
      }

    //console.log(thead.rows.cells[e.target.cellIndex].innerHTML);
    $( this ).toggleClass(function() {
      if (ascending) {
        return "sortUp";
      } else {
        return "sortDown";
      }
    });

};

function sortGrid(colNum, type) {
    var tbody = grid.getElementsByTagName('tbody')[0];

    var rowsArray = [].slice.call(tbody.rows);

    //console.log(rowsArray);

    var compare;

    if (ascending) {
        switch (type) {
            case 'number':
                compare = function(rowA, rowB) {
                    //console.log(rowA.cells[colNum].innerHTML.replace(/\D/g, ""));
                    return rowA.cells[colNum].innerHTML.replace(/\D/g, "") - rowB.cells[colNum].innerHTML.replace(/\D/g, "");
                };
                break;
            case 'string':
                compare = function(rowA, rowB) {
                    return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ? 1 : -1;
                };
                break;
        }
    } else {
        switch (type) {
            case 'number':
                compare = function(rowA, rowB) {
                    //console.log(rowA.cells[colNum].innerHTML.replace(/\D/g, ""));
                    return rowB.cells[colNum].innerHTML.replace(/\D/g, "") - rowA.cells[colNum].innerHTML.replace(/\D/g, "");
                };
                break;
            case 'string':
                compare = function(rowA, rowB) {
                    return rowA.cells[colNum].innerHTML < rowB.cells[colNum].innerHTML ? 1 : -1;
                };
                break;
        }
    }

    rowsArray.sort(compare);

    grid.removeChild(tbody);

    for (var i = 0; i < rowsArray.length; i++) {
        tbody.appendChild(rowsArray[i]);
        //console.log(rowsArray[i]);
    }

    //toggleSort(sort);

  //  console.log(sort);

    grid.appendChild(tbody);
}

// $( "div.foo" ).toggleClass(function() {
//   if ( $( this ).parent().is( ".bar" ) ) {
//     return "happy";
//   } else {
//     return "sad";
//   }
// });
//
// function toggleSort(sort) {
//     return sort = !sort;
// }
