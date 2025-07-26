import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Lineekela Shinavene - Full Stack Developer & UI Designer",
  description = "Experienced Full Stack Developer specializing in React, Next.js, and modern web technologies. View my portfolio of 104+ completed projects including web applications, UI/UX design, and branding solutions.",
  keywords = "Full Stack Developer, React Developer, UI Designer, Web Development, Frontend Developer, JavaScript, Next.js, Portfolio, Lineekela Shinavene",
  image = "https://leep0rtfolio.netlify.app/logo.jpg",
  url = "https://leep0rtfolio.netlify.app/",
  type = "website"
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
