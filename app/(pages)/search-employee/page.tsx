import { getEmployeeRequests } from '@server';
import { SearchEmployees } from './components';

const SearchEmployeePage = async () => {
  const employeeData = await getEmployeeRequests();
  return <SearchEmployees employees={employeeData} />;
};

export default SearchEmployeePage;
