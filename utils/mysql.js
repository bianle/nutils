/**
 * Created by BL on 2016/8/10.
 */
var Promise = require("bluebird");

var mysql = require('mysql');
var dbDev = 'assp';
var dbSit = 'asspsit1';




//console.log(mysql2);

//创建连接
var clientDev = mysql.createConnection({
    host: '10.27.150.199',
    user: 'assp',
    password: 'sn_dev',
});
var clientSit = mysql.createConnection({
    host: '10.37.47.100',
    user: 'readonly',
    password: '5FxSd5ssmP',
});


clientSit.connect();
clientSit.query("use " + dbSit);

clientDev.connect();
clientDev.query("use "+dbDev);
console.log(clientDev.query);
Promise.promisify(clientDev.query, clientDev)('SELECT 1').then(function (rows) {
    console.log('got rows!')
    console.dir(rows)
    clientDev.end()
})

var sync = function(fromSql,toSql){
    clientSit.query(
        fromSql,
        function selectCb(err, results, fields) {
            if (err) {
                throw err;
            }
            if (results) {
                for (var i = 0; i < results.length; i++) {
                    //console.log("%s",JSON.stringify( results[i]));
                    var query = clientDev.query(toSql, results[i], function(err, result) {
                        if (err) {
                            return clientDev.rollback(function() {
                                //throw err;
                            });
                        }
                        clientDev.commit(function(err) {
                            if (err) {
                                return clientDev.rollback(function() {
                                    //throw err;
                                });
                            }
                            console.log('success!');
                        });
                        //clientDev.end();
                    });
                    console.log(query.sql);
                }
            }
            //clientSit.end();
        }
    );
}
//var productId = "P160809000000001";
//sync("SELECT * FROM PRODUCT_RECORD P WHERE P.COMMODITY_CODE = '"+productId+"'","INSERT INTO PRODUCT_RECORD SET ?");
//sync("select a.* from product_sale_area a,product_record p where a.SERVICE_CAT_CODE = p.CATEGORY and p.COMMODITY_CODE = '"+productId+"'","INSERT INTO product_sale_area  SET ?");
//sync("select s.* from product_status s,product_record p where s.COMMODITY_CODE=p.COMMODITY_CODE and p.COMMODITY_CODE = '"+productId+"'","INSERT INTO product_status  SET ?");
//sync("select prc.* from product_price prc,product_record p where prc.COMMODITY_CODE=p.COMMODITY_CODE and p.COMMODITY_CODE = '"+productId+"'","INSERT INTO product_price  SET ?");

//clientDev.end();
//clientSit.end();
