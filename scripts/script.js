(function(window, document) {

     function Table() {
        this.table = {};
        this.domElems = {
            row: document.getElementsByClassName('my__row')[0]
        };
     }

     Table.prototype.init = function() {
        this.getData();
     };

     Table.prototype.getData = function() {
       var __self = this;

       fetch('trainlist.json')
           .then(function(response) {
                return response.json()
            })
           .then(function(data) {
                __self.table = data.tp[0].list;

                __self.update();
           })
           .catch( function(err){ console.log(err)} );
     };

     Table.prototype.update = function() {
        var tableHtml = this.generateAll();
        tableDomElem = document.querySelectorAll('tbody')[0];

        tableDomElem.appendChild(tableHtml);
     };

     Table.prototype.generateAll = function() {
        var __self = this;

        var rowHtml = document.createDocumentFragment();

        this.table.forEach(function(item) {
            rowHtml.appendChild(__self.generateRow(item));
        });

        return rowHtml;
     };

     Table.prototype.generateRow = function(itemData) {
        var newRow = this.domElems.row.cloneNode(true);

        newRow.classList.remove('my__row');

        newRow.getElementsByClassName('number')[0].innerHTML = itemData.number ? itemData.number : 'нет';
        newRow.getElementsByClassName('brand')[0].innerHTML = itemData.brand ? itemData.brand : 'нет';
        newRow.getElementsByClassName('dateTime0')[0].innerHTML = `${itemData.date0} <span>${itemData.time0}</span>`;
        newRow.getElementsByClassName('route0')[0].innerHTML = itemData.route0;
        newRow.getElementsByClassName('route1')[0].innerHTML = itemData.route1;
        newRow.getElementsByClassName('dateTime1')[0].innerHTML = (itemData.date1 && itemData.time1) ? `${itemData.date1} <span>${itemData.time1}</span>` : 'нет';
        newRow.getElementsByClassName('timeInWay')[0].innerHTML = itemData.timeInWay;
        newRow.getElementsByClassName('carrier')[0].innerHTML = itemData.carrier;

        return newRow;
     };

     var table = new Table();

     table.init();

})(window, document);
