import { Box } from "@mui/material";
import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./DataPool.css";
import AddIcon from "@mui/icons-material/Add";
const DataPool = () => {
  const [tags, setTags] = React.useState(["Men", "Child"]);
  const [input, setInput] = React.useState("");
  const handleAdd = () => {
    setTags([...tags, input]);
    setInput("");
  };
  return (
    <div>
      <>{Sidebar()}</>
      <div className="categories"></div>
      <div className="DataPool">
        <Box>
          <div className="DataPoolTitle">Data Pool</div>
          <div className="DataPoolSizeBox">
            <div>Size of D Frame Data Pool</div>
            <div>105.91 K</div>
          </div>
          <div className="AddTags">
            {/* {tags.length > 0 ? (
              <div className="addtagsItem">
                {tags.map((tag) => {
                  return (
                    <>
                      <div className="">{tag}</div>
                      <div>|</div>
                    </>
                  );
                })}
              </div>
            ) : (
              <div>Add Tags</div>
            )} */}
            <input
              type="text"
              className="AddTagsInput"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <div>|</div>
            <div className="AddTagsIcon" onClick={() => handleAdd()}>
              <AddIcon />
            </div>
          </div>
          <div className="tagsDiv">
            <div className="tagsBox">
              {tags.map((tag) => {
                return <div className="tag">{tag}</div>;
              })}
            </div>
            <div className="tagsBox"></div>
          </div>
          <div className="chart"></div>
        </Box>
      </div>
    </div>
  );
};

export default DataPool;
