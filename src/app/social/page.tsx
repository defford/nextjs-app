import SocialCard from '../../components/SocialCard';
import Navigation from '../../components/Navigation';

export default function SocialPage() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <Navigation />
      <div className="min-h-screen flex flex-col xl:flex-row xl:items-center">
        {/* Banner Image - Centered on Screen */}
        <div 
          className="h-48 xl:h-96 w-full bg-cover bg-no-repeat social-banner-bg"
        ></div>
        
        {/* Social Card - Below image on mobile, overlay on desktop */}
        <div className="xl:absolute xl:top-0 xl:right-20 xl:h-full flex items-center justify-center xl:justify-end px-6 py-8 xl:py-0">
          <div className="w-full max-w-sm xl:w-80 xl:min-w-80 xl:max-w-80">
            <SocialCard />
          </div>
        </div>
      </div>
    </>
  );
}
