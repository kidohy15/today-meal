import Image from "next/image";
import React, { useEffect, useState } from "react";

function base64ToBlobUrl(base64: string) {
  const byteCharacters = atob(base64.split(",")[1]);
  const byteNumbers = new Array(byteCharacters.length)
    .fill(null)
    .map((_, i) => byteCharacters.charCodeAt(i));
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "image/jpeg" });
  return URL.createObjectURL(blob);
}

function RecipeImage({ src }: { src: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (src) {
      setImageSrc(base64ToBlobUrl(src));
    }
  }, [src]);

  return (
    <div className="relative w-[200px] h-[200px] overflow-hidden rounded-md">
      {/* 스켈레톤 */}
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">이미지</span>
        </div>
      )}

      {/* 이미지 */}
      {imageSrc ? (
        // <img src={imageSrc} alt="레시피 이미지" className="object-cover" />
        <Image
          src={imageSrc}
          width={200}
          height={200}
          className={`object-cover transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          alt="레시피 이미지"
          unoptimized={false}
          // loading="lazy"
          priority
          onLoad={() => setIsLoading(false)}
        />
      ) : (
        <div className="absolute inset-0 animate-pulse bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">이미지</span>
        </div>
      )}
    </div>
  );
}

export default RecipeImage;
