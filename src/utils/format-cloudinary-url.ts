export const formatCloudinaryUrl = (
  url: string,
  option: {
    mode?: string;
    height?: number;
    width?: number;
    x?: number;
    y?: number;
  },
): string => {
  const mode = option.mode ? `c_${option.mode},` : '';
  const height = option.height ? `h_${option.height},` : '';
  const width = option.width ? `w_${option.width},` : '';
  const x = option.x ? `x_${option.x},` : '';
  const y = option.y ? `y_${option.y},` : '';

  const splitUrl = url.split('upload/');

  splitUrl[0] += `upload/${mode}${height}${width}${x}${y}/`;

  return splitUrl[0] + splitUrl[1];
};

/**
 * TODO: Convert filter to cloudinary
 * @param url Image Url
 * @param filter Image filter
 */

export const filterImage = (url: string, filter: string): void => {
  filter.split(' ').map((item) => {
    const index = item.split('(')[0];
    const value = item.match(/\((.*)\)/)?.pop();

    if (index === 'saturate' && value) {
      return { e_saturation: Number(value) * 100 - 100 };
    }

    if (index === 'contrast' && value) {
      return { e_contrast: Number(value) * 100 - 100 };
    }

    if (index === 'grayscale') {
      return { e_grayscale: true };
    }

    return { [index]: value };
  });
};
