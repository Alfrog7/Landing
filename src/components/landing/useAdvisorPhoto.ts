import { useEffect, useRef, useState } from 'preact/hooks';
import { BRAND_CONFIG } from '../../core/config/brand.config';

// Fotografía real con fallback automático al placeholder mientras no exista el archivo.
// El HTML llega prerenderizado, así que el error de carga puede ocurrir antes de la
// hidratación: al montar se revisa si la imagen ya falló y, si es así, se cambia.
export function useAdvisorPhoto() {
  const [src, setSrc] = useState<string>(BRAND_CONFIG.assets.advisorPhotoReal);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setSrc(BRAND_CONFIG.assets.advisorPhoto);
    }
  }, []);

  return { src, ref, onError: () => setSrc(BRAND_CONFIG.assets.advisorPhoto) };
}
