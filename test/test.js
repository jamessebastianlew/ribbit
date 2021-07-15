let myBlob = new Blob(["This is my blob content"], {type : "text/plain"});

let fd = new FormData();
fd.append('uploaded-content', myBlob, 'mytext.txt');

console.log(FormData)

fetch('http://localhost:5000/api/upload-audio', {
    method: 'post',
    body: fd
}); 