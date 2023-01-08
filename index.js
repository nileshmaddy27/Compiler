var express=require('express');
var path=require('path');
var bodyParser=require('body-parser');
var compiler=require('compilex');

// const { raw } = require('body-parser');
var app=express();
app.use(bodyParser.urlencoded({extended:false}));
// app.use(express.static('public'));
app.use('/public', express.static('public'));
// app.use('./', express.static('style.css'));
var option={stats: true};
compiler.init(option);
app.get("/", function(req, res)
{
    res.sendFile(__dirname+"/index.html");
    

});
// app.post("/compilecode", function(req, res)
// {
//     res.send("appu bhai!");
// });
app.post("/compilecode", function(req, res)
{   
    // console.log(req.body);
    // res.send(req.form);
    var code=req.body.code;
    // res.send("dsm"+code);
    var input=req.body.input;
    var inputRadio=req.body.inputRadio;
    var lang=req.body.lang;
    // console.log("nilesh");
    // res.send("appoo bhai");
    if(lang==="C" || lang==="CPP")
    {
        if(inputRadio==="true"){
            var envData={OS: "windows", cmd:"g++", options:{timeout:10000}};
        
            compiler.compileCPPWithInput(envData, code, input, function(data){
                if(data.error)
                {
                    res.send(data.error);

                }
                else{
                    res.send(data.output);
                }
            });
        }
        else{
            var envData={OS: "windows", cmd: "g++", options:{timeout:10000}};
            compiler.compileCPP(envData, code, function(data){
                res.send(data);
                //data.error
                //data.output=output value
            });
            
        }
    }
    if(lang==="Python")
    {
        if(inputRadio==="true"){
            var envData = { OS : "windows"};
        
            compiler.compilePythonWithInput( envData , code , input ,  function(data){
                res.send(data);        
            })
        }
        else{
            // var envData={OS: "windows", cmd: "python", options:{timeout:10000}};
            var envData = { OS : "windows"}; 

            var envData = { OS : "linux" }; 
            compiler.compilePython( envData , code , function(data){
                res.send(data);
            })
            
        }
    }
    if(lang==="Java")
    {
        if(inputRadio==="true"){
            var envData = { OS : "windows"}; 
            compiler.compileJavaWithInput( envData , code , input ,  function(data){
                res.send(data);
            });
        }
        else{
            var envData = { OS : "windows"}; 
            compiler.compileJava( envData , code , function(data){
            res.send(data);
            });  
            
        }
    }
    // if(lang==="Python" )
    // {
    //     if(inputRadio==="true"){
    //         var envData={OS: "windows"};
        
    //         compiler.compilePythonWithInput(envData, code, input, function(data){
    //             //c++ copied
    //             // if(data.error)
    //             // {
    //             //     res.send(data.error);

    //             // }
    //             // else{
    //             //     res.send(data.output);
    //             // }
    //             data.send(data);
    //         });
    //     }
    //     else{
    //         var envData={OS: "windows"};
    //         compiler.compilePython(envData, code, function(data){
    //             req.send(data);
    //             //data.error
    //             //data.output=output value
    //         });
            
    //     }    
    // }
});
app.get("/fullStat", function(req, res)
{
    // console.log("all temorary file flused");
    compiler.fullStat(function(data)
    {
        res.send(data);
    });
});

app.listen(3000);
// compiler.flush(function()
// {
//     console.log("all temporary file flush!");
// });
// #include<iostream>
// using namespace std;
// int main()       
// {
//     cout<<"Hello World!";
//     return 0;
// }