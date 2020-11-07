import Axios from "axios";
import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

export default function IssuesDetail(props) {
  const [singleIssue, setSingleIssue] = useState(null);

  useEffect(() => {
    const { number } = props.match.params;
    Axios.get(
      `/https://api.github.com/repos/sudarshan070/trello-clone-api/issues/${number}`
    ).then((res) => console.log(res.data));
  }, [props.match.params]);

  return <div>hello IssuesDetail page</div>;
}
