
// let hi=require('./nodeVirus/index');
// hi.deleteAllRecord('ourdb','users');
const client=require('mongodb').MongoClient;
const url="mongodb://localhost:27017/ourdb";  // reset db name here
let joinTable=()=>{
    client.connect(url,{useNewUrlParser:true},(err,inst)=>{
        if(err){
            console.log("Something wrong",err);
        }else{
            let dbo=inst.db('ourdb');
            dbo.collection('products').aggregate([
                {
                    $lookup:{
                        from:'students',
                        localField:'_id',
                        foreignField:'stu_roll',
                        as :'students_orders'
                    }
                }
            ]).toArray((err,res) =>errorChecker(err,res));
        }
    });
};

joinTable();






// hi.deleteExactlyOne('ourdb','students',{name:"Moe Moe"});
// hi.deleteMany('ourdb','students',{name:"Hla Hla"});
// hi.insertMany('ourdb','students',[   
//         {name:'Tun Tun',email:'tuntun@gmail.com',password:'156123',age:26,address:"Mandalay",roll:3},
//         {name:'Naing Naing',email:'naing@gmail.com',password:'123723',age:33,address:"Yangon",roll:4} , 
//         {name:'Kyaw Kyaw',email:'Kyaw@gmail.com',password:'198723',age:19,address:"Pyae",roll:5} , 
//         {name:'Tin Tin',email:'Tin@gmail.com',password:'123723',age:24,address :"Nay Pyi Taw",roll:6} , 
//         {name:'Ma Ma',email:'ma@gmail.com',password:'324723',age:45,address:"Meiktila",roll:7} , 
//         {name:'Aye Aye',email:'aye@gmail.com',password:'123953',age:40,address: "Nyaung Oo",roll:8},
//         {name:'Phyo Phyo',email:'phyo@gmail.com',password:'3895723',age:45,address:"Meiktila",roll:9} , 
//         {name:'Thaw Thaw',email:'thaw@gmail.com',password:'123953',age:28,address: "Yangon",roll:10},
//         {name:'Hla Hla',email:'hla@gmail.com',password:'324723',age:35,address:"Mandalay",roll:11} , 
//         {name:'Moe Moe',email:'moe@gmail.com',password:'123953',age:18,address: "Nyaung Oo",roll:12}, 
// ]);
// hi.insertOne('ourdb','students',{name:'Su Su',email:'Su@gmail.com',password:'1387623',age:19,roll:2});
// hi.makeCollection('ourdb','students');
// hi.findOne('ourdb','users');
// hi.findAll('ourdb','users');
// hi.findQuery('ourdb','users',{_id:0,name:1,age:1,address:1},{name:'Naing Naing'});
//  hi.sort('ourdb','users',{age:-1},{_id:0,name:1,age:1},{address:"Nyaung Oo"});
// hi.findAndQuery('ourdb','users',{},  query={
//     address:"Meiktila",
//     age:45
// });
// hi.findOrQuery2con('ourdb','users',{},{address:"Nyaung Oo"}, {age:19});
// hi.findOrQuery3con('ourdb','users',{},{address:"Nyaung Oo"}, {age:19},{name:"Naing Naing"});
// hi.limitFind('ourdb','users',{},{},{},3);


//*************************      MAKE COLLECTION FUNCTION    **************************//
// let makeCollection = (coleName)=>{
//     client.connect(url, {useNewUrlParser: true}, (err,inst)=>{
//         if(err){
//             console.log("Something wrong",err);
//         }else{
//             let dbo=inst.db('ourdb');
//             dbo.createCollection(coleName, (err,res)=>errorChecker(err,res));
//         }
//     });
// };
//*************************      UNTIL NOW     ****************************************//







//***************************    INSERT DATA FUNCTION    ******************************//
// let insertData=(obj) => {
//     client.connect(url, {useNewUrlParser: true}, (err,inst)=>{
//         if(err){
//             console.log("Something wrong",err);
//         }else{
//             let dbo=inst.db('ourdb');
//             //insert many documents
//         dbo.collection('users').insertMany(obj, (err,res) =>errorChecker(err, res));
//         //insert one document
//         //    dbo.collection('users').insertOne(obj, (err,res) =>errorChecker(err, res)); 
            
//         }
//     });
// };
//*************************      UNTIL NOW     ****************************************//




