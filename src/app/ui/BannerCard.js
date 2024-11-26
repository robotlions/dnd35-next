export const BannerCard = ({
    imageUrl,
    title,
    text,
   
  }) => {
    return (
      <div className="relative h-60 w-full max-w-md mx-auto overflow-hidden rounded-lg shadow-lg">
        <div
          className="absolute inset-0 bg-cover bg-center "
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white">
          <h2 className="text-5xl font-bold mb-2 font-[family-name:var(--font-imFellSC)]">
            {title}
          </h2>
          <p className="text-xl font-semibold mb-4 font-[family-name:var(--font-imFell)]">
            {text}
          </p>
        </div>
      </div>
    );
  };