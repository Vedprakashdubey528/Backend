const mongoose=require("mongoose");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}

main().then((res)=>{
    console.log("Connection Succesful");
}).catch((err)=>{
    console.log(err);
})

const fashionSchema=new mongoose.Schema({
    shirt:{
        type:String,
        required:true,
    },
    pant:{
        type:String,
        default:"Cambrige",
    },
    glass:{
        type:Number,
        min:[1,"Glass 1 se jyada hi hoga"],
    },
    genre:{
        type:[String],
    },
    gender:{
        type:String,
        enum : ['Male','Female'],
        // message:"Gender Can Only be Male and Female",
    }
})
const fashion=mongoose.model("Fashion",fashionSchema);

fashion.insertMany([
    // {shirt:"Check",pant:"Cargoes",glass:"Big",genre:"booka",gender:"Male"},
    // {shirt:"Non-heck",pant:"Dheeli-Jeans",glass:"Small",genre:"Poa",gender:"Female"}
    // {shirt:"Non-heck",pant:"Dheeli-Jeans",glass:"Small",genre:[78,"Love","Sex","Anger"],gender:"Female"}
    // {shirt:"Non-heck",pant:"Dheeli-Pants",glass:"Bigall",genre:[78,"Love","Sex","Anger"],gender:"Male"}
]).then((res)=>{
    // console.log(res);
})

// fashion.findByIdAndUpdate("651854b74f43b74bdfb7a92e",{pant:"Moti-Cargoes"}).then((res)=>{
    //     console.log(res);
    // })
    
    // fashion.findByIdAndUpdate("651854b74f43b74bdfb7a92e",{gender:"Transgender"}).then((res)=>{
        // console.log(res);
    // }) // This Update the gender to transgender but as we konw that ki gender bs male and female ho skte hai as we have give the enum function only male and female
    // but Schema validation bs insert ke time rhta hai but if we want it with upadate too then:->

    //  Use runValidators:true;
    fashion.findByIdAndUpdate("651854b74f43b74bdfb7a92e",{glass:-100},{runValidators:true}).then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err.errors.glass.properties.message)
    })
    // ab ye error dega to print customized error use:->

