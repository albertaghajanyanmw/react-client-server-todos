import { dateFormat } from "./helper";

const createUsersTableData = (id, firstName, lastName, nickName, email, image, firebaseToken) => ({ id, firstName, lastName, nickName, email, image, firebaseToken });

const adaptUsersTableData = (data) => {
  const dataList = [];
  data.forEach((item) => {
    dataList.push(
      createUsersTableData(
        item.id,
        item.firstName,
        item.lastName,
        item.nickName,
        item.email,
        item.image,
        item.firebaseToken
      )
    );
  });
  return dataList;
};

const createTodoTableData = (id, name, estimatedDate, estimatedDateOrg, status, userName) => ({ id, name, estimatedDate, estimatedDateOrg, status, userName });

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
        item.user.email || item.user.nickName,
        item.user.email || item.user.nickName,
      )
    );
  });
  return dataList;
};

export { adaptUsersTableData, adaptTodoTableData };
