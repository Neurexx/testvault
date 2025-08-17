
"use client";
import axios from "axios";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import Link from "next/link";
import { useState, useMemo, useEffect,useCallback } from "react";
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
import Sidebar from "@/components/Sidebar";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}


export default function Component() {

  const [searchParams, setSearchParams] = useState({
    searchTerm: '',
    subject: 'All Subjects',
    year: 'All Years',
    sortBy: 'Default'
  });
  const [searchTerm, setSearchTerm] = useState("");
  
  const [examPapers, setExamPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
//  const [filteredPapers, setFilteredPapers] = useState([]);

  const debouncedSearchTerm = useDebounce(searchParams.searchTerm, 500);

  // useEffect(() => {
  //   const fetchExamPapers = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get(`/api/papers`, {
  //         params: {
  //           paperName: searchTerm,
            
            
            
  //         },
  //       });
  //       setExamPapers(response.data);
  //       console.log(examPapers)
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching papers:", error);
  //       setError("Failed to fetch exam papers");
  //       setLoading(false);
  //     }
  //   };

  //   fetchExamPapers();
  // }, [ searchTerm]);


  const fetchExamPapers = useCallback(async () => {
    const source = axios.CancelToken.source();

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get('/api/papers', {
        params: {
          paperName: debouncedSearchTerm,
          // Other optional params if needed
        },
        cancelToken: source.token
      });

      setExamPapers(response.data);
      setLoading(false);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request canceled');
      } else {
        setError('Failed to fetch exam papers');
        setLoading(false);
      }
    }

    return () => source.cancel();
  }, [debouncedSearchTerm]);


  // useEffect(() => {
  //   let result = examPapers;
  
  //   // Subject filtering
  //   if (selectedSubject && selectedSubject !== "All Subjects") {
  //     result = result.filter((paper) => paper.subject === selectedSubject);
  //   }
  
  //   // Year filtering
  //   if (selectedYear && selectedYear !== "All Years") {
  //     result = result.filter((paper) => paper.year === Number(selectedYear));
  //   }
  
  //   // Sorting
  //   if (sortBy === "subject") {
  //     result = result.sort((a, b) => a.subject.localeCompare(b.subject));
  //   } else if (sortBy === "year") {
  //     result = result.sort((a, b) => a.year - b.year);
  //   }
  
  //   setFilteredPapers(result);
  // }, [examPapers, selectedSubject, selectedYear, sortBy]);

  

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

  const filteredPapers = useMemo(() => {
    let result = [...examPapers];

    // Subject filtering
    if (searchParams.subject !== 'All Subjects') {
      result = result.filter(paper => paper.subject === searchParams.subject);
    }

    // Year filtering
    if (searchParams.year !== 'All Years') {
      result = result.filter(paper => paper.year === Number(searchParams.year));
    }

    // Sorting
    switch (searchParams.sortBy) {
      case 'subject':
        result.sort((a, b) => a.subject.localeCompare(b.subject));
        break;
      case 'year':
        result.sort((a, b) => a.year - b.year);
        break;
    }

    return result;
  }, [examPapers, searchParams.subject, searchParams.year, searchParams.sortBy]);

  // Trigger fetch on debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm || debouncedSearchTerm === '') {
      fetchExamPapers();
    }
  }, [debouncedSearchTerm, fetchExamPapers]);

  // Unified state update method
  const handleParamChange = useCallback((key, value) => {
    setSearchParams(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  // Render methods
  const renderPaperCard = (paper) => (
    <div
      key={paper._id}
      className="bg-background rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      <img
        src={paper.previewImage}
        alt={paper.paperName}
        className="w-full h-48 object-cover"
        style={{ aspectRatio: "300/200", objectFit: "cover" }}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{paper.subject}</h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-muted-foreground">Year: {paper.year}</span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleViewClick(`${paper.collegeName}/${paper.department}/${paper.paperCode}/${paper.paperCode}-${paper.year}.pdf`)}
        >
          View Exam Paper
        </Button>
      </div>
    </div>
  );

  // const handleSearch = (e) => {
  //   setSearchTerm(e.target.value);
  // };




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
      <Sidebar/>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className=" gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <h1 className="text-3xl font-bold mb-6">Previous Exam Papers</h1>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search by subject..."
            value={searchParams.searchTerm}
            onChange={(e) => handleParamChange('searchTerm', e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={searchParams.subject} onValueChange={(value) => handleParamChange('subject', value)}>
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
          <Select value={searchParams.year} onValueChange={(value) => handleParamChange('year', value)}>
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
          
          <Select value={searchParams.sortBy} onValueChange={(value) => handleParamChange('sortBy', value)}>
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
      {!loading && filteredPapers.map(renderPaperCard)}
      </div>
        </main>
      </div>
      
    </div>
  );
}
