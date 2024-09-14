import dbConnect from "@/lib/dbConnect";
import Paper from "@/models/paperModel.ts";
import { NextResponse, NextRequest } from "next/server";
import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3"

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
  const { collegeName, paperName, department, paperCode, year, url } = body;

  if (
    !collegeName ||
    !department ||
    !paperCode ||
    !paperName ||
    !year ||
    !url
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const newPaper = new Paper({
    collegeName,
    paperName,
    department,
    paperCode,
    year,
    url,
  });

  try {
    await newPaper.save();
    return NextResponse.json(newPaper, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to upload paper" },
      { status: 500 }
    );
  }
}
