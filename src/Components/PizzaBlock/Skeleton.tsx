import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={231}
    height={470}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">

    <circle cx="142" cy="129" r="127" />
    <circle cx="145" cy="175" r="11" />
    <circle cx="140" cy="154" r="16" />
    <rect x="0" y="274" rx="10" ry="10" width="280" height="18" />
    <rect x="2" y="314" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="421" rx="10" ry="10" width="95" height="30" />
    <rect x="124" y="413" rx="25" ry="25" width="160" height="45" />
  </ContentLoader>
);

export default Skeleton;
