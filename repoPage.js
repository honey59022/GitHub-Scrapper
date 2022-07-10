const request=require("request");
const cheerio=require("cheerio");
const fs=require("fs");
const path=require("path");
const getIssues=require("./issusesPage");


function getRepoLinks(url,topicName){
    request(url,function(error,respone,html){
        if(error){
            console.log(error);
        }
        else{
            repoLinks(html,topicName);
        }
    });


    function repoLinks(html,topicName){
        let $=cheerio.load(html);
        let repoArrEle=$(".f3.color-fg-muted.text-normal.lh-condensed");
        
        for(let i=0;i<8;i++){
            let twoAnchorTageEle=$(repoArrEle[i]).find("a");
            let href=$(twoAnchorTageEle[1]).attr("href");

            let repoName=href.split("/").pop();
            let repoIssueFullLink=`https://github.com${href}/issues`;

            
            getIssues(repoIssueFullLink,topicName,repoName);
        }
    }
}


module.exports=getRepoLinks;