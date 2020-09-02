/**
 * Format image with cloudinary
 */

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
