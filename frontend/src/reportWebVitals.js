// This script is dedicated to capturing and reporting web vitals to assess the performance of a React application.
// It defines a function `reportWebVitals` that accepts a callback function as an argument to handle performance entries.
// When a valid function is provided, it dynamically imports the 'web-vitals' library to access specific metrics such as CLS, FID, FCP, LCP, and TTFB.
// These metrics are crucial for understanding the real-world user experience in terms of loading performance and interaction readiness.
// Each web vital metric is calculated and reported back through the provided callback function, allowing for custom handling like logging or sending to an analytics endpoint.
// This functionality is essential for developers aiming to optimize the performance and responsiveness of their applications.

// Created by: Tanner Helton

const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
