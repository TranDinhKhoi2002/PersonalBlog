const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase == PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "trandinhkhoi102",
        mongodb_password: "KUyPMa0NXS9DoyXV",
        mongodb_clustername: "cluster0",
        mongodb_database: "my-blog-dev",
      },
    };
  }

  return {
    env: {
      mongodb_username: "trandinhkhoi102",
      mongodb_password: "KUyPMa0NXS9DoyXV",
      mongodb_clustername: "cluster0",
      mongodb_database: "my-blog",
    },
  };
};
