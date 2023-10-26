import { useDispatch } from "react-redux";
import { fetchIssues } from "../api/githubAPI";
import { setIssues, setRepoUrl } from "../features/issuesSlice";

const useLoadIssues = (url: string) => {
  const dispatch = useDispatch();

  const handleLoad = async () => {
    const savedState = JSON.parse(localStorage.getItem("issuesState") || "{}");
    if (savedState.issuesData && savedState.issuesData[url]) {
      dispatch(setRepoUrl(url));
    } else {
      try {
        const issues = await fetchIssues(url);
        dispatch(setIssues({ repoUrl: url, issues }));
        dispatch(setRepoUrl(url));
      } catch (error) {
        console.error("Failed to fetch issues:", error);
      }
    }
  };

  return handleLoad;
};

export default useLoadIssues;
