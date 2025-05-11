import { getNewsSlides, getRelatedUsers } from "@server";
import { HomePageSliders } from "../components";

const SlidersSlot = async () => {
  const relatedUsers = await getRelatedUsers();
  const newsSlides = await getNewsSlides();
  return (
    <HomePageSliders
      key="sliders"
      slides={newsSlides}
      relatedUsers={relatedUsers}
    />
  );
};

export default SlidersSlot;
