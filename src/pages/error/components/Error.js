import React from 'react';
import noImag from "../../../utils/images/no_image.jpg"

export const Error = () => (
    <div>
      <p>Oh no! Something went wrong.</p>
      <img src={noImag} alt="error" />
      <p>Please refresh and try again.</p>
    </div>
);