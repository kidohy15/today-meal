import Image from 'next/image';
import React, { useState } from 'react'

function RecipeImage({ src }: { src: string }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-[200px] h-[200px] overflow-hidden rounded-md">
      {/* 스켈레톤 UI */}
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">로딩 중...</span>
        </div>
      )}

      {/* 이미지 */}
      <Image
        src={src}
        width={200}
        height={200}
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        alt="레시피 이미지"
        unoptimized={false}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}

export default RecipeImage