import React from 'react';

// Displays on some pages if the request was rejected by the server, usually due to exceeding the rate limit per hour
const Error = () => {
  return (
    <>
      <h1>Something Went Wrong</h1>
      <p>There was a problem making your request. Please try again later.</p>
    </>
  );
};

export default Error;
