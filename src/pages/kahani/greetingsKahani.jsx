import React, { useState } from "react";
import CloseBtn from "../../components/common/CloseBtn/CloseBtn";
import KahaniComp from "../../components/kahanicomp/kahaniComp";

const GreetingsKahani = () => {
  const [value] = useState(
    `https://cdn.workmob.com/stories_workmob/web_home/profile-pehchan/profile-pehchan.m3u8`
  );

  return (
    <>
      <CloseBtn locationType={"/"} />
      {value && <KahaniComp value={value} />}
    </>
  );
};

export default GreetingsKahani;
