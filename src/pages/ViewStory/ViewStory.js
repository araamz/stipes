import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { default as NavLink } from "../../components/SectionNavLink/SectionNavLink";

function ViewStory(props) {
  let { story_id } = useParams();
  const [story, setStory] = useState({});
  var base_url = "/api";

  useEffect(() => {
    fetch(`${base_url}/${story_id}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(`${response.statusText} - ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setStory(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [base_url, story_id]);

  return (
    <div className="page_layout_utility">
      <p>
        <span className="bold_text_utility">User Story:</span>{" "}
        {`${story.content} (ID-${story.id})`}
      </p>
      <nav>
        <NavLink to="/" icon="list">
          View Stories
        </NavLink>
        <NavLink to={`/${story_id}`} icon="list">
          View Goals
        </NavLink>
        <NavLink to={`/${story_id}/edit`} icon="edit">
          Edit Story
        </NavLink>
        <NavLink to={`/${story_id}/create`} icon="edit">
          Create Goal
        </NavLink>
      </nav>
      <Outlet context={[story, setStory]}></Outlet>
    </div>
  );
}

export default ViewStory;
