/**
 * Created by BL on 2016/9/22.
 */
var xlsx = require("node-xlsx");
var list = xlsx.parse("C:\\Users\\BL\\Desktop\\nnote.xlsx");
console.log(JSON.stringify(list));