
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
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [examPapers, setExamPapers] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching papers:", error);
        setError("Failed to fetch exam papers");
        setLoading(false);
      }
    };

    fetchExamPapers();
  }, [selectedSubject, selectedYear, selectedDifficulty, searchTerm]);

  /*const examPapers = [
    {
      id: 1,
      subject: "Data Structures",
      year: 2022,
      difficulty: "Intermediate",
      previewImage:
        "https://www.simplilearn.com/ice9/free_resources_article_thumb/Graph%20Data%20Structure%20-%20Soni/what-is-graphs-in-data-structure.png",
    },
    {
      id: 2,
      subject: "Physics",
      year: 2021,
      difficulty: "Advanced",
      previewImage:
        "https://t3.ftcdn.net/jpg/01/97/49/40/360_F_197494079_U9dM6IxEBzdUmrhe3DFxyi8L0aFGtQME.jpg",
    },
    {
      id: 3,
      subject: "Chemistry",
      year: 2023,
      difficulty: "Beginner",
      previewImage:
        "https://www.thoughtco.com/thmb/6MsMmUK27akFhb8i89kj95J5iko=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-545286316-433dd345105e4c6ebe4cdd8d2317fdaa.jpg",
    },
    {
      id: 4,
      subject: "Mathematics",
      year: 2020,
      difficulty: "Intermediate",
      previewImage:
        "https://www.euroschoolindia.com/wp-content/uploads/2023/10/what-is-vedic-mathss-for-kids-jpg.webp",
    },
    {
      id: 5,
      subject: "Digital Circuit Design",
      year: 2022,
      difficulty: "Advanced",
      previewImage:
        "https://www.watelectronics.com/wp-content/uploads/digital-circuit.png",
    },
    {
      id: 6,
      subject: "English",
      year: 2021,
      difficulty: "Beginner",
      previewImage:
        "https://neucodetalent.com/wp-content/uploads/2021/06/business-english.jpg",
    },
  ];*/

  const filteredExamPapers = useMemo(() => {
    return examPapers
      .filter((paper) => {
       /* if (
          searchTerm &&
          !paper.subject.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return false;
        }*/
        if (selectedSubject && selectedSubject !== "All Subjects" && paper.subject !== selectedSubject) {
          return false;
        }
        if (selectedYear && selectedYear !== "All Years" && paper.year !== Number(selectedYear)) {
          return false;
        }
        if (selectedDifficulty && selectedDifficulty !== "All Difficulties" && paper.difficulty !== selectedDifficulty) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "subject":
            return a.subject.localeCompare(b.subject);
          case "year":
            return a.year - b.year;
          case "difficulty":
            return a.difficulty.localeCompare(b.difficulty);
          default:
            return 0;
        }
      });
  }, [searchTerm, selectedSubject, selectedYear, selectedDifficulty, sortBy]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              prefetch={false}
            >
              <BookIcon className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">College Dashboard</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/papers"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
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
        {filteredExamPapers.map((paper) => (
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
                <span className="text-sm text-muted-foreground">Difficulty: {paper.difficulty}</span>
              </div>
              <Button variant="outline" size="sm" >
                <a href={`https://testvault-bucket.s3.amazonaws.com/${paper.collegeName}/${paper.department}/${paper.paperCode}/${paper.paperCode}-${paper.year}.pdf`} download={`${paper.paperCode}-${paper.year}.pdf`}>View Exam Paper</a>
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