//***************************    FIND DATA FUNCTION    ******************************//
// let findData = () => {
//     client.connect(url, {useNewUrlParser: true}, (err,inst)=>{
//         if(err){
//             console.log("Something wrong",err);
//         }else{
//             let dbo=inst.db('ourdb');
//             //find one first record  in the document
//            // dbo.collection('users').findOne({} , (err,res) =>errorChecker(err, res));
//             //find all
//             //dbo.collection('users').find({}).toArray((err,res) => errorChecker(err,res));
//             //find By Query filter specific 
//             // let query= {name:"Naing Naing"}
//             // dbo.collection('users').find(query).toArray((err,res) =>errorChecker(err,res));
//             //find query  searching name start with M
//             //  let query= {name:/^M/};
//             // dbo.collection('users').find(query).toArray((err,res) =>errorChecker(err,res));
//             //sort in Ascending Order
//             //  let mysort = {age:1};
//             // dbo.collection('users').find().sort(mysort).toArray((err,res) =>errorChecker(err,res));
//             //sort in Descending Order
//             //  let mysort = {name:-1};
//             // dbo.collection('users').find().sort(mysort).toArray((err,res) =>errorChecker(err,res));
//             // find all user's name and age
//             // dbo.collection('users').find({},{projection:{_id:0,name:1,age:1}}).toArray((err,res)=>errorChecker(err,res));
//             //Select data   "AND"   query
//             // query={
//             //     address:"Meiktila",
//             //     age:45
//             // }
//             // dbo.collection('users').find(query).toArray((err,res) =>errorChecker(err,res));
//              //Select data   "OR"   query
//             // query={
//             //     $or:[
//             //     {address:"Nyaung Oo"},
//             //     {age:19}
//             //     ]
//             // }
//             // dbo.collection('users').find(query).toArray((err,res) =>errorChecker(err,res));
//             //limit finding documetnts
//             // dbo.collection('users').find({}).limit(3).toArray((err,res) =>errorChecker(err,res));
//         }
//     });
// };
//*************************      UNTIL NOW     ****************************************//



//***************************    DELETE DATA FUNCTION    ******************************//
let deleteData=() => {
    client.connect(url, {useNewUrlParser: true}, (err,inst)=>{
        if(err){
            console.log("Something wrong",err);
        }else{
            let dbo=inst.db('ourdb');
            //specific queryနဲ႔matchျဖစ္တဲ့ documents ေတြရိွလဲဘဲ အမ်ားဆံုး document တစ္ခုသာဖ်က္သည္။
            // let query={name : "Mg Mg"};
            // dbo.collection('users').deleteOne(query,(err,res)=>errorChecker(err,res));
            //delete all documents that match a specified filter
            // let query={name : "Naing Naing"};
            // dbo.collection('users').deleteMany(query,(err,res)=>errorChecker(err,res));
            //delete a single document or all documents that match a specified filter
            // let query={name : "Aye Aye"};
            // dbo.collection('users').remove(query,(err,res)=>errorChecker(err,res));
            // //delete all data
            dbo.collection('users').deleteMany({},(err,res)=>errorChecker(err,res));

        }
    });
};
//*************************      UNTIL NOW     ****************************************//















//***************************       FIND DATA      ***********************************//
// findData();
//****************************      UNTIL NOW     ************************************//




//***************************       FIND DATA      ***********************************//
//  deleteData();
//****************************      UNTIL NOW     ************************************//




//**********************************  INSERT DATA  ************************************//
// ****insert one document
// insertData({name:'Tun Tun',email:'TunTun@gmail.com',password:'130123',age:24});    


// ****insert many documents 
// insertData([   
//         {name:'Tun Tun',email:'tuntun@gmail.com',password:'156123',age:26,address:"Mandalay"},
//         {name:'Naing Naing',email:'naing@gmail.com',password:'123723',age:33,address:"Yangon"} , 
//         {name:'Kyaw Kyaw',email:'Kyaw@gmail.com',password:'198723',age:19,address:"Pyae"} , 
//         {name:'Su Su',email:'su@gmail.com',password:'123723',age:24,address :"Nay Pyi Taw"} , 
//         {name:'Mg Mg',email:'mg@gmail.com',password:'324723',age:45,address:"Meiktila"} , 
//         {name:'Aye Aye',email:'aye@gmail.com',password:'123953',age:40,address: "Nyaung Oo"},
//         {name:'Phyo Phyo',email:'phyo@gmail.com',password:'3895723',age:45,address:"Meiktila"} , 
//         {name:'Aye Aye',email:'aye@gmail.com',password:'123953',age:28,address: "Yangon"},
//         {name:'Mg Mg',email:'mg@gmail.com',password:'324723',age:35,address:"Mandalay"} , 
//         {name:'Aye Aye',email:'aye@gmail.com',password:'123953',age:18,address: "Nyaung Oo"}, 
// ]);
//**********************************   UTIL NOW    ***********************************//





//******************    CALL ONLY TO CREATE A COLLECTION    **************************//
// makeCollection('admins');         
//********************************      UNTIL NOW    **********************************//




let errorChecker = (err,inst)=>{
    if (err){
    console.log("Something wrong",err);
    }else{
        console.log("We are good to go",inst);
    }
};