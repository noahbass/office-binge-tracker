import React from 'react'

const WatchedIcon = (props) => {
  const color = props.color || '#fff'

  return (
    <svg enable-background="new 0 0 144.924 144.924" version="1.1" viewBox="0 0 144.924 144.924" xmlns="http://www.w3.org/2000/svg">
      <path d="m144.92 37.745c0-5.963-2.321-11.567-6.538-15.784-8.518-8.516-22.25-8.675-30.992-0.518-0.198 0.161-0.39 0.334-0.575 0.518l-53.625 53.626-15.09-15.09c-8.703-8.701-22.864-8.701-31.567 0-4.216 4.217-6.537 9.822-6.537 15.784s2.321 11.566 6.537 15.783l30.834 30.834c0.013 0.013 0.023 0.028 0.037 0.041 4.217 4.216 9.821 6.537 15.784 6.537 5.218 0 10.161-1.777 14.14-5.047 0.551-0.452 1.082-0.936 1.594-1.445 0.016-0.016 0.034-0.029 0.05-0.045l69.411-69.411c0.084-0.084 0.158-0.176 0.238-0.263 4.058-4.185 6.299-9.676 6.299-15.52zm-127.78 33.36c2.854-2.855 7.499-2.855 10.353 0l20.394 20.394c0.183 0.183 0.374 0.354 0.57 0.515 1.375 1.121 3.055 1.682 4.734 1.682s3.359-0.561 4.734-1.682c0.196-0.16 0.387-0.332 0.57-0.515l58.929-58.93c1e-3 -1e-3 3e-3 -3e-3 4e-3 -5e-3 2.855-2.847 7.496-2.848 10.348 5e-3 1.383 1.383 2.145 3.221 2.145 5.177 0 1.953-0.759 3.789-2.139 5.171-1e-3 2e-3 -3e-3 3e-3 -5e-3 5e-3l-69.412 69.408c-1.383 1.383-3.221 2.145-5.177 2.145-1.955 0-3.793-0.762-5.176-2.145l-30.872-30.873c-1.383-1.383-2.145-3.22-2.145-5.176s0.762-3.793 2.145-5.176z" fill={color} />
    </svg>
  )
}

export default WatchedIcon