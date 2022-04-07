import { dateFormat } from "./helper";

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

export { adaptTodoTableData };
