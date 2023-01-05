//const express = require('express');
const User = require("../models/user");
const Ref = require('../models/reference')
//const sendTicket = require('../helper/tickets')
//const {handleWebhook} = require('../controllers/webhook')
const {sendQr} = require('../helper/sendEmail')
//const initPay = require('../helper/paystack')
//const event = require('../controllers/webhook')
const qr = require('qrcode')
const Token = require('../models/token')
const moment = require('moment');
const axios = require('axios');
const Ticket = require('../models/tickets')
const {sendEmail } = require('../helper/sendEmail')






// exports.generateAndSaveTicket = async  (req,res) =>{
// try{
//     const {tokenn} = req.body 
//     // const token = await Token.findOne({token:tokenn})
//     let check = await Token.findOne({
//       token: tokenn,
//     });


//     if(check){
//       Token.findByIdAndRemove(check._id);

//       const token = await new Token({
//         token: ((Math.random() + 1).toString(36).substring(7)).toUpperCase(),
//         isUsed: false
//       }).save();
    
//       const qrCode = qr.toString(token.token,(err,qrCodee)=>{return qrCodee})
//       const ticket = await new Ticket({
//         token: token.token,
//         qrCode
//       }).save();

      
//     res.status(200).json({
//         success: true,
//         data: ticket
    
//     })
    
//     }
      

// } catch(error){
//     console.log(error)
//     res.status(400).json({
//         "success": false,
//         "msg":"Internal Error Occured"
//     })
// }

// }

exports.getAllTickets = async(req,res) =>{
  try {
    const tickets = await Ticket.find({})

    res.status(200).json({
      success: true,
      count: tickets.length,
      data: tickets
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      msg: "Internal Error Occured"
    })
    
  }
}

exports.getTicketByToken = async (req,res) =>{
  const {tokenn} = req.body
  const token = Token.findOne({token:tokenn})
  if(!token){
    res.status(400).json({
      success: false,
      message: "Invalid token"
    })
  } 
  const ticket = await Ticket.findOne({email:token.email}, (err, user) => {
    if(err || !ticket) {
      return res.status(400).json({
        error: "Ticket does not exists"
      })
    }})

    if(token.expiryDate < new Date()){
      res.status(400).json({
        message:"Token expired. Please enter email again."
      })
    }

    res.status(200).json({
      success:true,
      data: ticket
    })
}

exports.mailTempToken = async (req,res) =>{
  try{
    const {email} = req.body
    const token = await new Token({
      token: ((Math.random() + 1).toString(36).substring(7)).toUpperCase(),
      isUsed: false,
      email,
      expiryDate: moment(new Date()).add(30, 'm').toDate()
    }).save();

    const body = `This is your token: ${token.token}. Use within the next 30 minutes`
    sendEmail(token.email,body,"Temporary Token")

  
  } catch(error){
    console.log(error)
  }
}

exports.getTicketById = async (req,res) =>{
  try{
    const ticket = await Ticket.findById(req.params.ticketId)

    res.status(200).json({
      success: true,
      data: ticket
    })
  } catch(error){
    console.log(error)
    res.status(500).json({
      success: false,
      msg: "Internal Error Occured"
    })
  }
}
exports.deleteTicketById = async (req,res) =>{
  try{
    const ticket = await Ticket.findByIdAndDelete(req.params.ticketId)

    res.status(200).json({
      success: true,
      data: ticket
    })
  } catch(error){
    console.log(error)
    res.status(500).json({
      success: false,
      msg: "Internal Error Occured"
    })
  }
}


exports.checkTicket = async (req,res) =>{
  try{

  
  const token = req.body
  let check = await Token.findOne({
    token: token,
  });
  console.log(check);
  if(!check){
    res.status(400).json({
      message: "Token not found in the Database"
    })
  }

  if(check.expiryDate < new Date()){
    res.status(400).json({
      message:"Token expired."
    })
  }
  await Token.findByIdAndRemove(check._id);


  //  res.status(200).send({
  //   message: "Token verified successfully"
  // });

  
} catch (error) {
  console.log(error)
}
}





// exports.getAllTickets = async (req,res) =>{

// }







//  exports.sendEventTicket = async (req,res)=>{
//     try{
//         const user = await User.findById(req.params.userId)
        
//             sendTicket(user.email,"BUSA Show Ticket","Your Ticket","BUSA","ezehdavidhoddy@gmail.com")


//     res.status(200).json({
//         success: true  
//      })
    
// } catch (error){
//     console.log(error)
//     res.status(500).json({
//         success:false,
//         msg:error
//     })
// }







