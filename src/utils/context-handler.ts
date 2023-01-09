export const mainContext = (context) => {
  const { req, res, connection } = context;
  return connection
    ? {
        req: {
          ...req,
          ...connection.context,
        },
        res,
      }
    : context;
};
