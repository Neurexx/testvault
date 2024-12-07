import dbConnect from "@/lib/dbConnect";
import Paper from "@/models/paperModel.ts";
import { NextResponse, NextRequest } from "next/server";
import {S3Client, PutObjectCommand, GetObjectCommand} from "@aws-sdk/client-s3"
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"

const client=new S3Client({
  region:"us-east-1",
  credentials:{
    accessKeyId:process.env.S3_ACCESS_KEY,
  secretAccessKey:process.env.S3_SECRET_KEY
}
})

async function getObjectUrl(key){
  const command=new GetObjectCommand({
    Bucket:"testvault-bucket",
    Key:key

    
  })
  const url= await getSignedUrl(client,command,{expiresIn:300})
  return url
}

export async function POST(req) {
    
    try {
      const {key}=await req.json()
      const url= await getObjectUrl(key) 
      console.log(url)
      return NextResponse.json({url},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error})
    }
}