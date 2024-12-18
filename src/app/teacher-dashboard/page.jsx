"use client"

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
// import {Sheet,SheetTrigger,SheetContent} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button';
import { Tabs,TabsList,TabsTrigger,TabsContent } from '@/components/ui/tabs';
import {Card,CardContent,CardHeader,CardTitle,CardDescription } from '@/components/ui/card';
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { DropdownMenu,DropdownMenuContent,DropdownMenuTrigger,DropdownMenuLabel,DropdownMenuItem,DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import {  useRouter } from 'next/navigation';
import { useState } from 'react';




export default function TeacherDashboard() {
  const { data: session,status } = useSession();
  
  const [file, setFile] = useState(null);
  const [collegeName, setCollegeName] = useState('');
  const [department, setDepartment] = useState('');
  const [paperName, setPaperName] = useState('');
  const [paperCode, setPaperCode] = useState('');
  const [year, setYear] = useState('');
  console.log(session)
  const router =useRouter()

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUploadPaper = async (e) => {
    e.preventDefault();

    // Validate file is selected
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    try {
      // Prepare form data to send to API
      const formData = {
        collegeName,
        department,
        paperName,
        paperCode,
        year
      };
      console.log(formData)

      // Request presigned URL from API
      const presignedUrlResponse = await axios.post('/api/papers', formData);
      console.log(presignedUrlResponse)
      const { presignedUrl } = presignedUrlResponse.data;

      // Upload file to presigned URL
      await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type,
          "Content-Disposition":"attachment"
          
        }
      });

      // Optional: You might want to save the fileUrl to your database or do additional processing
     // console.log('File uploaded successfully:', fileUrl);

      // Reset form after successful upload
      resetForm();

      // Show success message
      alert('Paper uploaded successfully!');

    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload paper. Please try again.');
    }
  };

  // Reset form fields
  const resetForm = () => {
    setFile(null);
    setCollegeName('');
    setDepartment('');
    setPaperName('');
    setPaperCode('');
    setYear('');
    
    // Reset file input
    if (document.getElementById('file-input')) {
      document.getElementById('file-input').value = '';
    }
  };

 async function handleSignOut(e) {
    await signOut()
    
 }
 
 
  if (!session || session.user.role !== 'teacher') {
    router.push("/login")
  }

  

  return (
     <div className="">
    
    <div className="flex flex-col justify-center ">
      <header className="sticky top-0 z-30 h-14 w-screen  border-b bg-background px-4 sm:h-16 sm:px-6">
        {/* <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="lg:hidden">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
                <BookIcon className="h-6 w-6" />
                <span>Exam Prep</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                prefetch={false}
              >
                <UploadIcon className="h-4 w-4" />
                <span>Upload Papers</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                prefetch={false}
              >
                <FilePenIcon className="h-4 w-4" />
                <span>Create Exams</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                prefetch={false}
              >
                <UsersIcon className="h-4 w-4" />
                <span>Manage Users</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                prefetch={false}
              >
                <BarChartIcon className="h-4 w-4" />
                <span>Analytics</span>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex-1 md:ml-4">
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-md bg-muted/40 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-gray-800"
          />
        </div> */}
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <Button  size="icon" className="rounded-full text-gray-50 absolute right-4 top-3">
              {session?.user?.name[0]}
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuSeparator />
            
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="p-4 sm:p-6">
        <Tabs defaultValue="upload" className=''>
          <TabsList className="mb-4 flex border-b">
            <TabsTrigger value="upload">Upload Papers</TabsTrigger>
            <TabsTrigger value="create">Create Exams</TabsTrigger>
            
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload Papers</CardTitle>
                <CardDescription>Add new practice papers to the platform.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleUploadPaper}>
                  <div className=''>
                  <Label htmlFor="file-input">Upload PDF</Label>
        <Input 
          id="file-input"
          type="file" 
          accept=".pdf"
          onChange={handleFileChange}
          className="w-1/2" 
        />
                    
                  </div>
                  <div>
        <Label htmlFor="collegeName">College Name</Label>
        <Input 
          id="collegeName"
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="department">Department</Label>
        <Input 
          id="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="paperName">Paper Name</Label>
        <Input 
          id="paperName"
          value={paperName}
          onChange={(e) => setPaperName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="paperCode">Paper Code</Label>
        <Input 
          id="paperCode"
          value={paperCode}
          onChange={(e) => setPaperCode(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="year">Year</Label>
        <Input 
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
      </div>
                  
                  <Button type="submit" >Upload</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Create Exams</CardTitle>
                <CardDescription>Build custom exams for your students.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name">Exam Name</Label>
                    <Input id="name" />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Select id="subject">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="math">Math</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input id="duration" type="number" />
                  </div>
                  <div>
                    <Label htmlFor="questions">Number of Questions</Label>
                    <Input id="questions" type="number" />
                  </div>
                  <div>
                    <Label htmlFor="passing-score">Passing Score (%)</Label>
                    <Input id="passing-score" type="number" />
                  </div>
                  <Button type="submit">Create Exam</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          {/* <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Manage Users</CardTitle>
                <CardDescription>View and edit user accounts.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>John Doe</TableCell>
                      <TableCell>john@example.com</TableCell>
                      <TableCell>Teacher</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoveHorizontalIcon className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Deactivate</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>jane@example.com</TableCell>
                      <TableCell>Admin</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoveHorizontalIcon className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Deactivate</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Michael Johnson</TableCell>
                      <TableCell>michael@example.com</TableCell>
                      <TableCell>Teacher</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoveHorizontalIcon className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Deactivate</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent> */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>View performance metrics and insights.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Total Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold">1,234</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Active Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold">987</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Exams Taken</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold">5,678</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Average Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold">82%</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Passing Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold">75%</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>New Signups</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold">123</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  </div>
  );
}


function MoveHorizontalIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="18 8 22 12 18 16" />
        <polyline points="6 8 2 12 6 16" />
        <line x1="2" x2="22" y1="12" y2="12" />
      </svg>
    )
  }