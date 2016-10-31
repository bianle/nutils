/**
 * Created by BL on 2016/7/18.
 */
function asciiHex2native(strAscii) {
    var output = "";
    var posFrom = 0;
    var posTo = strAscii.indexOf("\\x", posFrom);
    while (posTo >= 0) {
        output += strAscii.substring(posFrom, posTo);
        var s="";
        s=strAscii.substr(posTo, 4).replace("\\x","")
        var arr=s.split(""), n=arr.length,k=0, s=0
        for(var i=0;i<n;i++){
            k=n-i-1;
            var a=arr[i].toLocaleLowerCase();
            if(a=="a"){a=10;}
            else if(a=="b"){a=11;}
            else if(a=="c"){a=12;}
            else if(a=="d"){a=13;}
            else if(a=="e"){a=14;}
            else if(a=="f"){a=15;}
            s+=(a)*Math.pow(16,k);
        }
        output += String.fromCharCode(s);
        posFrom = posTo + 4;
        posTo = strAscii.indexOf("\\x", posFrom);
    }
    output+=strAscii.substring(posFrom);
    return ascii2native(output);
}
function ascii2native(strAscii) {
    var output = "";
    var posFrom = 0;
    var posTo = strAscii.indexOf("\\u", posFrom);
    while (posTo >= 0) {
        output += strAscii.substring(posFrom, posTo);
        output += toChar(strAscii.substr(posTo, 6));
        posFrom = posTo + 6;
        posTo = strAscii.indexOf("\\u", posFrom);
    }
    output += strAscii.substr(posFrom);
    return output;
}
function toChar(str) {
    if (str.substr(0, 2) != "\\u") return str;
    var code = 0;
    for (var i=2; i<str.length; i++) {
        var cc = str.charCodeAt(i);
        if (cc >= 0x30 && cc <= 0x39)
            cc = cc - 0x30;
        else if (cc >= 0x41 && cc <= 0x5A)
            cc = cc - 0x41 + 10;
        else if (cc >= 0x61 && cc <= 0x7A)
            cc = cc - 0x61 + 10;
        code <<= 4;
        code += cc;
    }

    if (code < 0xff) return str;
    return String.fromCharCode(code);
}
console.log("\\u8fd9\\u4e2a");
var str = ascii2native("\\u8fd9\\u4e2a");
console.log(str)