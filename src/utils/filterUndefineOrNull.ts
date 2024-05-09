type filterUndefinedOrNullFieldsType = (obj: Record<string, any>) => Record<string, any>;

const filterUndefinedOrNullFields: filterUndefinedOrNullFieldsType = (obj) => {
   const filteredObj: Record<string, any> = {};
   for (const key in obj) {
      if (obj[key] !== undefined && obj[key] !== null) {
         filteredObj[key] = obj[key];
      }
   }
   return filteredObj;
};

export default filterUndefinedOrNullFields;
