import { getNewsSlides, getEmployeeDepartmentRequests } from "@server";
import { HomePageSliders } from "../components";

const SlidersSlot = async () => {
  const relatedUsers = await getEmployeeDepartmentRequests();
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
