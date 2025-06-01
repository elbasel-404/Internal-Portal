import { getOvertimeAssignmentRequests } from "@server";
import { OvertimeAssignmentTable } from "./components";

const OvertimeAssignmentListPage = async () => {
  const overtimeAssignmentData = await getOvertimeAssignmentRequests();
  return (
    <div className="mb-12">
      <OvertimeAssignmentTable data={overtimeAssignmentData} />
    </div>
  );
};

export default OvertimeAssignmentListPage;
