import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDocs } from "state";
import DocWidget from "./DocWidget";

// DocsWidget component that retrieves docs from the API and renders each doc using the DocWidget component
const DocsWidget = ({ userId, isProfile = false }) => {
  // Get the dispatch method from the React Redux hook
  const dispatch = useDispatch();

  // Get the docs and token from the state using the React Redux hook
  const docs = useSelector((state) => state.docs);
  const token = useSelector((state) => state.token);

  // Function to get all docs from the API
  const getDocs = async () => {
    // Fetch the docs from the API
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/docs`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    // Parse the response as JSON
    const data = await response.json();

    // Dispatch an action to update the docs in the state
    dispatch(setDocs({ docs: data }));
  };

  // Function to get all docs for a specific user from the API
  const getUserDocs = async () => {
    // Fetch the user's docs from the API
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/docs/${userId}/docs`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    // Parse the response as JSON
    const data = await response.json();

    // Dispatch an action to update the docs in the state
    dispatch(setDocs({ docs: data }));
  };

  // Dispatch an action to update the docs in the state
  useEffect(() => {
    // Dispatch an action to update the docs in the state
    if (isProfile) {
      getUserDocs();
    } else {
      // Otherwise, get all docs
      getDocs();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Otherwise, get all docs
  return (
    <>
      {docs.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => {
          return (
            <DocWidget
              key={_id} // unique key for each doc
              docId={_id} // ID of the doc
              docUserId={userId} // ID of the user who created the doc
              name={`${firstName} ${lastName}`} // name of the user who created the doc
              description={description} // description of the doc
              location={location} // location of the user who created the doc
              picturePath={picturePath} // path to the picture associated with the doc
              userPicturePath={userPicturePath} // path to the picture of the user who created the doc
              likes={likes} // likes for the doc
              comments={comments} // comments for the doc
            />
          );
        }
      )}
    </>
  );
};
export default DocsWidget;