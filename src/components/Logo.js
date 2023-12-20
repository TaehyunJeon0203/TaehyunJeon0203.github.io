import React from 'react';

const Logo = ({
    width = '256',
    height = '256',
    fill = '#f0f6fc',
    className
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 150 43"
    className={className}
  >
    <path
        fill={fill}
        d="M97.318-.012c-.38.055-2.12.328-3.805.6l-3.152.546V34.32h7.609V17.126c0-13.427-.163-17.192-.652-17.138zM.144 4.846v3.82c0 2.075.108 3.821.271 3.821.163 0 1.74-.764 3.533-1.637 1.794-.928 3.478-1.637 3.804-1.637.326 0 .544 4.311.544 12.553v12.553h8.152V21.766c0-6.932.108-12.553.271-12.553.163 0 1.74.71 3.534 1.637 1.793.873 3.369 1.637 3.532 1.637.163 0 .271-1.746.271-3.82V4.845H12.1zm26.63 0v29.529l3.967-.164 3.913-.164.163-6.44.164-6.387h5.924v13.1h8.152V4.845H40.904v11.462h-5.978V4.846H30.85zm38.587 0v29.201l8.098-.273c7.12-.218 8.315-.437 9.62-1.419 2.608-1.91 3.64-3.821 3.64-6.441 0-2.784-1.14-4.857-3.423-6.276l-1.63-.983 1.25-.655c3.097-1.637 4.184-7.26 1.956-10.098-2.065-2.674-3.587-3.056-11.903-3.056zm9.239 3.82c.598 0 1.576.491 2.174 1.092 2.174 2.183.815 7.096-1.957 7.096-1.25 0-1.304-.11-1.304-4.094 0-3.711.109-4.094 1.087-4.094zm62.018 1.194c-1.013-.02-2.018.171-3.485.553-6.087 1.638-8.424 9.497-3.968 13.427l1.794 1.583-1.576 1.692c-1.576 1.801-1.848 3.057-.979 4.476.326.6.054 1.146-1.196 2.183-4.347 3.657-.108 8.678 7.718 9.17 7.935.49 13.424-3.112 14.022-9.115.217-2.511.108-2.894-1.413-4.422-1.63-1.583-1.74-1.637-7.12-1.637-3.315 0-5.49-.218-5.49-.546 0-.327.925-.546 2.066-.546 2.5 0 5.924-1.582 7.718-3.493 1.14-1.255 1.358-2.074 1.358-4.748 0-3.439-.217-3.276 2.99-2.348.978.273 1.087.055 1.087-2.182v-2.512h-3.642c-2.065 0-4.891-.382-6.358-.818-1.495-.464-2.514-.696-3.526-.717zm-24.206.021c-1.51.04-2.662.327-3.845.86-5.978 2.783-8.478 11.57-5.217 18.066 1.25 2.456 2.5 3.602 5.108 4.694 4.403 1.856 10.381.436 12.99-3.057 1.902-2.565 2.609-5.021 2.609-9.06 0-6.987-3.587-11.135-10-11.462a17.254 17.254 0 0 0-1.645-.041zm23.703 3.752c.32.041.659.274 1.257.71 1.25.928 1.847 6.44.815 7.696-.978 1.2-2.011.983-3.044-.546-1.141-1.746-1.25-6.714-.162-7.423.516-.328.815-.478 1.134-.437zm-23.346.55c.926-.035 1.91.505 2.43 1.58.923 1.8.923 11.298 0 13.099-.979 1.91-2.827 2.074-3.969.272-1.14-1.746-1.358-11.843-.271-13.808.404-.74 1.09-1.116 1.81-1.143zM74.817 21.22c.761 0 1.74.383 2.174.874.87.819 1.088 1.964.925 4.584-.11 1.583-1.903 3.275-3.37 3.275-.924 0-1.033-.436-1.033-4.366 0-4.257.054-4.367 1.304-4.367zM137.1 34.217c2.514.007 5.027.348 5.272 1.03.217.547-.109 1.256-.87 1.856-3.423 2.784-10.924 1.365-9.674-1.91.245-.655 2.759-.983 5.272-.976z"
        />
  </svg>
);

export default Logo;