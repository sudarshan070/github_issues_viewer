import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dot from "../assets/svg/dot.svg";
import smiley from "../assets/svg/smiley.svg";

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
              <div className="p-2">{singleIssue.body}</div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

// function Smiley() {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 16 16"
//       width="16"
//       height="16"
//     >
//       <path
//         fillRule="evenodd"
//         d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zM5 8a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zM5.32 9.636a.75.75 0 011.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 111.222.87l-.614-.431c.614.43.614.431.613.431v.001l-.001.002-.002.003-.005.007-.014.019a1.984 1.984 0 01-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.32 3.32 0 01-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 01.183-1.044h.001z"
//       ></path>
//     </svg>
//   );
// }

// function Dot() {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 16 16"
//       width="16"
//       height="16"
//     >
//       <path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
//     </svg>
//   );
// }
