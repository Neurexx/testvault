
"use client";
import axios from "axios";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {  CheckIcon,BookIcon,BarChartIcon,ExamIcon,ForumIcon,SettingsIcon} from "@/components/icons"

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [examPapers, setExamPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredPapers, setFilteredPapers] = useState([]);

  useEffect(() => {
    const fetchExamPapers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/papers`, {
          params: {
            paperName: searchTerm,
            
            
            
          },
        });
        setExamPapers(response.data);
        console.log(examPapers)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching papers:", error);
        setError("Failed to fetch exam papers");
        setLoading(false);
      }
    };

    fetchExamPapers();
  }, [ searchTerm]);

  useEffect(() => {
    let result = examPapers;
  
    // Subject filtering
    if (selectedSubject && selectedSubject !== "All Subjects") {
      result = result.filter((paper) => paper.subject === selectedSubject);
    }
  
    // Year filtering
    if (selectedYear && selectedYear !== "All Years") {
      result = result.filter((paper) => paper.year === Number(selectedYear));
    }
  
    // Sorting
    if (sortBy === "subject") {
      result = result.sort((a, b) => a.subject.localeCompare(b.subject));
    } else if (sortBy === "year") {
      result = result.sort((a, b) => a.year - b.year);
    }
  
    setFilteredPapers(result);
  }, [examPapers, selectedSubject, selectedYear, sortBy]);

  

  // const filteredExamPapers = useMemo(() => {
  //   return examPapers
  //     .filter((paper) => {
     
  //       if (selectedSubject && selectedSubject !== "All Subjects" && paper.subject !== selectedSubject) {
  //         return false;
  //       }
  //       if (selectedYear && selectedYear !== "All Years" && paper.year !== Number(selectedYear)) {
  //         return false;
  //       }
        
  //       return true;
  //     })
      
  // }, [searchTerm, selectedSubject, selectedYear, sortBy]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };




  const handleViewClick = async (key) => {
    try {
        
        

        const response = await axios.post("/api/papers/url",{key})
        console.log(response)
        const {url}=response.data
        console.log(url)
        // Trigger download
        const link = document.createElement("a");
        link.href = url;
        link.download = `paper.pdf`; // Suggest a filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error(error);
        alert("Failed to download the file. Please try again.");
    }
};

  const handleDownload = async () => {
    try {
      // Make a GET request to fetch the file from the S3 URL
      const response = await axios.get("https://testvault-bucket.s3.amazonaws.com/HITK/MATH/MTH1201/2022.pdf", {
        responseType: 'blob',  // Important to receive the data as a blob
      });
      
      // Create a link element to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf'); // Replace 'file.pdf' with the desired file name
      document.body.appendChild(link);
      link.click();

      // Cleanup after the download
      //@ts-ignore
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error downloading the PDF:', error);
    }
  };
  return (
    <div className="flex w-full flex-col">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Link
              href="/dashboard"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              prefetch={false}
            >
              <BookIcon className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">College Dashboard</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/papers"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <CheckIcon className="h-5 w-5" />
                  <span className="sr-only">Exam Papers</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Exam Papers</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/exams"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <ExamIcon className="h-5 w-5 fill-white" />
                  <span className="sr-only">Online Exams</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Online Exams</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/progress"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <BarChartIcon className="h-5 w-5" />
                  <span className="sr-only">Progress Tracker</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Progress Tracker</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/threads"
                  className="flex h-9 w-9 bg-accent items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <ForumIcon className="h-5 w-5 " />
                  <span className="sr-only">Community</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Community</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <SettingsIcon className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className=" gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <h1 className="text-3xl font-bold mb-6">Previous Exam Papers</h1>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search by subject..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Subjects">All Subjects</SelectItem>
              <SelectItem value="Mathematics">Mathematics</SelectItem>
              <SelectItem value="Physics">Physics</SelectItem>
              <SelectItem value="Chemistry">Chemistry</SelectItem>
              <SelectItem value="Biology">Biology</SelectItem>
              <SelectItem value="English">English</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Years">All Years</SelectItem>
              <SelectItem value={"2023"}>2023</SelectItem>
              <SelectItem value={"2022"}>2022</SelectItem>
              <SelectItem value={"2021"}>2021</SelectItem>
              <SelectItem value={"2020"}>2020</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Default">Default</SelectItem>
              <SelectItem value="subject">Subject</SelectItem>
              <SelectItem value="year">Year</SelectItem>
              
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPapers.map((paper) => (
          <div
            key={paper._id}
            className="bg-background rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <img
              src={paper.previewImage}
              alt={`${paper.paperName}`}
              className="w-full h-48 object-cover"
              style={{ aspectRatio: "300/200", objectFit: "cover" }}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{paper.subject}</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-muted-foreground">Year: {paper.year}</span>
                
              </div>
              <Button variant="outline" size="sm" onClick={()=>handleViewClick(`${paper.collegeName}/${paper.department}/${paper.paperCode}/${paper.paperCode}-${paper.year}.pdf`)}>View Exam Paper
                {/* <a href={`https://testvault-bucket.s3.amazonaws.com/${paper.collegeName}/${paper.department}/${paper.paperCode}/${paper.paperCode}-${paper.year}.pdf`} download={`${paper.paperCode}-${paper.year}.pdf`}>View Exam Paper</a> */}
              </Button>
            </div>
          </div>
        ))}
      </div>
        </main>
      </div>
      
    </div>
  );
}
