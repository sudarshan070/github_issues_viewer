import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dot from "../assets/svg/dot.svg";
import smiley from "../assets/svg/smiley.svg";
import ReactMarkdown from 'react-markdown'


export default function IssuesDetail() {
  const [singleIssue, setSingleIssue] = useState(null);
  const [loading, setLoading] = useState(false);
  const { org, repo, number } = useParams();

  useEffect(() => {
    async function fetchIssue() {
      try {
        setLoading(true);
        const singleIssue = await Axios.get(
          `https://api.github.com/repos/${org}/${repo}/issues/${number}`
        );
        console.log(singleIssue, "async");
        setSingleIssue(singleIssue.data);
      } catch (error) {
        setLoading("null");
      }
    }
    fetchIssue();
  }, [org, repo, number]);

  return (
    <div>
      {loading === false ? (
        <h1>Issues Loading</h1>
      ) : loading === "null" ? (
        <h3>Something is wrong</h3>
      ) : singleIssue ? (
        <div className="container">
          <div className="border-bottom">
            <div className="d-flex pt-5 issues-detail mb-2">
              <h1 className="pr-2">{singleIssue.title}</h1>
              <span>#{singleIssue.number}</span>
            </div>
            <div className="d-flex align-items-center mb-3 ">
              <button className="btn btn-success btn-open-issue text-small">
                open
              </button>
              <span className="text-small pl-3">
                {singleIssue.user.login} opened this issue
              </span>
            </div>
          </div>
          <div className="pt-4 d-flex">
            <div className="user-avatar display-media-none">
              <img
                className="rounded-circle "
                src={singleIssue.user.avatar_url}
                alt={singleIssue.user.login}
              />
            </div>
            <div className="single-issue-body border rounded ml-3">
              <div className="border-bottom d-flex justify-content-between p-2 rounded-top body-header">
                <span>{singleIssue.user.login}</span>
                <div className="d-flex">
                  <span className="px-2 display-media-none">
                    <img src={smiley} alt="smiley" />
                  </span>
                  <span className="px-2">
                    <img src={dot} alt="dot" />
                  </span>
                </div>
              </div>
              <ReactMarkdown className="p-2">{singleIssue.body}</ReactMarkdown>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
