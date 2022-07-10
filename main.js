const request=require("request");
const cheerio=require("cheerio");
const fs=require("fs");
const path=require("path");
const getRepoLinks=require("./repoPage");


const url="https://github.com/topics";


function getTopicsLink(url){
    request(url,function(error,response,html){
        if(error){
            console.log(error);
        }
        else{
            topicLinks(html);
        }
    });

    function topicLinks(html){
        let $=cheerio.load(html);

        let topicArrEle=$(".no-underline.d-flex.flex-column.flex-justify-center");

        for(let i=0;i<topicArrEle.length;i++){
            let href=$(topicArrEle[i]).attr("href");

            let topicName=href.split("/").pop();
            let topicFullLinks=`https://github.com${href}`;

            
            getRepoLinks(topicFullLinks,topicName);
        }
    }

}


getTopicsLink(url);