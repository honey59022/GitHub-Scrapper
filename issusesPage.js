const request=require("request");
const cheerio=require("cheerio");
const fs=require("fs");
const path=require("path");
const pdfKit=require("pdfkit");



function getIssues(url,topicName,repoName){
    
    request(url,function(error,respone,html){
        if(error){
            console.log(error);
        }
        else{
            issuesLink(html);
        }
    });

    function issuesLink(html){
        let $=cheerio.load(html);
        let issuesEleArr=$(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        
        
        let arr=[];
        for(let i=0;i<issuesEleArr.length;i++){
            let link=$(issuesEleArr[i]).attr("href");
            arr.push(link);
        }

        let text=JSON.stringify(arr);
        // makeJSONFile(topicName,repoName,text);
        makePDFFile(topicName,repoName,text)
    }

    
}




function makeJSONFile(topicName,repoName,text){
    let dirPath=path.join(__dirname,topicName);

    if(fs.existsSync(dirPath)==false)fs.mkdirSync(dirPath);

    
    let filePath=path.join(dirPath,repoName+".json");
    fs.writeFileSync(filePath,text);
}


function makePDFFile(topicName,repoName,text){
    let dirPath=path.join(__dirname,topicName);

    if(fs.existsSync(dirPath)==false)fs.mkdirSync(dirPath);


    let filePath=path.join(dirPath,repoName+".pdf");

    let pdfDoc=new pdfKit();
    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.text(text);
    pdfDoc.end();
    
}



module.exports=getIssues;