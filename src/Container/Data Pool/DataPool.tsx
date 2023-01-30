import { Box, Divider } from "@mui/material";
import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./DataPool.css";
import AddIcon from "@mui/icons-material/Add";
import Chart from "../../components/chart/Chart";
const DataPool = () => {
  const [data, setData] = React.useState([
    { name: "Man", time1: 40, per: "22%", long: "117 minutes", long1: 117 },
    { name: "Child", time1: 32, per: "18%", long: "112 minutes", long1: 112 },
    {
      name: "India",
      time1: 28,
      per: "17%",
      long: "108 minutes",
      long1: 108,
    },
    { name: "NRI", time1: 25, per: "13%", long: "98 minutes", long1: 98 },
    { name: "Woman", time1: 25, per: "12%", long: "74 minutes", long1: 74 },
    { name: "Adult", time1: 18, per: "10%", long: "69 minutes", long1: 69 },
  ]);
  const [tags, setTags] = React.useState(["Men", "Child"]);
  const [input, setInput] = React.useState("");
  const handleAdd = () => {
    setTags([...tags, input]);
    setInput("");
  };

  
const Crypto=[
  {name:'Bitcoin',per:35,value: 35},
  {name:'Ethereum',per:35,value: 35},
  {name:'Polygon',per:30,value: 30},
  {name:'Solana',per:30,value: 30},
  {name:'Hyperledger',per:30,value: 30},
];
const Gender=[
  {name:'Male',per:46,value: 300},
  {name:'Female',per:46,value: 300},
  {name:'others',per:8,value: 50}
];
const Agegroup=[
  {name:'>18',per:43,value: 300},
  {name:'25-40',per:43,value: 300},
  {name:'41-60',per:7,value: 50},
  {name:'<60',per:7,value: 50}
];
const sports=[
  {name:'Football',per:40,value: 300},
  {name:'Cricket',per:40,value: 300},
  {name:'Hockey',per:7,value: 50},
  {name:'Kabbadi',per:7,value: 50},
  {name:'Badmiton',per:7,value: 50}
];
const SocialMedia=[
  {name:'Instagram',per:35,value: 300},
  {name:'Meta',per:29,value: 250},
  {name:'Reddit',per:24,value: 200},
  {name:'Linkedin',per:12,value: 100}
];
const Finance=[
  {name:'Muthoot',per:33,value: 33},
  {name:'Mahindra',per:33,value: 33},
  {name:'HDFC',per:22,value: 22},
  {name:'EasyLoan',per:11,value: 11}
];
var a:any[]= [];


  const [toggleState,setToggleState] = useState(3);
  const toggleTab = (index: void |any) =>{
    setToggleState(index);
  }
  if (toggleState === 3 ){
    ( a = Crypto);
  }
  else if (toggleState === 4){
    (a = Gender);
   
  }
  else if (toggleState === 5){
    (a = Agegroup);
  }
  else if (toggleState === 6){
    (a = sports);
  }
  else if (toggleState === 7){
    (a = SocialMedia);
  }
  else if (toggleState === 8){
    (a = Finance);
  }

  return (
    <div>
      <>{Sidebar(3)}</>
      
     
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
          <div className="chart">{Chart(a, "per")}</div>
        </Box>
      </div>
    </div>
  );
};

export default DataPool;
