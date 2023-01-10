import React, { useState } from "react";
import CloseBtn from "../../components/common/CloseBtn/CloseBtn";
import KahaniComp from "../../components/kahanicomp/kahaniComp";

const GreetingsKahani = () => {
  const [value, setValue] = useState(
    `https://cdn.workmob.com/stories_workmob/merikahani-award-web/merikahani-award-web.m3u8`
  );

  return (
    <>
      <CloseBtn
        locationType={
      "/"
        }
      />
     {value && <KahaniComp value={value} />} 
    </>
  );
};

export default GreetingsKahani;
