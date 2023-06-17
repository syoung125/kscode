// ['a','b','c'] => 'a/b/c'
export const stringifyPostIdParam = (id: string | string[]) => {
  return Array.isArray(id) ? id.join("/") : id;
};
