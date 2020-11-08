import Axios from "axios";
import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";

export default function IssuesList() {
  const [issues, setIssues] = useState(null);
  const [loading, setLoading] = useState("false");
  const { org, repo } = useParams();

  useEffect(() => {
    async function fetchIssuesList() {
      try {
        setLoading("true");
        const issue = await Axios.get(
          `https://api.github.com/repos/${org}/${repo}/issues`
        );
        setIssues(issue.data);
      } catch (error) {
        setLoading("null");
      }
    }
    fetchIssuesList();
  }, [org, repo]);
  return (
    <div className="container-xl mt-5 media-display">
      <div className="border rounded">
        <div className="border-bottom d-flex justify-content-between p-3 first-row rounded-top text-small media-flex-around">
          <div className="d-flex display-media-none">
            <div className="mr-2">
              <p>
                <OpenIssuesIcon /> <span>Open</span>
              </p>
            </div>
            <div>
              <p>
                <Check /> <span>Closed</span>
              </p>
            </div>
          </div>
          <div className="d-flex ">
            <h3 className="px-3">Author</h3>
            <h3 className="px-3">Label</h3>
            <h3 className="px-3 display-media-none">Project</h3>
            <h3 className="px-3 display-media-none">Milestone</h3>
            <h3 className="px-3">Assignee</h3>
            <h3 className="px-3">Sort</h3>
          </div>
        </div>
        <ul>
          {loading === "false" ? (
            <h3>Issues is Loading..</h3>
          ) : loading === "null" ? (
            <h3>Something is wrong</h3>
          ) : issues ? (
            issues.map((issue, i) => {
              return (
                <li key={i} className="border-bottom">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <div className=" pl-3 pt-2 text-success">
                        <OpenIssuesIcon />
                      </div>
                      <div className="p-2">
                        <div>
                          <NavLink
                            style={{ textDecoration: "none" }}
                            to={`/sudarshan070/trello-clone-api/issues/${issue.number}`}
                          >
                            <h2>{issue.title}</h2>
                          </NavLink>

                          <span>{issue.labels}</span>
                        </div>

                        <p className="text-small text-secondary mt-1">{`#${issue.number} opened by ${issue.user.login}`}</p>
                      </div>
                    </div>
                    <div className="d-flex p-2 display-media-none">
                      <div className="assignee-avatar px-3">
                        {issue.assignee ? (
                          <>
                            <OverlayTrigger
                              placement="bottom"
                              overlay={
                                <Tooltip>
                                  {`Assign to ${issue.assignee.login}`}
                                </Tooltip>
                              }
                            >
                              <img
                                className="rounded-circle"
                                src={issue.assignee.avatar_url}
                                alt={issue.assignee.login}
                              />
                            </OverlayTrigger>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="px-4">
                        {issue.comments ? (
                          <>
                            <CommentIcon /> {issue.comments}
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  );
}

function OpenIssuesIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16"
      height="16"
    >
      <path d="M12 7a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0112 7zm1 9a1 1 0 11-2 0 1 1 0 012 0z"></path>
      <path
        fillRule="evenodd"
        d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z"
      ></path>
    </svg>
  );
}

function Check() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width="16"
      height="16"
    >
      <path
        fillRule="evenodd"
        d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
      ></path>
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width="16"
      height="16"
    >
      <path
        fillRule="evenodd"
        d="M2.75 2.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h4.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25H2.75zM1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0113.25 12H9.06l-2.573 2.573A1.457 1.457 0 014 13.543V12H2.75A1.75 1.75 0 011 10.25v-7.5z"
      ></path>
    </svg>
  );
}
