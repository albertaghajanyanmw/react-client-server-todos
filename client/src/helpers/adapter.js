import { dateFormat } from "./helper";

const createUsersTableData = (id, firstName, lastName, email, image) => ({ id, firstName, lastName, email, image });

const adaptUsersTableData = (data) => {
  const dataList = [];
  data.forEach((item) => {
    dataList.push(
      createUsersTableData(
        item.id,
        item.firstName,
        item.lastName,
        item.email,
        item.image
      )
    );
  });
  return dataList;
};

const createTodoTableData = (id, name, estimatedDate, estimatedDateOrg, status) => ({ id, name, estimatedDate, estimatedDateOrg, status });

const adaptTodoTableData = (data) => {
  const dataList = [];
  data.forEach((item) => {
    dataList.push(
      createTodoTableData(
        item.id,
        item.name,
        item.estimatedDate ? dateFormat(item.estimatedDate, 'DD/MM/YYYY, HH:mm') : '-',
        item.estimatedDate,
        item.status,
      )
    );
  });
  return dataList;
};

export { adaptUsersTableData, adaptTodoTableData };
