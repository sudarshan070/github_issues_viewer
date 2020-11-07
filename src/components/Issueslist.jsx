import Axios from "axios";
import React, { useEffect, useState } from "react";

export default function IssuesPage() {
  const [issues, setIssues] = useState(null);
  useEffect(() => {
    Axios.get(
      `https://api.github.com/repos/sudarshan070/trello-clone-api/issues`
    ).then((res) => {
      const issues = res.data;
      console.log(issues);
      setIssues(issues);
    });
  }, []);
  return (
    <div>
      {issues ? (
        issues.map((issue, i) => {
          return (
            <div key={i}>
              <p>{issue.title}</p>
            </div>
          );
        })
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
