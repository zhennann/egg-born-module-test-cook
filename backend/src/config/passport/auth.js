module.exports = app => {
  return {
    events: {
      async onUserVerify({ ctx, verifyUser, profileUser }) {
        console.log('onUserVerify: ', profileUser.profileId);
      },
    },
  };
};
