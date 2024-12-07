import dbConnect from "@/lib/dbConnect";
import Paper from "@/models/paperModel.ts";
import { NextResponse, NextRequest } from "next/server";
import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3"
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"

const client=new S3Client({
  region:"us-east-1",
  credentials:{
    accessKeyId:process.env.S3_ACCESS_KEY,
  secretAccessKey:process.env.S3_SECRET_KEY
}
})

async function getObjectUrl(key){
  const command=new PutObjectCommand({
    Bucket:"testvault-bucket",
    Key:key,
    ContentType:"application/pdf",
    ContentDisposition:"attachment"
  })
  const url= await getSignedUrl(client,command,{expiresIn:300})
  return url
}


export async function GET(req) {
  await dbConnect();

  const { search } = req.nextUrl; // Access query parameters

  let papers;
  try {
    if (search) {
      const query = new URLSearchParams(search);
      const collegeName = query.get("collegeName");
      const department = query.get("department");
      const paperCode = query.get("paperCode");
      const paperName = query.get("paperName");
      const year = query.get("year");
   console.log(paperName)
      const filter = {};

      if (collegeName) filter.collegeName = collegeName;
      if (department) filter.department = department;
      if (paperCode) filter.paperCode = paperCode;
      if (paperName) filter.paperName = { $regex: new RegExp(paperName, 'i') };
      if (year) filter.year = year;

      papers = await Paper.find(filter);
    } else {
      papers = await Paper.find({});
    }

    return NextResponse.json(papers);
  } catch (e) {
    console.log(e);
  }
}

export async function POST(req) {
  await dbConnect();

  const body = await req.json();
  const { collegeName, paperName, department, paperCode, year} = body;

  if (
    !collegeName ||
    !department ||
    !paperCode ||
    !paperName ||
    !year 
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try{
  const presignedUrl=await getObjectUrl(`${collegeName}/${department}/${paperCode}/${paperCode}-${year}.pdf`)
  
  const url=`https://testvault-bucket.s3.amazonaws.com/${collegeName}/${department}/${paperCode}/${paperCode}-${year}.pdf`
  const newPaper = new Paper({
    collegeName,
    paperName,
    department,
    paperCode,
    year,
    url,
  });
  
    await newPaper.save();
    return NextResponse.json({presignedUrl}, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: `Failed to upload paper ${error}` },
      { status: 500 }
    );
  }
}
