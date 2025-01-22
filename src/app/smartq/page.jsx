"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import MCQQuiz from "@/components/MCQQuiz";

function SmartQ() {
  const [pdf, setPdf] = useState(null);
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [error,setError]=useState(null);


  async function handleSubmit(e) {
     e.preventDefault()
     setError(null)
    const formData = new FormData();
    formData.append("pdf", pdf);
    formData.append("numberOfQuestions", numberOfQuestions);
    try {
        const response = await fetch("/api/autogen", {
            method: "POST",
            body: formData,
          });
          console.log(response)
          const data = await response.json();
          if (response.ok) {
            
            if(data.error){
              setError(data.error);
            }else{
              setQuestions(data.questions);
            }
          } else {
            setError(data.error);}
    } catch (error) {

        setError(error)
    }
  }

  if(questions.length > 0) 
    return <MCQQuiz questions={questions} />;

  return (
    <div className="p-2 flex flex-col gap-2">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <label>PDF</label>
          <input type="file" onChange={(e) => setPdf(e.target.files[0])} />
        </div>
        <div className="flex gap-2">
          <label>Number of Questions</label>
          <Input
            type="number"
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(e.target.value)}
          />
        </div>
        <Button type="submit"  >Submit</Button>
        {error && <div style={{
color:"red"
        }} >{error}</div>}
      </form>
    </div>
  );
}

export default SmartQ;
