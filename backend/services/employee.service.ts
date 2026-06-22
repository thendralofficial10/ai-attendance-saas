const employees = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    department: "Engineering",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@example.com",
    department: "HR",
  },
];

export const getEmployees = () => {
  return employees;
};

export const createEmployee = (
  name: string,
  email: string,
  department: string
) => {
  const newEmployee = {
    id: employees.length + 1,
    name,
    email,
    department,
  };

  employees.push(newEmployee);

  return newEmployee;
};