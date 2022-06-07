var qr=require('qr-image');
var fs=require('fs');
var qrimg=qr.image('I Love U I already told you not to scan.',{type:'png',size:20});
qrimg.pipe(fs.createWriteStream('qrimage.png'));