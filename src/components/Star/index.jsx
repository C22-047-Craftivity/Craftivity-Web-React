import StarIcon from "../../assets/Star.svg";

function Index({ lengthStar }) {
  if (lengthStar === 1) {
    return (
      <>
        <img src={StarIcon} style={{ width: 15 }} alt="" />
      </>
    );
  } else if (lengthStar === 2) {
    return (
      <>
        <img src={StarIcon} style={{ width: 15 }} alt="" />
        <img src={StarIcon} style={{ width: 15 }} alt="" />
      </>
    );
  } else if (lengthStar === 3) {
    return (
      <>
        <img src={StarIcon} style={{ width: 15 }} alt="" />
        <img src={StarIcon} style={{ width: 15 }} alt="" />
        <img src={StarIcon} style={{ width: 15 }} alt="" />
      </>
    );
  } else if (lengthStar === 4) {
    return (
      <>
        <img src={StarIcon} style={{ width: 15 }} alt="" />
        <img src={StarIcon} style={{ width: 15 }} alt="" />
        <img src={StarIcon} style={{ width: 15 }} alt="" />
        <img src={StarIcon} style={{ width: 15 }} alt="" />
      </>
    );
  } else if (lengthStar === 5) {
    return (
      <>
        <img src={StarIcon} style={{ width: 15 }} alt="" />
        <img src={StarIcon} style={{ width: 15 }} alt="" />
        <img src={StarIcon} style={{ width: 15 }} alt="" />
        <img src={StarIcon} style={{ width: 15 }} alt="" />
        <img src={StarIcon} style={{ width: 15 }} alt="" />
      </>
    );
  }
}

export default Index;
