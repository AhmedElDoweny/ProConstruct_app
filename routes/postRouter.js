
let express = require('express');
let postRouter = express.Router();
let jwtConfig = require('../config/jwtConfig');

let mongoose = require('mongoose');
require("../models/postModel");

let postSchema = mongoose.model('post');

postRouter.route("/posts")
          .get((request,response)=>{
                postSchema.find({})
                .then((data)=>{
                    response.send(data)                  
                })
                .catch((error)=>{response.send(error)})
          })

          .post((jwtConfig.verifyJwtToken),(request,response)=>{
            console.log(request.body.location)
              if(request.role == "sProvider"){
                let postObject = new postSchema({
                    _id:request.body._id,
                    title:request.body.title,                    
                    category:request.body.category,                    
                    description:request.body.description,          
                    price:request.body.price,          
                    image:request.body.image ,
                    client: request._id,
                    location: request.body.location       
                })
                postObject.save()
                          .then((data)=>{
                                response.send(data);
                           })
                           .catch((error)=>{
                               response.send(error);
                           })
                }
                else response.status(500).send({message:"not authorized"})
          })

          .put((request,response)=>{
              
                postSchema.updateOne({_id:request.body._id},{
                    $set:{
                        title:request.body.title,                    
                        category:request.body.category,                    
                        description:request.body.description,          
                        price:request.body.price,          
                        image:request.body.image ,
                        location: request.body.location        
                    }
                })
                .then((data)=>{
                    response.send(data);
                })
                .catch((error)=>{
                    response.send(error);
                })
          })

          .delete((request,response)=>{
                postSchema.deleteOne({_id:request.body._id})
                .then((data)=>{
                    response.send(data);
                })
                .catch((error)=>{
                    response.send(error);
                })
          })



module.exports = postRouter;