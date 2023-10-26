import { useDispatch, useSelector } from "react-redux";
import { moveIssue } from "../features/issuesSlice";

const useDragEnd = () => {
  const dispatch = useDispatch();
  const repoUrl = useSelector((state: any) => state.issues?.currentRepoUrl);

  const handleDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const payload = {
      repoUrl: repoUrl,
      source: {
        droppableId: source.droppableId,
        index: source.index,
      },
      destination: {
        droppableId: destination.droppableId,
        index: destination.index,
      },
    };

    dispatch(moveIssue(payload));
  };

  return handleDragEnd;
};

export default useDragEnd;
